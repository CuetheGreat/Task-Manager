import React from "react";
import TaskInfo from "../components/task/TaskInfo";
import TaskList from "../components/task/TaskList";

const TaskDashBoard = () => {
	return (
		<div>
			<TaskList />
			<TaskInfo />
		</div>
	);
}

export default TaskDashBoard;
