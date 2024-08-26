import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import axios from "axios";

// npm install @uiw/react-codemirror --save
// npm install codemirror/lang-java
// npm install codemirror/lang-python
// npm install codemirror/lang-html
export const View = () => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  const [doc, setDoc] = useState({});

  useEffect(() => {
    axios({
      method: "GET",
      url: process.env.BACKEND_URL + "/document/read",
      params: { id: params.id },
      headers: { Authorization: "Bearer " + store.token },
    }).then((response) => {
      setDoc(response.data);
    });
  }, []);

  const onChange = React.useCallback((value, viewUpdate) => {
    setDoc({
      ...doc,
      content: value,
    });
  }, []);

  return (
    <>
      <div>
        <CodeMirror
          value={doc.content}
          height="410px"
          theme="dark"
          extensions={[javascript({ jsx: true }), java()]}
          onChange={onChange}
        />
      </div>
    </>
  );
};
