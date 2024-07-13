import React, { useState, useEffect } from "react";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { addUser } from "../API/api";

export default function (props) {
  const [usernameValue, setUserNameValue] = useState(null);
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validation = () => {
    let result = false;
    if (passwordValue === "" || !usernameValue) {
      alert("please enter required fields");
      result = true;
    }
    if (passwordValue !== confirmPassword) {
      alert("password mismatch");
      result = true;
    }
    return result;
  };
  const handleSubmit = async (e) => {
    const userData = {
      username: usernameValue,
      password: passwordValue,
    };
    if (validation() === true) {
      return;
    }
    try {
      const response = await addUser(userData);
      alert(response);
    } catch (error) {
        
      alert(error.response.data);
    }
  };
  return (
    <div className="App container-fluid d-flex justify-content-center align-items-center">
      <Card className="text-center">
        <Card.Header>Registration</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label>User Name</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  onChange={(e) => setUserNameValue(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label>Password</Form.Label>
              <Col>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPasswordValue(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword2"
            >
              <Form.Label>Confirm Password</Form.Label>
              <Col>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Col>
            </Form.Group>
          </Form>
          <Button variant="primary" onClick={handleSubmit}>
            Register
          </Button>
        </Card.Body>
        <Card.Footer className="text-muted">
          <Button variant="Link" onClick={() => props.onclickBack()}>
            click to Login
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
