import React, {Fragment} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import {DangerButton, OutlineButton, PrimaryButton, SuccessButton, WarningButton} from "../Button";

const ViewNoticeModal = (props) => {
	const {open, setOpen, data, setData, onClickMarkAsViewed, updateMode, setUpdateMode, onClickUpdate, onClickSave,
		onClickDelete, loading, isAdmin} = props;

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
										{!updateMode ?
											<h3 className="text-base font-semibold leading-7 text-gray-900">
												{data.title}
											</h3> :
											<input
												type="text"
												name="title"
												id="title"
												className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
												ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
												sm:text-sm sm:leading-6"
												placeholder="Title"
												value={data.title}
												onChange={(e) => setData({...data, title: e.target.value})}
											/>
										}
										<div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
											<p className="whitespace-nowrap">
												Published on <time dateTime={data.createdOn}>
												{data.createdOn.split('T')[0]} at {data.createdOn.split('T')[1].split('.')[0]}
											</time>
											</p>
											<svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
												<circle cx={1} cy={1} r={1}/>
											</svg>
											<p className="truncate">Created by {data.createdBy}</p>
										</div>
									</div>
									{!updateMode ?
										<div className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
											{data.description}
										</div> :
										<textarea
											name="description"
											id="description"
											rows={5}
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
													ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
													sm:text-sm sm:leading-6"
											placeholder="Description"
											value={data.description}
											onChange={(e) => setData({...data, description: e.target.value})}
										/>
									}
									<div className="flex flex-row items-center justify-end gap-2 mt-4">
										<OutlineButton label={"Close"} onClick={() => setOpen(false)}/>
										{!loading && isAdmin && <>
											{!updateMode ?
												<WarningButton label={"Edit"} onClick={onClickUpdate}/> :
												<SuccessButton
													label={"Save"}
													onClick={() => {
														setUpdateMode(false);
														onClickSave();
													}}
												/>
											}
											<DangerButton label={"Delete"} onClick={onClickDelete}/>
										</>}
										{!data.viewed && <PrimaryButton label={"Mark as Viewed"} onClick={onClickMarkAsViewed}/>}
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

export default ViewNoticeModal;