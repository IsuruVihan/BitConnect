import {
	AcademicCapIcon, BackwardIcon,
	BuildingOfficeIcon, CheckIcon,
	CurrencyDollarIcon,
	UserIcon,
	UsersIcon
} from "@heroicons/react/24/outline";
import {SuccessButton} from "../Button";
import React, {useMemo} from "react";

const SelectedCourseHeader = ({selectedCourse, setSelectedCourse, handleOnClickCompleteCourse}) => {
	const courseTypeIcons = useMemo(() => [
		{
			type: "Company Rules & Regulations",
			icon: "BuildingOfficeIcon",
			iconForeground: 'text-purple-700',
			iconBackground: 'bg-purple-50'
		},
		{type: "Soft Skills", icon: "UsersIcon", iconForeground: 'text-blue-700', iconBackground: 'bg-blue-50'},
		{type: "Technical Skills", icon: "AcademicCapIcon", iconForeground: 'text-red-700', iconBackground: 'bg-red-50'},
	], []);

	return (
		<div className="lg:flex lg:items-center lg:justify-between">
			<div className="min-w-0 flex-1">
				<p className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:tracking-tight">
					{selectedCourse.title}
				</p>
				<div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
					<div className="mt-2 flex items-center text-sm text-gray-500">
						{
							courseTypeIcons.filter(t => t.type === selectedCourse.type)[0].icon === "BuildingOfficeIcon" ?
								<><BuildingOfficeIcon className="h-6 w-6" aria-hidden="true"/> Company Rules & Regulations</> :
								courseTypeIcons.filter(t => t.type === selectedCourse.type)[0].icon === "UsersIcon" ?
									<><UsersIcon className="h-6 w-6" aria-hidden="true"/> Soft Skills</> :
									<><AcademicCapIcon className="h-6 w-6" aria-hidden="true"/> Hard Skills</>
						}
					</div>
					<div className="mt-2 flex items-center text-sm text-gray-500">
						<CurrencyDollarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true"/>
						{selectedCourse.completed ?
							`${selectedCourse.score}/${selectedCourse.points}` :
							`${selectedCourse.points}`
						} points
					</div>
					<div className="mt-2 flex items-center text-sm text-gray-500">
						<UserIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true"/>
						Created by {selectedCourse.createdBy.name}
					</div>
				</div>
			</div>
			<div className="mt-5 flex lg:ml-4 lg:mt-0">
				<button
					type="button"
					className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold
										text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 mr-2"
					onClick={() => setSelectedCourse(null)}
				>
					<BackwardIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true"/>
					Back
				</button>
				{selectedCourse.completed ?
					<SuccessButton disabled={true} label={'Completed'}/> :
					<button
						type="button"
						className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white
						shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
						focus-visible:outline-indigo-600"
						onClick={handleOnClickCompleteCourse}
					>
						<CheckIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true"/> Complete
					</button>
				}
			</div>
		</div>
	);
}

export default SelectedCourseHeader;