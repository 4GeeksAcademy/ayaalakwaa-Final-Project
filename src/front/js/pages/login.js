import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState("");

  const handleLogin = async () => {
    try {
      const result = await actions.login(email, password);
      if (result) {
        navigate("/dashboard");
        setLoginStatus("success");
      } else {
        setLoginStatus("error");
      }
    } catch (error) {
      setLoginStatus("error");
    }
  };

  return (
    <div class="container-fluid">
      <div
        className="vh-100 card align-items-center"
        style={{
          minHeight: "50vh",
          fontFamily: "avenir-light",
          color: "#303131",
          borderBottomColor: "white",
        }}
      >
        {loginStatus === "error" && (
          <div className="bg-white text-center p-5 h-25">
            <h2 className="text-danger" style={{ fontSize: "40px" }}>
              Oops! Incorrect username or password..
            </h2>
            <p className="text-muted" style={{ fontSize: "40px" }}>
              Please try again.
            </p>
          </div>
        )}
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card-body ">
              <h5
                className="card-title"
                style={{
                  fontSize: "50px",
                  margin: "90px 0 60px 0",
                  color: "dark",
                }}
              >
                Login
              </h5>
              <label htmlFor="InputEmail" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email Address"
                style={{ width: "400px", height: "50px" }}
              />
              <label htmlFor="InputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your Password"
                style={{ width: "400px", height: "50px" }}
              />
              <button
                type="button"
                className="btn btn-light mb-3 mt-4"
                onClick={handleLogin}
                style={{
                  backgroundColor: "#4d76ba",
                  color: "white",
                  width: "400px",
                  height: "50px",
                }}
              >
                Login
              </button>
              <Link to="/signup">
                <button
                  type="button"
                  className="btn btn-light"
                  style={{
                    backgroundColor: "#4d76ba",
                    color: "white",
                    width: "400px",
                    height: "50px",
                  }}
                >
                  Not a user yet? Sign up here!
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {loginStatus === "success" && (
        <div className="bg-white text-center p-5 h-25">
          <h2 className="text-success">Welcome to your account.</h2>
          <p className="text-muted">You have successfully logged in.</p>
        </div>
      )}
    </div>
  );
};
