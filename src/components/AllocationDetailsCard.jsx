import React from "react";

const AllocationDetailsCard = ({event, onClick}) => {
	return (
		<div
			className="overflow-hidden rounded-xl border-2 border-gray-200 cursor-pointer hover:border-indigo-500"
			onClick={() => onClick(event)}
		>
			<div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-4">
				<div className="text-sm font-medium leading-6 text-gray-900">{event.title}</div>
			</div>
			<dl className="-my-3 divide-y divide-gray-100 px-3 py-2 text-sm leading-6">
				<div className="flex justify-between gap-x-4 py-3">
					<dt className="text-gray-500">Start date</dt>
					<dd className="text-gray-700">
						<time dateTime={event.startDate}>{event.startDate}</time>
					</dd>
				</div>
				<div className="flex justify-between gap-x-4 py-3">
					<dt className="text-gray-500">Start time</dt>
					<dd className="flex items-start gap-x-2">
						<div className="font-medium text-gray-900">{event.startTime}</div>
					</dd>
				</div>
				<div className="flex justify-between gap-x-4 py-3">
					<dt className="text-gray-500">End date</dt>
					<dd className="text-gray-700">
						<time dateTime={event.endDate}>{event.endDate}</time>
					</dd>
				</div>
				<div className="flex justify-between gap-x-4 py-3">
					<dt className="text-gray-500">End time</dt>
					<dd className="flex items-start gap-x-2">
						<div className="font-medium text-gray-900">{event.endTime}</div>
					</dd>
				</div>
			</dl>
		</div>
	);
}

export default AllocationDetailsCard;