// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract ReachToken is ERC20, Ownable, ReentrancyGuard {
    using SafeMath for uint256;

    uint256 public constant TOTAL_SUPPLY = 18_000_000_000 * 10**18;
    uint256 public floorPrice = 27 * 1e18; // $27 per token
    uint256 public buybackReserve;
    uint256 public lockedSupply;
    uint256 public transactionFee = 50; // 0.5% fee
    uint256 public buybackAllocation = 50; // 50% of fees go to buyback pool
    uint256 public stakingAllocation = 30; // 30% of buybacks go to stakers
    uint256 public unlockPeriod = 7 days;

    AggregatorV3Interface internal priceFeed;

    mapping(address => uint256) public stakingBalance;
    mapping(address => uint256) public lastStakeTime;
    mapping(address => uint256) public lockedTokens;
    mapping(address => uint256) public unlockTimestamp;

    struct Proposal {
        uint256 newFloorPrice;
        uint256 voteCount;
        bool executed;
        address creator;
    }

    Proposal[] public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

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
        return uint256(price).mul(1e10); // Adjust for decimals if needed
    }

    function adjustSupply() public onlyOwner {
        uint256 currentPrice = getLatestPrice();

        if (currentPrice < floorPrice) {
            uint256 amountToLock = totalSupply().mul(10).div(100);
            lockedSupply = lockedSupply.add(amountToLock);
            _burn(msg.sender, amountToLock);
            emit TokensLocked(amountToLock);
        } else if (currentPrice > floorPrice.mul(2)) {
            uint256 amountToRelease = lockedSupply.div(2);
            lockedSupply = lockedSupply.sub(amountToRelease);
            _mint(msg.sender, amountToRelease);
            emit TokensReleased(amountToRelease);
        }
    }

    function executeBuyback() public onlyOwner nonReentrant {
        uint256 currentPrice = getLatestPrice();
        require(currentPrice < floorPrice, "Price is above the floor");
        require(buybackReserve > 0, "No funds available for buyback");

        uint256 amountToBuy = buybackReserve.div(currentPrice);
        buybackReserve = buybackReserve.sub(amountToBuy.mul(currentPrice));
        _mint(address(this), amountToBuy);

        uint256 rewardAmount = amountToBuy.mul(stakingAllocation).div(100);
        distributeRewards(rewardAmount);

        emit BuybackExecuted(amountToBuy, currentPrice);
    }

    function depositBuybackFunds() external payable onlyOwner {
        require(msg.value > 0, "Deposit must be greater than 0");
        buybackReserve = buybackReserve.add(msg.value);
    }

    function distributeRewards(uint256 amount) internal {
        for (uint256 i = 0; i < proposals.length; i++) {
            address creator = proposals[i].creator;
            if (stakingBalance[creator] > 0) {
                _mint(creator, amount.div(proposals.length));
            }
        }
    }

    function transfer(address to, uint256 value) public override nonReentrant returns (bool) {
        require(balanceOf(msg.sender) >= value, "Insufficient balance");

        uint256 fee = value.mul(transactionFee).div(10000);
        uint256 buybackAmount = fee.mul(buybackAllocation).div(100);
        buybackReserve = buybackReserve.add(buybackAmount);

        uint256 amountAfterFee = value.sub(fee);
        _transfer(msg.sender, to, amountAfterFee);
        return true;
    }

    function createProposal(uint256 newPrice) external onlyOwner {
        proposals.push(Proposal({
            newFloorPrice: newPrice,
            voteCount: 0,
            executed: false,
            creator: msg.sender
        }));

        emit ProposalCreated(proposals.length - 1, newPrice);
    }

    function vote(uint256 proposalId) external {
        require(proposalId < proposals.length, "Invalid proposal");
        require(!hasVoted[proposalId][msg.sender], "Already voted");

        hasVoted[proposalId][msg.sender] = true;
        proposals[proposalId].voteCount += 1;
        
        emit VoteCast(msg.sender, proposalId);
    }

    function executeProposal(uint256 proposalId) external onlyOwner {
        require(proposalId < proposals.length, "Invalid proposal");
        require(proposals[proposalId].voteCount >= 10, "Not enough votes");
        require(!proposals[proposalId].executed, "Proposal already executed");

        floorPrice = proposals[proposalId].newFloorPrice;
        proposals[proposalId].executed = true;
    }

    function stakeTokens(uint256 _amount, uint256 _lockPeriod) external nonReentrant {
        require(balanceOf(msg.sender) >= _amount, "Not enough tokens");
        require(_lockPeriod == 3 || _lockPeriod == 6 || _lockPeriod == 12, "Invalid staking period");
        require(stakingBalance[msg.sender] == 0, "Tokens already staked");

        stakingBalance[msg.sender] = stakingBalance[msg.sender].add(_amount);
        _transfer(msg.sender, address(this), _amount);
        lastStakeTime[msg.sender] = block.timestamp.add(_lockPeriod.mul(30 days));

        emit TokensStaked(msg.sender, _amount, _lockPeriod);
    }

    function unstakeTokens() external nonReentrant {
        require(stakingBalance[msg.sender] > 0, "No staked tokens");
        require(block.timestamp >= lastStakeTime[msg.sender], "Tokens still locked");

        uint256 amount = stakingBalance[msg.sender];
        stakingBalance[msg.sender] = 0;
        _transfer(address(this), msg.sender, amount);

        emit TokensUnstaked(msg.sender, amount);
    }
}
