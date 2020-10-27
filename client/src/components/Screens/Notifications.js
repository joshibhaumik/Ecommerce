import React, { useState, useEffect } from "react";
import { Card, Accordion, Button } from "react-bootstrap";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import { Link } from "react-router-dom";
import { deleteNotification } from "../../actions/userActions";
import { connect } from "react-redux";

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
        <Button onClick={()=> props.delete(props.notification)} variant="danger">
          <i className="fas fa-trash-alt"></i> Delete
        </Button>
      </div>
    </div>
  );
};

const Notifications = props => {
  const [data, setData] = useState(props.user.notifications);

  useEffect(() => {
    document.title = "Notifications";
  }, []);

  const DeleteNotification = notification => {
    if (window.confirm("Do you want to delete this notification?")) {
      props.deleteNotification(notification);
      setData(data.filter(e => e._id !== notification._id))
    }
  };

  return data.length ? (
    data.map(notification => (
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Toggle notification={notification} delete={DeleteNotification} eventKey="1">
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
                        {notification.userFromDisplayName}
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
                    <td>{notification.userFromEmail}</td>
                  </tr>
                  <tr>
                    <td>User's Message</td>
                    <td>{notification.message === "" ? "No Message." : notification.message}</td>
                  </tr>
                </tbody>
              </table>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    ))
  ) : (
    <p style={{fontSize:25}} className="text-center mt-5 text-muted">
      You don't have any notifications so far.
    </p>
  );
};

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(mapStateToProps, { deleteNotification })(Notifications);
