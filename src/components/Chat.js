import { Avatar } from "@mui/material";
import React from "react";
import styled from "styled-components";
import getRecepientEmail from "../../utils/getRecepientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  padding: 15px;
  cursor: pointer;
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

const Chat = ({ id, users }) => {
  const user = useAuthState(auth);
  const router = useRouter();
  //const otherUser = getRecepientEmail(users, user);
  const recepientEmail = users[1];

  const recepientSnapshotFromDB = db
    .collection("users")
    .where("email", "==", recepientEmail);

  const recepient = recepientSnapshotFromDB.docs?.[0].data();

  //console.log("****** ", recepientEmail[0]);

  // console.log("User is ", user[0].email);

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  //console.log("Props is ", props);
  return (
    <Container
      onClick={() => {
        enterChat();
      }}
    >
      {recepient ? (
        <UserAvatar src={recepient?.photoURL} />
      ) : (
        <UserAvatar>{recepientEmail[0]}</UserAvatar>
      )}
      <div>{recepientEmail}</div>
    </Container>
  );
};

export default Chat;
