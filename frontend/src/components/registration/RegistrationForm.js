import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../features/user/userSlice";
import ErrorMessages from "../errors/Errors";

const RegistrationForm = () => {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleInputChange = (name, value) => {
		setFormData({
			...formData, [name]: value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
			setErrors({ global: "All fields are required" });
			return;
		}

		if (formData.password !== formData.confirmPassword) {
			setErrors({ confirmPassword: "Passwords do not match" });
			return;
		}

		setLoading(true);
		setErrors({});
		try {
			await dispatch(registerUser(formData)).unwrap();
			navigate("/dashboard");
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
					value={formData.email}
					onChange={({ target }) => { handleInputChange(target.name, target.value) }}
					aria-describedby="emailError"
				/>
			</div>

			<div>
				<label htmlFor="username">Username:</label><br />
				<input
					type="text"
					id="username"
					name="username"
					value={formData.username}
					onChange={({ target }) => {
						handleInputChange(target.name, target.value)
					}}
					aria-describedby="usernameError"
				/>
			</div>

			<div>
				<label htmlFor="password">Password:</label><br />
				<input
					type="password"
					id="password"
					name="password"
					value={formData.password}
					onChange={({ target }) => {
						handleInputChange(target.name, target.value)
					}}
					aria-describedby="passwordError"
				/>
			</div>

			<div>
				<label htmlFor="confirmPassword">Confirm Password:</label><br />
				<input
					type="password"
					id="confirmPassword"
					name="confirmPassword"
					value={formData.confirmPassword}
					onChange={({ target }) => {
						handleInputChange(target.name, target.value)
					}}
					aria-describedby="confirmPasswordError"
				/>
			</div>

			<div>
				<button type="submit" disabled={loading}>
					{loading ? "Registering" : "Register"}
				</button>
			</div>
		</form>
	);
};

export default RegistrationForm;
