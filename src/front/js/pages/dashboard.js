import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

import { Link, useParams } from "react-router-dom";

import axios from "axios";


export const Dashboard = () => {
  const { store, actions } = useContext(Context);
  const [docs, setDocs] = useState([]);
  const [sortOrder, setSortOrder] = useState(-1);

  useEffect(() => {
    axios({
      method: "GET",
      url: process.env.BACKEND_URL + "/api/document/readall",
      params: { uid: store.user.id },
      headers: { Authorization: "Bearer " + store.token },
    }).then((response) => {
      if (response.status !== 204) {
        setDocs(response.data);
      }
    });
  }, []);

  const del = async (id) => {
    axios({
      method: "GET",
      url: process.env.BACKEND_URL + "/api/document/delete",
      params: { id: id },
      headers: { Authorization: "Bearer " + store.token },
    }).then((response) => {
      const updatedDocs = docs.filter((doc) => doc.id !== id);
      setDocs(updatedDocs);
    });
  };

  const sort = () => {
    setSortOrder(sortOrder * -1); // flip sort order
    const sorted = docs.sort((a, b) => {
      return (
        sortOrder *
        (new Date(a["date_modified"]) - new Date(b["date_modified"]))
      );
    });
    setDocs(sorted);
  };

  const docTable = docs.map((doc) => (
    <tr>
      <th scope="row">
        <Link to={"/edit/" + doc.id}>Code {doc.id}</Link>
      </th>
      <td>{doc.title}</td>
      <td>{doc.type}</td>
      <td>{doc.date_created}</td>
      <td>{doc.date_modified}</td>
      <td>
        <div class="btn-group">
          <a class="btn" role="button" onClick={() => del(doc.id)}>
            <i class="bi bi-trash"></i>
          </a>
        </div>
      </td>
    </tr>
  ));

  return (
    <div class="container-fluid bg-white vh-100">
      {store.user ? (
        <>
          <div class="container p-5" style={{ color: "#30353e" }}>
            <h1>Dashboard</h1>
            <div class="d-flex justify-content-end p-3">
              <Link to="/create">
                <button
                  className="btn"
                  style={{
                    backgroundColor: "#4d76ba",
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  New Code
                </button>
              </Link>
            </div>
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">URL</th>
                  <th scope="col">Title</th>
                  <th scope="col">Syntax</th>
                  <th scope="col">Created</th>
                  <th scope="col" onClick={() => sort()}>
                    Modified{" "}
                    {sortOrder === 1 ? (
                      <i class="bi bi-sort-down"></i>
                    ) : (
                      <i class="bi bi-sort-up"></i>
                    )}
                  </th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>{docTable}</tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <p>Authentication failed, please try again</p>
          <ul className="list-group">
            <li>
              <Link to="/login">Log in</Link>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};
