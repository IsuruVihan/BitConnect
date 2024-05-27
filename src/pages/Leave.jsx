import React, {useState, Fragment, useEffect, useMemo} from "react";
import {Listbox, Transition} from "@headlessui/react";
import {ChevronUpDownIcon} from "@heroicons/react/16/solid";
import {CheckIcon} from "@heroicons/react/24/outline";
import Pagination from "../components/Pagination";
import {PrimaryButton} from "../components/Button";
import ErrorModal from "../components/modals/ErrorModal";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';
import {CheckCircleIcon, XCircleIcon} from "@heroicons/react/20/solid";
import SuccessModal from "../components/modals/SuccessModal";
import LeaveRequestDetailsModal from "../components/modals/LeaveRequestDetailsModal";
import ConfirmDeleteLeaveRequestModal from "../components/modals/ConfirmDeleteLeaveRequestModal";

ChartJS.register(ArcElement, Tooltip, Legend);

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Leave = () => {
  const [getLeavesDataErrorModalOpen, setGetLeavesDataErrorModalOpen] = useState(false);
  const [submitLeaveRequestErrorModalOpen, setSubmitLeaveRequestErrorModalOpen]
    = useState(false);
  const [deleteLeaveRequestErrorModalOpen, setDeleteLeaveRequestErrorModalOpen]
    = useState(false);
  const [submitLeaveRequestSuccessModalOpen, setSubmitLeaveRequestSuccessModalOpen]
    = useState(false);
  const [selectedLeaveRequestDetailsModalOpen, setSelectedLeaveRequestDetailsModalOpen]
    = useState(false);
  const [confirmDeleteLeaveRequestModalOpen, setConfirmDeleteLeaveRequestModalOpen]
    = useState(false);
  const [deleteLeaveRequestSuccessModalOpen, setDeleteLeaveRequestSuccessModalOpen]
    = useState(false);

  // casual leaves
  const [casualLeaves, setCasualLeaves] = useState(10);

  // medical leaves
  const [medicalLeaves, setMedicalLeaves] = useState(10);

  // leave records
  const [currentPage, setCurrentPage] = useState(1);
  const [leaveRecords, setLeaveRecords] = useState([]);

  // form
  const leaveTypes = useMemo(() => [
    {id: 1, label: 'Casual Leave', value: 'Casual'},
    {id: 2, label: 'Medical Leave', value: 'Medical'},
  ], []);
  const [selected, setSelected] = useState(leaveTypes[0]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');

  const countWeekends = (startDate, endDate) => {
    let count = 0;
    let currentDate = new Date(startDate);

    // Loop through each day between the start and end date
    while (currentDate <= new Date(endDate)) {
      const day = currentDate.getDay();
      if (day === 6 || day === 0) { // 6 = Saturday, 0 = Sunday
        count++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return count;
  };

  // form errors
  const [errorCount, setErrorCount] = useState(0);
  const [noReason, setNoReason] = useState(false);
  const [noFromDate, setNoFromDate] = useState(false);
  const [noToDate, setNoToDate] = useState(false);
  const [oldFromDate, setOldFromDate] = useState(false);
  const [oldToDate, setOldToDate] = useState(false);
  const [fromDateGreaterThanToDate, setFromDateGreaterThanToDate] = useState(false);
  const [overflow, setOverflow] = useState(false);
  useEffect(() => {
    let tempCount = 0;

    const noReason = reason.trim() === "";
    if (noReason) tempCount += 1;

    const noFromDate = !fromDate;
    if (noFromDate) tempCount += 1;

    const noToDate = !toDate;
    if (noToDate) tempCount += 1;

    const oldFromDate = !noFromDate && new Date(fromDate) < new Date();
    if (oldFromDate) tempCount += 1;

    const oldToDate = !noToDate && new Date(toDate) < new Date();
    if (oldToDate) tempCount += 1;

    const fromDateGreaterThanToDate = !noFromDate && !noToDate && new Date(fromDate) > new Date(toDate);
    if (fromDateGreaterThanToDate) tempCount += 1;

    const overflow = !noFromDate && !noToDate && !fromDateGreaterThanToDate && (
      ((new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24)) - countWeekends(fromDate, toDate) + 1 >
      (selected.value === "Casual" ? casualLeaves : medicalLeaves)
    );
    if (overflow) tempCount += 1;

    setNoReason(noReason);
    setNoFromDate(noFromDate);
    setNoToDate(noToDate);
    setOldFromDate(oldFromDate);
    setOldToDate(oldToDate);
    setFromDateGreaterThanToDate(fromDateGreaterThanToDate);
    setOverflow(overflow);
    setErrorCount(tempCount);
  }, [fromDate, toDate, reason, selected, casualLeaves, medicalLeaves]);

  // Selected leave request
  const [selectedLeaveRequestData, setSelectedLeaveRequestData] = useState({
    createdOn: '', from: '', to: '', type: '', reason: '', status: '',
  });

  // Pagination
  const recordsPerPage = 6;
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = leaveRecords.slice(startIndex, endIndex);

  const getLeavesData = async () => {
    try {
      return {
        result: await fetch(`http://localhost:4000/leaves`, {
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
  const postLeaveRequest = async () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    if (errorCount === 0) {
      try {
        const response = await fetch('http://localhost:4000/leaves', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            CreatedOn: `${year}-${month < 10 ? '0' + month : month}-${day}`,
            FromDate: fromDate,
            ToDate: toDate,
            Reason: reason.trim(),
            Type: selected.value,
          }),
        });

        if ([400, 404].includes(response.status)) {
          return setSubmitLeaveRequestErrorModalOpen(true);
        }
        setSubmitLeaveRequestSuccessModalOpen(true);
        window.location.reload();
      } catch (error) {
        setSubmitLeaveRequestErrorModalOpen(true);
      }
    } else {
      setSubmitLeaveRequestErrorModalOpen(true);
    }
  }
  const deleteLeaveRequest = async() => {
    try {
      await fetch('http://localhost:4000/leaves', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
        },
        body: JSON.stringify(selectedLeaveRequestData),
      });
    } catch (error) {
      setDeleteLeaveRequestErrorModalOpen(true);
    }
  }

  const onConfirmDelete = () => {
    setConfirmDeleteLeaveRequestModalOpen(false);
    setSelectedLeaveRequestDetailsModalOpen(false);
    deleteLeaveRequest()
      .then(() => {
        setDeleteLeaveRequestSuccessModalOpen(true);
      });
    setSelectedLeaveRequestData({
      createdOn: '', from: '', to: '', type: '', reason: '', status: ''
    });
  }

  useEffect(() => {
    getLeavesData()
      .then((r) => {
        if (!r.result) {
          setGetLeavesDataErrorModalOpen(true);
          return;
        }
        return r.result.json();
      })
      .then((data) => {
        setCasualLeaves(data.CasualLeaves);
        setMedicalLeaves(data.MedicalLeaves);
        setLeaveRecords(data.LeaveRequests);
      });
  }, []);

  // Sub-components
  const LeaveForm = () => {
    return (
      <div className="p-8 border-1 rounded-md shadow-md">
        <div className="mb-4">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">Submit a Leave Request</h1>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-row items-center justify-between gap-2">
            <div className="mb-4 w-full">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                From
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="from-date"
                  id="from-date"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
									ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm
									sm:leading-6"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                To
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="to-date"
                  id="to-date"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
									ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm
									sm:leading-6"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between gap-2">
            <div className="mb-4 w-full">
              <Listbox value={selected} onChange={setSelected}>
                {({open}) => (
                  <>
                    <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                      Assigned to
                    </Listbox.Label>
                    <div className="relative mt-2">
                      <Listbox.Button
                        className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left
												text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2
												focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        <span className="block truncate">{selected.label}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                					<ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
              					</span>
                      </Listbox.Button>
                      <Transition
                        show={open}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options
                          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base
													shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                        >
                          {leaveTypes.map((leaveType, idx) => (
                            <Listbox.Option
                              key={idx}
                              className={({focus}) =>
                                classNames(
                                  focus ? 'bg-indigo-600 text-white' : '',
                                  !focus ? 'text-gray-900' : '',
                                  'relative cursor-default select-none py-2 pl-8 pr-4'
                                )
                              }
                              value={leaveType}
                            >
                              {({selected, focus}) => (
                                <>
                        					<span
                                    className={classNames(
                                      selected ? 'font-semibold' : 'font-normal', 'block truncate'
                                    )}
                                  >{leaveType.label}</span>
                                  {selected ? (
                                    <span
                                      className={classNames(
                                        focus ? 'text-white' : 'text-indigo-600',
                                        'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                      )}
                                    >
                            					<CheckIcon className="h-5 w-5" aria-hidden="true"/>
                          					</span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Reason
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="reason"
                  id="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
									ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm
									sm:leading-6"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div>
            {errorCount > 0 ? <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true"/>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    There are {errorCount} error{errorCount > 1 && 's'} with your submission
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <ul role="list" className="list-disc space-y-1 pl-5">
                      {noReason && <li>Reason cannot be empty</li>}
                      {noFromDate && <li>From date cannot be empty</li>}
                      {noToDate && <li>To date cannot be empty</li>}
                      {!noFromDate && oldFromDate && <li>From date is invalid</li>}
                      {!noToDate && oldToDate && <li>To date is invalid</li>}
                      {!noFromDate && !noToDate && fromDateGreaterThanToDate &&
                        <li>From date cannot be greater than to date</li>}
                      {!noFromDate && !noToDate && !fromDateGreaterThanToDate && overflow &&
                        <li>You don't have enough leaves in the selected category</li>}
                    </ul>
                  </div>
                </div>
              </div>
            </div> : <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true"/>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">All good!</p>
                </div>
              </div>
            </div>}
          </div>
          <div className="mt-4">
            <PrimaryButton
              label="Submit"
              width={'full'}
              onClick={postLeaveRequest}
              disabled={errorCount > 0}
            />
          </div>
        </div>
      </div>
    );
  };
  const LeavesTable = () => {
    return (
      <div className="p-8 border-1 rounded-md shadow-md">
        <div className="sm:flex sm:items-center mb-4">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Leaves History</h1>
            <p className="mt-2 text-sm text-gray-700">
              Your past leave records.
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
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                    Created
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    From
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    To
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Type
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Reason
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                    Status
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white">
                {currentRecords.map((record, idx) => (
                  <tr key={idx} className="even:bg-gray-50 cursor-pointer" onClick={() => {
                    setSelectedLeaveRequestData({
                      createdOn: record.CreatedOn.split("T")[0],
                      from: record.FromDate.split("T")[0],
                      to: record.ToDate.split("T")[0],
                      type: record.Type,
                      reason: record.Reason,
                      status: record.Status,
                    });
                    setSelectedLeaveRequestDetailsModalOpen(true);
                  }}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      {record.CreatedOn.split("T")[0]}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {record.FromDate.split("T")[0]}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {record.ToDate.split("T")[0]}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {record.Type}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {record.Reason}
                    </td>
                    <td className={`relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3 
                    text-${record.Status === "Accepted" ? 'green' : record.Status === "Rejected" ? 'red' : 'gray'}-600`}>
                      {record.Status}
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination currentPage={currentPage} onPageChange={setCurrentPage} recordsPerPage={recordsPerPage}
                    totalRecords={leaveRecords.length}/>
      </div>
    );
  };
  const CustomLeaves = () => {
    return (
      <div className="p-8 border-1 rounded-md shadow-md">
        <div className="mb-4">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">Casual Leaves</h1>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Pie
            redraw={false}
            data={{
              labels: ["Taken", "Remaining"],
              datasets: [
                {
                  label: 'No. of leaves',
                  data: [10 - casualLeaves, casualLeaves],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                  ],
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
      </div>
    );
  };
  const MedicalLeaves = () => {
    return (
      <div className="p-8 border-1 rounded-md shadow-md">
        <div className="mb-4">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">Medical Leaves</h1>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Pie
            data={{
              labels: ["Taken", "Remaining"],
              datasets: [
                {
                  label: 'No. of leaves',
                  data: [10 - medicalLeaves, medicalLeaves],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                  ],
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <ErrorModal
        title={"Leaves Data"}
        message={"An error occurred while retrieving leaves data. Please try again."}
        open={getLeavesDataErrorModalOpen}
        setOpen={setGetLeavesDataErrorModalOpen}
      />
      <ErrorModal
        title={"Submit Leave Request"}
        message={"An error occurred while submitting the leave request. Please try again."}
        open={submitLeaveRequestErrorModalOpen}
        setOpen={setSubmitLeaveRequestErrorModalOpen}
      />
      <ErrorModal
        title={"Delete Leave Request"}
        message={"An error occurred while deleting the leave request. Please try again."}
        open={deleteLeaveRequestErrorModalOpen}
        setOpen={setDeleteLeaveRequestErrorModalOpen}
      />
      <SuccessModal
        title={"Submit Leave Request"}
        message={"Your leave request has been submitted successfully."}
        open={submitLeaveRequestSuccessModalOpen}
        setOpen={setSubmitLeaveRequestSuccessModalOpen}
      />
      <SuccessModal
        title={"Delete Leave Request"}
        message={"Your leave request has been deleted successfully."}
        open={deleteLeaveRequestSuccessModalOpen}
        setOpen={setDeleteLeaveRequestSuccessModalOpen}
      />
      <LeaveRequestDetailsModal
        data={selectedLeaveRequestData}
        open={selectedLeaveRequestDetailsModalOpen}
        setOpen={setSelectedLeaveRequestDetailsModalOpen}
        onClickDelete={() => setConfirmDeleteLeaveRequestModalOpen(true)}
        setSelectedLeaveRequestData={setSelectedLeaveRequestData}
      />
      <ConfirmDeleteLeaveRequestModal
        open={confirmDeleteLeaveRequestModalOpen}
        setOpen={setConfirmDeleteLeaveRequestModalOpen}
        onClickDelete={onConfirmDelete}
        setSelectedLeaveRequestData={setSelectedLeaveRequestData}
      />

      <div className="xl:grid hidden grid-cols-4 gap-3">
        <div className="col-span-1 row-span-1">
          <CustomLeaves/>
        </div>
        <div className="col-span-1 row-span-1">
          <MedicalLeaves/>
        </div>
        <div className="col-span-2 row-span-4">
          <LeavesTable/>
        </div>
        <div className="col-span-2 row-span-3">
          <LeaveForm/>
        </div>
      </div>

      <div className="xl:hidden lg:grid hidden grid-cols-2 gap-3">
        <div>
          <CustomLeaves/>
        </div>
        <div>
          <MedicalLeaves/>
        </div>
        <div>
          <LeaveForm/>
        </div>
        <div>
          <LeavesTable/>
        </div>
      </div>

      <div className="lg:hidden sm:grid grid-cols-1 gap-3">
        <div>
          <LeaveForm/>
        </div>
        <div>
          <LeavesTable/>
        </div>
        <div>
          <CustomLeaves/>
        </div>
        <div>
          <MedicalLeaves/>
        </div>
      </div>
    </>
  );
}

export default Leave;