import React from "react";

const ButtonBase = ({ onClick, label, width, textColor, colorClasses, disabled }) => {
	return (
		<button
			type="button"
			className={`w-${width} px-3 py-2 text-sm font-semibold text-${textColor} rounded-md shadow
      ${colorClasses} hover:bg-opacity-90 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-5 
      hover:cursor-pointer`}
			onClick={onClick}
			disabled={disabled}
		>
			{label}
		</button>
	);
};

const PrimaryButton = ({ onClick, label, width, disabled = false }) => (
	<ButtonBase
		onClick={onClick}
		label={label}
		width={width}
		textColor={"white"}
		colorClasses="bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
		disabled={disabled}
	/>
);

const SuccessButton = ({ onClick, label, width, disabled = false }) => (
	<ButtonBase
		onClick={onClick}
		label={label}
		width={width}
		textColor={"white"}
		colorClasses="bg-green-600 hover:bg-green-500 focus-visible:outline-green-600"
		disabled={disabled}
	/>
);

const DangerButton = ({ onClick, label, width, disabled = false }) => (
	<ButtonBase
		onClick={onClick}
		label={label}
		width={width}
		textColor={"white"}
		colorClasses="bg-red-600 hover:bg-red-500 focus-visible:outline-red-600"
		disabled={disabled}
	/>
);

const WarningButton = ({ onClick, label, width, disabled = false }) => (
	<ButtonBase
		onClick={onClick}
		label={label}
		width={width}
		textColor={"white"}
		colorClasses="bg-yellow-600 hover:bg-yellow-500 focus-visible:outline-yellow-600"
		disabled={disabled}
	/>
);

const SecondaryButton = ({ onClick, label, width, disabled = false }) => (
	<ButtonBase
		onClick={onClick}
		label={label}
		width={width}
		textColor={"white"}
		colorClasses="bg-gray-600 hover:bg-gray-500 focus-visible:outline-gray-600"
		disabled={disabled}
	/>
);

const OutlineButton = ({ onClick, label, width, disabled = false }) => (
	<ButtonBase
		onClick={onClick}
		label={label}
		width={width}
		textColor={"gray-900"}
		colorClasses="bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
		disabled={disabled}
	/>
);

export { PrimaryButton, SuccessButton, DangerButton, WarningButton, SecondaryButton, OutlineButton };