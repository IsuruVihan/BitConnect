import {Document, Page, Text, View, StyleSheet, PDFViewer, Image} from "@react-pdf/renderer";
import React, {Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {SecondaryButton} from "../Button";

const styles = StyleSheet.create({
	page: {
		backgroundColor: "#ffffff",
		color: "black",
		padding: 10,
	},
	section: {
		margin: 10,
		padding: 10,
	},
	viewer: {
		width: '100%',
		height: '92%',
	},
	header1: {
		backgroundColor: "#ffffff",
		padding: 2,
		marginBottom: 2,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	header1Col: {
		width: "33%",
	},
	header2: {
		backgroundColor: "#ffffff",
		padding: 2,
		marginBottom: 10,
		textAlign: "center",
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
	image: {
		// width: auto,
		height: 32,
	},
});

const sample= [
	{ date: '2024-05-23', checkedIn: '08:00 AM', checkedOut: '05:00 PM' },
	{ date: '2024-05-24', checkedIn: '08:30 AM', checkedOut: '04:30 PM' },
	{ date: '2024-05-25', checkedIn: '09:00 AM', checkedOut: '05:15 PM' }
];

function AttendanceReportGenerator({open, setOpen, data}) {
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
											<View style={styles.header1}>
												<Image
													style={styles.image}
													src= "https://www.bitzquad.com/logo.webp"
												/>
												<View style={styles.header1Col}><Text style={{ textAlign: 'center' }}>Bitzquad</Text></View>
												<View style={styles.header1Col}><Text style={{ textAlign: 'right'} }>Today Date</Text></View>
											</View>
											<View style={styles.header2}>
												<Text>Employee Name</Text>
												<Text>Role</Text>
											</View>

											<View><Text> </Text> </View>

											<View style={styles.header1}>
												<View style={styles.header1Col}><Text>Attendance Report</Text></View>
												<View style={styles.header1Col}><Text style={{ textAlign: 'right'} }>From: </Text></View>
												<View style={styles.header1Col}><Text style={{ textAlign: 'right'} }>17/05/2024 </Text></View>
											</View>
											<View style={styles.header1}>
												<View style={styles.header1Col}><Text></Text></View>
												<View style={styles.header1Col}><Text style={{ textAlign: 'right'} }>To: </Text></View>
												<View style={styles.header1Col}><Text style={{ textAlign: 'right'} }>25/05/2024 </Text></View>
											</View>

											<View style={styles.section}>
												<View style={styles.table}>
													<View style={styles.tableRow}>
														<View style={styles.tableCellHeader}><Text>Date</Text></View>
														<View style={styles.tableCellHeader}><Text>Checked In</Text></View>
														<View style={styles.tableCellHeader}><Text>Checked Out</Text></View>
													</View>
													{sample.map((row, index) => (
														<View style={styles.tableRow} key={index}>
															<View style={styles.tableCell}><Text>{row.date}</Text></View>
															<View style={styles.tableCell}><Text>{row.checkedIn}</Text></View>
															<View style={styles.tableCell}><Text>{row.checkedOut}</Text></View>
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

export default AttendanceReportGenerator;
