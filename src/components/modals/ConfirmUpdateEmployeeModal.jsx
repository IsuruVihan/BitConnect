import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import {PrimaryButton, SecondaryButton} from "../Button";

const ConfirmUpdateEmployeeModal = ({open, setOpen, onClickComplete}) => {
	return (
		<Transition show={open}>
			<Dialog className="relative z-10" onClose={setOpen}>
				<Transition.Child
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
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left
							shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
								<div className="sm:flex sm:items-start">
									<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full
									bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
										<ExclamationTriangleIcon className="h-6 w-6 text-yellow-600" aria-hidden="true" />
									</div>
									<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
										<Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
											Confirm Update Employee Account
										</Dialog.Title>
										<div className="mt-2">
											<p className="text-sm text-gray-500">
												Are you sure you want to update this employee account with relevant?
											</p>
										</div>
									</div>
								</div>
								<div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-2">
									<PrimaryButton
										label="Update"
										onClick={() => {
											onClickComplete();
											setOpen(false);
										}}
									/>
									<SecondaryButton label="Cancel" onClick={() => setOpen(false)}/>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}

export default ConfirmUpdateEmployeeModal;