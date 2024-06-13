import React from "react";
import {Fragment} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {PhotoIcon} from "@heroicons/react/16/solid";
import {SecondaryButton, SuccessButton} from "../Button";

const CreatePostModal = (props) => {
	const {open, setOpen, newPostTitle, setNewPostTitle, newPostDescription, setNewPostDescription, newPostAttachment,
		setNewPostAttachment, sharePost} = props;

	const emptyTitle = newPostTitle.trim() === "";
	const emptyDescription = newPostDescription.trim() === "";

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
								<form>
									<div className="space-y-6">
										<div className="border-b border-gray-900/10 pb-12">
											<h2 className="text-base font-semibold leading-7 text-gray-900">Create Post</h2>
											<div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
												<div className="sm:col-span-4">
													<label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
														Title
													</label>
													<div className="mt-2">
														<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300
														focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
															<input
																type="text"
																name="title"
																id="title"
																autoComplete="title"
																className="w-full border-0 bg-transparent py-1.5 pl-3 text-gray-900
																focus:ring-0 sm:text-sm sm:leading-6"
																value={newPostTitle}
																onChange={(e) => setNewPostTitle(e.target.value)}
															/>
														</div>
													</div>
												</div>
												<div className="col-span-full">
													<label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
														About
													</label>
													<div className="mt-2">
                						<textarea
															id="about"
															name="about"
															rows={2}
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
															ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
															focus:ring-indigo-600 sm:text-sm sm:leading-6"
															value={newPostDescription}
															onChange={(e) => setNewPostDescription(e.target.value)}
														/>
													</div>
												</div>
												<div className="col-span-full">
													<label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
														Cover photo
													</label>
													<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25
														px-6 py-4"
													>
														<div className="text-center">
															<PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true"/>
															<div className="mt-4 flex text-sm leading-6 text-gray-600">
																<label
																	htmlFor="file-upload"
																	className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600
																	focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600
																	focus-within:ring-offset-2 hover:text-indigo-500"
																>
																	<span>Upload a file</span>
																	<input
																		id="file-upload"
																		name="file-upload"
																		type="file"
																		className="sr-only"
																		onChange={(e) => {
																			setNewPostAttachment(e.target.files[0])
																		}}
																		accept="image/*"
																	/>
																</label>
																<p className="pl-1">or drag and drop</p>
															</div>
															<p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="mt-2 flex items-center justify-end gap-x-6">
										<SecondaryButton
											label="Cancel"
											onClick={() => {
												setNewPostTitle('');
												setNewPostDescription('');
												setNewPostAttachment(null);
												setOpen(false);
											}}
										/>
										<SuccessButton
											label="Share"
											onClick={sharePost}
										/>
									</div>
								</form>
								{/*Modal body end*/}


							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

export default CreatePostModal;
