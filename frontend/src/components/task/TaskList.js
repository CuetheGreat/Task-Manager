import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../features/task/taskSlice';
import Task from './Task';

const TaskList = () => {
	const dispatch = useDispatch();
	const tasks = useSelector((state) => state.task.tasks);
	const loading = useSelector((state) => state.task.status === "loading");
	const error = useSelector((state) => state.task.error);

	useEffect(() => {
		dispatch(fetchTasks());
	}, [dispatch]);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<div>
			{tasks.length === 0 ? (
				<p>No Tasks Created Yet</p>
			) : (
				tasks.map((task) => (
					<Task key={task.id} task={task} />
				))
			)}
		</div>
	);
}

export default TaskList;
