import React, {useState, Fragment, useRef, useEffect} from "react";
import {Listbox, Transition} from "@headlessui/react";
import {ChevronUpDownIcon} from "@heroicons/react/16/solid";
import {CheckIcon} from "@heroicons/react/24/outline";
import Chart from "chart.js/auto";
import Pagination from "../components/Pagination";
import {PrimaryButton} from "../components/Button";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Leave = () => {
  const LeaveForm = () => {
    const leaveTypes = [
      {id: 1, name: 'Casual Leave'},
      {id: 2, name: 'Medical Leave'},
    ];

    const [selected, setSelected] = useState(leaveTypes[0]);

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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
              placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
              placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between gap-2">
            <div className="mb-4 w-full">
              <Listbox value={selected} onChange={setSelected}>
                {({open}) => (<>
                  <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Type</Listbox.Label>
                  <div className="relative mt-2">
                    <Listbox.Button
                      className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900
								shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600
								sm:text-sm sm:leading-6">
                      <span className="block truncate">{selected.name}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
              </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options
                        className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base
									shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {leaveTypes.map((leaveType) => (<Listbox.Option
                          key={leaveType.id}
                          className={({active}) => classNames(active ? 'bg-indigo-600 text-white' :
                            'text-gray-900', 'relative cursor-default select-none py-2 pl-8 pr-4')}
                          value={leaveType}
                        >
                          {({selected, active}) => (<>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal',
                          'block truncate')}>
                          {leaveType.name}
                        </span>

                            {selected ? (<span
                              className={classNames(active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 ' +
                                'left-0 flex items-center pl-1.5')}
                            >
                            <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                          </span>) : null}
                          </>)}
                        </Listbox.Option>))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>)}
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
              placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <PrimaryButton label="Submit" width={'full'}/>
          </div>
        </div>
      </div>
    );
  };

  const LeavesTable = () => {
    const leaveRecords = [
      { from: '2024-05-23', to: '2024-05-23', type: 'casual', reason: 'Personal Day', remarks: 'Processing' },
      { from: '2024-06-10', to: '2024-06-12', type: 'medical', reason: 'Flu', remarks: 'Accepted' },
      { from: '2024-07-04', to: '2024-07-04', type: 'casual', reason: 'Appointment', remarks: 'Rejected' },
      { from: '2024-08-15', to: '2024-08-17', type: 'casual', reason: 'Grandfather\'s funeral', remarks: 'Processing' },
      { from: '2024-09-20', to: '2024-09-20', type: 'casual', reason: 'Jury Duty', remarks: 'Accepted' },
      { from: '2024-10-25', to: '2024-10-25', type: 'casual', reason: 'Plumbing issue', remarks: 'Processing' },
    ];

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
                    Remarks
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white">
                {leaveRecords.map((record, idx) => (
                  <tr key={idx} className="even:bg-gray-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      {record.from}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{record.to}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{record.type}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{record.reason}</td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                      {record.remarks}
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination/>
      </div>
    );
  };

  const CustomLeaves = () => {
    const customChartRef = useRef(null);
    const customChartInstance = useRef(null);

    useEffect(() => {
      if (customChartInstance.current) {
        customChartInstance.current.destroy();
      }
      const myChartRef = customChartRef.current.getContext('2d');

      customChartInstance.current = new Chart(myChartRef, {
        type: "pie",
        data: {
          labels: ["Taken", "Remaining"],
          datasets: [{
            data: [5, 19],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
            ],
          }],
        },
      });
      return () => {
        if (customChartInstance.current) {
          customChartInstance.current.destroy();
        }
      };
    }, []);

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
          <canvas ref={customChartRef}/>
        </div>
      </div>
    );
  };

  const MedicalLeaves = () => {
    const medicalChartRef = useRef(null);
    const medicalChartInstance = useRef(null);

    useEffect(() => {
      if (medicalChartInstance.current) {
        medicalChartInstance.current.destroy();
      }
      const myChartRef = medicalChartRef.current.getContext('2d');

      medicalChartInstance.current = new Chart(myChartRef, {
        type: "pie",
        data: {
          labels: ["Taken", "Remaining"],
          datasets: [{
            data: [10, 9],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
            ],
          }],
        },
      });
      return () => {
        if (medicalChartInstance.current) {
          medicalChartInstance.current.destroy();
        }
      };
    }, []);

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
          <canvas ref={medicalChartRef}/>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="xl:grid hidden grid-cols-4 gap-3">
        <div className="col-span-1 row-span-1">
          {CustomLeaves()}
        </div>
        <div className="col-span-1 row-span-1">
          {MedicalLeaves()}
        </div>
        <div className="col-span-2 row-span-4">
          {LeavesTable()}
        </div>
        <div className="col-span-2 row-span-3">
          {LeaveForm()}
        </div>
      </div>

      <div className="xl:hidden lg:grid hidden grid-cols-2 gap-3">
        <div>
          {CustomLeaves()}
        </div>
        <div>
          {MedicalLeaves()}
        </div>
        <div>
          {LeaveForm()}
        </div>
        <div>
          {LeavesTable()}
        </div>
      </div>

      <div className="lg:hidden sm:grid grid-cols-1 gap-3">
        <div>
          {LeaveForm()}
        </div>
        <div>
          {LeavesTable()}
        </div>
        <div>
          {CustomLeaves()}
        </div>
        <div>
          {MedicalLeaves()}
        </div>
      </div>
    </>
  );
}

export default Leave;