import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../store/appContext";
import { useParams, Link } from "react-router-dom";
import "../../styles/home.css";

import { useCodeMirror } from "@uiw/react-codemirror";
import {javascript} from "@codemirror/lang-javascript"
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { sql } from '@codemirror/lang-sql';

import axios from "axios";

// npm install @uiw/react-codemirror --save
// npm install codemirror/lang-java
// npm install codemirror/lang-python
// npm install codemirror/lang-html
// npm install codemirror/lang-sql



let extensions = [];
const languages = {"Java": java(), "JavaScript": javascript(), "Python": python(), "HTML": html(), "SQL": sql()}

export const Edit = () => {
	const { store, actions } = useContext(Context);
	const params = useParams();	

	const [doc, setDoc] = useState ({
		id: params.id,
		uid: store.user.id,
		type: "JavaScript"
	});

	const [status, setStatus] = useState(false);	
	
	const editor = useRef(null);

	const onChange = (value) => {
		console.log("change");
		setDoc({
			...doc,
			content: value
		})
	};	
	  
	const { setContainer } = useCodeMirror({
		container: editor.current,
		value: doc.content,
		extensions,
		height: "100vh",
		width: "97vw",
		theme: "dark",
		placeholder: "Enter your code here",
		editable: true,
		readOnly: false,
		onChange: onChange
	});
		

    useEffect(() => {
		if (editor.current) {
			setContainer(editor.current);
		}
	  
		axios({
			method: "GET",
			url: process.env.BACKEND_URL + "/api/document/read",
			params: {id: params.id},
			headers: {Authorization: 'Bearer ' + store.token}
		}).then((response) => {
			setDoc(response.data);
			extensions = languages[doc.type];
	  	});		
	}, []);  


	useEffect(() => {
		const interval = setInterval(() => {
		  save(doc);
		}, 1000);
	
		return () => clearInterval(interval);
	  }, [doc]);


	const changeTitle = (event) => {
		setDoc({
			...doc,
			title: event.target.value
		})
	}	  

	const changeType = (event) => {
		setDoc({
			...doc,
			type: event.target.value
		})
		console.log(event.target.value);
		extensions = languages[doc.type];
	}

	const save = async (doc) => {
		setDoc({
			...doc
		})	

		axios({
			method: "PUT",
			url: process.env.BACKEND_URL + "/api/document/update",
			data: JSON.stringify(doc),
			headers: {'Authorization': 'Bearer ' + store.token, 'content-type': 'application/json'},
		}).then((response) => {
			if (response.status === 200)
				setStatus(true);
		}); 	
		extensions = languages[doc.type];
		console.log(doc.type);
		console.log(extensions);

	}			

	return (
		<>
			<div>
				<div class="row" style={{ backgroundColor: "#4d76ba" }}>
					<div class="col-sm-11">
						<div style={{ width: "40vw", border: "1px solid #ccc" }} ref={editor}/>
					</div>

					<div class="col-sm-1" style={{ backgroundColor: "#4d76ba" }}>
						<div class="text-end pt-3"><button class="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i class="bi bi-gear custom-icon text-white"></i></button></div>        
						<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
							<div class="offcanvas-header">
								<h5 class="offcanvas-title" id="offcanvasRightLabel">Settings</h5>
								<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
							</div>

							<div class="offcanvas-body">
								<div class="d-flex justify-content-start">Title</div> 
								<div class="input-group mb-3">
									<input type="text" id="title" value={doc.title} onChange={changeTitle} class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"></input>
								</div>

								<div class="d-flex justify-content-start">Syntax</div> 
								<div class="d-flex justify-content-start">
									<select class="form-select" aria-label="Syntax" id="type" onChange={changeType}>
										<option selected>Syntax</option>
										<option value="C" selected={doc.type==='C'}>C</option>
										<option value="C++" selected={doc.type==='C++'}>C++</option>
										<option value="CSS" selected={doc.type==='CSS'}>CSS</option>
										<option value="Go" selected={doc.type==='Grovy'}>Grovy</option>
										<option value="Grovy" selected={doc.type==='Go'}>Go</option>
										<option value="HTML" selected={doc.type==='HTML'}>HTML</option>
										<option value="Java" selected={doc.type==='Java'}>Java</option>
										<option value="JavaScript" selected={doc.type==='JavaScript'}>JavaScript</option>
										<option value="JSON" selected={doc.type==='JSON'}>JSON</option>
										<option value="Kotlin" selected={doc.type==='Kotlin'}>Kotlin</option>
										<option value="Python" selected={doc.type==='Python'}>Python</option>
										<option value="Ruby" selected={doc.type==='Ruby'}>Ruby</option>
										<option value="SQL" selected={doc.type==='SQL'}>SQL</option>
										<option value="Swift" selected={doc.type==='Swift'}>Swift</option>

									</select>			
								</div>			
							</div>
						</div>		
						<div class="text-end pt-3"><Link to={'/share/'+doc.id}><a class="btn" role="button"><i class="bi bi-share custom-icon text-white"></i></a></Link></div> 	
						<div class="text-end pt-3"><Link to={'/create/'}><a class="btn" role="button"><i class="bi bi-plus-lg custom-icon text-white"></i></a></Link></div> 
					</div>	
				</div>
			</div>
		</>
	);
}
