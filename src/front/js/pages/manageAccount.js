import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const ManageAccount = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [authStatus, setAuthStatus] = useState("pending");

  useEffect(() => {
    const authentication = async () => {
      let result = await actions.verifyAuthToken();
      if (result) {
        setAuthStatus("granted");
      } else {
        setAuthStatus("denied");
      }
    };
    authentication();
  }, []);

  const handleUpdate = async () => {
    let result = actions.update(email, password);
    if (result) {
      navigate("/");
    } else {
      alert("Unable to update");
    }
  };

  const handleDelete = async () => {
    let result = actions.delete();
    if (result) {
      navigate("/");
    } else {
      alert("Unable to delete");
    }
    setShowModal(false);
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
            <div className="card-body">
              <h5
                className="card-title"
                style={{ fontSize: "60px", margin: "90px 0 60px 0" }}
              >
                Account
              </h5>
              <label htmlFor="InputEmail" className="form-label mr-2">
                Update Email
              </label>
              <div className="input-container d-flex align-items-center mb-2">
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your New Email Address"
                  style={{ width: "400px", height: "50px" }}
                />
              </div>
              <label htmlFor="InputPassword" className="form-label">
                Update Password
              </label>
              <div className="input-container d-flex align-items-center mb-2">
                <input
                  type="password"
                  className="form-control mb-3"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your New Password"
                  style={{ width: "400px", height: "50px" }}
                />
              </div>
              <button
                type="button"
                className="btn btn-light mb-3 mt-4"
                onClick={handleUpdate}
                style={{
                  backgroundColor: "#4d76ba",
                  color: "white",
                  width: "400px",
                  height: "50px",
                }}
              >
                Update my Account
              </button>
              <button
                type="button"
                className="btn btn-light"
                onClick={() => setShowModal(true)}
                style={{
                  backgroundColor: "#ec3360",
                  color: "white",
                  width: "400px",
                  height: "50px",
                }}
              >
                Delete my Account
              </button>

              {showModal && (
                <div
                  className="modal-dialog modal-dialog-centered"
                  style={{
                    maxWidth: "400px",
                    width: "400px",
                    zIndex: "3",
                    position: "absolute",
                    top: "320px",
                  }}
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">
                        Are you sure you want to delete your account?
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowModal(false)}
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowModal(false)}
                      >
                        Go back
                      </button>
                      <button
                        type="button"
                        className="btn"
                        onClick={handleDelete}
                        style={{ backgroundColor: "#ec3360", color: "white" }}
                      >
                        Delete my account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
