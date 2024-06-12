import React, {Fragment, useEffect, useState} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import {OutlineButton, PrimaryButton, SecondaryButton} from "../Button";

const AddTeamMemberModal = (props) => {
	const {open, setOpen, eligibleEmployees, addedEmployees, setAddedEmployees, addTeamMembers} = props;

	const [visibleEmployees, setVisibleEmployees] = useState([]);
	const [searchEmployeeName, setSearchEmployeeName] = useState("");

	useEffect(() => {
		setTimeout(() => {
			const tempVisibleEmployees = eligibleEmployees.filter((e) => {
				const fullName = e.firstName + e.lastName;
				return fullName.toLowerCase().trim().includes(searchEmployeeName.toLowerCase().trim()) ||
					addedEmployees.includes(e);
			})
			setVisibleEmployees(tempVisibleEmployees);
		}, 1000);
	}, [eligibleEmployees, searchEmployeeName]);

	const reset = () => {
		setSearchEmployeeName("");
		setAddedEmployees([]);
	}

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
								<div className=" sm:items-center border-red-500">
									<div className="bg-white mb-2">
										<div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
											<div className="ml-4 mt-4">
												<h3 className="text-base font-semibold leading-6 text-gray-900">Add a Team Member</h3>
												<p className="mt-1 text-sm text-gray-500">
													Select new team members.
												</p>
											</div>
											<div className="ml-4 mt-4 flex-shrink-0 flex gap-1">
												<PrimaryButton label="Done" onClick={() => {}}/>
												<SecondaryButton
													label="Reset"
													onClick={reset}
												/>
												<OutlineButton
													label="Close"
													onClick={() => {
														reset();
														setOpen(false);
													}}
												/>
											</div>
										</div>
									</div>

									<div>
										<input
											type="text"
											name="search"
											id="search"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
													ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
													sm:text-sm sm:leading-6"
											value={searchEmployeeName}
											onChange={(e) => setSearchEmployeeName(e.target.value)}
											placeholder="Search employee"
										/>
										<div className="mt-2 flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
											{visibleEmployees.map((employee) => {
												return (
													<div key={employee.email} className="py-2 px-4 flex flex-row justify-between items-center">
														<div>
															<p>{employee.firstName} {employee.lastName}</p>
															<p className="text-sm text-gray-500">{employee.email}</p>
														</div>
														<div>
															{
																addedEmployees.includes(employee) ?
																	<div
																		className="text-red-600 hover:text-red-900 cursor-pointer"
																		onClick={() => setAddedEmployees(
																			addedEmployees.filter(e => e.email !== employee.email)
																		)}
																	>
																		Remove
																	</div> :
																	<div
																		className="text-green-600 hover:text-green-900 cursor-pointer"
																		onClick={() => setAddedEmployees([...addedEmployees, employee])}
																	>
																		Add
																	</div>
															}
														</div>
													</div>
												);
											})}
										</div>
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
export default AddTeamMemberModal;