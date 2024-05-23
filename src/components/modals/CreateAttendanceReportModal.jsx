import React, {Fragment} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import {SecondaryButton, SuccessButton} from "../Button";

const CreateAttendanceReportModal = (props) => {
  const {open, setOpen, fromDate, toDate, setFromDate, setToDate, generateReport} = props;
  let noErrors = false;

  const displayErrors = () => {
    if (fromDate === '' || toDate === '') {
      noErrors = false;
      return <p className="mt-2 text-center text-red-600">Please select a date range</p>;
    } else {
      const fromD = new Date(fromDate);
      const toD = new Date(toDate);
      if (fromD <= toD) {
        noErrors = true;
      } else {
        return <p className="mt-2 text-center text-red-600">"From date" should be equal or less than "To date"</p>;
      }
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {
      }}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl
								transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
              >

                {/*Modal body start*/}
                <div className="sm:flex sm:items-center mb-4">
                  <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Generate Report</h1>
                    <p className="mt-2 text-sm text-gray-700">
                      Select a date range to generate the report.
                    </p>
                  </div>
                </div>
                <div className="flex sm:flex-row flex-col gap-4 items-center justify-between">
                  <div className="w-full">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                      From
                    </label>
                    <div className="mt-2">
                      <input
                        type="date"
                        name="from"
                        id="from"
                        autoComplete="from"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                      To
                    </label>
                    <div className="mt-2">
                      <input
                        type="date"
                        name="to"
                        id="to"
                        autoComplete="to"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  {displayErrors()}
                </div>
                <div className="flex flex-row items-center justify-between px-4 mt-6">
                  <SecondaryButton
                    label={'Cancel'}
                    onClick={() => {
                      setFromDate('');
                      setToDate('');
                      setOpen(false);
                    }}
                  />
                  <SuccessButton label={'Generate'} onClick={generateReport} disabled={!noErrors}/>
                </div>
                {/*Modal body end*/}

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CreateAttendanceReportModal;