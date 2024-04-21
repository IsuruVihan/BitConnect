import React, { useState } from 'react';
const Attendance = () => {
    const [checkInTime, setCheckInTime] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');

    const handleCheckIn = () => {
      const currentTime = new Date().toLocaleString();
      setCheckInTime(currentTime);
    };

    const handleCheckOut = () => {
      const currentTime = new Date().toLocaleString();
      setCheckOutTime(currentTime);
    };

    const generateReport = () => {
      // Implement report generation logic
      console.log('Report generated');
    };

    return(
      <div>
				<div className="flex flex-col items-center mt-8">
					<div className="flex flex-col space-y-4 mb-4">
						<input
							type="text"
							className="rounded-md border border-gray-300 px-3 py-2"
							placeholder="Date"
							value={checkInTime || ''}
							disabled
						/>
						<input
							type="text"
							className="rounded-md border border-gray-300 px-3 py-2"
							placeholder="Time"
							value={checkInTime || ''}
							disabled
						/>
					</div>
					<div className="flex space-x-4 mb-4">
						<button
							className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full"
							onClick={handleCheckIn}
						>
							Check In
						</button>
						<button
							className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full"
							onClick={handleCheckOut}
						>
							Check Out
						</button>
					</div>
					<button
						className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-full"
						onClick={generateReport}
					>
						Generate Report
					</button>
				</div>
			</div>
		);
}

export default Attendance;