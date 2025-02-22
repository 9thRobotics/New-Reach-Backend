// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract ReachToken is ERC20, Ownable {
    uint256 public constant TOTAL_SUPPLY = 18_000_000_000 * 10**18;
    uint256 public floorPrice = 27 * 1e18; // $27 per token
    uint256 public buybackReserve;
    uint256 public lockedSupply;
    uint256 public transactionFee = 50; // 0.5% fee
    uint256 public buybackAllocation = 50; // 50% of fees go to buyback pool
    uint256 public stakingAllocation = 30; // 30% of buybacks go to long-term stakers
    uint256 public unlockPeriod = 7 days;
    AggregatorV3Interface internal priceFeed;

    mapping(address => uint256) public stakingBalance;
    mapping(address => uint256) public lastStakeTime;
    mapping(address => uint256) public votingPower;
    mapping(address => uint256) public lockedTokens;
    mapping(address => uint256) public unlockTimestamp;

    struct Proposal {
        uint256 newFloorPrice;
        uint256 voteCount;
        bool executed;
        mapping(address => bool) voters;
    }

    Proposal[] public proposals;

    event TokensLocked(uint256 amount);
    event TokensReleased(uint256 amount);
    event BuybackExecuted(uint256 amount, uint256 price);
    event VoteCast(address voter, uint256 proposalId);
    event ProposalCreated(uint256 proposalId, uint256 newFloorPrice);
    event TokensStaked(address indexed user, uint256 amount, uint256 lockTime);
    event TokensUnstaked(address indexed user, uint256 amount);
    
    constructor(address _priceFeed) ERC20("Reach Token", "9D-RC") {
        _mint(msg.sender, TOTAL_SUPPLY);
        priceFeed = AggregatorV3Interface(_priceFeed);
    }

    function getLatestPrice() public view returns (uint256) {
        (, int256 price, , ,) = priceFeed.latestRoundData();
        return uint256(price) * 1e10; // Adjust for decimals if needed
    }

    function adjustSupply() public {
        uint256 currentPrice = getLatestPrice();

        if (currentPrice < floorPrice) {
            uint256 amountToLock = (totalSupply() * 10) / 100;
            lockedSupply += amountToLock;
            _burn(msg.sender, amountToLock);
            emit TokensLocked(amountToLock);
        } else if (currentPrice > floorPrice * 2) {
            uint256 amountToRelease = lockedSupply / 2;
            lockedSupply -= amountToRelease;
            _mint(msg.sender, amountToRelease);
            emit TokensReleased(amountToRelease);
        }
    }

    function executeBuyback() public onlyOwner {
        uint256 currentPrice = getLatestPrice();
        require(currentPrice < floorPrice, "Price is above the floor");
        require(buybackReserve > 0, "No funds available for buyback");

        uint256 amountToBuy = buybackReserve / currentPrice;
        buybackReserve -= amountToBuy * currentPrice;
        _mint(address(this), amountToBuy);

        uint256 rewardAmount = (amountToBuy * stakingAllocation) / 100;
        distributeRewards(rewardAmount);

        emit BuybackExecuted(amountToBuy, currentPrice);
    }

    function depositBuybackFunds() external payable onlyOwner {
        buybackReserve += msg.value;
    }

    function distributeRewards(uint256 amount) internal {
        for (uint256 i = 0; i < proposals.length; i++) {
            if (stakingBalance[proposals[i].newFloorPrice] > 0) {
                _mint(proposals[i].newFloorPrice, amount / proposals.length);
            }
        }
    }

    function transfer(address to, uint256 value) public override returns (bool) {
        require(balanceOf(msg.sender) >= value, "Insufficient balance");

        uint256 fee = (value * transactionFee) / 10000;
        uint256 buybackAmount = (fee * buybackAllocation) / 100;
        buybackReserve += buybackAmount;

        uint256 amountAfterFee = value - fee;
        _transfer(msg.sender, to, amountAfterFee);
        return true;
    }

    function createProposal(uint256 newPrice) external onlyOwner {
        Proposal storage proposal = proposals.push();
        proposal.newFloorPrice = newPrice;
        proposal.voteCount = 0;
        proposal.executed = false;
        
        emit ProposalCreated(proposals.length - 1, newPrice);
    }

    function vote(uint256 proposalId) external {
        require(proposalId < proposals.length, "Invalid proposal");
        require(!proposals[proposalId].voters[msg.sender], "Already voted");

        proposals[proposalId].voters[msg.sender] = true;
        proposals[proposalId].voteCount += 1;
        
        emit VoteCast(msg.sender, proposalId);
    }

    function executeProposal(uint256 proposalId) external onlyOwner {
        require(proposalId < proposals.length, "Invalid proposal");
        require(proposals[proposalId].voteCount > 10, "Not enough votes");
        require(!proposals[proposalId].executed, "Proposal already executed");

        floorPrice = proposals[proposalId].newFloorPrice;
        proposals[proposalId].executed = true;
    }

    // Staking with lock-up periods
    function stakeTokens(uint256 _amount, uint256 _lockPeriod) external {
        require(balanceOf(msg.sender) >= _amount, "Not enough tokens");
        require(_lockPeriod == 3 || _lockPeriod == 6 || _lockPeriod == 12, "Invalid staking period");

        _transfer(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] += _amount;
        lastStakeTime[msg.sender] = block.timestamp + (_lockPeriod * 30 days);

        emit TokensStaked(msg.sender, _amount, _lockPeriod);
    }

    function unstakeTokens() external {
        require(stakingBalance[msg.sender] > 0, "No staked tokens");
        require(block.timestamp >= lastStakeTime[msg.sender], "Tokens still locked");

        uint256 amount = stakingBalance[msg.sender];
        stakingBalance[msg.sender] = 0;
        _transfer(address(this), msg.sender, amount);

        emit TokensUnstaked(msg.sender, amount);
    }

    function lockTokens(uint256 _amount) external {
        require(balanceOf(msg.sender) >= _amount, "Not enough tokens");
        require(lockedTokens[msg.sender] == 0, "Tokens already locked");

        _transfer(msg.sender, address(this), _amount);
        lockedTokens[msg.sender] = _amount;
        unlockTimestamp[msg.sender] = block.timestamp + unlockPeriod;
    }

    function unlockTokens() external {
        require(block.timestamp >= unlockTimestamp[msg.sender], "Tokens still locked");
        require(lockedTokens[msg.sender] > 0, "No locked tokens");

        uint256 amount = lockedTokens[msg.sender];
        lockedTokens[msg.sender] = 0;
        _transfer(address(this), msg.sender, amount);
    }
}
