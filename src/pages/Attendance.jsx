import React, { useState } from 'react';
import CreateAttendanceReportModal from "../components/modals/CreateAttendanceReportModal";

const Attendance = () => {
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [openCreateAttendanceReportModal, setOpenCreateAttendanceReportModal] = useState(false);

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
      <CreateAttendanceReportModal open={openCreateAttendanceReportModal} setOpen={setOpenCreateAttendanceReportModal}/>
      <div className="flex flex-col items-center mt-8">
        <div className="flex flex-col space-y-4 mb-4">
          <input
            type="text"
            className="rounded-md border border-gray-300 px-2 py-1 w-96 text-center" // Added text-center class
            placeholder="Date"
            value={checkInTime || ''}
            disabled
          />
          <input
            type="text"
            className="rounded-md border border-gray-300 px-2 py-1 w-96 text-center" // Added text-center class
            placeholder="Time"
            value={checkInTime || ''}
            disabled
          />
        </div>

        {/* Check in and Check out buttons */}
        <div className="flex space-x-4 mb-4">
          <button
            className="block w-48 px-3 py-2 text-sm font-semibold text-center text-white bg-green-600 rounded-md shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            onClick={handleCheckIn}
          >
            Check In
          </button>
          <button
            className="block w-48 px-3 py-2 text-sm font-semibold text-center text-white bg-red-600 rounded-md shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            onClick={handleCheckOut}
          >
            Check Out
          </button>
        </div>

        {/* Generate Report Button */}
        <div className="mb-4 ">
          <button
            className="block w-96 px-3 py-2 text-sm font-semibold text-center text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => setOpenCreateAttendanceReportModal(true)}
          >
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
