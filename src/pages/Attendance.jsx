import React, {useState} from 'react';
import CreateAttendanceReportModal from "../components/modals/CreateAttendanceReportModal";
import {SecondaryButton, SuccessButton} from "../components/Button";
import SystemClock from "../components/SystemClock";
import Pagination from "../components/Pagination";

const attendanceRecords = [
  {date: '2024-05-01', checkIn: '08:00', checkOut: '17:00', attendance: 'Present'},
  {date: '2024-05-02', checkIn: '08:10', checkOut: '17:05', attendance: 'Present'},
  {date: '2024-05-03', checkIn: '08:05', checkOut: '17:00', attendance: 'Present'},
  {date: '2024-05-04', checkIn: '08:00', checkOut: '16:55', attendance: 'Present'},
  {date: '2024-05-05', checkIn: '08:20', checkOut: '17:15', attendance: 'Late'},
  {date: '2024-05-06', checkIn: '08:00', checkOut: '17:00', attendance: 'Present'},
];

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
        body: JSON.stringify({date: currentDate, time: currentTime}),
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
        body: JSON.stringify({date: currentDate, time: currentTime}),
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

  const SystemClockGrid = () => (
    <div className="p-8 border-1 rounded-md shadow-md flex flex-col">
      <div className="block">
        <div className="mb-4">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">System clock</h1>
            </div>
          </div>
        </div>
        <SystemClock/>
      </div>
    </div>
  );

  const TableGrid = () => (
    <div className="p-8 border-1 rounded-md shadow-md">
      <div className="sm:flex sm:items-center mb-4">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Attendance history</h1>
          <p className="mt-2 text-sm text-gray-700">
            Your past attendance records.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white
                shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
                focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Generate Report
          </button>
        </div>
      </div>
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                  Date
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Check-in
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Check-out
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Attendance
                </th>
              </tr>
              </thead>
              <tbody className="bg-white">
              {attendanceRecords.map((record, idx) => (
                <tr key={idx} className="even:bg-gray-50">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                    {record.date}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {record.checkIn}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {record.checkOut}</td>
                  <td className="whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium">
                    {record.attendance}
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
            <Pagination/>
          </div>
        </div>
      </div>
    </div>
  );

  const FormGrid = () => (
    <div className="p-8 border-1 rounded-md shadow-md flex flex-col">
      <div className="block">
        <div className="mb-4">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">Check-in / Check-out</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-4">
          <div className="block mb-4">
            <input
              type="text"
              className="rounded-md border border-gray-300 px-2 py-1 w-full text-center mb-2"
              placeholder="Check-in Time"
              value={checkInDate !== '' ? "Date: " + checkInDate + "\tTime: " + checkInTime : ""}
              disabled={true}
            />
            <input
              type="text"
              className="rounded-md border border-gray-300 px-2 py-1 w-full text-center"
              placeholder="Check-out Time"
              value={checkOutDate !== '' ? "Date: " + checkOutDate + "\tTime: " + checkOutTime : ""}
              disabled={true}
            />
          </div>
          <div className="flex flex-row items-center justify-between gap-2">
            <SuccessButton label="Check-in" width={'full'} onClick={handleCheckIn}/>
            <SecondaryButton label="Check-out" width={'full'} onClick={handleCheckOut}/>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <CreateAttendanceReportModal open={openCreateAttendanceReportModal} setOpen={setOpenCreateAttendanceReportModal}/>

      <div className="xl:grid hidden grid-cols-5 gap-5">
        <div className="col-span-2">
          {SystemClockGrid()}
        </div>
        <div className="col-span-3 row-span-2">
          {TableGrid()}
        </div>
        <div className="col-span-2">
          {FormGrid()}
        </div>
      </div>

      <div className="xl:hidden lg:grid hidden grid-cols-2 gap-5">
        <div>
          {SystemClockGrid()}
        </div>
        <div>
          {FormGrid()}
        </div>
        <div className="col-span-2">
          {TableGrid()}
        </div>
      </div>

      <div className="lg:hidden sm:grid grid-cols-1 gap-5">
        <div>
          {SystemClockGrid()}
        </div>
        <div>
          {FormGrid()}
        </div>
        <div>
          {TableGrid()}
        </div>
      </div>
    </>
  );
}

export default Attendance;