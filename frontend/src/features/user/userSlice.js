import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAPI } from "../helpers/helper";

const LOCAL = "http://localhost:4000"

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
			.addCase(registerUser.fulfilled, (state, action) => {
				state.status = "success"
				state = action.payload
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.status = "failed"
				state.error = action.error.message
			})
			.addCase(loginUser.pending, (state) => {
				state.status = "loading"
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = "success"
				state = action.payload
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = "failed"
				state.error = action.error.message
			})
	}
})

export default userSlice.reducer
