import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../features/user/userSlice";
import ErrorMessages from "../errors/Errors";

const RegistrationForm = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const dispatch = useDispatch();

	const handleInputChange = (e, field) => {
		const { value } = e.target;

		if (field === "email") setEmail(value);
		if (field === "username") setUsername(value);
		if (field === "password") setPassword(value);
		if (field === "confirmPassword") setConfirmPassword(value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setErrors({ confirmPassword: "Passwords do not match" });
			return;
		}

		try {
			await dispatch(registerUser({ email, username, password })).unwrap();
			setErrors({});
		} catch (error) {
			if (error.details) {
				setErrors(error.details);
			} else {
				setErrors({ global: "Registration failed. Please try again." });
			}
		}
	};

	return (
		<form onSubmit={handleSubmit}>

			<ErrorMessages errors={errors} />

			<div>
				<label htmlFor="email">Email:</label><br />
				<input
					type="text"
					id="email"
					name="email"
					value={email}
					onChange={(e) => handleInputChange(e, "email")}
					aria-describedby="emailError"
				/>
			</div>

			<div>
				<label htmlFor="username">Username:</label><br />
				<input
					type="text"
					id="username"
					name="username"
					value={username}
					onChange={(e) => handleInputChange(e, "username")}
					aria-describedby="usernameError"
				/>
			</div>

			<div>
				<label htmlFor="password">Password:</label><br />
				<input
					type="password"
					id="password"
					name="password"
					value={password}
					onChange={(e) => handleInputChange(e, "password")}
					aria-describedby="passwordError"
				/>
			</div>

			<div>
				<label htmlFor="confirmPassword">Confirm Password:</label><br />
				<input
					type="password"
					id="confirmPassword"
					name="confirmPassword"
					value={confirmPassword}
					onChange={(e) => handleInputChange(e, "confirmPassword")}
					aria-describedby="confirmPasswordError"
				/>
				{errors.confirmPassword && (
					<p id="confirmPasswordError" style={{ color: "red" }}>
						{errors.confirmPassword}
					</p>
				)}
			</div>

			<div>
				<button type="submit">Register</button>
			</div>
		</form>
	);
};

export default RegistrationForm;
