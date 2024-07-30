import React, {Fragment, useMemo, useState} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import {DangerButton, OutlineButton, PrimaryButton, SuccessButton, WarningButton} from "../Button";
import CreateAttendanceReportModal from "./CreateAttendanceReportModal";
import AttendanceReportGenerator from "../reports/AttendanceReportGenerator";
import LeaveReportGenerator from "../reports/LeaveReportGenerator";
import CreateLeaveReportModal from "./CreateLeaveReportModal";
import ErrorModal from "./ErrorModal";


const ViewEmployeeModal = (props) => {
	const {open, setOpen, selectedEmployee, setSelectedEmployee, isAdmin, isTL, onClickSave, onClickDelete, teams,
		roles} = props;

	const [updateMode, setUpdateMode] = useState(false);

	const emptyFirstName = selectedEmployee.firstName.trim() === "";
	const emptyLastName = selectedEmployee.lastName.trim() === "";

	// attendance report
	const [fromDateAttendance, setFromDateAttendance] = useState('');
	const [toDateAttendance, setToDateAttendance] = useState('');

	const [reportDataAttendance, setReportDataAttendance] = useState(null);

	const [openCreateAttendanceReportModal, setOpenCreateAttendanceReportModal] = useState(false);
	const [generateAttendanceReportErrorModalOpen, setGenerateAttendanceReportErrorModalOpen]
		= useState(false);
	const [pdfModalOpenAttendance, setPDFModalOpenAttendance] = useState(false);

	// // leave report
	const leaveTypesReport = useMemo(() => [
		{id: 1, label: 'All', value: 'All'},
		{id: 2, label: 'Casual Leave', value: 'Casual'},
		{id: 3, label: 'Medical Leave', value: 'Medical'},
	], []);
	const [leaveType, setLeaveType] = useState(leaveTypesReport[0]);
	const [openCreateLeaveReportModal, setOpenCreateLeaveReportModal] = useState(false);
	const [fromDateLeave, setFromDateLeave] = useState('');
	const [toDateLeave, setToDateLeave] = useState('');
	const [pdfModalOpenLeave, setPDFModalOpenLeave] = useState(false);
	const [reportDataLeave, setReportDataLeave] = useState(null);


	const handleAttendanceGenerateReport = async () => {
		if (fromDateAttendance !== '' && toDateAttendance !== '') {
			const fromD = new Date(fromDateAttendance);
			const toD = new Date(toDateAttendance);
			if (fromD <= toD) {
				try {
					await fetch(`${process.env.REACT_APP_API_URL}/attendance-report?from=${fromDateAttendance}&to=${toDateAttendance}`, {
						method: 'POST',
						headers: {
							'Authorization': 'Bearer ' + localStorage.getItem("token"),
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({email: selectedEmployee.email}),
					})
						.then(r => r.json())
						.then((data) => {
							console.log(selectedEmployee)
							const reportD = {
								currentDate: '',
								currentTime: '',
								from: fromDateAttendance,
								to: toDateAttendance,
								employeeName: selectedEmployee.firstName + ' ' + selectedEmployee.lastName,
								employeeEmail: selectedEmployee.email,
								employeeRole: selectedEmployee.role,
								data: data.data.map(item => ({
									date: item.CheckInDate ? new Date(item.CheckInDate).toISOString().substr(0, 10) : null,
									CheckInTime: item.CheckInTime ? new Date(item.CheckInTime).toISOString().substr(11, 5) :
										'',
									CheckOutTime: item.CheckOutTime ? new Date(item.CheckOutTime).toISOString().substr(11, 5) :
										''
								})),
							};
							setReportDataAttendance(reportD);
							setPDFModalOpenAttendance(true);
						});
				} catch (error) {
					setGenerateAttendanceReportErrorModalOpen(true);
				}
			}
		}
	}

	// const handleLeaveGenerateReport = () => {
	// 	const filteredData = leaveRecords.filter((record) => {
	// 		const fd = new Date(record.FromDate);
	// 		const td = new Date(record.ToDate);
	// 		const fdr = new Date(fromDateLeave);
	// 		const tdr = new Date(toDateLeave);
	//
	// 		return fdr <= fd && tdr >= td && (leaveType.value === "All" ? true : leaveType.value === record.Type);
	// 	});
	//
	// 	setReportDataLeave({
	// 		from: fromDateLeave ,
	// 		to: toDateLeave,
	// 		type: leaveType,
	// 		rows: filteredData,
	// 	});
	//
	// 	setPDFModalOpenLeave(true);
	// };

	return (
		<>
		{/*under construction - start*/}
		{/*	attendance report*/}
		{reportDataAttendance && <AttendanceReportGenerator open={pdfModalOpenAttendance} setOpen={setPDFModalOpenAttendance} data={reportDataAttendance}/>}
		<CreateAttendanceReportModal
			open={openCreateAttendanceReportModal}
			setOpen={setOpenCreateAttendanceReportModal}
			fromDate={fromDateAttendance}
			toDate={toDateAttendance}
			setFromDate={setFromDateAttendance}
			setToDate={setToDateAttendance}
			generateReport={handleAttendanceGenerateReport}
		/>
		<ErrorModal
			title={"Generate Attendance Report"}
			message={"An error occurred while generating the attendance report. Please try again."}
			open={generateAttendanceReportErrorModalOpen}
			setOpen={setGenerateAttendanceReportErrorModalOpen}
		/>
		{/*/!*leave report*!/*/}
		{/*{reportDataLeave && <LeaveReportGenerator open={pdfModalOpenLeave} setOpen={setPDFModalOpenLeave} reportData={reportDataLeave}/>}*/}
		{/*<CreateLeaveReportModal*/}
		{/*	open={openCreateLeaveReportModal}*/}
		{/*	setOpen={setOpenCreateLeaveReportModal}*/}
		{/*	fromDate={fromDateLeave}*/}
		{/*	toDate={toDateLeave}*/}
		{/*	leaveType={leaveType}*/}
		{/*	setFromDate={setFromDateLeave}*/}
		{/*	setToDate={setToDateLeave}*/}
		{/*	setLeaveType={setLeaveType}*/}
		{/*	generateReport={handleLeaveGenerateReport}*/}
		{/*/>*/}

		{/*under construction - end*/}
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
								{!updateMode && <div className="flex justify-between gap-x-6">
									<div className="flex min-w-0 gap-x-4">
										<img
											className="h-12 w-12 flex-none rounded-full bg-gray-50"
											src={"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"}
											alt=""
										/>
										<div className="min-w-0 flex-auto">
											<p className="text-sm font-semibold leading-6 text-gray-900">
												{selectedEmployee.firstName} {selectedEmployee.lastName}
											</p>
											<p className="mt-1 truncate text-xs leading-5 text-gray-500">
												{selectedEmployee.email}
											</p>
										</div>
									</div>
									<div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
										<p className="text-sm leading-6 text-gray-900">
											{selectedEmployee.role}
										</p>
										{!selectedEmployee.isAdmin ?
											<p className="mt-1 text-xs leading-5 text-gray-500">
												{selectedEmployee.team}
											</p> :
											<p className="sm:inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium
											text-red-700 ring-1 ring-inset ring-red-600/10 ml-2 hidden">
												Admin
											</p>
										}
									</div>
								</div>}

								<div className="mt-6 border-t border-gray-100">
									<dl className="divide-y divide-gray-100">
										<div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
											<dt className="text-sm font-medium leading-6 text-gray-900">First name</dt>
											<dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
												{!updateMode ?
													selectedEmployee.firstName :
													<input
														type="text"
														name="first-name"
														id="first-name"
														className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
														ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
														sm:text-sm sm:leading-6"
														placeholder="First name"
														value={selectedEmployee.firstName}
														onChange={(e) =>
															setSelectedEmployee({...selectedEmployee, firstName: e.target.value})
														}
													/>
												}
											</dd>
										</div>
										<div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
											<dt className="text-sm font-medium leading-6 text-gray-900">Last name</dt>
											<dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
												{!updateMode ?
													selectedEmployee.lastName :
													<input
														type="text"
														name="last-name"
														id="last-name"
														className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
														ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
														sm:text-sm sm:leading-6"
														placeholder="First name"
														value={selectedEmployee.lastName}
														onChange={(e) =>
															setSelectedEmployee({...selectedEmployee, lastName: e.target.value})
														}
													/>
												}
											</dd>
										</div>
										{!selectedEmployee.isAdmin && <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
											<dt className="text-sm font-medium leading-6 text-gray-900">Role</dt>
											<dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
												<p className="flex-grow">
													{!updateMode ?
														selectedEmployee.role :
														<select
															name="role"
															id="role"
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
															ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm
															sm:leading-6"
															value={selectedEmployee.role}
															onChange={(e) =>
																setSelectedEmployee({...selectedEmployee, role: e.target.value})
															}
														>
															{roles.map(r => <option key={r.id} value={r.title}>{r.title}</option>)}
														</select>
													}
												</p>
											</dd>
										</div>}
										{!selectedEmployee.isAdmin && <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
											<dt className="text-sm font-medium leading-6 text-gray-900">Team</dt>
											<dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
												<div className="flex-grow">
													{!updateMode ?
														selectedEmployee.team :
														<select
															name="team"
															id="team"
															className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
															ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm
															sm:leading-6"
															value={selectedEmployee.team}
															onChange={(e) =>
																setSelectedEmployee({...selectedEmployee, team: e.target.value})
															}
														>
															{teams.map((t) => {
																if (t.name.toLowerCase().trim() !== "admin")
																	return <option key={t.id} value={t.name}>{t.name}</option>;
															})}
														</select>
													}
													{!updateMode && selectedEmployee.isTL &&
														<p className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium
														text-green-700 ring-1 ring-inset ring-green-600/10 ml-2 sm:hidden">
															Team Lead
														</p>
													}
												</div>
												{!updateMode && selectedEmployee.isTL &&
													<p className="sm:inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium
													text-green-700 ring-1 ring-inset ring-green-600/10 ml-2 hidden">
														Team Lead
													</p>
												}
											</dd>
										</div>}
										<div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
											<dt className="text-sm font-medium leading-6 text-gray-900">Birthday</dt>
											<dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
												{!updateMode ?
													selectedEmployee.birthDay :
													<input
														type="date"
														name="birthday"
														id="birthday"
														className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
														ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
														sm:text-sm sm:leading-6"
														value={selectedEmployee.birthDay}
														onChange={(e) =>
															setSelectedEmployee({...selectedEmployee, birthDay: e.target.value})
														}
													/>
												}
											</dd>
										</div>
										{updateMode &&
											<div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
												<dt className="text-sm font-medium leading-6 text-gray-900">Type</dt>
												<dd className="mt-1 flex flex-col text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
													<div className="relative flex items-start">
														<div className="flex h-6 items-center">
															<input
																id="team-member"
																name="team-member"
																type="checkbox"
																className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
																checked={(!selectedEmployee.isAdmin) && (!selectedEmployee.isTL)}
																onChange={(e) =>
																	setSelectedEmployee({
																		...selectedEmployee,
																		isTL: (!e.target.checked) && (selectedEmployee.isTL),
																	})
																}
																disabled={selectedEmployee.isAdmin}
															/>
														</div>
														<div className="ml-3 text-sm leading-6">
															<label htmlFor="team-member" className="font-medium text-gray-900">
																Team member
															</label>
														</div>
													</div>
													<div className="relative flex items-start">
														<div className="flex h-6 items-center">
															<input
																id="team-lead"
																name="team-lead"
																type="checkbox"
																className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
																checked={selectedEmployee.isTL}
																onChange={(e) =>
																	setSelectedEmployee({
																		...selectedEmployee,
																		isTL: e.target.checked,
																	})
																}
																disabled={selectedEmployee.isAdmin}
															/>
														</div>
														<div className="ml-3 text-sm leading-6">
															<label htmlFor="team-lead" className="font-medium text-gray-900">
																Team lead
															</label>
														</div>
													</div>
												</dd>
											</div>
										}
									</dl>

									{updateMode && (emptyFirstName || emptyLastName) && <>
										<div className="text-center text-red-600 py-2">
											First name and last name cannot be empty
										</div>
									</>}

									<div className="mt-2 flex flex-row justify-end items-center gap-2">
										<OutlineButton label="Close" onClick={() => {
											setUpdateMode(false);
											setOpen(false);
										}}/>


										{(isAdmin || isTL) && !selectedEmployee.isAdmin && <>

											{/*// under construction - start*/}
											<PrimaryButton label="Attendance" onClick={()=> setOpenCreateAttendanceReportModal(true)}
											/>
											<PrimaryButton label="Leave" onClick={()=> {}}
											/>
											{/*<PrimaryButton label="Leave" onClick={()=> setOpenCreateLeaveReportModal(true)}*/}
											{/*/>*/}
											{/*under construction - end*/}

											{!updateMode && <WarningButton label="Update" onClick={() => setUpdateMode(true)}/>}
											{updateMode && <SuccessButton label="Save" onClick={() => {
												onClickSave();
												setUpdateMode(false);
											}}/>}
											<DangerButton label="Delete" onClick={() => {
												onClickDelete();
												setUpdateMode(false);
											}}/>
										</>}
									</div>
								</div>
								{/*Modal body end*/}

							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	</>
	);

};
export default ViewEmployeeModal;