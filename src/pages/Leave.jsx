import React, {useState, Fragment, useEffect, useMemo} from "react";
import ErrorModal from "../components/modals/ErrorModal";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import SuccessModal from "../components/modals/SuccessModal";
import LeaveRequestDetailsModal from "../components/modals/LeaveRequestDetailsModal";
import ConfirmDeleteLeaveRequestModal from "../components/modals/ConfirmDeleteLeaveRequestModal";
import CreateLeaveReportModal from "../components/modals/CreateLeaveReportModal";
import LeaveReportGenerator from "../components/reports/LeaveReportGenerator";
import LeaveForm from "../components/Leave/LeaveForm";
import LeavesTable from "../components/Leave/LeavesTable";
import CustomLeaves from "../components/Leave/CustomLeaves";
import MedicalLeaves from "../components/Leave/MedicalLeaves";

ChartJS.register(ArcElement, Tooltip, Legend);

const Leave = () => {
  const [getLeavesDataErrorModalOpen, setGetLeavesDataErrorModalOpen] = useState(false);
  const [submitLeaveRequestErrorModalOpen, setSubmitLeaveRequestErrorModalOpen]
      = useState(false);
  const [deleteLeaveRequestErrorModalOpen, setDeleteLeaveRequestErrorModalOpen]
      = useState(false);
  const [submitLeaveRequestSuccessModalOpen, setSubmitLeaveRequestSuccessModalOpen]
      = useState(false);
  const [selectedLeaveRequestDetailsModalOpen, setSelectedLeaveRequestDetailsModalOpen]
      = useState(false);
  const [confirmDeleteLeaveRequestModalOpen, setConfirmDeleteLeaveRequestModalOpen]
      = useState(false);
  const [deleteLeaveRequestSuccessModalOpen, setDeleteLeaveRequestSuccessModalOpen]
      = useState(false);

  // casual leaves
  const [casualLeaves, setCasualLeaves] = useState(10);

  // medical leaves
  const [medicalLeaves, setMedicalLeaves] = useState(10);

  // leave records
  const [currentPage, setCurrentPage] = useState(1);
  const [leaveRecords, setLeaveRecords] = useState([]);

  // form
  const leaveTypes = useMemo(() => [
    {id: 1, label: 'Casual Leave', value: 'Casual'},
    {id: 2, label: 'Medical Leave', value: 'Medical'},
  ], []);
  const [selected, setSelected] = useState(leaveTypes[0]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');

  const countWeekends = (startDate, endDate) => {
    let count = 0;
    let currentDate = new Date(startDate);

    // Loop through each day between the start and end date
    while (currentDate <= new Date(endDate)) {
      const day = currentDate.getDay();
      if (day === 6 || day === 0) { // 6 = Saturday, 0 = Sunday
        count++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return count;
  };

  // form errors
  const [errorCount, setErrorCount] = useState(0);
  const [noReason, setNoReason] = useState(false);
  const [noFromDate, setNoFromDate] = useState(false);
  const [noToDate, setNoToDate] = useState(false);
  const [oldFromDate, setOldFromDate] = useState(false);
  const [oldToDate, setOldToDate] = useState(false);
  const [fromDateGreaterThanToDate, setFromDateGreaterThanToDate] = useState(false);
  const [overflow, setOverflow] = useState(false);
  useEffect(() => {
    let tempCount = 0;

    const noReason = reason.trim() === "";
    if (noReason) tempCount += 1;

    const noFromDate = !fromDate;
    if (noFromDate) tempCount += 1;

    const noToDate = !toDate;
    if (noToDate) tempCount += 1;

    const oldFromDate = !noFromDate && new Date(fromDate) < new Date();
    if (oldFromDate) tempCount += 1;

    const oldToDate = !noToDate && new Date(toDate) < new Date();
    if (oldToDate) tempCount += 1;

    const fromDateGreaterThanToDate = !noFromDate && !noToDate && new Date(fromDate) > new Date(toDate);
    if (fromDateGreaterThanToDate) tempCount += 1;

    const overflow = !noFromDate && !noToDate && !fromDateGreaterThanToDate && (
        ((new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24)) - countWeekends(fromDate, toDate) + 1 >
        (selected.value === "Casual" ? casualLeaves : medicalLeaves)
    );
    if (overflow) tempCount += 1;

    setNoReason(noReason);
    setNoFromDate(noFromDate);
    setNoToDate(noToDate);
    setOldFromDate(oldFromDate);
    setOldToDate(oldToDate);
    setFromDateGreaterThanToDate(fromDateGreaterThanToDate);
    setOverflow(overflow);
    setErrorCount(tempCount);
  }, [fromDate, toDate, reason, selected, casualLeaves, medicalLeaves]);

  // report generation
  const leaveTypesReport = useMemo(() => [
    {id: 1, label: 'All', value: 'All'},
    {id: 2, label: 'Casual Leave', value: 'Casual'},
    {id: 3, label: 'Medical Leave', value: 'Medical'},
  ], []);
  const [leaveType, setLeaveType] = useState(leaveTypesReport[0]);
  const [openCreateLeaveReportModal, setOpenCreateLeaveReportModal] = useState(false);
  const [fromDateReport, setFromDateReport] = useState('');
  const [toDateReport, setToDateReport] = useState('');
  const [pdfModalOpen, setPDFModalOpen] = useState(false);
  const [reportData, setReportData] = useState(null);

  // Selected leave request
  const [selectedLeaveRequestData, setSelectedLeaveRequestData] = useState({
    createdOn: '', from: '', to: '', type: '', reason: '', status: '',
  });

  // Pagination
  const recordsPerPage = 5;
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = leaveRecords.slice(startIndex, endIndex);

  const handleGenerateReport = () => {
    const filteredData = leaveRecords.filter((record) => {
      const fd = new Date(record.FromDate);
      const td = new Date(record.ToDate);
      const fdr = new Date(fromDateReport);
      const tdr = new Date(toDateReport);

      return fdr <= fd && tdr >= td && (leaveType.value === "All" ? true : leaveType.value === record.Type);
    });

    setReportData({
      from: fromDateReport ,
      to: toDateReport,
      type: leaveType,
      rows: filteredData,
    });

    setPDFModalOpen(true);
  };

  const getLeavesData = async () => {
    try {
      return {
        result: await fetch(`${process.env.REACT_APP_API_URL}/leaves`, {
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
  const postLeaveRequest = async () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    if (errorCount === 0) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/leaves`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            CreatedOn: `${year}-${month < 10 ? '0' + month : month}-${day}`,
            FromDate: fromDate,
            ToDate: toDate,
            Reason: reason.trim(),
            Type: selected.value,
          }),
        });

        if ([400, 404].includes(response.status)) {
          return setSubmitLeaveRequestErrorModalOpen(true);
        }
        setSubmitLeaveRequestSuccessModalOpen(true);
        window.location.reload();
      } catch (error) {
        setSubmitLeaveRequestErrorModalOpen(true);
      }
    } else {
      setSubmitLeaveRequestErrorModalOpen(true);
    }
  }
  const deleteLeaveRequest = async() => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/leaves`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
        },
        body: JSON.stringify(selectedLeaveRequestData),
      });
    } catch (error) {
      setDeleteLeaveRequestErrorModalOpen(true);
    }
  }

  const onConfirmDelete = () => {
    setConfirmDeleteLeaveRequestModalOpen(false);
    setSelectedLeaveRequestDetailsModalOpen(false);
    deleteLeaveRequest()
        .then(() => {
          setDeleteLeaveRequestSuccessModalOpen(true);
        });
    setSelectedLeaveRequestData({
      createdOn: '', from: '', to: '', type: '', reason: '', status: ''
    });
  }

  useEffect(() => {
    getLeavesData()
        .then((r) => {
          if (!r.result) {
            setGetLeavesDataErrorModalOpen(true);
            return;
          }
          return r.result.json();
        })
        .then((data) => {
          setCasualLeaves(data.CasualLeaves);
          setMedicalLeaves(data.MedicalLeaves);
          setLeaveRecords(data.LeaveRequests);
        });
  }, []);

  return (
      <>
        {reportData && <LeaveReportGenerator open={pdfModalOpen} setOpen={setPDFModalOpen} reportData={reportData}/>}
        <CreateLeaveReportModal
            open={openCreateLeaveReportModal}
            setOpen={setOpenCreateLeaveReportModal}
            fromDate={fromDateReport}
            toDate={toDateReport}
            leaveType={leaveType}
            setFromDate={setFromDateReport}
            setToDate={setToDateReport}
            setLeaveType={setLeaveType}
            generateReport={handleGenerateReport}
        />
        <ErrorModal
            title={"Leaves Data"}
            message={"An error occurred while retrieving leaves data. Please try again."}
            open={getLeavesDataErrorModalOpen}
            setOpen={setGetLeavesDataErrorModalOpen}
        />
        <ErrorModal
            title={"Submit Leave Request"}
            message={"An error occurred while submitting the leave request. Please try again."}
            open={submitLeaveRequestErrorModalOpen}
            setOpen={setSubmitLeaveRequestErrorModalOpen}
        />
        <ErrorModal
            title={"Delete Leave Request"}
            message={"An error occurred while deleting the leave request. Please try again."}
            open={deleteLeaveRequestErrorModalOpen}
            setOpen={setDeleteLeaveRequestErrorModalOpen}
        />
        <SuccessModal
            title={"Submit Leave Request"}
            message={"Your leave request has been submitted successfully."}
            open={submitLeaveRequestSuccessModalOpen}
            setOpen={setSubmitLeaveRequestSuccessModalOpen}
        />
        <SuccessModal
            title={"Delete Leave Request"}
            message={"Your leave request has been deleted successfully."}
            open={deleteLeaveRequestSuccessModalOpen}
            setOpen={setDeleteLeaveRequestSuccessModalOpen}
        />
        <LeaveRequestDetailsModal
            data={selectedLeaveRequestData}
            open={selectedLeaveRequestDetailsModalOpen}
            setOpen={setSelectedLeaveRequestDetailsModalOpen}
            onClickDelete={() => setConfirmDeleteLeaveRequestModalOpen(true)}
            setSelectedLeaveRequestData={setSelectedLeaveRequestData}
        />
        <ConfirmDeleteLeaveRequestModal
            open={confirmDeleteLeaveRequestModalOpen}
            setOpen={setConfirmDeleteLeaveRequestModalOpen}
            onClickDelete={onConfirmDelete}
            setSelectedLeaveRequestData={setSelectedLeaveRequestData}
        />

        <div className="xl:grid hidden grid-cols-4 gap-3">
          <div className="col-span-1 row-span-1">
            <CustomLeaves casualLeaves={casualLeaves}/>
          </div>
          <div className="col-span-1 row-span-1">
            <MedicalLeaves medicalLeaves={medicalLeaves}/>
          </div>
          <div className="col-span-2 row-span-4">
            <LeavesTable
                setOpenCreateLeaveReportModal={setOpenCreateLeaveReportModal}
                setSelectedLeaveRequestDetailsModalOpen={setSelectedLeaveRequestDetailsModalOpen}
                currentRecords={currentRecords}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                recordsPerPage={recordsPerPage}
                leaveRecords={leaveRecords}
                setSelectedLeaveRequestData={setSelectedLeaveRequestData}
            />
          </div>
          <div className="col-span-2 row-span-3">
            <LeaveForm
                fromDate={fromDate}
                setFromDate={setFromDate}
                toDate={toDate}
                setToDate={setToDate}
                selected={selected}
                setSelected={setSelected}
                leaveTypes={leaveTypes}
                reason={reason}
                setReason={setReason}
                errorCount={errorCount}
                noReason={noReason}
                noFromDate={noFromDate}
                oldFromDate={oldFromDate}
                noToDate={noToDate}
                oldToDate={oldToDate}
                fromDateGreaterThanToDate={fromDateGreaterThanToDate}
                overflow={overflow}
                postLeaveRequest={postLeaveRequest}
            />
          </div>
        </div>

        <div className="xl:hidden lg:grid hidden grid-cols-2 gap-3">
          <div>
            <CustomLeaves casualLeaves={casualLeaves}/>
          </div>
          <div>
            <MedicalLeaves medicalLeaves={medicalLeaves}/>
          </div>
          <div>
            <LeaveForm
                fromDate={fromDate}
                setFromDate={setFromDate}
                toDate={toDate}
                setToDate={setToDate}
                selected={selected}
                setSelected={setSelected}
                leaveTypes={leaveTypes}
                reason={reason}
                setReason={setReason}
                errorCount={errorCount}
                noReason={noReason}
                noFromDate={noFromDate}
                oldFromDate={oldFromDate}
                noToDate={noToDate}
                oldToDate={oldToDate}
                fromDateGreaterThanToDate={fromDateGreaterThanToDate}
                overflow={overflow}
                postLeaveRequest={postLeaveRequest}
            />
          </div>
          <div>
            <LeavesTable
                setOpenCreateLeaveReportModal={setOpenCreateLeaveReportModal}
                setSelectedLeaveRequestDetailsModalOpen={setSelectedLeaveRequestDetailsModalOpen}
                currentRecords={currentRecords}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                recordsPerPage={recordsPerPage}
                leaveRecords={leaveRecords}
                setSelectedLeaveRequestData={setSelectedLeaveRequestData}
            />
          </div>
        </div>

        <div className="lg:hidden sm:grid grid-cols-1 gap-3">
          <div>
            <LeaveForm
                fromDate={fromDate}
                setFromDate={setFromDate}
                toDate={toDate}
                setToDate={setToDate}
                selected={selected}
                setSelected={setSelected}
                leaveTypes={leaveTypes}
                reason={reason}
                setReason={setReason}
                errorCount={errorCount}
                noReason={noReason}
                noFromDate={noFromDate}
                oldFromDate={oldFromDate}
                noToDate={noToDate}
                oldToDate={oldToDate}
                fromDateGreaterThanToDate={fromDateGreaterThanToDate}
                overflow={overflow}
                postLeaveRequest={postLeaveRequest}
            />
          </div>
          <div>
            <LeavesTable
                setOpenCreateLeaveReportModal={setOpenCreateLeaveReportModal}
                setSelectedLeaveRequestDetailsModalOpen={setSelectedLeaveRequestDetailsModalOpen}
                currentRecords={currentRecords}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                recordsPerPage={recordsPerPage}
                leaveRecords={leaveRecords}
                setSelectedLeaveRequestData={setSelectedLeaveRequestData}
            />
          </div>
          <div>
            <CustomLeaves casualLeaves={casualLeaves}/>
          </div>
          <div>
            <MedicalLeaves medicalLeaves={medicalLeaves}/>
          </div>
        </div>
      </>
  );
}

export default Leave;