import React, {Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";

const items = [
	{ id: 1 },
	// More items...
]

const NotificationsModal = (props) => {
	const {open, setOpen} = props ;

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
											<h1 className="text-base font-semibold leading-6 text-gray-900">Notification</h1>
											{/*<p className="mt-2 text-sm text-gray-700">*/}
											{/*	Reset your password to a new.*/}
											{/*</p>*/}
										</div>
									</div>

									{/*cards*/}
									<div className="overflow-hidden rounded-md bg-white shadow">
										<ul role="list" className="divide-y divide-gray-200">
											{items.map((item) => (
												<li key={item.id} className="px-6 py-4">
													{/* Your content */}
												</li>
											))}
										</ul>
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
export default NotificationsModal;