import { Avatar, Button, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatIcon from "@mui/icons-material/Chat";
import React from "react";
import styled from "styled-components";
import * as EmailValidator from "email-validator";
import { SearchOutlined } from "@mui/icons-material";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

const Container = styled.div`
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;

const LogoutIcon = styled(PowerSettingsNewIcon)`
  &:hover {
    color: red;
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: white;
`;
const SearchInput = styled.input`
  border: none;
  outline-width: 0;
  flex: 1;
`;

const SidebarButton = styled(Button)`
  width: 100%;
  background-color: white;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

const Sidebar = () => {
  const [user] = useAuthState(auth);
  console.log("Hello photo url", typeof user.photoURL);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatSnapshot] = useCollection(userChatRef);

  const createAChat = () => {
    const input = prompt("Enter the email Id you want to chat with");
    if (!input) return null;
    if (
      EmailValidator.validate(input) &&
      input != user.email &&
      !chatAlreadyExists(input)
    ) {
      //console.log("Do Chat Exists?", chatAlreadyExists(input));
      // // We need to add the chat to the DB 'chats' collection
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail) => {
    return !!chatSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );
  };

  return (
    <Container>
      <Header>
        <UserAvatar src={user.photoURL} />
        <IconsContainer>
          <IconButton>
            {/* <ChatIcon /> */}
            <LogoutIcon
              onClick={() => {
                auth.signOut();
              }}
            />
          </IconButton>
        </IconsContainer>
      </Header>
      <Search>
        <SearchOutlined />
        <SearchInput placeholder="Search in chats" />
      </Search>
      <SidebarButton onClick={createAChat}>START A NEW CHAT</SidebarButton>
      {chatSnapshot?.docs.map((chat) => {
        return <Chat key={chat.id} id={chat.id} users={chat.data().users} />;
      })}
    </Container>
  );
};

export default Sidebar;
