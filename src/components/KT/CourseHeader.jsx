import {PrimaryButton} from "../Button";
import React from "react";

const CoursesHeader = ({courseFilterQuery, setCourseFilterQuery}) => {
	return (
		<div className="md:col-span-3">
			<div className="md:block hidden">
				<h1 className="text-base font-semibold leading-6 text-gray-900">Courses</h1>
				<p className="mt-2 text-sm text-gray-700">
					Select a course to view it and complete the quiz.
				</p>
			</div>
			<div className="my-2 flex flex-row gap-2">
				<input
					type="text"
					name="courses-search"
					id="courses-search"
					className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
								ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm
								sm:leading-6"
					placeholder="Search courses"
					value={courseFilterQuery}
					onChange={(e) => setCourseFilterQuery(e.target.value)}
				/>
				<PrimaryButton label="Create" onClick={() => {}}/>
			</div>
		</div>
	);
}

export default CoursesHeader;
