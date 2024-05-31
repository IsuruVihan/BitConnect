import React, {Fragment} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import {SecondaryButton, SuccessButton} from "../Button";

const CreateCourseModal = (props) => {
	const {open, setOpen} = props;

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
								<div className="sm:flex sm:items-center mb-4">
									<div className="sm:flex-auto">
										<h1 className="text-base font-semibold leading-6 text-gray-900">Create a Course Module</h1>
									</div>
								</div>

								<div className="mt-2">
									<label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
										Title
									</label>
									<div className="mt-2">
										<input
											id="title"
											name="title"
											type="text"
											autoComplete="title"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                      ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                      sm:text-sm sm:leading-6"
										/>
									</div>
								</div>

								<div className="mt-2">
									<label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
										Description
									</label>
									<div className="mt-2">
										<input
											type="text"
											name="description"
											id="description"
											autoComplete="description"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                      ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                      sm:text-sm sm:leading-6"
										/>
									</div>
								</div>

								<div className="mt-2">
									<label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
										Type
									</label>
									<div className="mt-2">
										<select
											id="type"
											name="type"
											autoComplete="type"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                      ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm
                      sm:leading-6"
										>
											<option value="Company Rules & Regulations">Company Rules & Regulations</option>
											<option value="Soft Skills">Soft Skills</option>
											<option value="Technical Skills">Technical Skills</option>
										</select>
									</div>
								</div>

								<div className="mt-2">
									<label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
										Course module PDF
									</label>
									<div
										className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-2">
										<div className="text-center">
											<div className="flex text-sm leading-6 text-gray-600">
												<label
													htmlFor="file-upload"
													className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600
                          focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600
                          focus-within:ring-offset-2 hover:text-indigo-500"
												>
													<span>Upload a PDF</span>
													<input id="file-upload" name="file-upload" type="file" className="sr-only"/>
												</label>
											</div>
										</div>
									</div>
								</div>

								<div className="mt-4 flex flex-row justify-end gap-2">
									<SecondaryButton label="Cancel" onClick={() => setOpen(false)}/>
									<SuccessButton label="Publish" onClick={() => {}}/>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default CreateCourseModal;