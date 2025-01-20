import React from "react";

const ErrorMessages = ({ errors }) => (
	<div>
		{Object.entries(errors).map(([field, message]) => (
			<p key={field} style={{ color: "red" }}>
				{message}
			</p>
		))}
	</div>
);

export default ErrorMessages;
