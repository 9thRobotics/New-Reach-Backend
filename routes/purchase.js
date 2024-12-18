const express = require('express');
const { contract } = require('../config');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { buyerAddress, ethAmount } = req.body;

        const tx = await contract.buyTokens(buyerAddress, {
            value: ethers.utils.parseEther(ethAmount)
        });

        await tx.wait();

        res.json({ success: true, txHash: tx.hash });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Transaction failed' });
    }
});

module.exports = router;
