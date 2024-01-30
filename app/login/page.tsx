"use client";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);
  const router = useRouter();

  const supabase = createClientComponentClient();

  const handleSignUp = async () => {
    console.log();
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.push("/");
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({ email, password });
    router.push("/");
  };

  return (
    <div className="login-page">
      <div className=" login-form-wrapper ">
        <Form>
          <Form.Group className="mb-3" controlId="email">
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              value={email}
              placeholder="Email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
        </Form>
        <Button variant="primary" onClick={handleSignUp} type="submit">
          sign Up
        </Button>
        <Button variant="primary" onClick={handleSignIn} type="submit">
          Sign in
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
