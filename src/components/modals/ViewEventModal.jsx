import React from "react";
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {OutlineButton, PrimaryButton, SuccessButton} from "../Button";

const ViewEventModal = ({open, setOpen, eventDetails, setEventDetails}) => {
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={setOpen}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
								<div className="sm:flex-auto">
									<h1 className="text-base font-semibold leading-6 text-gray-900">Create Event</h1>
									<p className="mt-1 mb-5 text-sm text-gray-700">
										Create an event to be shared in the company calendar.
									</p>
								</div>
								<div>
									<label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
										Title
									</label>
									<div className="mt-2">
										<input
											type="text"
											name="title"
											id="title"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
											ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
											sm:text-sm sm:leading-6"
											placeholder="Title"
											value={eventDetails.title}
											onChange={(e) =>
												setEventDetails({...eventDetails, title: e.target.value})
											}
										/>
									</div>
								</div>
								<div className="flex sm:flex-row flex-col justify-between items-center gap-2 mt-4">
									<div className="w-full">
										<label htmlFor="start-date" className="block text-sm font-medium leading-6 text-gray-900">
											Start date
										</label>
										<div className="mt-2">
											<input
												type="date"
												name="start-date"
												id="start-date"
												className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
												ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
												sm:text-sm sm:leading-6"
												value={eventDetails.startDate}
												onChange={(e) =>
													setEventDetails({...eventDetails, startDate: e.target.value})
												}
											/>
										</div>
									</div>
									<div className="w-full">
										<label htmlFor="start-time" className="block text-sm font-medium leading-6 text-gray-900">
											Start time
										</label>
										<div className="mt-2">
											<input
												type="time"
												name="start-time"
												id="start-time"
												className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
												ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
												sm:text-sm sm:leading-6"
												value={eventDetails.startTime}
												onChange={(e) =>
													setEventDetails({...eventDetails, startTime: e.target.value})
												}
											/>
										</div>
									</div>
								</div>
								<div className="flex sm:flex-row flex-col justify-between items-center gap-2 mt-4">
									<div className="w-full">
										<label htmlFor="end-date" className="block text-sm font-medium leading-6 text-gray-900">
											End date
										</label>
										<div className="mt-2">
											<input
												type="date"
												name="end-date"
												id="end-date"
												className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
												ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
												sm:text-sm sm:leading-6"
												value={eventDetails.endDate}
												onChange={(e) =>
													setEventDetails({...eventDetails, endDate: e.target.value})
												}
											/>
										</div>
									</div>
									<div className="w-full">
										<label htmlFor="end-time" className="block text-sm font-medium leading-6 text-gray-900">
											End time
										</label>
										<div className="mt-2">
											<input
												type="time"
												name="end-time"
												id="end-time"
												className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
												ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
												sm:text-sm sm:leading-6"
												value={eventDetails.endTime}
												onChange={(e) =>
													setEventDetails({...eventDetails, endTime: e.target.value})
												}
											/>
										</div>
									</div>
								</div>
								<div className="mt-8 flex flex-row justify-end items-center gap-2">
									<OutlineButton label="Cancel" onClick={() => setOpen(false)}/>
									<PrimaryButton label="Update" onClick={() => {}}/>
									<SuccessButton label="Save" onClick={() => {}}/>
								</div>
								{/*Modal body end*/}

							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

export default ViewEventModal;