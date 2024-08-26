import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export const Create = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      method: "POST",
      url: process.env.BACKEND_URL + "/api/document/create",
      data: JSON.stringify({ uid: store.user.id, content: "" }),
      headers: {
        Authorization: "Bearer " + store.token,
        "content-type": "application/json",
      },
    }).then((response) => {
      navigate("/edit/" + response.data.id);
    });
  }, []);

  return "";
};
