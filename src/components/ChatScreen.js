import React, { useRef } from "react";
import styled from "styled-components";
import firebase from "firebase";
import TimeAgo from "timeago-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { useRouter } from "next/router";
import { Avatar, Button, emphasize } from "@mui/material";
import { InsertEmoticonOutlined, Logout, Send } from "@mui/icons-material";
import { useCollection } from "react-firebase-hooks/firestore";
import { useState } from "react";
import Message from "./Message";

const Container = styled.div``;

const Header = styled.div`
  position: sticky;
  background-color: white;
  z-index: 200;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;
  > h3 {
    margin-bottom: -7px;
  }
  > p {
    font-size: 14px;
    color: grey;
  }
`;

const MessageContainer = styled.div`
  padding: 30px;
  background-color: #fff4e0;
  min-height: 90vh;
`;

const HeaderLogout = styled.div``;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
`;

const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  padding: 20px;
  position: sticky;
  background-color: whitesmoke;
  margin-left: 15px;
  margin-right: 15px;
`;

const EndofMessage = styled.div`
  // margin-bottom: 40px;
`;

const ChatScreen = ({ chat, messages }) => {
  const user = useAuthState(auth);
  // console.log("Chat is ", chat);
  const endofMessageRef = useRef(null);

  const recepientEmail = chat.users[1];

  const [recepientSnapshot] = useCollection(
    db.collection("users").where("email", "==", recepientEmail)
  );

  const recepientData = recepientSnapshot?.docs?.[0]?.data();

  console.log("Hello There recep", recepientData);

  const [input, setInput] = useState("");
  const router = useRouter();
  const [messagesSnapShot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );

  const showMessages = () => {
    if (messagesSnapShot) {
      //console.log("Is this? ", messagesSnapShot.docs[0].data());
      return messagesSnapShot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => {
        return (
          <Message key={message.id} user={message.user} message={message} />
        );
      });
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    // Update the Last seen
    //console.log("User Id is ", user[0].uid);
    db.collection("users").doc(user[0].uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    //console.log("Router in User is ", user[0].email);

    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user[0].email,
      photoURL: user[0].photoURL,
    });

    setInput("");
    scrollToButtom();
  };

  const scrollToButtom = () => {
    endofMessageRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <Container
      onKeyDown={(e) => {
        // if (e.key != "enter") {
        //   return;
        // }
        if (e.key != "Enter") {
          return;
        }
        e.preventDefault();

        if (input != "") {
          sendMessage(e);
        }
      }}
    >
      <Header>
        {recepientData ? (
          <Avatar src={recepientData.photoURL} />
        ) : (
          <Avatar>{recepientEmail[0]}</Avatar>
        )}
        <HeaderInformation>
          <h3>{chat.users[1]}</h3>
          {recepientSnapshot && (
            <p>
              Last Active:{" "}
              {recepientData?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recepientData?.lastSeen?.toDate()} />
              ) : (
                "Unavailable"
              )}
            </p>
          )}
        </HeaderInformation>
        {/* <HeaderLogout>
          <Button onClick={() => auth.signOut()}>
            <Logout />
          </Button>
        </HeaderLogout> */}
      </Header>
      <MessageContainer>
        {showMessages()}
        {/* <Message /> */}
        <EndofMessage ref={endofMessageRef} />
      </MessageContainer>
      <InputContainer>
        <InsertEmoticonOutlined />
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <Button hidden disabled={!input} onClick={(e) => sendMessage(e)}>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default ChatScreen;
