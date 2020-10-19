pragma solidity >=0.5.0 <0.6.0;

import "./votemanagement.sol";
import "./erc721.sol";


contract VoteSystem is VoteManagement, ERC721 {
    event VoteIssued(uint indexed tokenId);

    struct Vote {
        uint32 issuedAt;
        bool consumed;
    }

    Vote[] private votes;
    mapping(address => uint) ownerVotes;
    mapping(uint => address) votesToOwner;
    mapping(uint => address) voteTransferApproved;

    modifier voteConditions(address _from, address _to, uint256 _tokenId){
        require(isCandidate[_from] == false);
        require(isCandidate[_to] == true);
        require(votes[_tokenId].consumed == false);
        _;
    }

    modifier onlyOwnerOfVote(uint _tokenId){
        require(votesToOwner[_tokenId] == msg.sender);
        _;
    }

    function balanceOf(address _owner) external view returns (uint256) {
        return ownerVotes[_owner];
    }

    function ownerOf(uint256 _tokenId) external view returns (address){
        return votesToOwner[_tokenId];
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) external payable voteConditions(_from, _to, _tokenId) {
        require(votesToOwner[_tokenId] == msg.sender || voteTransferApproved[_tokenId] == msg.sender);
        ownerVotes[_to]++;
        ownerVotes[_from]--;
        votesToOwner[_tokenId] = _to;
        votes[_tokenId].consumed = true;
        emit Transfer(_from, _to, _tokenId);
    }

    function approve(address _approved, uint256 _tokenId) external payable onlyOwnerOfVote(_tokenId) voteConditions(msg.sender, _approved, _tokenId) {
        voteTransferApproved[_tokenId] = _approved;
        emit Approval(msg.sender, _approved, _tokenId);
    }

    function issueVote(address _voteRecipient) external payable onlyIssuer {
        Vote memory vote = Vote(uint32(now), false);
        uint id = votes.push(vote) - 1;
        votesToOwner[id] = _voteRecipient;
        ownerVotes[_voteRecipient]++;
        emit VoteIssued(id);
    }
}
