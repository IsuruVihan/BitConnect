import React, { useState } from 'react';
import CreateAttendanceReportModal from "../components/modals/CreateAttendanceReportModal";
import Button from "../components/Button";

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
      <div className="flex flex-col items-center">
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
        <div className="flex space-x-4 mb-4 w-96">
          <Button onClick={handleCheckIn} width={'48'} color={'green'} label={'Check In'}/>
          <Button onClick={handleCheckOut} width={'48'} color={'red'} label={'Check Out'}/>
        </div>

        {/* Generate Report Button */}
        <div className="w-96">
          <Button
            onClick={() => setOpenCreateAttendanceReportModal(true)}
            width={'full'}
            color={'indigo'}
            label={'Generate Report'}
          />
        </div>
      </div>
    </div>
  );
}

export default Attendance;