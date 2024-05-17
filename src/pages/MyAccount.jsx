import React, {useEffect, useState} from "react";
import {EnvelopeIcon} from '@heroicons/react/20/solid'
import Button from "../components/Button";

const returnDigit = (digit) => {
	if (digit < 10)
		return '0' + digit;
	return digit;
}

const MyAccount = () => {
	const [profile, setProfile] = useState(null);
	const [updateMode, setUpdateMode] = useState(false);

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [title, setTitle] = useState("");
	const [team, setTeam] = useState("");
	const [birthday, setBirthday] = useState("");

	const handleOnClickSave = async () => {
		try {
			const response = await fetch('http://localhost:4000/my-account', {
				method: 'POST',
				headers: {
					'Authorization': 'Bearer ' + localStorage.getItem("token")
				},
				body: {

				}
			});
			return response.json();
		} catch (error) {
			console.error('Error fetching data from API:', error);
			throw error; // Rethrow the error to handle it in the catch block below
		}
	}

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
				setFirstName(data[0].FirstName);
				setLastName(data[0].LastName);
				setPhone(data[0].ContactNumber);
				setEmail(data[0].Email);
				setTitle(data[0].Role);
				setTeam(data[0].Team);
				//setBirthday(`${returnDigit(data[0].BirthMonth)}/${returnDigit(data[0].BirthDay)}`);
				setBirthday(data[0].Birthdate);

				setProfile({
					imageUrl:
						'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
					coverImageUrl:
						'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
				});
			})
			.catch(error => {
				console.error("Error fetching data from API:", error);
			});
	}, []);

	if (profile === null)
		return (
			<div className="flex justify-center items-center h-screen">
				<img src="https://i.gifer.com/JVX7.gif" alt="Loading..." />
			</div>
		);

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
												{/*<button*/}
												{/*	type="button"*/}
												{/*	className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm*/}
												{/*	font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"*/}
												{/*>*/}
												{/*	<EnvelopeIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true"/>*/}
												{/*	Message*/}
												{/*</button>*/}

												{!updateMode ?
													<Button onClick={() => setUpdateMode(true)} width={'32'} label={'Edit Details'}/> :
													<div className="flex flex-row gap-2">
														<Button onClick={() => setUpdateMode(false)} width={'32'} label={'Save'}/>
														<Button onClick={() => setUpdateMode(false)} width={'32'} label={'Cancel'}/>
													</div>
												}
											</div>
										</div>
									</div>
									<div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
										<h1 className="truncate text-2xl font-bold text-gray-900">{profile.name}</h1>
									</div>
								</div>
							</div>
							{/* Description list */}
							<div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8 border-2 border-red-600">
								<dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
									{[
										{label: "First Name", type: "text", value: firstName, onChange: (e) => setFirstName(e.target.value)},
										{label: "Last Name", type: "text", value: lastName, onChange: (e) => setLastName(e.target.value)},
										{label: "Phone", type: "text", value: phone, onChange: (e) => setPhone(e.target.value)},
										{label: "Email", type: "email", value: email},
										{label: "Title", type: "text", value: title},
										{label: "Team", type: "text", value: team},
										{label: "Birthday", type: "date", value: birthday, onChange: (e) => setBirthday(e.target.value)}
									].map((field) => (
										<div key={field.label} className="sm:col-span-1">
											<dt className="text-sm font-medium text-gray-500">{field.label}</dt>
											{!updateMode ? (field.label === "Birthday" ?
														<dd className="mt-1 text-sm text-gray-900">
															{field.value.split("-")[1] + "/" + field.value.split("-")[2]}
														</dd> :
														<dd className="mt-1 text-sm text-gray-900">{field.value}</dd>
												) :
												<div className="sm:col-span-3">
													<div className="mt-2">
														<input
															value={field.value}
															type={field.type}
															className="block w-11/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1
															ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
															focus:ring-indigo-600 sm:text-sm sm:leading-6"
															onChange={field.onChange}
															disabled={!field.onChange}
														/>
													</div>
												</div>}
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