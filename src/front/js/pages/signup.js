import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    let result = await actions.signup(email, password);
    if (result) {
      navigate("/login");
    } else {
      setError("Error occurred, while signing you up");
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
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card-body ">
              <h5
                className="card-title"
                style={{ fontSize: "50px", margin: "90px 0 60px 0" }}
              >
                Sign up
              </h5>
              <label for="InputEmail" className="form-label">
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
              <label for="InputEmail" className="form-label">
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
                onClick={handleSignup}
                style={{
                  backgroundColor: "#4d76ba",
                  color: "white",
                  width: "400px",
                  height: "50px",
                }}
              >
                Sign up
              </button>
              <Link to="/login">
                <button
                  type="button"
                  className="btn btn-light "
                  style={{
                    backgroundColor: "#4d76ba",
                    color: "white",
                    width: "400px",
                    height: "50px",
                  }}
                >
                  Do you already have an account? Login here!
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
