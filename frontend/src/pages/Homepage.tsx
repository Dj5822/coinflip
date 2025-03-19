import { Button, Stack, Typography, useTheme } from "@mui/material";

const Homepage = () => {
  const theme = useTheme();

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
      <Button variant="contained">Select Wallet</Button>
    </Stack>
  );
};

export default Homepage;
