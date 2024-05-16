import React, { useState } from 'react';
import CreateAttendanceReportModal from "../components/modals/CreateAttendanceReportModal";
import Button from "../components/Button";

const Attendance = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkInTime, setCheckInTime] = useState('');

  const [checkOutDate, setCheckOutDate] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');

  const [openCreateAttendanceReportModal, setOpenCreateAttendanceReportModal] = useState(false);

  const handleCheckIn = async () => {
    const currentDateAndTime = new Date();
    const currentDate = currentDateAndTime.toISOString().slice(0, 10);
    setCheckInDate(currentDate);
    const currentTime = currentDateAndTime.toTimeString().slice(0, 8);
    setCheckInTime(currentTime);

    try {
      const response = await fetch('http://localhost:4000/attendance/check-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
        },
        body: JSON.stringify({ date: currentDate, time: currentTime }),
      });
      console.log(response.message);
    } catch (error) {
      console.error('Check-In failed :', error);
    }
  };

  const handleCheckOut = async () => {
    const currentDateAndTime = new Date();
    const currentDate = currentDateAndTime.toISOString().slice(0, 10);
    setCheckOutDate(currentDate);
    const currentTime = currentDateAndTime.toTimeString().slice(0, 8);
    setCheckOutTime(currentTime);

    try {
      const response = await fetch('http://localhost:4000/attendance/check-out', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
        },
        body: JSON.stringify({ date: currentDate, time: currentTime }),
      });
      console.log(response.message);
    } catch (error) {
      console.error('Check-Out failed :', error);
    }
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
            placeholder="Check-In"
            value={checkInDate + " " + checkInTime}
            disabled
          />
          <input
            type="text"
            className="rounded-md border border-gray-300 px-2 py-1 w-96 text-center" // Added text-center class
            placeholder="Check-Out"
            value={checkOutDate + " " + checkOutTime}
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