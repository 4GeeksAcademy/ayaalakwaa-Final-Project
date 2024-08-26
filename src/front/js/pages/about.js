import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

import { Link } from "react-router-dom";

export const About = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center">
      <div class="container-fluid bg-success text-white text-center p-3">
        <h1>About Collaborative Code Editor</h1>
      </div>

      <div class="container">
        <div class="card">
          <div class="card-header bg-danger">
            <button type="button" class="btn btn-success">
              Project Overview
            </button>
          </div>
          <div class="card-body border">
            <h5 class="card-title">Project overview ......</h5>
            <div class="mt-3">
              <h3 class="card-title btn btn-outline-dark">
                Syntax highlighting, Code completion, Version control
              </h3>
            </div>
          </div>
          <div class="card-body border">
            <h5 class="card-title">Development Team</h5>
            <div class="mt-3">
              <h3 class="card-title btn btn-outline-dark">Aya</h3>
            </div>
          </div>
          <div class="card-body border">
            <h5 class="card-title">Technologies Used</h5>
            <div class="mt-3">
              <h3 class="card-title btn btn-outline-dark">
                React, node.js, SQLite
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
