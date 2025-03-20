import { Button, Card, Stack, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { BaseContract, ethers } from "ethers";
// import { IHintHelpers } from '../typechain-types';
import abi from "../flip.json";
import { FlipRandom } from "../types/FlipRandom";

const Homepage = () => {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [contract, setContract] = useState<FlipRandom | undefined>(undefined);
  const theme = useTheme();

  const abiInterface = new ethers.Interface(abi);
  const address = "0xF904F50409B3E95f512fBC76A1Fded76f90E26Fb";

  const connectWallet = async () => {
    if (window.ethereum) {
      if (!connected) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const flipContract = new ethers.Contract(
          address,
          abiInterface
        ) as BaseContract as FlipRandom;
        const connectedFlipContract = flipContract.connect(signer);
        setContract(connectedFlipContract);
        const _walletAddress = await signer.getAddress();
        setConnected(true);
        setWalletAddress(_walletAddress);
      }
    }
  };

  const flipCoin = async () => {
    if (contract) {
      const result = await contract.flipCoin();
      console.log(result);
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
        backgroundColor: theme.palette.background.default,
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
        <Card
          sx={{
            padding: "72px",
            placeItems: "center",
          }}
        >
          <Typography>Connected to {walletAddress}</Typography>
          <Button
            variant="contained"
            sx={{ marginTop: "48px" }}
            onClick={flipCoin}
          >
            Flip Coin
          </Button>
        </Card>
      ) : (
        <Button variant="contained" onClick={connectWallet}>
          Connect Wallet
        </Button>
      )}
    </Stack>
  );
};

export default Homepage;
