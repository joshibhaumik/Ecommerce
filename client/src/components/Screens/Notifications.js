import React, { useState, useEffect } from "react";
import { Card, Accordion, Button } from "react-bootstrap";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import { Link } from "react-router-dom";

const Toggle = props => {
  const theme = useAccordionToggle(props.eventKey);
  return (
    <div>
      <div className="float-left">
        <Button style={{ color: "#0275d8" }} variant="" onClick={theme}>
          {props.children}
        </Button>
      </div>
      <div className="float-right">
        <Button onClick={props.delete} variant="danger">
          <i className="fas fa-trash-alt"></i> Delete
        </Button>
      </div>
    </div>
  );
};

const Notifications = props => {
  const [data, setData] = useState([
    {
      user: "user",
      item: "item",
      store: "store",
      itemName: "Lorem",
      email: "testEmail@exampletestemail.test",
      displayName: "Lorem"
    }
  ]);

  useEffect(() => (document.title = "Notifications"), []);

  const deleteNotification = () => {
    if (window.confirm("Do you want to delete this notification?")) {
      //   proceed to delete the notifications
    }
  };

  return data.length ? (
    data.map(notification => (
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Toggle delete={deleteNotification} eventKey="1">
              View Details
            </Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <td>User</td>
                    <td>
                      <Link to={"/user/" + notification.user}>
                        {notification.displayName}
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>Item</td>
                    <td>
                      <Link to={"/item/" + notification.item}>
                        {notification.itemName}
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>User's Email</td>
                    <td>{notification.email}</td>
                  </tr>
                </tbody>
              </table>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    ))
  ) : (
    <p className="text-center mt-5 text-muted">
      You don't have any notifications so far.
    </p>
  );
};

export default Notifications;
