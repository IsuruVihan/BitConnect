import React, {useState, useEffect} from "react";
import {Menu, Transition} from "@headlessui/react";
import {EllipsisVerticalIcon} from "@heroicons/react/20/solid";
import TLLeaveRequestDetailsModal from "../components/modals/TLLeaveRequestDetailsModal";
import ErrorModal from "../components/modals/ErrorModal";
import SuccessModal from "../components/modals/SuccessModal";
import ConfirmAcceptLeaveRequestModal from "../components/modals/ConfirmAcceptLeaveRequestModal";
import ConfirmRejectLeaveRequestModal from "../components/modals/ConfirmRejectLeaveRequestModal";
import {useAuth} from "../context/AuthContext";

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

const requestTypeStyles = {
	'Casual': 'text-gray-700 bg-gray-50 ring-gray-600/20',
	'Medical': 'text-blue-600 bg-blue-50 ring-blue-500/10',
}
const requestStatusStyles = {
	'Accepted': 'text-green-700 bg-green-50 ring-green-600/20',
	'Rejected': 'text-red-600 bg-red-50 ring-red-500/10',
	'Processing': 'text-yellow-600 bg-yellow-50 ring-yellow-500/10',
}

const LeaveRequests = () => {
	const {isTL, isAdmin, loading} = useAuth();

	const [detailsModalOpen, setDetailsModalOpen] = useState(false);
	const [getLeaveRequestDetailsErrorModalOpen, setGetLeaveRequestDetailsErrorModalOpen]
		= useState(false);
	const [getTeamMembersDetailsErrorModalOpen, setGetTeamMembersDetailsErrorModalOpen]
		= useState(false);
	const [confirmAcceptLeaveRequestModalOpen, setConfirmAcceptLeaveRequestModalOpen] = useState(false);
	const [acceptLeaveRequestSuccessModalOpen, setAcceptLeaveRequestSuccessModalOpen] = useState(false);
	const [acceptLeaveRequestErrorModalOpen, setAcceptLeaveRequestErrorModalOpen] = useState(false);
	const [confirmRejectLeaveRequestModalOpen, setConfirmRejectLeaveRequestModalOpen] = useState(false);
	const [rejectLeaveRequestSuccessModalOpen, setRejectLeaveRequestSuccessModalOpen] = useState(false);
	const [rejectLeaveRequestErrorModalOpen, setRejectLeaveRequestErrorModalOpen] = useState(false);

	const [teamMembers, setTeamMembers] = useState([]);
	const [searchEmployeeName, setSearchEmployeeName] = useState("");
	const [visibleTeamMembers, setVisibleTeamMembers] = useState([]);
	const [selectedTeamMember, setSelectedTeamMember] = useState(null);

	const [tabs, setTabs] = useState([
		{name: 'Accepted', count: '0', current: false},
		{name: 'Rejected', count: '0', current: false},
		{name: 'Processing', count: '0', current: true},
	]);
	const [leaveRequests, setLeaveRequests] = useState([]);
	const [selectedLeaveRequest, setSelectedLeaveRequest] = useState(null);
	const [visibleLeaveRequests, setVisibleLeaveRequests] = useState([]);

	const getTeamMembersData = async () => {
		try {
			return {
				result: await fetch(`http://localhost:4000/team-members`, {
					method: 'GET',
					headers: {
						'Authorization': 'Bearer ' + localStorage.getItem("token"),
					}
				}),
				error: false
			};
		} catch (error) {
			return {error: true};
		}
	}

	const getTeamLeaveRequestData = async () => {
		try {
			return {
				result: await fetch(`http://localhost:4000/leave-requests`, {
					method: 'GET',
					headers: {
						'Authorization': 'Bearer ' + localStorage.getItem("token"),
					}
				}),
				error: false
			};
		} catch (error) {
			return {error: true};
		}
	}

	const acceptLeaveRequest = async () => {
		try {
			return {
				result: await fetch(`http://localhost:4000/leave-requests/accept`, {
					method: 'POST',
					headers: {
						'Authorization': 'Bearer ' + localStorage.getItem("token"),
					},
					body: JSON.stringify({ requestId: selectedLeaveRequest.id }),
				}),
				error: false
			};
		} catch (error) {
			return {error: true};
		}
	}

	const rejectLeaveRequest = async () => {
		try {
			return {
				result: await fetch(`http://localhost:4000/leave-requests/reject`, {
					method: 'POST',
					headers: {
						'Authorization': 'Bearer ' + localStorage.getItem("token"),
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ requestId: selectedLeaveRequest.id }),
				}),
				error: false
			};
		} catch (error) {
			return {error: true};
		}
	}

	// Redirect to /attendance if not a TL or Admin
	useEffect(() => {
		// console.log(loading, isTL, isAdmin);
		if (!loading && !isTL && !isAdmin) {
			window.location.href = '/attendance';
		}
	}, [loading, isTL, isAdmin]);

	// get data
	useEffect(() => {
		getTeamMembersData()
			.then(r => r.result.json())
			.then((data) => {
				console.log("DATA: ", data);
				if (data.error) {
					setGetTeamMembersDetailsErrorModalOpen(true);
				} else {
					const tempTeam = [];
					data.team && data.team.map((person) => {
						tempTeam.push({
							id: person.Id,
							name: `${person.FirstName} ${person.LastName}`,
							email: person.Email,
							role: person.Role,
							imageUrl:
								'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
						});
					});
					setTeamMembers(tempTeam);
				}
			});

		getTeamLeaveRequestData()
			.then(r => r.result.json())
			.then((data) => {
				if (data.error) {
					setGetLeaveRequestDetailsErrorModalOpen(true);
				} else {
					const tempLeaveRequests = [];
					data.leaveRequests && data.leaveRequests.map((leaveRequest) => {
						const relevantTeamMember = teamMembers.filter((person) => person.id === leaveRequest.CreatedBy)[0];
						tempLeaveRequests.push({
							id: leaveRequest.Id,
							employeeEmail: leaveRequest.EmployeeEmail,
							employeeName: `${leaveRequest.EmployeeFirstName} ${leaveRequest.EmployeeLastName}`,
							createdOn: leaveRequest.CreatedOn.split("T")[0],
							from: leaveRequest.FromDate.split("T")[0],
							to: leaveRequest.ToDate.split("T")[0],
							type: leaveRequest.Type,
							reason: leaveRequest.Reason,
							status: leaveRequest.Status,
						});
					});
					setLeaveRequests(tempLeaveRequests);
				}
			});
	}, []);

	// update visible leave requests
	useEffect(() => {
		const tempVisibleLeaveRequests = leaveRequests.filter((r) =>
			(r.status === tabs.filter((t) => t.current)[0].name) &&
			(selectedTeamMember ? r.employeeEmail === selectedTeamMember.email : true)
		);
		setVisibleLeaveRequests(tempVisibleLeaveRequests);
	}, [leaveRequests, selectedTeamMember, tabs]);

	// update counts
	useEffect(() => {
		const temp = leaveRequests.filter(
			(r) => selectedTeamMember ? selectedTeamMember.email === r.employeeEmail : true
		);

		setTabs([
			{name: 'Accepted', count: temp.filter(t => t.status === "Accepted").length, current: false},
			{name: 'Rejected', count: temp.filter(t => t.status === "Rejected").length, current: false},
			{name: 'Processing', count: temp.filter(t => t.status === "Processing").length, current: true},
		]);
	}, [leaveRequests, selectedTeamMember]);

	// filter visible team members
	useEffect(() => {
		const trimmed = searchEmployeeName.trim().toLowerCase();
		setTimeout(() => {
			const tempVisibleEmployees
				= teamMembers.filter((person) => person.name.toLowerCase().includes(trimmed));
			setVisibleTeamMembers(tempVisibleEmployees);
		}, 2000);
	}, [teamMembers, searchEmployeeName]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="grid lg:grid-cols-5 grid-cols-1 gap-2">
			<>
				{selectedLeaveRequest && <TLLeaveRequestDetailsModal
					data={selectedLeaveRequest}
					open={detailsModalOpen}
					setOpen={setDetailsModalOpen}
					onClickAccept={() => setConfirmAcceptLeaveRequestModalOpen(true)}
					onClickReject={() => setConfirmRejectLeaveRequestModalOpen(true)}
				/>}
				<ErrorModal
					title={"Team Members Details"}
					message={"An error occurred while retrieving team members data. Please try again."}
					open={getTeamMembersDetailsErrorModalOpen}
					setOpen={setGetTeamMembersDetailsErrorModalOpen}
				/>
				<ErrorModal
					title={"Leave Request Details"}
					message={"An error occurred while retrieving leave request data. Please try again."}
					open={getLeaveRequestDetailsErrorModalOpen}
					setOpen={setGetLeaveRequestDetailsErrorModalOpen}
				/>

				<ConfirmAcceptLeaveRequestModal
					open={confirmAcceptLeaveRequestModalOpen}
					setOpen={setConfirmAcceptLeaveRequestModalOpen}
					onClickAccept={() => {
						acceptLeaveRequest()
							.then(r => {
								setDetailsModalOpen(false);
								setConfirmAcceptLeaveRequestModalOpen(false);
								if (r.error) {
									setAcceptLeaveRequestErrorModalOpen(true);
								} else {
									setAcceptLeaveRequestSuccessModalOpen(true);
								}
							})
					}}
				/>
				<SuccessModal
					title={"Accept Leave Request"}
					message={"Leave request has been accepted successfully."}
					open={acceptLeaveRequestSuccessModalOpen}
					setOpen={setAcceptLeaveRequestSuccessModalOpen}
				/>
				<ErrorModal
					title={"Accept Leave Request Details"}
					message={"An error occurred while accepting the leave request. Please try again."}
					open={acceptLeaveRequestErrorModalOpen}
					setOpen={setAcceptLeaveRequestErrorModalOpen}
				/>

				<ConfirmRejectLeaveRequestModal
					open={confirmRejectLeaveRequestModalOpen}
					setOpen={setConfirmRejectLeaveRequestModalOpen}
					onClickReject={() => {
						rejectLeaveRequest()
							.then(r => {
								setDetailsModalOpen(false);
								setConfirmRejectLeaveRequestModalOpen(false);
								if (r.error) {
									setRejectLeaveRequestErrorModalOpen(true);
								} else {
									setRejectLeaveRequestSuccessModalOpen(true);
								}
							})
					}}
				/>
				<SuccessModal
					title={"Reject Leave Request"}
					message={"Leave request has been rejected successfully."}
					open={rejectLeaveRequestSuccessModalOpen}
					setOpen={setRejectLeaveRequestSuccessModalOpen}
				/>
				<ErrorModal
					title={"Reject Leave Request Details"}
					message={"An error occurred while rejecting the leave request. Please try again."}
					open={rejectLeaveRequestErrorModalOpen}
					setOpen={setRejectLeaveRequestErrorModalOpen}
				/>
			</>

			{/*Team members*/}
			<div className="lg:col-span-2 rounded-md shadow-lg p-4">
				<div className="px-0">
					<h3 className="text-base font-semibold leading-7 text-gray-900">Employees</h3>
					<p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
						Employees of your team
					</p>
				</div>
				<div className="mt-2">
					<input
						type="text"
						name="name"
						id="name"
						className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
              placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						placeholder="Employee name"
						value={searchEmployeeName}
						onChange={(e) => setSearchEmployeeName(e.target.value)}
					/>
				</div>
				{visibleTeamMembers.length > 0 ? <ul role="list" className="divide-y divide-gray-100 max-h-[65vh] overflow-y-auto">
					{visibleTeamMembers.map((person) => (
						<li
							key={person.email}
							className={`flex justify-between gap-x-6 p-5 rounded hover:bg-gray-200 cursor-pointer
								${selectedTeamMember && selectedTeamMember.email === person.email && 'bg-gray-200'}
							`}
							onClick={() => {
								if (selectedTeamMember) {
									if (selectedTeamMember.email === person.email) {
										setSelectedTeamMember(null);
									} else {
										setSelectedTeamMember(person);
									}
								} else {
									setSelectedTeamMember(person);
								}
							}}
						>
							<div className="flex min-w-0 gap-x-4">
								<img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt=""/>
								<div className="min-w-0 flex-auto">
									<p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
									<p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
								</div>
							</div>
							<div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
								<p className="text-sm leading-6 text-gray-900">{person.role}</p>
							</div>
						</li>
					))}
				</ul> : <div className="text-gray-500 p-4 text-center">No matching employees</div>}
			</div>

			{/*Leave requests*/}
			<div className="lg:col-span-3 rounded-md shadow-lg p-4">
				<div className="px-0">
					<h3 className="text-base font-semibold leading-7 text-gray-900">Leave Requests</h3>
					<p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
						Leave requests submitted by your team employees.
					</p>
				</div>
				<div className="sm:hidden">
					<label htmlFor="tabs" className="sr-only">
						Select a tab
					</label>
					<select
						id="tabs"
						name="tabs"
						className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500
							focus:outline-none focus:ring-indigo-500 sm:text-sm"
						defaultValue={tabs.find((tab) => tab.current).name}
					>
						{tabs.map((tab) => (
							<option key={tab.name}>{tab.name}</option>
						))}
					</select>
				</div>
				<div className="hidden sm:block">
					<div className="border-b border-gray-200">
						<nav className="-mb-px flex space-x-8" aria-label="Tabs">
							{tabs.map((tab) => (
								<div
									key={tab.name}
									className={classNames(
										tab.current
											? 'border-indigo-500 text-indigo-600'
											: 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
										'flex whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium cursor-pointer'
									)}
									aria-current={tab.current ? 'page' : undefined}
									onClick={() => {
										const tempTabs = tabs.map((t) => {
											if (tab.name === t.name)
												return {name: t.name, count: t.count, current: true};
											return {name: t.name, count: t.count, current: false};
										});
										setTabs(tempTabs);
									}}
								>
									{tab.name}
									{tab.count ? (
										<span
											className={classNames(
												tab.current ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-900',
												'ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block'
											)}
										>
                    {tab.count}
                  </span>
									) : null}
								</div>
							))}
						</nav>
					</div>
				</div>
				<div>
					<ul role="list" className="divide-y divide-gray-100 max-h-[65vh] overflow-x-hidden overflow-y-auto">
						{visibleLeaveRequests.length > 0 ? visibleLeaveRequests.map((request, idx) => (
							<li
								key={idx}
								className="flex items-center justify-between gap-x-6 py-5 cursor-pointer"
							>
								<div className="min-w-0">
									<div className="flex items-start gap-x-3">
										<p className="text-sm font-semibold leading-6 text-gray-900">{request.reason}</p>
										<p
											className={classNames(
												requestTypeStyles[request.type],
												'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
											)}
										>
											{request.type}
										</p>
										<p
											className={classNames(
												requestStatusStyles[request.status],
												'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
											)}
										>
											{request.status}
										</p>
									</div>
									<div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
										<p className="whitespace-nowrap">
											From <time dateTime={request.from}>{request.from}</time>
										</p>
										<svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
											<circle cx={1} cy={1} r={1}/>
										</svg>
										<p className="whitespace-nowrap">
											To <time dateTime={request.to}>{request.to}</time>
										</p>
										<svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
											<circle cx={1} cy={1} r={1}/>
										</svg>
										<p className="truncate">Created by {request.employeeName}</p>
									</div>
								</div>
								<div className="flex flex-none items-center gap-x-4">
									<div
										className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm
										ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
										onClick={() => {
											setSelectedLeaveRequest({
												id: request.id,
												employeeEmail: request.employeeEmail,
												employeeName: request.employeeName,
												createdOn: request.createdOn,
												from: request.from,
												to: request.to,
												type: request.type,
												reason: request.reason,
												status: request.status,
											});
											setDetailsModalOpen(true);
										}}
									>
										View
									</div>
									<Menu as="div" className="relative flex-none">
										<Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
											<span className="sr-only">Open options</span>
											<EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true"/>
										</Menu.Button>
										<Transition
											enter="transition ease-out duration-100"
											enterFrom="transform opacity-0 scale-95"
											enterTo="transform opacity-100 scale-100"
											leave="transition ease-in duration-75"
											leaveFrom="transform opacity-100 scale-100"
											leaveTo="transform opacity-0 scale-95"
										>
											<Menu.Items
												className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg
												ring-1 ring-gray-900/5 focus:outline-none"
											>
												{[
													{
														label: 'View', onClick: () => {
															setSelectedLeaveRequest({
																id: request.id,
																employeeEmail: request.employeeEmail,
																employeeName: request.employeeName,
																createdOn: request.createdOn,
																from: request.from,
																to: request.to,
																type: request.type,
																reason: request.reason,
																status: request.status,
															});
															setDetailsModalOpen(true);
														}
													},
													{
														label: 'Accept', onClick: () => {
														}
													},
													{
														label: 'Reject', onClick: () => {
														}
													},
												].map((obj, idx) => <Menu.Item key={idx}>
													{({focus}) =>
														<div
															className={classNames(
																focus ? 'bg-gray-50' : '',
																'block px-3 py-1 text-sm leading-6 text-gray-900'
															)}
															onClick={obj.onClick}
														>
															{obj.label}
														</div>
													}
												</Menu.Item>)}
											</Menu.Items>
										</Transition>
									</Menu>
								</div>
							</li>
						)) : <div className="text-gray-500 p-4 text-center">No matching leave requests</div>}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default LeaveRequests;