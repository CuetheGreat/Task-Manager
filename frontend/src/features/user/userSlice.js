import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const LOCAL = "http://localhost:4000"

const fetchAPI = async (URL, method, body) => {
	const res = await fetch(URL, {
		method,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	})
	if (!res.ok) {
		throw new Error(`Error: ${res.statusText}`);
	}
	return res.json
}

export const registerUser = createAsyncThunk('user/registerNewUser', async (UserObject) => {
	return await fetchAPI(`${LOCAL}/api/auth/register`, 'POST', UserObject)
})

export const loginUser = createAsyncThunk('user/loginUser', async (UserObject) => {
	return await fetchAPI(`${LOCAL}/api/auth/login`, "POST", UserObject)
})

const userSlice = createSlice({
	name: 'user',
	initialState: {
		username: "",
		email: "",
		error: undefined,
		status: undefined
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.status = "loading"
			})
			.addCase(registerUser.fulfilled, (state) => {
				state.status = "loading"
			})
			.addCase(registerUser.rejected, (state) => {
				state.status = "loading"
			})
			.addCase(loginUser.pending, (state) => {
				state.status = "loading"
			})
			.addCase(loginUser.fulfilled, (state) => {
				state.status = "loading"
			})
			.addCase(loginUser.rejected, (state) => {
				state.status = "loading"
			})
	}
})

export default userSlice.reducer
