import React from "react";

const LeaderboardBody = ({people}) => {
	return (
		<>
			<ul role="list" className="divide-y divide-gray-100">
				{people.map((person) => (
					<li key={person.id} className="flex justify-between gap-x-6 py-5 shadow px-4 rounded mb-2">
						<div className="flex flex-row items-center min-w-0 gap-x-4">
							<img
								className="h-12 w-12 flex-none rounded-full bg-gray-50"
								src={"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
								alt="profile picture"
							/>
							<p className="text-sm font-semibold leading-6 text-gray-900 sm:block hidden">
								{person.name}
							</p>
							<div className="text-sm font-semibold leading-6 text-gray-900 sm:hidden block">
								{person.name} <br/>
								<p className="text-sm leading-6 text-gray-900">
									<span className="font-bold">Points: </span>{person.points}
								</p>
							</div>
						</div>
						<div className="flex shrink-0 items-center gap-x-6">
							<div className="hidden sm:flex sm:flex-col sm:items-end">
								<p className="text-sm leading-6 text-gray-900">
									<span className="font-bold">Points: </span>{person.points}
								</p>
							</div>
						</div>
					</li>
				))}
			</ul>
		</>
	);
}

export default LeaderboardBody;
