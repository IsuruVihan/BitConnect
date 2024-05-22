import { useEffect, useState } from "react";

const SystemClock = () => {
	const now = new Date();

	const [year, setYear] = useState(now.getFullYear());
	const [month, setMonth] = useState(now.getMonth() + 1); // getMonth() returns 0-11
	const [date, setDate] = useState(now.getDate());
	const [hour, setHour] = useState(now.getHours());
	const [minutes, setMinutes] = useState(now.getMinutes());
	const [seconds, setSeconds] = useState(now.getSeconds());

	useEffect(() => {
		const intervalId = setInterval(() => {
			const currentTime = new Date();
			setYear(currentTime.getFullYear());
			setMonth(currentTime.getMonth() + 1); // getMonth() returns 0-11
			setDate(currentTime.getDate());
			setHour(currentTime.getHours());
			setMinutes(currentTime.getMinutes());
			setSeconds(currentTime.getSeconds());
		}, 1000);

		return () => clearInterval(intervalId); // Cleanup interval on component unmount
	}, []);

	const formatTimeUnit = (unit) => String(unit).padStart(2, '0');

	return (
		<div className="text-center grid grid-cols-3 gap-2">
			<div className="p-4 shadow-md rounded-md">
				<p>Year</p>
				<p className="text-2xl font-bold">{year}</p>
			</div>
			<div className="p-4 shadow-md rounded-md">
				<p>Month</p>
				<p className="text-2xl font-bold">{formatTimeUnit(month)}</p>
			</div>
			<div className="p-4 shadow-md rounded-md">
				<p>Date</p>
				<p className="text-2xl font-bold">{formatTimeUnit(date)}</p>
			</div>
			<div className="p-4 shadow-md rounded-md">
				<p>Hours</p>
				<p className="text-2xl font-bold">{formatTimeUnit(hour)}</p>
			</div>
			<div className="p-4 shadow-md rounded-md">
				<p>Minutes</p>
				<p className="text-2xl font-bold">{formatTimeUnit(minutes)}</p>
			</div>
			<div className="p-4 shadow-md rounded-md">
				<p>Seconds</p>
				<p className="text-2xl font-bold">{formatTimeUnit(seconds)}</p>
			</div>
		</div>
	);
};

export default SystemClock;