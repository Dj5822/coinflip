import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { ethers } from "ethers";

const Homepage = () => {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      if (!connected) {
        // Connect the wallet using ethers.js
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const _walletAddress = await signer.getAddress();
        setConnected(true);
        setWalletAddress(_walletAddress);
      }
    }
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      sx={{
        placeItems: "center",
        minWidth: "100vw",
        minHeight: "100vh",
        marginLeft: 0,
      }}
    >
      <Typography
        sx={{
          marginBottom: "128px",
        }}
      >
        Replace with image of coin
      </Typography>
      {connected ? (
        <Typography>Connected to {walletAddress}</Typography>
      ) : (
        <Button variant="contained" onClick={connectWallet}>
          Connect Wallet
        </Button>
      )}
    </Stack>
  );
};

export default Homepage;
