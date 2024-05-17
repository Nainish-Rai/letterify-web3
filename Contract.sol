// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TOGPlatform {
    struct TOG {
        string name;
        address admin;
        uint256 memberLimit;
        address[] members;
    }

    struct Letter {
        address from;
        address to;
        string description;
    }

    TOG[] public togs;
    mapping(address => uint256[]) public userTOGs;
    mapping(uint256 => Letter[]) public togLetters;
    mapping(address => mapping(uint256 => uint256)) public userLetterCount;
    mapping(uint256 => address[]) public togApplications;

    event TOGCreated(string name, address admin, uint256 memberLimit);
    event MemberAdded(string togName, address member);
    event LetterWritten(address from, address to, string description, uint256 togIndex);
    event ApplicationSubmitted(uint256 togIndex, address applicant);
    event ApplicationApproved(uint256 togIndex, address applicant);

    function createTOG(string memory _name, uint256 _type) public {
        uint256 limit = getLimitByType(_type);
        TOG memory newTOG = TOG({
            name: _name,
            admin: msg.sender,
            memberLimit: limit,
            members: new address[](0)
        });

        togs.push(newTOG);
        uint256 index = togs.length - 1;

        userTOGs[msg.sender].push(index);
        togs[index].members.push(msg.sender);
        emit TOGCreated(_name, msg.sender, limit);
    }

    function applyToJoinTOG(uint256 _togIndex) public {
        require(_togIndex < togs.length, "TOG does not exist");
        TOG storage tog = togs[_togIndex];
        require(!isMember(_togIndex, msg.sender), "Already a member of this TOG");
        require(!hasApplied(_togIndex, msg.sender), "Already applied to join this TOG");

        togApplications[_togIndex].push(msg.sender);
        emit ApplicationSubmitted(_togIndex, msg.sender);
    }

    function approveApplication(uint256 _togIndex, address _applicant) public {
        TOG storage tog = togs[_togIndex];
        require(msg.sender == tog.admin, "Only admin can approve applications");
        require(tog.members.length < tog.memberLimit, "TOG member limit reached");
        require(hasApplied(_togIndex, _applicant), "Applicant has not applied to join this TOG");

        tog.members.push(_applicant);
        userTOGs[_applicant].push(_togIndex);
        removeApplication(_togIndex, _applicant);
        emit MemberAdded(tog.name, _applicant);
        emit ApplicationApproved(_togIndex, _applicant);
    }

    function writeLetter(uint256 _togIndex, address _to, string memory _description) public {
        require(isMember(_togIndex, msg.sender), "Sender is not a member of this TOG");
        require(isMember(_togIndex, _to), "Recipient is not a member of this TOG");
        require(userLetterCount[msg.sender][_togIndex] < 3, "Maximum letter limit reached in this TOG");
        require(!hasLetterToUserInTog(_togIndex, msg.sender, _to) , "User can write only one letter to another user in the same TOG.");


        togLetters[_togIndex].push(Letter({
            from: msg.sender,
            to: _to,
            description: _description
        }));

        userLetterCount[msg.sender][_togIndex]++;
        emit LetterWritten(msg.sender, _to, _description, _togIndex);
    }

    function hasLetterToUserInTog(uint256 _togIndex, address _from, address _to) internal view returns (bool) {
    for (uint i = 0; i < togLetters[_togIndex].length; i++) {
        if (togLetters[_togIndex][i].from == _from && togLetters[_togIndex][i].to == _to) {
            return true;
        }
    }
    return false;
}
    function getTOGs() public view returns (TOG[] memory) {
        return togs;
    }

    function getUserTOGs(address _user) public view returns (uint256[] memory) {
        return userTOGs[_user];
    }

    function getTOGLetters(uint256 _togIndex) public view returns (Letter[] memory) {
        return togLetters[_togIndex];
    }

    function getLimitByType(uint256 _type) private pure returns (uint256) {
        if (_type == 1) {
            return 5;
        } else if (_type == 2) {
            return 10;
        } else if (_type == 3) {
            return 15;
        }
        revert("Invalid TOG type");
    }

    function getTOGByType(uint256 _type) public view returns (TOG memory) {
        for (uint i = 0; i < togs.length; i++) {
            if (togs[i].memberLimit == _type) {
                return togs[i];
            }
        }
        revert("Invalid TOG type");
    }

    function hasApplied(uint256 _togIndex, address _applicant) internal view returns (bool) {
        address[] storage applicants = togApplications[_togIndex];
        for (uint i = 0; i < applicants.length; i++) {
            if (applicants[i] == _applicant) {
                return true;
            }
        }
        return false;
    }

    function isMember(uint256 _togIndex, address _user) internal view returns (bool) {
        TOG storage tog = togs[_togIndex];
        for (uint i = 0; i < tog.members.length; i++) {
            if (tog.members[i] == _user) {
                return true;
            }
        }
        return false;
    }

    function removeApplication(uint256 _togIndex, address _applicant) internal {
        address[] storage applicants = togApplications[_togIndex];
        for (uint i = 0; i < applicants.length; i++) {
            if (applicants[i] == _applicant) {
                applicants[i] = applicants[applicants.length - 1];
                applicants.pop();
                return;
            }
        }
    }


}
