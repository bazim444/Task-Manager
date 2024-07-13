import React, { useState, useEffect } from "react";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import Registration from "./Registration";
import { useNavigate } from "react-router-dom";
import { login } from "../API/api";
export default function Users(props) {
  const [newUser, setNewUser] = useState(false);
  const [usernameValue, setUserNameValue] = useState(null);
  const [passwordValue, setPasswordValue] = useState("");
  const navigate = useNavigate();
  const handleNewUserClick = () => {
    setNewUser(true);
  };
  const handleLogin = () => {
    navigate("/Task");
  };
  const validation = () => {
    let result = false;
    if (passwordValue === "" || !usernameValue) {
      alert("please enter required fields");
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
      const response = await login(userData);
      console.log(response)
      if (response==1) {
        handleLogin();
      } else {
        alert("invalid user");
      }
    } catch (error) {
      console.log(error)
      alert("Username and Password Not Matching");
    }
  };
  return (
    <>
      {newUser ? (
        <Registration onclickBack={() => setNewUser(false)} />
      ) : (
        <div className="App container-fluid d-flex justify-content-center align-items-center">
          <Card className="text-center">
            <Card.Header>Login</Card.Header>
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
              </Form>
              <div>
                <Button variant="primary" onClick={handleSubmit}>
                  Log in
                </Button>
              </div>
              <div>
                <Button
                  className=""
                  variant="secondary"
                  onClick={handleNewUserClick}
                >
                  New User
                </Button>
              </div>
            </Card.Body>
            <Card.Footer className="text-muted"></Card.Footer>
          </Card>
        </div>
      )}
    </>
  );
}
