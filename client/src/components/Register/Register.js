import { useState } from "react";

import { Link } from "react-router-dom";
import axios from "axios";

import { Alert } from "@mui/material";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successAlert, setSuccessAlert] = useState(false);
  const [emailExistsAlert, setEmailExistsAlert] = useState(false);
  const [emailInvalidAlert, setEmailInvalidAlert] = useState(false);

  async function handleRegister() {
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) === false) {
      setEmailInvalidAlert(true);
      throw new Error("Invalid email address");
    }

    try {
      await axios.post("http://localhost:8080/register", {
        name,
        email,
        password,
      });
      setSuccessAlert(true);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setEmailExistsAlert(true);
      console.log(error.message);
    }
  }

  return (
    <>
      <article className="mw6-ns hidden ba mv5 shadow-5 br2 center">
        <main className="pa4 black-80">
          <div className="measure tc">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
                onClick={handleRegister}
              />
            </div>
            <div className="lh-copy mt3">
              <Link className="f6 link dim black db" to="/signin">
                Sign in
              </Link>
            </div>
          </div>
        </main>
      </article>
      {emailExistsAlert && (
        <Alert severity="error" sx={{ width: "20%" }}>
          {
            "The email address you specified is already in use. (Do you already have an account?)"
          }
        </Alert>
      )}
      {emailInvalidAlert && (
        <Alert severity="error" sx={{ width: "20%" }}>
          {"Invalid email address. Please enter a valid email address"}
        </Alert>
      )}
      {successAlert && (
        <Alert severity="success" sx={{ width: "20%" }}>
          {
            "Your account was successfully registered. Please go to the Sign In page"
          }
        </Alert>
      )}
    </>
  );
}

export default Register;
