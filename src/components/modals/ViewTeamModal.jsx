import React, {Fragment, useState} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import {DangerButton, OutlineButton, PrimaryButton, SuccessButton, WarningButton} from "../Button";

const ViewTeamModal = (props) => {
	const {
		open, setOpen, roles, selectedTeam, setSelectedTeam, setAddTeamMemberModalOpen, onClickSave, onClickDelete, isAdmin
	} = props;

	const [updateMode, setUpdateMode] = useState(false);

	// {
	// 	id: 1,
	// 	name: 'Team A',
	// 	client: 'Leslie Alexander',
	// 	members: [
	// 		{email: "john.doe@example.com", firstName: "John", lastName: "Doe", role: "Engineer", isTL: false},
	// 		{email: "jane.smith@example.com", firstName: "Jane", lastName: "Smith", role: "Engineer", isTL: false},
	// 		{email: "alice.jones@example.com", firstName: "Alice", lastName: "Jones", role: "Engineer", isTL: true},
	// 		{email: "bob.brown@example.com", firstName: "Bob", lastName: "Brown", role: "Engineer", isTL: false},
	// 		{email: "charlie.davis@example.com", firstName: "Charlie", lastName: "Davis", role: "Engineer", isTL: false},
	// 	],
	// }

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={() => {}}>
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
					<div className="flex min-h-full items-end lg:justify-end justify-center lg:mr-4 p-4 text-center
					sm:items-center sm:p-0">
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
								transition-all xl:w-10/12 lg:w-[78vw] w-[99vw] h-[80vh]"
							>
								{/*Modal body start*/}
								<div className="px-4 sm:px-6 lg:px-8">
									<div className="sm:flex sm:items-center">
										<div className="sm:flex-auto">
											{!updateMode ?
												<>
													<h1 className="text-xl font-semibold leading-6 text-gray-900">
														{selectedTeam.name}
													</h1>
													<p className="mt-2 text-sm text-gray-700">
														Client: {selectedTeam.client}
													</p>
												</> :
												<div className="flex flex-row gap-4">
													<div className="relative w-full">
														<label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
															Team Name
														</label>
														<input
															type="text"
															name="name"
															id="name"
															className="peer block w-full border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0
																sm:text-sm sm:leading-6"
															placeholder="Team name"
															value={selectedTeam.name}
															onChange={(e) =>
																setSelectedTeam({...selectedTeam, name: e.target.value})
															}
														/>
														<div
															className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2
																peer-focus:border-indigo-600"
															aria-hidden="true"
														/>
													</div>
													<div className="relative w-full">
														<label htmlFor="client" className="block text-sm font-medium leading-6 text-gray-900">
															Client
														</label>
														<input
															type="text"
															name="client"
															id="client"
															className="peer block w-full border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0
																sm:text-sm sm:leading-6"
															placeholder="Client"
															value={selectedTeam.client}
															onChange={(e) =>
																setSelectedTeam({...selectedTeam, client: e.target.value})
															}
														/>
														<div
															className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2
																peer-focus:border-indigo-600"
															aria-hidden="true"
														/>
													</div>
												</div>}
										</div>
										<div className="mt-4 sm:ml-16 sm:mt-0 flex flex-row gap-1">
											{isAdmin && <>
												{
													updateMode ?
														<>
															<PrimaryButton label="Add Member" onClick={() => setAddTeamMemberModalOpen(true)}/>
															<SuccessButton label="Save" onClick={onClickSave}/>
														</> :
														<WarningButton label="Update" onClick={() => setUpdateMode(true)}/>
												}
												<DangerButton label="Delete" onClick={onClickDelete}/>
											</>}
											<OutlineButton
												label="Close"
												onClick={() => {
													setUpdateMode(false);
													setOpen(false);
												}}/>
										</div>
									</div>
									<div className="mt-8 flow-root">
										<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
											<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 max-h-[55vh]">
												<table className="min-w-full divide-y divide-gray-300">
													<thead>
													<tr>
														<th scope="col" className="py-3.5 pl-4 pr-1 text-left text-sm font-semibold text-gray-900
														sm:pl-3">
															Name
														</th>
														<th scope="col" className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900">
															Type
														</th>
														<th scope="col" className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900">
															Email
														</th>
														<th scope="col" className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900">
															Role
														</th>
														{
															updateMode &&
															<th scope="col" className="relative py-3.5 pl-1 pr-4 sm:pr-3">
																<span className="sr-only">Options</span>
															</th>
														}
													</tr>
													</thead>
													<tbody className="bg-white">
													{selectedTeam.members.map((person) => (
														<tr key={person.email} className="even:bg-gray-50">
															<td
																className="whitespace-nowrap py-4 pl-4 pr-1 text-sm font-medium text-gray-900 sm:pl-3">
																{person.firstName} {person.lastName}
															</td>
															<td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500">
																{
																	!updateMode ?
																		person.isTL ?
																			<p className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs
																			font-medium text-green-600 ring-1 ring-inset ring-green-500/10">
																				Team Lead
																			</p> :
																			<p className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs
																			font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
																				Member
																			</p> :
																		<select
																			name="type"
																			id="type"
																			className="block w-fit rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
																			ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600
																			sm:text-sm sm:leading-6"
																			value={person.isTL ? "Team Lead" : "Member"}
																			onChange={(e) => {
																				setSelectedTeam({
																					...selectedTeam,
																					members: selectedTeam.members.map((m) => {
																						if (m.email === person.email)
																							return {...m, isTL: e.target.value === "Team Lead"};
																						return {...m, isTL: false};
																					})
																				});
																			}}
																		>
																			<option value="Member">Member</option>
																			<option value="Team Lead">Team Lead</option>
																		</select>
																}
															</td>
															<td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500">
																{person.email}
															</td>
															<td className="whitespace-nowrap px-1 py-4 text-sm text-gray-500">
																{
																	!updateMode ?
																		person.role :
																		<select
																			name="role"
																			id="role"
																			className="block w-fit rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
																			ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600
																			sm:text-sm sm:leading-6"
																			value={person.role}
																			onChange={(e) => {
																				setSelectedTeam({
																					...selectedTeam,
																					members: selectedTeam.members.map((m) => {
																						if (m.email === person.email)
																							return {...m, role: e.target.value};
																						return m;
																					})
																				});
																			}}
																		>
																			{roles.map(r => <option key={r.id} value={r.title}>{r.title}</option>)}
																		</select>
																}
															</td>
															{
																updateMode &&
																<td className="relative whitespace-nowrap py-4 pl-1 pr-1 text-right text-sm font-medium
																sm:pr-3">
																	<div
																		className="text-red-600 hover:text-red-900 cursor-pointer"
																		onClick={() => {
																			setSelectedTeam({
																				...selectedTeam,
																				members: selectedTeam.members.filter(m => m.email !== person.email)
																			});
																		}}
																	>
																		Remove
																	</div>
																</td>
															}
														</tr>
													))}
													</tbody>
												</table>
											</div>
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
export default ViewTeamModal;