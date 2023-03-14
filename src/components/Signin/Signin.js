import "./Signin.css";
import { Link } from "react-router-dom";

function Signin() {
  const handleSignin = (event) => {
    // event.preventDefault();
  };

  return (
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
              />
            </div>
          </fieldset>
          <div className="">
            <Link to="/dashboard">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                onClick={handleSignin}
              />
            </Link>
          </div>
          <div className="lh-copy mt3">
            <Link className="f6 link dim black db" to="/register">
              Register
            </Link>
          </div>
        </div>
      </main>
    </article>
  );
}

export default Signin;
