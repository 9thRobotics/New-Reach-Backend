// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ReachToken {
    string public name = "Reach Token";
    string public symbol = "9D-RC";
    uint8 public decimals = 18;
    uint256 public totalSupply = 18_000_000_000 * (10 ** uint256(decimals));
    uint256 public transactionFee = 50; // 0.5% transaction fee
    uint256 public stakingPool;
    uint256 public maxStakingPool = 5_000_000_000 * (10 ** uint256(decimals)); // 5 Billion Limit
    uint256 public unlockPeriod = 7 days;
    uint256 public voteCooldown = 1 days;
    uint256 public unstakePenalty = 15; // Increased to 15%
    uint256 public breakStakePenalty = 25; // 25% penalty for early exit
    uint256 public rewardInterval = 1 weeks; // Default reward interval (can be adjusted)

    address public owner;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    mapping(address => uint256) public lockedTokens;
    mapping(address => uint256) public unlockTimestamp;
    mapping(address => uint256) public stakedBalance;
    mapping(address => uint256) public stakingTimestamp;
    mapping(address => uint256) public stakingMultiplier;
    mapping(address => uint256) public lastVoteTimestamp;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event TokensLocked(address indexed user, uint256 amount, uint256 unlockTime);
    event TokensUnlocked(address indexed user, uint256 amount);
    event TokensStaked(address indexed user, uint256 amount, uint256 rewardMultiplier);
    event TokensUnstaked(address indexed user, uint256 amount, uint256 penalty);
    event ProposalCreated(uint256 proposalId, string description);
    event Voted(address indexed voter, uint256 proposalId);
    event AutoCompounded(address indexed user, uint256 newStakedAmount);
    event StakingRuleUpdated(string parameter, uint256 newValue);

    struct Proposal {
        string description;
        uint256 voteCount;
        bool executed;
    }

    Proposal[] public proposals;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
        balanceOf[owner] = totalSupply;
        emit Transfer(address(0), owner, totalSupply);
    }

    function transfer(address to, uint256 value) public returns (bool success) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");

        uint256 fee = (value * transactionFee) / 10000;
        uint256 amountAfterFee = value - fee;

        balanceOf[msg.sender] -= value;
        balanceOf[to] += amountAfterFee;
        stakingPool += fee;

        emit Transfer(msg.sender, to, amountAfterFee);
        return true;
    }

    function approve(address spender, uint256 value) public returns (bool success) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function transferFrom(address from, address to, uint256 value) public returns (bool success) {
        require(balanceOf[from] >= value, "Insufficient balance");
        require(allowance[from][msg.sender] >= value, "Allowance exceeded");

        uint256 fee = (value * transactionFee) / 10000;
        uint256 amountAfterFee = value - fee;

        balanceOf[from] -= value;
        balanceOf[to] += amountAfterFee;
        allowance[from][msg.sender] -= value;
        stakingPool += fee;

        emit Transfer(from, to, amountAfterFee);
        return true;
    }

    function lockTokens(uint256 _amount) external {
        require(balanceOf[msg.sender] >= _amount, "Not enough tokens");
        require(lockedTokens[msg.sender] == 0, "Tokens already locked");

        balanceOf[msg.sender] -= _amount;
        lockedTokens[msg.sender] = _amount;
        unlockTimestamp[msg.sender] = block.timestamp + unlockPeriod;

        emit TokensLocked(msg.sender, _amount, unlockTimestamp[msg.sender]);
    }

    function unlockTokens() external {
        require(block.timestamp >= unlockTimestamp[msg.sender], "Tokens still locked");
        require(lockedTokens[msg.sender] > 0, "No locked tokens");

        uint256 amount = lockedTokens[msg.sender];
        lockedTokens[msg.sender] = 0;
        balanceOf[msg.sender] += amount;

        emit TokensUnlocked(msg.sender, amount);
    }

    function stakeTokens(uint256 _amount, uint256 _months) external {
        require(balanceOf[msg.sender] >= _amount, "Not enough tokens");
        require(_months == 3 || _months == 6 || _months == 12, "Invalid staking period");
        require(stakingPool + _amount <= maxStakingPool, "Staking pool limit reached");

        uint256 rewards = autoCompound(msg.sender);

        balanceOf[msg.sender] -= (_amount + rewards);
        stakedBalance[msg.sender] += (_amount + rewards);
        stakingTimestamp[msg.sender] = block.timestamp;

        stakingMultiplier[msg.sender] = getStakingMultiplier(_months, _amount);

        stakingPool += (_amount + rewards);

        emit TokensStaked(msg.sender, _amount + rewards, stakingMultiplier[msg.sender]);
        emit AutoCompounded(msg.sender, stakedBalance[msg.sender]);
    }

    function unstakeTokens() external {
        require(stakedBalance[msg.sender] > 0, "No staked tokens");

        uint256 amount = stakedBalance[msg.sender];
        uint256 reward = autoCompound(msg.sender);
        uint256 penalty = (reward * unstakePenalty) / 100;

        stakedBalance[msg.sender] = 0;
        balanceOf[msg.sender] += (amount + reward - penalty);
        stakingPool -= (amount + reward - penalty);

        emit TokensUnstaked(msg.sender, amount, penalty);
    }

    function autoCompound(address _staker) internal returns (uint256) {
        uint256 timeStaked = block.timestamp - stakingTimestamp[_staker];
        if (timeStaked < rewardInterval) return 0;

        uint256 reward = (stakedBalance[_staker] * stakingMultiplier[_staker] * timeStaked) / (10000 * rewardInterval);
        stakedBalance[_staker] += reward;
        stakingTimestamp[_staker] = block.timestamp;

        return reward;
    }

    function getStakingMultiplier(uint256 _months, uint256 _amount) internal pure returns (uint256) {
        if (_amount >= 1_000_000 * (10 ** 18)) {
            return (_months == 3) ? 15 : (_months == 6) ? 25 : 50;
        } else if (_amount >= 100_000 * (10 ** 18)) {
            return (_months == 3) ? 12 : (_months == 6) ? 22 : 45;
        } else {
            return (_months == 3) ? 10 : (_months == 6) ? 20 : 40;
        }
    }

    function createProposal(string memory description) external onlyOwner {
        proposals.push(Proposal({ description: description, voteCount: 0, executed: false }));
        emit ProposalCreated(proposals.length - 1, description);
    }

    function vote(uint256 proposalId) external {
        require(proposalId < proposals.length, "Invalid proposal");
        require(block.timestamp >= lastVoteTimestamp[msg.sender] + voteCooldown, "Must wait before voting again");

        Proposal storage proposal = proposals[proposalId];
        proposal.voteCount += 1;
        lastVoteTimestamp[msg.sender] = block.timestamp;

        emit Voted(msg.sender, proposalId);
    }

    function updateStakingRule(string memory parameter, uint256 newValue) external onlyOwner {
        if (keccak256(abi.encodePacked(parameter)) == keccak256(abi.encodePacked("rewardInterval"))) {
            rewardInterval = newValue;
        } else if (keccak256(abi.encodePacked(parameter)) == keccak256(abi.encodePacked("unstakePenalty"))) {
            unstakePenalty = newValue;
        } 
        emit StakingRuleUpdated(parameter, newValue);
    }
}
