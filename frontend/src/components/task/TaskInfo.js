import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksById } from "../../features/task/taskSlice";

const TaskInfo = ({ id }) => {
	const dispatch = useDispatch();
	const task = useSelector((state) => state.tasks.tasks.find((task) => task.id === id));

	useEffect(() => {
		dispatch(fetchTasksById(id));
	}, [dispatch, id]);

	if (!task) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<h1>{task.title}</h1>
			<p>{task.description}</p>
		</div>
	);
}

export default TaskInfo;
