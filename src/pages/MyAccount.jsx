import React, {useEffect, useState} from "react";
import {EnvelopeIcon} from '@heroicons/react/20/solid'

const returnDigit = (digit) => {
	if (digit < 10)
		return '0' + digit;
	return digit;
}

const MyAccount = () => {
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		const getMyAccountData = async (token) => {
			try {
				const response = await fetch('http://localhost:4000/my-account', {
					method: 'GET',
					headers: {
						'Authorization': 'Bearer ' + token
					},
				});
				return response.json();
			} catch (error) {
				console.error('Error fetching data from API:', error);
				throw error; // Rethrow the error to handle it in the catch block below
			}
		};

		const token = localStorage.getItem("token");

		getMyAccountData(token)
			.then(data => {
				setProfile({
					firstName: data[0].FirstName,
					lastName: data[0].LastName,
					imageUrl:
						'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
					coverImageUrl:
						'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
					fields: {
						Phone: data[0].ContactNumber,
						Email: data[0].Email,
						Title: data[0].Role,
						Team: data[0].Team,
						Birthday: `${returnDigit(data[0].BirthMonth)}/${returnDigit(data[0].BirthDay)}`,
					},
				});
			})
			.catch(error => {
				console.error("Error fetching data from API:", error);
			});
	}, []);

	if (profile === null)
		return <div>Loading...</div>;

	return (
		<div className="flex h-full">
			<div className="flex min-w-0 flex-1 flex-col overflow-hidden">
				<div className="relative z-0 flex flex-1 overflow-hidden">
					<main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
						<article>
							<div>
								<div>
									<img className="h-32 w-full object-cover lg:h-48" src={profile.coverImageUrl} alt=""/>
								</div>
								<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
									<div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
										<div className="flex">
											<img
												className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
												src={profile.imageUrl}
												alt=""
											/>
										</div>
										<div
											className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
											<div className="mt-6 min-w-0 flex-1 2xl:block">
												<h1 className="truncate text-2xl font-bold text-gray-900">
													{profile.firstName + " " + profile.lastName}
												</h1>
											</div>
											<div
												className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
												<button
													type="button"
													className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm
													font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
												>
													<EnvelopeIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true"/>
													Message
												</button>
											</div>
										</div>
									</div>
									<div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
										<h1 className="truncate text-2xl font-bold text-gray-900">{profile.name}</h1>
									</div>
								</div>
							</div>
							{/* Description list */}
							<div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
								<dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
									{Object.keys(profile.fields).map((field) => (
										<div key={field} className="sm:col-span-1">
											<dt className="text-sm font-medium text-gray-500">{field}</dt>
											<dd className="mt-1 text-sm text-gray-900">{profile.fields[field]}</dd>
										</div>
									))}
								</dl>
							</div>
						</article>
					</main>
				</div>
			</div>
		</div>
	);
}
export default MyAccount;