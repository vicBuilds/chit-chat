import React from "react";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import moment from "moment/moment";

const Container = styled.div``;

const MessageElement = styled.p`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
`;
const Sender = styled(MessageElement)`
  margin-left: auto;
  background-color: #c1ffcc;
`;

const Receiver = styled(MessageElement)`
  background-color: whitesmoke;
  text-align: left;
`;

const TimeStamp = styled.span`
  color: gray;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`;

const Message = ({ user, message }) => {
  const [userLoggedIn] = useAuthState(auth);
  // console.log("User logged in is ", userLoggedIn.email);
  // console.log("User is ", user);

  const TypeofMessage = user === userLoggedIn.email ? Sender : Receiver;

  //const TypeofMessage = Receiver;
  return (
    <Container>
      <TypeofMessage>
        {message.message}
        <TimeStamp>
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </TimeStamp>
      </TypeofMessage>
    </Container>
  );
};

export default Message;
