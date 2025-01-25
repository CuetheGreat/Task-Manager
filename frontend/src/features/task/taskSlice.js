import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAPI } from "../helpers/helper";
const Local = "http://localhost:4000";

export const fetchTasks = createAsyncThunk('task/fetchTasks', async () => {
	return await fetchAPI(`${Local}/api/tasks`, 'GET');
});

export const fetchTasksById = createAsyncThunk('task/fetchTasksById', async (task) => {
	return await fetchAPI(`${Local}/api/tasks/${task.id}`, 'GET');
});

export const createTask = createAsyncThunk('task/createTask', async (task) => {
	return await fetchAPI(`${Local}/api/tasks`, 'POST', task);
});

export const updateTask = createAsyncThunk('task/updateTask', async (task) => {
	return await fetchAPI(`${Local}/api/tasks/${task.id}`, 'PUT', task);
});

export const deleteTask = createAsyncThunk('task/deleteTask', async (task) => {
	return await fetchAPI(`${Local}/api/tasks/${task.id}`, 'DELETE');
});

const taskSlice = createSlice({
	name: 'task',
	initialState: {
		tasks: [],
		error: undefined,
		status: undefined
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTasks.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.tasks = action.payload;
			})
			.addCase(fetchTasks.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(createTask.pending, (state) => {
				state.status = "loading";
			})
			.addCase(createTask.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.tasks.push(action.payload); // Add the new task to the existing tasks
			})
			.addCase(createTask.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(updateTask.pending, (state) => {
				state.status = "loading";
			})
			.addCase(updateTask.fulfilled, (state, action) => {
				state.status = "succeeded";
				const index = state.tasks.findIndex(task => task.id === action.payload.id);
				if (index !== -1) {
					state.tasks[index] = action.payload;
				}
			})
			.addCase(updateTask.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(deleteTask.pending, (state) => {
				state.status = "loading";
			})
			.addCase(deleteTask.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
			})
			.addCase(deleteTask.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	}
});

export default taskSlice.reducer;
