import React, {useEffect, useState} from "react";
import CreatePostModal from "../components/modals/CreatePostModal";
import {PrimaryButton} from "../components/Button";

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const CommonWall = () => {
	const [tabs, setTabs] = useState([
		{name: 'Notices', current: true},
		{name: 'Events', current: false},
	]);

	const [posts, setPosts] = useState([
		// {
		// 	id: 1,
		// 	title: 'Boost your conversion rate',
		// 	description:
		// 		'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
		// 	imageUrl:
		// 		'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
		// 	date: 'Mar 16, 2020',
		// 	authorName: 'Michael Foster'
		// },
	]);
	const [notices, setNotices] = useState([
		{title: "This is Notice 1", date: "Mar 16, 2020"},
		{title: "This is Notice 2", date: "Mar 17, 2020"},
		{title: "This is Notice 3", date: "Mar 18, 2020"},
		{title: "This is Notice 4", date: "Mar 19, 2020"},
		{title: "This is Notice 5", date: "Mar 20, 2020"},
	]);
	const [events, setEvents] = useState([
		{title: "This is Event 1", date: "Mar 11, 2020"},
		{title: "This is Event 2", date: "Mar 12, 2020"},
		{title: "This is Event 3", date: "Mar 13, 2020"},
		{title: "This is Event 4", date: "Mar 14, 2020"},
		{title: "This is Event 5", date: "Mar 15, 2020"},
	]);

	const [createPostModalOpen, setCreatePostModalOpen] = useState(false);

	const [newPostTitle, setNewPostTitle] = useState('');
	const [newPostDescription, setNewPostDescription] = useState('');
	const [newPostAttachment, setNewPostAttachment] = useState(null);

	const handleOnClickTab = (name) => {
		const updatedTabs = tabs.map(tab => {
			if (tab.name === name) {
				return {...tab, current: true};
			} else {
				return {...tab, current: false};
			}
		});

		setTabs(updatedTabs);
	}

	const getPosts = async () => {
		try {
			return {
				result: await fetch(`${process.env.REACT_APP_API_URL}/post`, {
					method: 'GET',
					headers: {
						'Authorization': 'Bearer ' + localStorage.getItem("token"),
					},
				}),
				error: false
			};
		} catch (error) {
			return {error: true};
		}
	}
	useEffect(() => {
		getPosts()
			.then((r) => {
				if (r.error || r.result.status !== 200)
					return {error: true};
				return r.result.json();
			})
			.then((data) => {
				if (data.error) {
					// setRetrieveTeamDataErrorModalOpen(true);
				} else {
					setPosts(data.posts);
				}
			});
	}, []);

	const sharePost = async () => {
		try {
			const formData = new FormData();
			formData.append('Title', newPostTitle);
			formData.append('Description', newPostDescription);
			formData.append('Attachment', newPostAttachment);

			return {
				result: await fetch(`${process.env.REACT_APP_API_URL}/post`, {
					method: 'POST',
					headers: {
						'Authorization': 'Bearer ' + localStorage.getItem("token"),
					},
					body: formData,
				}),
				error: false
			};
		} catch (error) {
			return {error: true};
		}
	}
	const onClickSharePost = () => {
		sharePost();
	}

	const deletePost = async (postId) => {
		try {
			return {
				result: await fetch(`${process.env.REACT_APP_API_URL}/post`, {
					method: 'DELETE',
					headers: {
						'Authorization': 'Bearer ' + localStorage.getItem("token"),
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({postId}),
				}),
				error: false
			};
		} catch (error) {
			return {error: true};
		}
	}
	const onClickDeletePost = (postId) => {
		deletePost(postId);
	}

	return (
		<div className="w-full grid grid-cols-4 min-h-[79vh]">
			<CreatePostModal
				open={createPostModalOpen}
				setOpen={setCreatePostModalOpen}
				newPostTitle={newPostTitle}
				setNewPostTitle={setNewPostTitle}
				newPostDescription={newPostDescription}
				setNewPostDescription={setNewPostDescription}
				newPostAttachment={newPostAttachment}
				setNewPostAttachment={setNewPostAttachment}
				sharePost={onClickSharePost}
			/>
			<div className="xl:col-span-3 col-span-4">
				<div className="bg-white">
					<div className="mx-auto max-w-7xl px-4 lg:px-6">
						<PrimaryButton
							onClick={() => setCreatePostModalOpen(true)}
							label={"Create Post"}
							color={"indigo"}
							width={"full"}
						/>
						<div
							className="grid max-w-2xl grid-cols-1 lg:mx-0 lg:max-w-none lg:grid-cols-1">
							{posts.length > 0 ? posts.map((post) => (
								<article key={post.id} className="flex flex-col items-start justify-between rounded-lg shadow p-4 mt-4">
									<div className="relative flex items-center gap-x-4">
										<img
											src={'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
											alt=""
											className="h-10 w-10 rounded-full bg-gray-100"
										/>
										<div className="text-sm leading-6">
											<div className="font-semibold text-gray-900">
												<div>
													<span className="absolute inset-0"/>
													{post.authorName}
												</div>
											</div>
											<p className="text-gray-600">{post.date.split('T')[0]}</p>
										</div>
									</div>
									<div className="relative w-full mt-2">
										{post.imageUrl && <img
											src={post.imageUrl}
											alt=""
											className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
										/>}
										<div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"/>
									</div>
									<div className="w-full">
										<div className="group relative">
											<h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
												<div>
													<span className="absolute inset-0"/>
													{post.title}
												</div>
											</h3>
											<p className="mt-2 line-clamp-3 leading-6 text-gray-600">{post.description}</p>
										</div>
									</div>
									<div
										className="text-sm text-red-600 hover:text-red-800 cursor-pointer"
										onClick={() => onClickDeletePost(post.id)}
									>
										Delete
									</div>
								</article>
							)) : <div className="p-10 w-full text-center text-lg font-bold text-gray-300">
								No posts
							</div>}
						</div>
					</div>
				</div>
			</div>

			<div className="hidden xl:block mr-2">
				<div>
					<div className="sm:hidden">
						<label htmlFor="tabs" className="sr-only">
							Select a tab
						</label>
						{/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
						<select
							id="tabs"
							name="tabs"
							className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
							defaultValue={tabs.find((tab) => tab.current).name}
						>
							{tabs.map((tab) => (
								<option key={tab.name}>{tab.name}</option>
							))}
						</select>
					</div>
					<div className="hidden sm:block">
						<nav className="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs">
							{tabs.map((tab, tabIdx) => (
								<div
									key={tab.name}
									className={classNames(
										tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
										tabIdx === 0 ? 'rounded-l-lg' : '',
										tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
										'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium ' +
										'hover:bg-gray-50 focus:z-10 cursor-pointer'
									)}
									aria-current={tab.current ? 'page' : undefined}
									onClick={() => handleOnClickTab(tab.name)}
								>
									<span>{tab.name}</span>
									<span
										aria-hidden="true"
										className={classNames(
											tab.current ? 'bg-indigo-500' : 'bg-transparent',
											'absolute inset-x-0 bottom-0 h-0.5'
										)}
									/>
								</div>
							))}
						</nav>
					</div>
				</div>
				<div className="flex flex-col gap-2 pt-2">
					{tabs[0].current ? notices.map((notice, idx) =>
						<div key={idx} className="rounded-lg space-y-1 px-4 py-2 shadow hover:bg-blue-700 hover:transition-colors
						hover:text-white hover:cursor-pointer">
							<p className="text-md font-semibold">{notice.title}</p>
							<p className="text-xs">{notice.date}</p>
						</div>
					) : events.map((event, idx) =>
						<div key={idx} className="rounded-lg space-y-1 px-4 py-2 shadow hover:bg-blue-700 hover:transition-colors
						hover:text-white hover:cursor-pointer">
							<p className="text-md font-semibold">{event.title}</p>
							<p className="text-xs">{event.date}</p>
						</div>
					)}
				</div>
			</div>

		</div>
	);
}

export default CommonWall;
