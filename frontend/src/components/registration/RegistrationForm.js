import React, { useState } from "react";
import { useDispatch } from "react-redux";
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

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (formData.paswsword !== formData.confirmPassword) {
			setErrors({ confirmPassword: "Passwords do not match" });
			return;
		}

		setLoading(true);
		try {
			await dispatch(registerUser(formData)).unwrap();
			setErrors({});
			setFormData({ username: "", email: "", password: "", confirmPassword: "" });
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
					onChange={handleInputChange}
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
					onChange={handleInputChange}
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
					onChange={handleInputChange}
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
					onChange={handleInputChange}
					aria-describedby="confirmPasswordError"
				/>
				{errors.confirmPassword && (
					<p id="confirmPasswordError" style={{ color: "red" }}>
						{errors.confirmPassword}
					</p>
				)}
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
