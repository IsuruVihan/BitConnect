import {Listbox, Transition} from "@headlessui/react";
import {ChevronUpDownIcon} from "@heroicons/react/16/solid";
import {CheckIcon} from "@heroicons/react/24/outline";
import {CheckCircleIcon, XCircleIcon} from "@heroicons/react/20/solid";
import {PrimaryButton} from "../Button";
import React from "react";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const LeaveForm = (props) => {
    const {
        fromDate, setFromDate, toDate, setToDate, selected, setSelected, leaveTypes, reason, setReason, errorCount,
        noReason, noFromDate, oldFromDate, noToDate, oldToDate, fromDateGreaterThanToDate, overflow, postLeaveRequest
    } = props;

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

export default LeaveForm;