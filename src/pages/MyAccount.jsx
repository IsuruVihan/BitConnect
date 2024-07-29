import React, {useEffect, useState} from "react";
import {DangerButton, PrimaryButton, SecondaryButton, SuccessButton} from "../components/Button";
import Loading from "../components/Loading";
import ChangeProfilePictureModal from "../components/modals/ChangeProfilePictureModal";
import ResetPasswordModal from "../components/modals/ResetPasswordModal";
import UserImage from "../components/UserImage";

const MyAccount = () => {
	const [loading, setLoading] = useState(false);

	const [profile, setProfile] = useState({
		imageUrl:
			'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
		coverImageUrl:
			'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
	});
	const [updateMode, setUpdateMode] = useState(false);

	//Reset Password
	const [openResetPasswordModal, setOpenResetPasswordModal] = useState(false);
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [retypePassword, setRetypePassword] = useState('');

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [title, setTitle] = useState("");
	const [team, setTeam] = useState("");
	const [birthday, setBirthday] = useState("");
	const [profilePicture, setProfilePicture] = useState(null);

	const [initFirstName, setInitFirstName] = useState("");
	const [initLastName, setInitLastName] = useState("");
	const [initPhone, setInitPhone] = useState("");
	const [initBirthday, setInitBirthday] = useState("");

	//change profile pic
	const [openChangeImage, setOpenChangeImage] = useState(false)

	const handleOnClickSave = async () => {
		try {
			const formData = new FormData();

			if (firstName !== initFirstName)
				formData.append("FirstName", firstName);
			if (lastName !== initLastName)
				formData.append("LastName", lastName);
			if (phone !== initPhone)
				formData.append("ContactNumber", phone);
			if (birthday !== initBirthday)
				formData.append("Birthdate", birthday);
			if (profilePicture !== null)
				formData.append("ProfilePicture", profilePicture);

			await fetch(`${process.env.REACT_APP_API_URL}/my-account`, {
				method: 'POST',
				headers: {
					'Authorization': 'Bearer ' + localStorage.getItem("token"),
				},
				body: formData,
			});
		} catch (error) {
			console.error('Error fetching data from API:', error);
		}
	}

	const resetPassword = async () => {
		try {
			return {
				result: await fetch(`${process.env.REACT_APP_API_URL}/my-account/reset-password`, {
					method: 'POST',
					headers: {
						'Authorization': 'Bearer ' + localStorage.getItem("token"),
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						currentPassword: currentPassword,
						newPassword: newPassword,
						newPassword2: retypePassword
					}),
				}),
				error: false
			};
		} catch (error) {
			return {error: true};
		}
	}
	const handleResetPassword = () =>{
		resetPassword();
		setCurrentPassword('');
		setNewPassword('');
		setRetypePassword('');
	}

	useEffect(() => {
		const getMyAccountData = async (token) => {
			try {
				const response = await fetch(`${process.env.REACT_APP_API_URL}/my-account`, {
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

		setLoading(true);
		getMyAccountData(token)
			.then(data => {
				setFirstName(data[0].FirstName);
				setInitFirstName(data[0].FirstName);

				setLastName(data[0].LastName);
				setInitLastName(data[0].LastName);

				setPhone(data[0].ContactNumber);
				setInitPhone(data[0].ContactNumber);

				setEmail(data[0].Email);
				setTitle(data[0].Role);
				setTeam(data[0].Team);

				setBirthday(data[0].Birthdate ? data[0].Birthdate.split("T")[0] : '');
				setInitBirthday(data[0].Birthdate ? data[0].Birthdate.split("T")[0] : '');

				setProfile({
					imageUrl: data[0].imageUrl,
					coverImageUrl:
						'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
				});
				setLoading(false);
			})
			.catch(error => {
				console.error("Error fetching data from API:", error);
			});
	}, []);

	if (loading)
		return <Loading/>;

	return (
		<>
			<ChangeProfilePictureModal
				open={openChangeImage}
				setOpen={setOpenChangeImage}
				setProfilePicture={setProfilePicture}
			/>
			<div className="flex h-full">
				<ResetPasswordModal
					open={openResetPasswordModal}
					setOpen={setOpenResetPasswordModal}
					currentPassword={currentPassword}
					setCurrentPassword={setCurrentPassword}
					newPassword={newPassword}
					setNewPassword={setNewPassword}
					retypePassword={retypePassword}
					setRetypePassword={setRetypePassword}
					resetPassword={handleResetPassword}
				/>

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
												{!['', null, undefined].includes(profile.imageUrl) ?
													<img
														className="h-24 w-24 flex-none rounded-full bg-gray-50"
														src={profile.imageUrl}
														alt=""
														onClick={() => updateMode && setOpenChangeImage(true)}
													/> :
													<UserImage size={24}/>
												}
											</div>
											<div
												className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
												<div className="mt-6 min-w-0 flex-1 2xl:block">
													<h1 className="truncate text-2xl font-bold text-gray-900">
														{firstName + " " + lastName}
													</h1>
												</div>
												<div
													className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0"
												>

													{updateMode && <PrimaryButton
														onClick={() => setOpenResetPasswordModal(true)}
														width={'36'}
														label={'Reset Password'}
													/>}

													{!updateMode ?
														<SecondaryButton
															onClick={() => setUpdateMode(true)}
															width={'32'}
															label={'Edit Details'}
														/> :
														<div className="flex flex-row gap-2">
															<SuccessButton
																onClick={() => {
																	setUpdateMode(false);
																	handleOnClickSave();
																}}
																width={'32'}
																label={'Save'}
															/>
															<DangerButton
																onClick={() => setUpdateMode(false)}
																width={'32'}
																label={'Cancel'}
															/>
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
								<div className="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
									<dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
										{[
											{label: "First Name", type: "text", value: firstName,
												onChange: (e) => setFirstName(e.target.value)},
											{label: "Last Name", type: "text", value: lastName,
												onChange: (e) => setLastName(e.target.value)},
											{label: "Phone", type: "text", value: phone, onChange: (e) => setPhone(e.target.value)},
											{label: "Email", type: "email", value: email},
											{label: "Title", type: "text", value: title},
											{label: "Team", type: "text", value: team},
											{label: "Birthday", type: "date", value: birthday,
												onChange: (e) => setBirthday(e.target.value)}
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
		</>
	);
}
export default MyAccount;