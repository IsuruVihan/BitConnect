import React, {Fragment} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import {DangerButton, SecondaryButton} from "../Button";

const LeaveRequestDetailsModal = ({open, setOpen, onClickDelete, data, setSelectedLeaveRequestData}) => {
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
								<div>
									<div className="px-4 sm:px-0">
										<h3 className="text-base font-semibold leading-7 text-gray-900">Leave Request Details</h3>
										<p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
											Dates, reason, type, and status of the leave request.
										</p>
									</div>
									<div className="mt-6">
										<dl className="grid grid-cols-2 sm:grid-cols-2">
											<div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
												<dt className="text-sm font-medium leading-6 text-gray-900">Created on</dt>
												<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
													{data.createdOn}
												</dd>
											</div>
											<div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
												<dt className="text-sm font-medium leading-6 text-gray-900">Type</dt>
												<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
													{data.type}
												</dd>
											</div>
											<div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
												<dt className="text-sm font-medium leading-6 text-gray-900">From</dt>
												<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
													{data.from}
												</dd>
											</div>
											<div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
												<dt className="text-sm font-medium leading-6 text-gray-900">To</dt>
												<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
													{data.to}
												</dd>
											</div>
											<div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
												<dt className="text-sm font-medium leading-6 text-gray-900">Reason</dt>
												<dd className={`mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0`}>
													{data.reason}
												</dd>
											</div>
											<div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
												<dt className="text-sm font-medium leading-6 text-gray-900">Status</dt>
												<dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
													{data.status}
												</dd>
											</div>
										</dl>
									</div>
									<div className="flex flex-row items-center justify-end gap-2">
										<SecondaryButton label={"Close"} onClick={() => {
											setSelectedLeaveRequestData({
												createdOn: '', from: '', to: '', type: '', reason: '', status: ''
											});
											setOpen(false);
										}}/>
										{data.status === "Processing" && <DangerButton label={"Delete"} onClick={() => onClickDelete()}/>}
									</div>
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

export default LeaveRequestDetailsModal;