import React from "react";
import { Link, useNavigate } from "react-router-dom";



export const Navbar = () => {
	const navigate = useNavigate()
	const token = localStorage.getItem('token')

	const handleClick = () => {
		localStorage.removeItem('token')
		navigate('/')
	}

	return (
		<nav className="navbar">
			<div className="container">
				<div className="home-container">
				<Link to="/">
					<span className="navbar-brand">Home</span>
				</Link>
				</div>
				
				<div className="ml-auto">
					{token
					? <div>
						<Link to="/private">
							<button className="btn btn-primary">Go private</button>
				  	  	</Link>
						<button className="btn btn-danger" onClick={handleClick}>Logout</button>
					  </div>
					:   <div className="container-fluid">
					
					<div className="navbar-buttons">
					  <Link to="/login">
					  <button className="btn login-btn btn-info">Login</button>

					  </Link>
					  <Link to="/signup">
					  <button className="btn signup-btn btn-primary">Signup</button>
					  </Link>
					</div>
				  </div>}
				</div>
			</div>
		</nav>
	);
};