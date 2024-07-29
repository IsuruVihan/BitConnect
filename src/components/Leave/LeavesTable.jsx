import Pagination from "../Pagination";
import React from "react";

const LeavesTable = (props) => {
    const {
        setOpenCreateLeaveReportModal, setSelectedLeaveRequestDetailsModalOpen, currentRecords, currentPage, setCurrentPage,
        recordsPerPage, leaveRecords, setSelectedLeaveRequestData
    } = props;

    return (
        <div className="p-8 border-1 rounded-md shadow-md">
            <div className="sm:flex sm:items-center mb-4">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Leaves History</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Your past leave records.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white
                shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
                focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => setOpenCreateLeaveReportModal(true)}
                    >
                        Generate Report
                    </button>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                                    Created
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    From
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    To
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Type
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Reason
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                                    Status
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white">
                            {currentRecords.map((record, idx) => (
                                <tr key={idx} className="even:bg-gray-50 cursor-pointer" onClick={() => {
                                    setSelectedLeaveRequestData({
                                        createdOn: record.CreatedOn.split("T")[0],
                                        from: record.FromDate.split("T")[0],
                                        to: record.ToDate.split("T")[0],
                                        type: record.Type,
                                        reason: record.Reason,
                                        status: record.Status,
                                    });
                                    setSelectedLeaveRequestDetailsModalOpen(true);
                                }}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                                        {record.CreatedOn.split("T")[0]}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {record.FromDate.split("T")[0]}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {record.ToDate.split("T")[0]}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {record.Type}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        {record.Reason}
                                    </td>
                                    <td className={`relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3 
                    text-${record.Status === "Accepted" ? 'green' : record.Status === "Rejected" ? 'red' : 'gray'}-600`}>
                                        {record.Status}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Pagination currentPage={currentPage} onPageChange={setCurrentPage} recordsPerPage={recordsPerPage}
                        totalRecords={leaveRecords.length}/>
        </div>
    );
};

export default LeavesTable;