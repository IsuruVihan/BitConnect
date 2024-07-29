import React from "react";
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import UserImage from "../UserImage";

const ChatListModal = (props) => {
	const {open, setOpen, visibleContactList, searchContact, setSearchContact, setSelectedContact} = props;

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
								<div>
									<div className="p-4">
										<div>
											<input
												type="text"
												name="text"
												id="text"
												className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
												ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
												sm:text-sm sm:leading-6"
												placeholder="Search employee"
												value={searchContact}
												onChange={(e) => setSearchContact(e.target.value)}
											/>
										</div>
									</div>
									<div className="h-[68vh] overflow-y-auto">
										<ul role="list" className="flex flex-col divide-y divide-gray-100 gap-2">
											{visibleContactList && visibleContactList.map((person) => (
												<li
													key={person.email}
													className="flex items-center py-3 pl-3"
													onClick={() => {
														setSelectedContact(person);
														setOpen(false);
													}}
												>
													<div className="flex min-w-0 gap-x-4 justify-center align-middle">
														{!['', null].includes(person.profilePicture) ?
															<img
																className="h-12 w-12 flex-none rounded-full bg-gray-50"
																src={person.profilePicture}
																alt=""
															/> :
															<UserImage size={12}/>
														}
														<div className="min-w-0 flex-auto">
															<p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
															<p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
														</div>
													</div>
												</li>
											))}
										</ul>
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
}

export default ChatListModal;