import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/user/userSlice";
import ErrorMessages from "../errors/Errors";

const LoginForm = () => {
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await dispatch(loginUser({ email, password })).unwrap();
			setErrors({});
		} catch (error) {
			if (error.details) {
				setErrors(error.details);
			} else {
				setErrors({ global: "Login failed. Please check your credentials." });
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (errors.email && email) {
			setErrors((prevErrors) => ({ ...prevErrors, email: undefined }));
		}
		if (errors.password && password) {
			setErrors((prevErrors) => ({ ...prevErrors, password: undefined }));
		}
	}, [email, password]);

	return (
		<form onSubmit={handleSubmit}>
			{errors.global && <p style={{ color: "red" }}>{errors.global}</p>}

			<ErrorMessages errors={errors} />

			<div>
				<label htmlFor="email">Email:</label><br />
				<input
					type="text"
					id="email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					aria-describedby="emailError"
				/>
			</div>

			<div>
				<label htmlFor="password">Password:</label><br />
				<input
					type="password"
					id="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					aria-describedby="passwordError"
				/>
			</div>

			<div>
				<button type="submit" disabled={loading}>
					{loading ? "Logging in..." : "Log in"}
				</button>
			</div>
		</form>
	);
};

export default LoginForm;
