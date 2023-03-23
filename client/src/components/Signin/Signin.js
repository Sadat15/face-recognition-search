import * as React from "react";
import "./Signin.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

function Signin({ setCurrentUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const [_, setCookies] = useCookies(["access_token"]); // eslint-disable-line

  const navigate = useNavigate();

  async function handleSignin() {
    try {
      const response = await axios.post(
        "https://still-brushlands-05308.herokuapp.com/signin",
        {
          email,
          password,
        }
      );
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userId", response.data.userId);
      navigate("/");
      setCurrentUser(response.data.info);
      setOpenAlert(false);
    } catch (error) {
      setOpenAlert(true);
      console.error(error.message);
    }
  }

  return (
    <>
      <article className="mw6-ns hidden ba mv5 shadow-5 br2 center">
        <main className="pa4 black-80">
          <div className="measure tc">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
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
                value="Sign in"
                onClick={handleSignin}
              />
            </div>
            <div className="lh-copy mt3">
              <Link className="f6 link dim black db" to="/register">
                Register
              </Link>
            </div>
          </div>
        </main>
      </article>

      {openAlert && (
        <Alert severity="error" sx={{ width: "20%" }}>
          Incorrect password or username, please try again.
        </Alert>
      )}
    </>
  );
}

export default Signin;
