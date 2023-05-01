import React from "react";
import styled from "styled-components";
import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import ChatScreen from "@/components/ChatScreen";
import { db, auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const chat = ({ chat, messages }) => {
  const user = useAuthState(auth);
  const RecepientEmail = chat.users[1];
  console.log("Recepient Mail Id is ", RecepientEmail);

  return (
    <Container>
      <Head>
        <title>Chat with {RecepientEmail}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  );
};

export default chat;

// Context gets you to acess the params and root url

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);
  // Prepare the Message on the server
  const messagesRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  //   Prep the Chats
  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  // console.log("Hello chats", chat);
  // console.log("Hello messages", messages);

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}
