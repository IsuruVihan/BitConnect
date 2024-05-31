import {Document, Page, Text, View, StyleSheet, PDFViewer, Image} from "@react-pdf/renderer";
import React, {Fragment, useEffect, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {SecondaryButton} from "../Button";
import Logo from '../../images/logo.png';

const styles = StyleSheet.create({
	page: {
		backgroundColor: "white",
		color: "black",
		fontSize: 12,
		padding: 8,
	},
	section: {
		margin: 10,
		padding: 10,
	},
	viewer: {
		width: '100%',
		height: '92%',
	},
	table: {
		display: "table",
		width: "100%",
		borderCollapse: "collapse",
		margin: "auto",
	},
	tableRow: {
		flexDirection: "row",
	},
	tableCellHeader: {
		width: "33%",
		borderStyle: "solid",
		borderWidth: 1,
		backgroundColor: "#ffffff",
		padding: 5,
		textAlign: "center",
		fontWeight: "bold",
		color: "black",
	},
	tableCell: {
		width: "33%",
		borderStyle: "solid",
		borderWidth: 1,
		padding: 8,
		textAlign: "center",
		color: "black",
	},
});

function LeaveReportGenerator({open, setOpen, reportData}) {
	const [currentDate, setCurrentDate] = useState("");
	const [currentTime, setCurrentTime] = useState("");

	useEffect(() => {
		console.log("hello");
		const d = new Date();
		const year = d.getFullYear();
		const month = d.getMonth() + 1;
		const date = d.getDate();
		const hours = d.getHours();
		const mins = d.getMinutes();
		const secs = d.getSeconds();
		setCurrentDate(`${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date}`);
		setCurrentTime(`${hours < 10 ? '0' + hours : hours}:${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`);
	}, []);


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
					<div className="flex min-h-full items-end lg:justify-end justify-center lg:mr-4 p-4 text-center
					sm:items-center sm:p-0">
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
								transition-all xl:w-10/12 lg:w-[78vw] w-[99vw] h-[80vh]"
							>
								{/*Modal body start*/}
								<PDFViewer style={styles.viewer}>
									{/* Start of the document*/}
									<Document>
										{/*render a single page*/}
										<Page size="A4" style={styles.page}>
											<View style={{display: "flex",
												flexDirection: "row",
												alignItems: "center",
												justifyContent: "space-between",
												}}>
												<View style={{width: '30%',}}>
													<Image src={Logo} style={{width: 25, height: 25,}}/>
												</View>
												<View style={{width: '30%', textAlign: "center",}}>
													<View style={{fontSize: 16}}>
														<Text>Bitzquad (Pvt) Ltd.</Text>
													</View>
												</View>
												<View style={{width: '30%', textAlign: "right",}}>
													<Text>{currentDate}</Text>
													<Text>{currentTime}</Text>
												</View>
											</View>
											<View style={{marginTop: 30, textAlign: "center", fontSize: 24,}}>
												<Text>Leave Report</Text>
											</View>
											<View style={{borderTop: '1px solid gray', marginTop: 10,}}>
												<View style={{display: "flex",
													flexDirection: "row",
													alignItems: "center",
													justifyContent: "space-between",}}>
													<View>
														<Text>Employee Name</Text>
														<Text>Role</Text>
													</View>
													<View>
														<Text style={{ textAlign: 'right'} }>From: {reportData.from}</Text>
													</View>
													<View>
														<Text style={{ textAlign: 'right'} }>To: {reportData.to}</Text>
													</View>
													<View>
														<Text style={{ textAlign: 'right'} }>Type: {reportData.type.label}</Text>
													</View>
												</View>
											</View>
											<View style={styles.section}>
												<View style={styles.table}>
													<View style={styles.tableRow}>
														<View style={styles.tableCellHeader}><Text>From</Text></View>
														<View style={styles.tableCellHeader}><Text>To</Text></View>
														<View style={styles.tableCellHeader}><Text>Leave Type</Text></View>
														<View style={styles.tableCellHeader}><Text>Status</Text></View>
														<View style={styles.tableCellHeader}><Text>Reason</Text></View>
													</View>
													{reportData.rows.map((row, index) => (
														<View style={styles.tableRow} key={index}>
															<View style={styles.tableCell}><Text>{row.FromDate.split("T")[0]}</Text></View>
															<View style={styles.tableCell}><Text>{row.ToDate.split("T")[0]}</Text></View>
															<View style={styles.tableCell}><Text>{row.Type}</Text></View>
															<View style={styles.tableCell}><Text>{row.Status}</Text></View>
															<View style={styles.tableCell}><Text>{row.Reason}</Text></View>
														</View>
													))}
												</View>
											</View>
										</Page>
									</Document>
								</PDFViewer>
								<div className="mt-2 flex justify-center items-center">
									<SecondaryButton label={'Close'} onClick={() => setOpen(false)}/>
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

export default LeaveReportGenerator;

