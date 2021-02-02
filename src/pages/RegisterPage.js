/*eslint-disable no-unused-vars*/
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import '../styles/RegisterPage.css';
/*eslint-enable no-unused-vars*/

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(false);
  const usernameRef = useRef();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const bodyObject = {
      username: username,
      email: email,
      password: password,
    };
    const formBody = Object.keys(bodyObject)
      .map(
        (key) =>
          encodeURIComponent(key) + '=' + encodeURIComponent(bodyObject[key])
      )
      .join('&');

    let response = await fetch('/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'appliction/json',
      },
      redirect: 'follow',
      body: formBody,
    });

    console.log(response.status);
    if (response.status === 200) {
      setRegistered(true);
    }
  };

  if (registered) {
    return <Redirect to="/login"></Redirect>;
  } else {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-4 p-2 m-5">
            <Form
              onSubmit={handleSubmit}
              className="border p-5 shadow rounded bg-light register-form"
            >
              <h4 className="mb-4 text-center">Sign Up</h4>
              <Form.Group controlId="register-form-username-group">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  ref={usernameRef}
                  onChange={(evt) => setUsername(evt.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="register-form-email-group">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={(evt) => setEmail(evt.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="register-form-pwd-group">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(evt) => setPassword(evt.target.value)}
                />
              </Form.Group>

              <p className="p-4 text-center">
                Already have an account?
                <Link to="/login">Sign In</Link>
              </p>

              <Button
                type="submit"
                className="btn btn-secondary my-4 btn-block"
              >
                Sign Up
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
};

export default RegisterPage;
