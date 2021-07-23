import React, { useEffect } from "react";
// import { Form, ListGroup } from "react-bootstrap";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../redux/actions/conversationsAction";
// import { returnErrors } from "../redux/actions/errorAction";
import { Card, ListGroup } from "react-bootstrap";

const Home = () => {
  var selectConversations = (state) => state.conversations;
  var conversationsState = useSelector(selectConversations);
  var conversations = conversationsState.conversations;

  // const selectError = (state) => state.error;
  // const error = useSelector(selectError);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConversations());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ConversationCards = () => {
    const listItems = conversations.map((conversation) => {
      return (
        <ListGroup.Item
          action
          onClick={() => {
            history.push(
              `/messages/${conversation.conversation_id}/${conversation.otherUser._id}`
            );
          }}
          key={conversation.conversation_id}
        >
          {conversation.otherUser.name}
        </ListGroup.Item>
      );
    });

    return (
      <Card id="conversations">
        <Card.Header>Recent Conversations</Card.Header>
        <ListGroup>{listItems}</ListGroup>
      </Card>
    );
  };

  if (!conversationsState.loading)
    return (
      <>
        {conversations.length > 0 ? (
          <ConversationCards></ConversationCards>
        ) : (
          <div>No Conversations</div>
        )}
        <Fab
          id="addMessage"
          size="medium"
          color="secondary"
          aria-label="add"
          component={Link}
          to="/newMessage"
        >
          <AddIcon />
        </Fab>
      </>
    );
  else return null;
};

export default Home;
