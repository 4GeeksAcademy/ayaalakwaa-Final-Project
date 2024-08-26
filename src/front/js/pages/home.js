import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import ed from "../../img/editor.png";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
	<>
		<div class="container text-center home-container">
			<div class="text-white text-center p-5">
				<h1>Collaborative Code Editor</h1>
				<p>Collaborative Code Editor (CCE) is a web-based code editor that allows multiple users to share documents.</p>
			</div>  
			<div>
				<button type="button" class="btn btn-custom">
					<Link to="/signup" class="text-white" style={{textDecoration: 'none'}}>Share Now</Link>
				</button>
			</div>

			<div class="p-3">
				<img src={ed} width={600} height={400} alt="Aya's code editor"/>
			</div>
   		</div>
	</>
	);
};
