import {AcademicCapIcon, BuildingOfficeIcon, UsersIcon} from "@heroicons/react/24/outline";
import React, {useMemo} from "react";

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

const CoursesBody = ({courses, setSelectedCourse}) => {
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
		<>
			{courses.map((course, idx) => (
				<div
					key={course.title}
					className={classNames(
						idx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
						idx === 1 ? 'sm:rounded-tr-lg' : '',
						idx === courses.length - 2 ? 'sm:rounded-bl-lg' : '',
						idx === courses.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
						'group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
					)}
					onClick={() => setSelectedCourse(course)}
				>
					<div>
							<span
								className={classNames(
									courseTypeIcons.filter(t => t.type === course.type)[0].iconBackground,
									courseTypeIcons.filter(t => t.type === course.type)[0].iconForeground,
									'inline-flex rounded-lg p-3 ring-4 ring-white'
								)}
							>
								{
									courseTypeIcons.filter(t => t.type === course.type)[0].icon === "BuildingOfficeIcon" ?
										<BuildingOfficeIcon className="h-6 w-6" aria-hidden="true"/> :
										courseTypeIcons.filter(t => t.type === course.type)[0].icon === "UsersIcon" ?
											<UsersIcon className="h-6 w-6" aria-hidden="true"/> :
											<AcademicCapIcon className="h-6 w-6" aria-hidden="true"/>
								}
							</span>
					</div>
					<div className="mt-8">
						<h3 className="text-base font-semibold leading-6 text-gray-900">
							<div className="focus:outline-none">
								<span className="absolute inset-0" aria-hidden="true"/>
								{course.title}
							</div>
						</h3>
						<p className="mt-2 text-sm font-semibold text-gray-500">
							{course.points} points
						</p>
						<p className="mt-2 text-sm text-gray-500">
							{course.description}
						</p>
					</div>
					<span
						className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
						aria-hidden="true"
					>
						<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z"/>
						</svg>
					</span>
				</div>
			))}
		</>
	);
}

export default CoursesBody;
