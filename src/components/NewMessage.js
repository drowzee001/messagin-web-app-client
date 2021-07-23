import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../redux/actions/messagesAction";
import { useHistory } from "react-router-dom";

const NewMessage = () => {
  const [receiverEmail, setReceiverEmail] = useState("");
  const [message, setMessage] = useState("");
  const [msg, setMsg] = useState("");

  const selectMessages = (state) => state.messages;
  const messagesState = useSelector(selectMessages);

  const selectError = (state) => state.error;
  const error = useSelector(selectError);

  const history = useHistory();

  useEffect(() => {
    if (error.id === "MESSAGE_FAIL") {
      setMsg(error.msg);
    } else {
      setMsg(null);
    }
  }, [error]);

  useEffect(() => {
    if (messagesState.success) {
      messagesState.success = false;
      history.push("/home");
    }
    // eslint-disable-next-line
  }, [messagesState.success]);

  const dispatch = useDispatch();

  //Save message to server after retrieving receiver's user data using the inputted email
  const sendMessage = (event) => {
    event.preventDefault();
    dispatch(addMessage(receiverEmail, message));
  };

  return (
    <Form onSubmit={(event) => sendMessage(event)} id="newMessage">
      <h1>New Message</h1>
      <Form.Control
        className="newMessageReceiver"
        type="email"
        placeholder="Recipient Email"
        onChange={(event) => setReceiverEmail(event.target.value)}
      />
      <Form.Group id="newMessageGroup">
        <Form.Control
          as="textarea"
          id="newMessageText"
          placeholder="Message"
          maxLength={150}
          onChange={(event) => setMessage(event.target.value)}
        />
        <Button type="Submit" className="send">
          Send
        </Button>
        <div className="alert">{msg}</div>
      </Form.Group>
    </Form>
  );
};

export default NewMessage;
