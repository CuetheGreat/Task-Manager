import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import userReducer from "../../features/user/userSlice";
import LoginForm from "./LoginForm";

describe('Testing Login Component', () => {
	beforeEach(() => {
		const store = configureStore({ reducer: { user: userReducer } });

		render(
			<Provider store={store}>
				<LoginForm />
			</Provider>
		);

	})

	describe("Rendering Tests", () => {
		it("renders and submits LoginForm", () => {


			// Check initial rendering
			expect(screen.getByLabelText("Email:")).toBeInTheDocument();
			expect(screen.getByLabelText("Password:")).toBeInTheDocument();
			expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
		});
	})


})
