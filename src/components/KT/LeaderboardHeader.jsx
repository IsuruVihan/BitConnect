import React from "react";

const LeaderboardHeader = ({leaderboardFilterQuery, setLeaderboardFilterQuery}) => {
	return (
		<div className="md:col-span-2">
			<div className="md:block hidden">
				<h1 className="text-base font-semibold leading-6 text-gray-900">Leaderboard</h1>
				<p className="mt-2 text-sm text-gray-700">
					Complete quizzes and earn points to make it to the podium!
				</p>
			</div>
			<input
				type="text"
				name="employee-search"
				id="employee-search"
				className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
								ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm
								sm:leading-6 my-2"
				placeholder="Search employees"
				value={leaderboardFilterQuery}
				onChange={(e) => setLeaderboardFilterQuery(e.target.value)}
			/>
		</div>
	);
}

export default LeaderboardHeader;
