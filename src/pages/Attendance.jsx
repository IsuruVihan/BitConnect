import React, {useEffect, useState} from 'react';
import CreateAttendanceReportModal from "../components/modals/CreateAttendanceReportModal";
import {SecondaryButton, SuccessButton} from "../components/Button";
import SystemClock from "../components/SystemClock";
import Pagination from "../components/Pagination";
import ErrorModal from "../components/modals/ErrorModal";
import AttendanceReportGenerator from "../components/reports/AttendanceReportGenerator";
import SuccessModal from "../components/modals/SuccessModal";

const Attendance = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const [reportData, setReportData] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  const [pdfModalOpen, setPDFModalOpen] = useState(false);
  const [getCheckInDataErrorModalOpen, setGetCheckInDataErrorModalOpen] = useState(false);
  const [getCheckOutDataErrorModalOpen, setGetCheckOutDataErrorModalOpen] = useState(false);
  const [openCreateAttendanceReportModal, setOpenCreateAttendanceReportModal] = useState(false);
  const [generateAttendanceReportErrorModalOpen, setGenerateAttendanceReportErrorModalOpen]
    = useState(false);
  const [checkInSuccessModalOpen, setCheckInSuccessModalOpen] = useState(false);
  const [checkInErrorModalOpen, setCheckInErrorModalOpen] = useState(false);
  const [checkOutSuccessModalOpen, setCheckOutSuccessModalOpen] = useState(false);
  const [checkOutErrorModalOpen, setCheckOutErrorModalOpen] = useState(false);

  // Pagination
  const recordsPerPage = 5;
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = attendanceRecords.slice(startIndex, endIndex);

  const getCheckInData = async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1 >= 10 ? currentDate.getMonth() + 1 : `0${currentDate.getMonth() + 1}`;
    const day = currentDate.getDate() >= 10 ? currentDate.getDate() : `0${currentDate.getDate()}`;
    try {
      return {
        result: await fetch(`http://localhost:4000/attendance/check-in?date=${year}-${month}-${day}`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
          }
        }),
        error: false
      };
    } catch (error) {
      return {error: true};
    }
  }
  const getCheckOutData = async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1 >= 10 ? currentDate.getMonth() + 1 : `0${currentDate.getMonth() + 1}`;
    const day = currentDate.getDate() >= 10 ? currentDate.getDate() : `0${currentDate.getDate()}`;
    try {
      return {
        result: await fetch(`http://localhost:4000/attendance/check-out?date=${year}-${month}-${day}`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
          }
        }),
        error: false
      };
    } catch (error) {
      return {error: true};
    }
  }
  const getAttendanceRecords = async () => {
    try {
      return {
        result: await fetch(`http://localhost:4000/attendance`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
          }
        }),
        error: false
      };
    } catch (error) {
      return {error: true};
    }
  }

  const handleOnClickCheckIn = async () => {
    const currentDateAndTime = new Date();
    const currentDate = currentDateAndTime.toISOString().slice(0, 10);
    const currentTime = currentDateAndTime.toTimeString().slice(0, 8);

    try {
      const response = await fetch('http://localhost:4000/attendance/check-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
        },
        body: JSON.stringify({date: currentDate, time: currentTime}),
      });
      setCheckInSuccessModalOpen(true);
      console.log(response.message);
    } catch (error) {
      setCheckInErrorModalOpen(true);
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
      setCheckOutSuccessModalOpen(true);
      console.log(response.message);
    } catch (error) {
      setCheckOutErrorModalOpen(true);
      console.error('Check-Out failed :', error);
    }
  };
  const handleGenerateReport = async () => {
    if (fromDate !== '' && toDate !== '') {
      const fromD = new Date(fromDate);
      const toD = new Date(toDate);
      if (fromD <= toD) {
        try {
          await fetch(`http://localhost:4000/attendance?from=${fromDate}&to=${toDate}`, {
            method: 'GET',
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem("token"),
            }
          })
            .then(r => r.json())
            .then((data) => {
              const reportD = {
                currentDate: '',
                currentTime: '',
                from: fromDate,
                to: toDate,
                employeeName: 'Isuru Harischandra',
                employeeEmail: data.userEmail,
                employeeRole: 'Software Engineer',
                data: data.data.map(item => ({
                  date: item.CheckInDate ? new Date(item.CheckInDate).toISOString().substr(0, 10) : null,
                  CheckInTime: item.CheckInTime ? new Date(item.CheckInTime).toISOString().substr(11, 5) :
                    '',
                  CheckOutTime: item.CheckOutTime ? new Date(item.CheckOutTime).toISOString().substr(11, 5) :
                    ''
                })),
              };
              setReportData(reportD);
              setPDFModalOpen(true);
            });
        } catch (error) {
          setGenerateAttendanceReportErrorModalOpen(true);
        }
      }
    }
  }

  useEffect(() => {
    getCheckInData()
      .then((r) => {
        if (!r.result) {
          setGetCheckInDataErrorModalOpen(true);
          return;
        }
        return r.result.json();
      })
      .then((data) => {
        if (data.date === undefined || data.time === undefined) {
          setGetCheckInDataErrorModalOpen(true);
        } else if (data.date !== null && data.time !== null) {
          setCheckInDate(data.date.split('T')[0]);
          setCheckInTime(data.time.split('T')[1].split('.')[0]);
        }
      });

    getCheckOutData()
      .then((r) => {
        if (!r.result) {
          setGetCheckOutDataErrorModalOpen(true);
          return;
        }
        return r.result.json();
      })
      .then((data) => {
        if (data.date === undefined || data.time === undefined) {
          setGetCheckOutDataErrorModalOpen(true);
        } else if (data.date !== null && data.time !== null) {
          setCheckOutDate(data.date.split('T')[0]);
          setCheckOutTime(data.time.split('T')[1].split('.')[0]);
        }
      });

    getAttendanceRecords()
      .then((r) => {
        if (!r.result) {
          setGetCheckOutDataErrorModalOpen(true);
          return;
        }
        return r.result.json();
      })
      .then((data) => {
        if (!data) return;
        const newRecords = data.data.map(record => {
          const checkInDate = new Date(record.CheckInDate);
          const checkInTime = new Date(record.CheckInTime);
          const checkOutTime = record.CheckOutTime ? new Date(record.CheckOutTime) : null;

          const checkIn = checkInTime.toISOString().substr(11, 5); // Format as HH:mm
          const checkOut = checkOutTime ? checkOutTime.toISOString().substr(11, 5) : null;

          let attendance = 'Present';
          if (checkInTime.getUTCHours() > 8 || (checkInTime.getUTCHours() === 8 && checkInTime.getUTCMinutes() > 0)) {
            attendance = 'Late';
          }

          return {
            date: checkInDate.toISOString().substr(0, 10), // Format as YYYY-MM-DD
            checkIn: checkIn,
            checkOut: checkOut,
            attendance: attendance,
          };
        });

        setAttendanceRecords(newRecords);
      });
  }, []);

  // sub-components
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
  const TableGrid = () => {
    return (
      <div className="p-8 border-1 rounded-md shadow-md">
        <CreateAttendanceReportModal
          open={openCreateAttendanceReportModal}
          setOpen={setOpenCreateAttendanceReportModal}
          fromDate={fromDate}
          toDate={toDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
          generateReport={handleGenerateReport}
        />
        <SuccessModal
          title={"Check-in"}
          message={"You have checked-in successfully."}
          open={checkInSuccessModalOpen}
          setOpen={setCheckInSuccessModalOpen}
        />
        <ErrorModal
          title={"Check-in"}
          message={"An error occurred while checking-in. Please try again."}
          open={checkInErrorModalOpen}
          setOpen={setCheckInErrorModalOpen}
        />
        <SuccessModal
          title={"Check-out"}
          message={"You have checked-out successfully."}
          open={checkOutSuccessModalOpen}
          setOpen={setCheckOutSuccessModalOpen}
        />
        <ErrorModal
          title={"Check-out"}
          message={"An error occurred while checking-out. Please try again."}
          open={checkOutErrorModalOpen}
          setOpen={setCheckOutErrorModalOpen}
        />

        <div className="sm:flex sm:items-center mb-4">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Attendance History</h1>
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
              onClick={() => setOpenCreateAttendanceReportModal(true)}
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
                {currentRecords.map((record, idx) => (
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
              <Pagination
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                recordsPerPage={recordsPerPage}
                totalRecords={attendanceRecords.length}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  const FormGrid = () => {
    return (
      <div className="p-8 border-1 rounded-md shadow-md flex flex-col">
        <ErrorModal
          title={"Check-in Data"}
          message={"An error occurred while retrieving check-in data. Please try again."}
          open={getCheckInDataErrorModalOpen}
          setOpen={setGetCheckInDataErrorModalOpen}
        />
        <ErrorModal
          title={"Check-out Data"}
          message={"An error occurred while retrieving check-out data. Please try again."}
          open={getCheckOutDataErrorModalOpen}
          setOpen={setGetCheckOutDataErrorModalOpen}
        />
        <ErrorModal
          title={"Generate Attendance Report"}
          message={"An error occurred while generating the attendance report. Please try again."}
          open={generateAttendanceReportErrorModalOpen}
          setOpen={setGenerateAttendanceReportErrorModalOpen}
        />

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
              <SuccessButton
                label="Check-in"
                width={'full'}
                onClick={handleOnClickCheckIn}
                disabled={checkInTime !== "" || checkInDate !== ""}
              />
              <SecondaryButton
                label="Check-out"
                width={'full'}
                onClick={handleCheckOut}
                disabled={checkOutTime !== "" || checkOutDate !== ""}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {reportData && <AttendanceReportGenerator open={pdfModalOpen} setOpen={setPDFModalOpen} data={reportData}/>}
      <div className="xl:grid hidden grid-cols-5 gap-5">
        <div className="col-span-2">
          <SystemClockGrid/>
        </div>
        <div className="col-span-3 row-span-2">
          <TableGrid/>
        </div>
        <div className="col-span-2">
          <FormGrid/>
        </div>
      </div>
      <div className="xl:hidden lg:grid hidden grid-cols-2 gap-5">
        <div>
          <SystemClockGrid/>
        </div>
        <div>
          <FormGrid/>
        </div>
        <div className="col-span-2">
          <TableGrid/>
        </div>
      </div>
      <div className="lg:hidden sm:grid grid-cols-1 gap-5">
        <div>
          <SystemClockGrid/>
        </div>
        <div>
          <FormGrid/>
        </div>
        <div>
          <TableGrid/>
        </div>
      </div>
    </>
  );
}

export default Attendance;