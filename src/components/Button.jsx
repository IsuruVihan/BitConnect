import React from "react";

const Button = ({onClick, label, color='indigo', fontColor= 'white', width}) => {
	return (
		<button
			type="button"
			className={`w-${width} px-3 py-2 mt-8 text-sm font-semibold text-${fontColor} bg-${color}-600 rounded-md shadow
			hover:bg-${color}-500 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-5
			focus-visible:outline-${color}-600`}
			onClick={onClick}
		>
			{label}
		</button>
	)
}

export default Button;


