"use client";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

const LoginPage = () => {
  return (
    <div className="login-page">
      LoginPage
      <div className=" login-form-wrapper ">
        <Form>
          <Form.Group className="mb-3" controlId="email">
            <Form.Control type="text" placeholder="Email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
