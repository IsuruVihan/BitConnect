import React, {Fragment, useState} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import {SecondaryButton, SuccessButton} from "../Button";
import {CheckCircleIcon, XCircleIcon, E} from "@heroicons/react/20/solid";
import ShowPassword from "../ShowPassword";

const ResetPasswordModal = (props) => {
	const {open, setOpen, currentPassword, setCurrentPassword, newPassword, setNewPassword, retypePassword, setRetypePassword, resetPassword} = props ;

	// show passwords
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showRetypePassword, setShowRetypePassword] = useState(false);

	const emptyCurrentPassword = currentPassword.trim() === "";
	const emptyNewPassword = newPassword.trim() === "";
	const emptyRetypePassword = retypePassword.trim() === "";
	const notEqualPassword = newPassword !== retypePassword;

	return(
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
										<h1 className="text-base font-semibold leading-6 text-gray-900">Reset Password</h1>
										<p className="mt-2 text-sm text-gray-700">
											Reset your password to a new.
										</p>
									</div>
								</div>

								{/*current password*/}
								<div className="w-full mt-3">
									<label htmlFor="current-password" className="block text-sm font-medium leading-6 text-gray-900">
										Current Password
									</label>
									<div className="mt-2 flex flex-row justify-between items-center gap-2">
										<input
											type={showCurrentPassword ? "text" : "password"}
											name="current"
											id="current"
											autoComplete="current"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6"
											value={currentPassword}
											onChange={(e) => setCurrentPassword(e.target.value)}
										/>
										<ShowPassword
											showPassword={showCurrentPassword}
											setShowPassword={setShowCurrentPassword}
										/>
									</div>
								</div>
								{/*new password*/}
								<div className="w-full mt-4">
									<label htmlFor="new-password" className="block text-sm font-medium leading-6 text-gray-900">
										New Password
									</label>
									<div className="mt-2 flex flex-row justify-between items-center gap-2">
										<input
											type={showNewPassword ? "text" : "password"}
											name="new"
											id="new"
											autoComplete="new"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6"
											value={newPassword}
											onChange={(e) => setNewPassword(e.target.value)}
										/>
										<ShowPassword
											showPassword={showNewPassword}
											setShowPassword={setShowNewPassword}
										/>
									</div>
								</div>
								{/*retyped password*/}
								<div className="w-full mt-4">
									<label htmlFor="retpye-password" className="block text-sm font-medium leading-6 text-gray-900">
										Retype New Password
									</label>
									<div className="mt-2 flex flex-row justify-between items-center gap-2">
										<input
											type={showRetypePassword ? "text" : "password"}
											name="retype"
											id="retype"
											autoComplete="retype"
											className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                        ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                        sm:text-sm sm:leading-6"
											value={retypePassword}
											onChange={(e) => setRetypePassword(e.target.value)}
										/>
										<ShowPassword
											showPassword={showRetypePassword}
											setShowPassword={setShowRetypePassword}
										/>
									</div>
								</div>
								<div className="mt-2">
								{
										(emptyCurrentPassword || emptyNewPassword || emptyRetypePassword || notEqualPassword) ?
											<div className="rounded-md bg-red-50 p-4">
												<div className="flex">
													<div className="flex-shrink-0">
														<XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true"/>
													</div>
													<div className="ml-3">
														<h3 className="text-sm font-medium text-red-800">
															There are few with your submission
														</h3>
														<div className="mt-2 text-sm text-red-700">
															<ul role="list" className="list-disc space-y-1 pl-5">
																{emptyCurrentPassword && <li>Current Password cannot be empty</li>}
																{emptyNewPassword && <li>New Password cannot be empty</li>}
																{emptyRetypePassword && <li>Retype Password cannot be empty</li>}
																{notEqualPassword && <li>Retype Password is not matching</li>}
															</ul>
														</div>
													</div>
												</div>
											</div> :
											<div className="rounded-md bg-green-50 p-4">
												<div className="flex">
													<div className="flex-shrink-0">
														<CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true"/>
													</div>
													<div className="ml-3">
														<p className="text-sm font-medium text-green-800">All good!</p>
													</div>
												</div>
											</div>
									}
								</div>
								<div className="flex flex-row items-center justify-between px-4 mt-6">
									<SecondaryButton
										label={'Cancel'}
										onClick={() => {
											setCurrentPassword('');
											setNewPassword('');
											setRetypePassword('');
											setShowCurrentPassword(false);
											setShowNewPassword(false);
											setShowRetypePassword(false);
											setOpen(false)
											}
										}
									/>
									<SuccessButton
										label={'Reset'}
										onClick={resetPassword}
										disabled={emptyCurrentPassword || emptyNewPassword || emptyRetypePassword || notEqualPassword}
									/>
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
export default ResetPasswordModal;