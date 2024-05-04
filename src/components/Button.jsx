// under construction

import React from "react";

const Button = ({onClick, label, color, width}) => {
	return (
		<button
			type="button"
			className={`w-${width} px-3 py-2 mt-8 text-sm font-semibold text-white bg-${color}-600 rounded-md shadow
			hover:bg-${color}-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
			focus-visible:outline-${color}-600`}
			onClick={onClick}
		>
			{label}
		</button>
	)
}

export default Button;