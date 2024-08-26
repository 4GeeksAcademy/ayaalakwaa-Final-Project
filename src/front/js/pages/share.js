import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";

import { Switch } from "./switch";

export const Share = () => {
	const { store, actions } = useContext(Context);	
	const [email, setEmail] = useState('');
	const [checked, setChecked] = useState(true);

	const params = useParams();
	const id = params.id;
	const host = "https://turbo-umbrella-v66wv4wqqrp5cwvv9-3001.app.github.dev";
	let url = (checked) ? host + "/view/" + id : host + "/edit/" + id;	

    const mail = (email) => {
		window.open('mailto:'+email+'?subject=Share%20my%20code%20document&body='+url);
	}	

	const onChange = (e) => {
		setEmail(e.target.value);
	};	

	return (
		<>
			<div class="card w-50 mx-auto m-3 mb-3">
			<div class="card">
				<div class="card-header text-white" style={{ backgroundColor: '#30353e' }}><h5>Share Code</h5></div>
				<div class="card-body border">
					<form>
						<p>Share this URL</p>
						<input type="text" id="url" name="url" value={url} size="36" readonly></input>
						<button class="btn" id="copy"><i class="far fa-clipboard"></i></button>
						<p>Email this URL</p>
						<input type="text" id="email" placeholder="email" size="36" onChange={onChange}></input>
						<a class="btn" role="button" onClick={() => mail(email)}><i class="bi bi-envelope"></i></a>   
						<p>Permission for share</p>
						<Switch id="toggleSwitch" checked={checked} onChange={setChecked} />
					</form>				
					<Link to={"/edit/"+id}><button className="btn text-white" style={{ backgroundColor: '#30353e' }}>Close</button></Link>	
				</div>
				</div>
			</div>			
		</>
	);
}
