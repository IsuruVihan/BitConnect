import React, {Fragment, useState} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import {DangerButton, OutlineButton, SuccessButton, WarningButton} from "../Button";

const ViewEmployeeModal = (props) => {
	const {open, setOpen, selectedEmployee, setSelectedEmployee, isAdmin} = props;

	const [updateMode, setUpdateMode] = useState(false);

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
								<div className="flex justify-between gap-x-6">
									<div className="flex min-w-0 gap-x-4">
										<img
											className="h-12 w-12 flex-none rounded-full bg-gray-50"
											src={"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"}
											alt=""
										/>
										<div className="min-w-0 flex-auto">
											<p className="text-sm font-semibold leading-6 text-gray-900">
												{selectedEmployee.firstName} {selectedEmployee.lastName}
											</p>
											<p className="mt-1 truncate text-xs leading-5 text-gray-500">
												{selectedEmployee.email}
											</p>
										</div>
									</div>
									<div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
										<p className="text-sm leading-6 text-gray-900">
											{selectedEmployee.role}
										</p>
										<p className="mt-1 text-xs leading-5 text-gray-500">
											{selectedEmployee.team}
										</p>
									</div>
								</div>


								<div className="mt-6 border-t border-gray-100">
									<dl className="divide-y divide-gray-100">
										<div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
											<dt className="text-sm font-medium leading-6 text-gray-900">Role</dt>
											<dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
												<p className="flex-grow">
													{selectedEmployee.role}
													{selectedEmployee.isAdmin &&
														<span
															className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium
															text-red-700 ring-1 ring-inset ring-red-600/10 ml-2 sm:hidden"
														>
															Admin
														</span>
													}
												</p>
												{selectedEmployee.isAdmin &&
													<span
														className="sm:inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium
														text-red-700 ring-1 ring-inset ring-red-600/10 ml-2 hidden"
													>
														Admin
													</span>
												}
											</dd>
										</div>
										<div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
											<dt className="text-sm font-medium leading-6 text-gray-900">Team</dt>
											<dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
												<p className="flex-grow">
													{selectedEmployee.team}
													{selectedEmployee.isTL &&
														<span
															className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium
															text-green-700 ring-1 ring-inset ring-green-600/10 ml-2 sm:hidden"
														>
															TL
														</span>
													}
												</p>
												{selectedEmployee.isTL &&
													<span
														className="sm:inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium
														text-green-700 ring-1 ring-inset ring-green-600/10 ml-2 hidden"
													>
														TL
													</span>
												}
											</dd>
										</div>
										<div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
											<dt className="text-sm font-medium leading-6 text-gray-900">Birthday</dt>
											<dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
												<span className="flex-grow">{selectedEmployee.birthDay}</span>
											</dd>
										</div>
									</dl>

									<div className="mt-2 flex flex-row justify-end items-center gap-2">
										<OutlineButton label="Close" onClick={() => {
											setUpdateMode(false);
											setOpen(false);
										}}/>
										{!updateMode && <WarningButton label="Update" onClick={() => setUpdateMode(true)}/>}
										{updateMode && <SuccessButton label="Save" onClick={() => {}}/>}
										<DangerButton label="Delete" onClick={() => {}}/>
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
export default ViewEmployeeModal;