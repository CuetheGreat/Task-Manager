import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		username: "",
		email: "",
		error: undefined,
		status: undefined
	},
	reducers: {

	},
	extraReducers: {
		[registerUser.pending]: (state) => {
			state.status = "loading"
		},
		[registerUser.fulfilled]: (state) => {
			state.status = "success"
		},
		[registerUser.rejected]: (state) => {
			state.status = "failed"
		},
		[loginUser.pending]: (state) => {
			state.status = "loading"
		},
		[loginUser.fulfilled]: (state) => {
			state.status = "success"
		},
		[loginUser.rejected]: (state) => {
			state.status = "failed"
		},
	}
})

export const { } = userSlice.actions

export default userSlice.reducer

const registerUser = createAsyncThunk('user/registerNewUser', async (UserObject) => {
	const data = await fetch('/api/auth/register', {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: UserObject
	})
	return data.json()
})

const loginUser = createAsyncThunk('user/loginUser', async (UserObject) => {
	const data = await fetch('/api/auth/register', {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: UserObject
	})
	return data.json()
})
