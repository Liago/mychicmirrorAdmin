import React from "react";

const message = (props) => {
	return (
		<div className="p-2">
			<div className="items-center bg-white leading-none text-gray-600 rounded-full p-2 shadow text-teal text-sm">
				<span className={`inline-flex ${props.color} text-white rounded-full h-6 px-3 justify-center items-center shadow`}>{props.label}</span>
				<span className="inline-flex px-2">{props.content}</span>
			</div>
		</div>
	)
}

export default message;