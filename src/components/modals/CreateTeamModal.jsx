import React, {Fragment, useState} from 'react';
import {Dialog, Transition,Combobox} from "@headlessui/react";
import {SecondaryButton, SuccessButton} from "../Button";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

const CreateTeamModal = (props) => {
	const {open, setOpen, teamName, setTeamName, clientName, setClientName, eligibleTeamLeads, teamLead, setTeamLead,
		createTeam} = props;

	const [query, setQuery] = useState('');

	const filteredPeople =
		query === ''
			? eligibleTeamLeads
			: eligibleTeamLeads.filter((person) => {
				return person.name.toLowerCase().includes(query.toLowerCase())
			})

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

									<div className="sm:flex-auto">
										<h1 className="text-base font-semibold leading-6 text-gray-900">Create a Project Team</h1>
										<p className="mt-1 mb-5 text-sm text-gray-700">
											Enter relevant details of new team.
										</p>
									</div>

									<div className="flex sm:flex-row flex-col gap-4 items-center justify-between mt-3 mb-2">
										<div className="w-full">
											<label htmlFor="team-name" className="block text-sm font-medium leading-6 text-gray-900">
												Team Name
											</label>
											<div className="mt-1">
												<input
													type="text"
													name="teamname"
													id="teamname"
													className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
													ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
													sm:text-sm sm:leading-6"
													value={teamName}
													onChange={(e) => setTeamName(e.target.value)}
												/>
											</div>
										</div>
										<div className="w-full">
											<label htmlFor="client-name" className="block text-sm font-medium leading-6 text-gray-900">
												Client Name
											</label>
											<div className="mt-1">
												<input
													type="text"
													name="clientname"
													id="clientname"
													className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
													ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
													sm:text-sm sm:leading-6"
													value={clientName}
													onChange={(e) => setClientName(e.target.value)}
												/>
											</div>
										</div>
									</div>

									<Combobox
										as="div"
										value={teamLead}
										onChange={(person) => {
											setQuery('')
											setTeamLead(person)
										}}
									>
										<p className="block text-sm font-medium leading-6 text-gray-900">Assigned to</p>
										<div className="relative mt-2">
											<Combobox.Input
												className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1
												ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm
												sm:leading-6"
												onChange={(event) => setQuery(event.target.value)}
												onBlur={() => setQuery('')}
												displayValue={(person) => person?.name}
											/>
											<Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2
											focus:outline-none">
												<ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
											</Combobox.Button>

											{filteredPeople.length > 0 && (
												<Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md
												bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
												sm:text-sm">
													{filteredPeople.map((person) => (
														<Combobox.Option
															key={person.id}
															value={person}
															className={({focus}) =>
																classNames(
																	'relative cursor-default select-none py-2 pl-3 pr-9',
																	focus ? 'bg-indigo-600 text-white' : 'text-gray-900'
																)
															}
														>
															{({focus, selected}) => (
																<>
																	<span className={classNames('block truncate', selected && 'font-semibold')}>
																		{person.name}
																	</span>

																	{selected && (
																		<span
																			className={classNames(
																				'absolute inset-y-0 right-0 flex items-center pr-4',
																				focus ? 'text-white' : 'text-indigo-600'
																			)}
																		>
                        							<CheckIcon className="h-5 w-5" aria-hidden="true"/>
                      							</span>
																	)}
																</>
															)}
														</Combobox.Option>
													))}
												</Combobox.Options>
											)}
										</div>
									</Combobox>

									<div className="flex flex-row items-center justify-between px-4 mt-6">
										<SecondaryButton
											label={'Cancel'}
											onClick={() => {
												setOpen(false);
											}}
										/>
										<SuccessButton label={'Create'} onClick={createTeam}/>
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
export default CreateTeamModal;