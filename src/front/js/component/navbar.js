import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import "../../styles/home.css";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-light pt">
				<Link to="/"><img src={logo} width={130} height={50} alt="Aya's code editor"/></Link>
				<div className="ml-auto">
					{ store.user ? 
						<>
							<nav class="navbar navbar-expand-lg">
								<ul class="navbar navbar-expand-lg">	
									<li class="nav-item dropdown d-flex align-items-center">
										<a class="nav-link dropdown-toggle text-white" role="button" data-bs-toggle="dropdown" aria-expanded="false">{store.user.email}</a>
										<ul class="dropdown-menu position-absolute">
											<li><a class="dropdown-item"><Link to="/create" style={{ color: '#4d76ba', textDecoration: 'none' }}>New Code</Link></a></li> 	
											<li><a class="dropdown-item"><Link to="/manageAccount" style={{ color: '#4d76ba', textDecoration: 'none' }}>Mange Account</Link></a></li> 	
											<li><a class="dropdown-item"><Link to="/dashboard" style={{ color: '#4d76ba', textDecoration: 'none' }}>Dashboard</Link></a></li> 	
											<li><a class="dropdown-item"><Link to="/" onClick={()=> actions.logout()} style={{ color: '#4d76ba', textDecoration: 'none' }}>Log Out</Link></a></li> 											
										</ul>
									</li>  
								</ul>		
							</nav>																																								
						</>
						:
						<>
						    <nav class="navbar navbar-expand-lg">
								<div class="container-fluid">
									<ul class="navbar navbar-expand-lg">	
										<li class="nav-item d-flex align-items-center" style={{ marginRight: '20px' }}><Link to="/signup" class="text-white" style={{textDecoration: 'none'}}>Sign Up</Link></li>	
									</ul>	
									<ul class="navbar navbar-expand-lg">	
										<li class="nav-item d-flex align-items-center"><Link to="/login" class="text-white" style={{textDecoration: 'none'}}>Log In</Link></li>
									</ul>					
								</div>	
							</nav>																			
						</>
					}
				</div>
	
		</nav>
	);
};