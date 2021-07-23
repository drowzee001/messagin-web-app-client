import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, ListGroup, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { sendMessage, getMessages } from "../redux/actions/messagesAction";
const Messages = () => {
  var otherUserName = "";
  const [message, setMessage] = useState("");

  const { conversation_id, receiver_id } = useParams();

  const authSelect = (state) => state.auth;
  const auth = useSelector(authSelect);

  const messagesSelect = (state) => state.messages;
  const messagesState = useSelector(messagesSelect);
  const messages = messagesState.messages;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMessages(conversation_id));
    // eslint-disable-next-line
  }, []);

  const sendClick = (event) => {
    event.preventDefault();
    dispatch(sendMessage(receiver_id, message));
    setMessage("");
  };

  if (!messagesState.loading) {
    if (messages[0].receiver_id === auth.user.id) {
      otherUserName = messages[0].sender_name;
    } else {
      otherUserName = messages[0].receiver_name;
    }

    return (
      <div>
        <ListGroup id="messages">
        <h1>{otherUserName}</h1>
          {messages.map((message) => {
            const date = new Date(message.date).toLocaleString();
            if (message.sender_id === auth.user.id) {
              return (
                <ListGroup.Item id="sender" key={message._id}>
                  <div className="message">You: {message.text}</div>
                  <div className="date">{date}</div>
                </ListGroup.Item>
              );
            } else {
              return (
                <ListGroup.Item id="receiver" key={message._id}>
                  <div className="message">
                    {message.sender_name}: {message.text}
                  </div>
                  <div className="date">{date}</div>
                </ListGroup.Item>
              );
            }
          })}
        </ListGroup>
        <Form onSubmit={(event) => sendClick(event)} id="messagesForm">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Message"
              maxLength={150}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <Button type="Submit" className="send">
              Send
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  } else return null;
};

export default Messages;
