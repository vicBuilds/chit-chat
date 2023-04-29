import { Avatar } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 15px;
  word-break: break-word;
  &:hover {
    background-color: #ece7e7;
  }
`;

const UserAvatar = styled(Avatar)`
  height: 10px;
  width: 10px;
  margin-right: 10px;
`;

const Chat = ({ id, user }) => {
  //console.log("Props is ", props);
  return (
    <Container>
      <UserAvatar />
      <p>RecepientEmail</p>
    </Container>
  );
};

export default Chat;
