import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/user/userSlice";
import ErrorMessages from "../errors/Errors";

const LoginForm = () => {
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await dispatch(loginUser(formData)).unwrap();
			setErrors({});
		} catch (error) {
			setErrors(error.details || { global: "Login failed. Please check your credentials." });
		} finally {
			setLoading(false);
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
				<button type="submit" disabled={loading}>
					{loading ? "Logging in..." : "Log in"}
				</button>
			</div>
		</form>
	);
};

export default LoginForm;
