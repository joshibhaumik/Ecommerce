import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  Label,
  Input,
  FormGroup,
  Row,
  Col,
  Container,
  Button
} from "reactstrap";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      fname: "",
      lname: ""
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <Container style={{ marginTop: "75px" }}>
        <Row>
          <Col sm={{ size: 5, offset: 4 }}>
            <Card
              inverse
              style={{ backgroundColor: "#333", borderColor: "#333" }}
            >
              <CardBody>
                <CardTitle style={{ fontSize: 30 }}>Register</CardTitle>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup>
                    <Label for="fname">First Name</Label>
                    <Input
                      type="text"
                      name="fname"
                      id="fname"
                      value={this.state.fname}
                      onChange={this.handleChange.bind(this)}
                      placeholder="Enter Your First Name"
                    />
                  </FormGroup>
                <FormGroup>
                    <Label for="lname">Last Name</Label>
                    <Input
                      type="text"
                      name="lname"
                      id="lname"
                      value={this.state.lname}
                      onChange={this.handleChange.bind(this)}
                      placeholder="Enter Your Last Name"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      value={this.state.email}
                      onChange={this.handleChange.bind(this)}
                      placeholder="Enter Your Email"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      value={this.state.password}
                      onChange={this.handleChange.bind(this)}
                      placeholder="Enter Your Password"
                    />
                  </FormGroup>
                  <Button
                    color="primary"
                    onClick={this.handleSubmit.bind(this)}
                  >
                    Create Account
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Register;
