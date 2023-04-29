import { Google } from "@mui/icons-material";
import { Button } from "@mui/material";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import { auth, provider } from "../../firebase";

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

const Logo = styled.img`
  height: 70px;
  width: 70px;
  margin-bottom: 18px;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 100px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0px 4px 15px -3px rgba(0, 0, 0, 0.7);
`;

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <LogoContainer>
        <Logo src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1022px-WhatsApp.svg.png" />
        <Button variant="outlined" onClick={signIn}>
          Sign In With &nbsp;
          <Google />
          oogle
        </Button>
      </LogoContainer>
    </Container>
  );
};

export default Login;
