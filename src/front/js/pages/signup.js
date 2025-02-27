import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Signup() {
	const [name, setName] = useState()
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [messageError, setMessageError] = useState()
	const [error, setError] = useState(false)
	const [messageSuccess, setMessageSuccess] = useState()
	const [success, setSuccess] = useState(false)
	const naviagte = useNavigate()

	const postNewUser = async ({ name, email, password }) => {
		try {
			const respose = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					'name': name,
					'email': email,
					'password': password
				})
			})
			const resp = await respose.json()

			if (respose.status !== 201) {
				setError(true)
				setMessageError(resp.Error)
			} else {
				setSuccess(true)
				setMessageSuccess('Usuario creado con exito')
				setTimeout(() => {
					naviagte('/login')
				}, 1000);
			}
		} catch (error) {
			setError(true)
			setMessageError(error)
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		postNewUser({ name, email, password })
	}

	return (
		<div className="d-flex flex-column justify-content-center align-items-center mt-5 form-registre">
			<div className="card p-4 shadow" style={{ width: '400px' }}>
				<h3 className="text-center mb-4">Sign up</h3>
				<form>
					<div className="mb-3">
						<label htmlFor="name" className="form-label">Name</label>
						<input
							type="text"
							className="form-control"
							id="name"
							placeholder="Full name"
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="email" className="form-label">Email</label>
						<input
							type="email"
							required
							className="form-control"
							id="email"
							placeholder="email@example.com"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="password" className="form-label">Password</label>
						<input
							required
							type="password"
							className="form-control"
							id="password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div id="passwordHelpBlock" className="form-text mb-3">
					    Your password must be 8-20 characters long.
					</div>
					<div id="passwordHelpBlock" className="form-text">
						If you already have an account <Link to="/login">Login</Link>.
					</div>
					<div className="d-grid">
						<button type="submit" className="btn btn-primary" onClick={handleSubmit}>Register</button>
					</div>
				</form>
			</div>
			{error && (
				<div className="mt-3 w-50 text-center message-error" role="alert">
					{messageError}
				</div>
			)}
			{success && (
				<div className="mt-3 w-50 text-center message-success" role="alert">
					{messageSuccess}
				</div>
			)}
		</div>
	);
};