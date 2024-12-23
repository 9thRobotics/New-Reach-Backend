const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS for cross-origin requests

// Root Route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Endpoint Route
app.get("/endpoint", (req, res) => {
  res.json({ message: "Endpoint is working!" });
});

// Buy Tokens Route
app.post("/buyTokens", (req, res) => {
  const { recipient, amount } = req.body;

  // Input Validation
  if (!recipient || !amount) {
    return res.status(400).json({ error: "Missing recipient or amount" });
  }

  // Simulated Smart Contract Interaction (replace with actual logic)
  try {
    // Example: Interact with your blockchain or smart contract here
    res.status(200).json({
      message: `Bought ${amount} tokens for ${recipient}`,
    });
  } catch (error) {
    console.error("Error processing transaction:", error);
    res.status(500).json({ error: "Error processing transaction" });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Server Initialization
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
