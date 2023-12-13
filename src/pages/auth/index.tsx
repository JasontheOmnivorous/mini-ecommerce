import { Box, Button, Typography } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";

const AuthPage = () => {
  const { data: session } = useSession(); // change data property's name to session

  if (session) {
    return (
      <Box>
        <Typography sx={{ m: 2 }}>
          Signed in as {session.user?.email}
        </Typography>
        <Button variant="contained" onClick={() => signOut()}>
          Sign out
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography sx={{ m: 2 }}>Not signed in.</Typography>
      <Button variant="contained" onClick={() => signIn()}>
        Sign in
      </Button>
    </Box>
  );
};

export default AuthPage;
