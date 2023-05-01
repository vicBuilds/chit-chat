import React from "react";
import styled from "styled-components";
import Head from "next/head";
import Image from "next/image";

const Container = styled.div`
  display: flex;
`;
const Intro = styled.div`
  flex: 1;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  /* filter: blur(1px);
  -webkit-filter: blur(1px); */
  background-position: center;
  background-size: cover;
`;
import Sidebar from "./Sidebar";

const IntroPage = () => {
  return (
    <Container>
      <Head>
        <title>Chit-Chat</title>
      </Head>
      <Sidebar />
      <Intro>
        <img
          src="/theme.png"
          style={{ width: "100%", height: "100%", opacity: "0.8" }}
        />
      </Intro>
    </Container>
  );
};

export default IntroPage;
