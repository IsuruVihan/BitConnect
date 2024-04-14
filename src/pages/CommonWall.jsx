import React, {useState} from "react";
import {PaperAirplaneIcon, TrashIcon, UserGroupIcon} from "@heroicons/react/20/solid";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const CommonWall = () => {
    const [tabs, setTabs] = useState([
        { name: 'Notices', current: true },
        { name: 'Events', current: false },
    ]);

	const posts = [
		{
			id: 1,
			title: 'Boost your conversion rate',
			href: '#',
			description:
				'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
			imageUrl:
				'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
			date: 'Mar 16, 2020',
			datetime: '2020-03-16',
			category: { title: 'Marketing', href: '#' },
			author: {
				name: 'Michael Foster',
				role: 'Co-Founder / CTO',
				href: '#',
				imageUrl:
					'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
			},
		},
		{
			id: 2,
			title: 'Boost your conversion rate',
			href: '#',
			description:
				'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
			imageUrl:
				'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
			date: 'Mar 16, 2020',
			datetime: '2020-03-16',
			category: { title: 'Marketing', href: '#' },
			author: {
				name: 'Michael Foster',
				role: 'Co-Founder / CTO',
				href: '#',
				imageUrl:
					'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
			},
		},
		{
			id: 3,
			title: 'Boost your conversion rate',
			href: '#',
			description:
				'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
			imageUrl:
				'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
			date: 'Mar 16, 2020',
			datetime: '2020-03-16',
			category: { title: 'Marketing', href: '#' },
			author: {
				name: 'Michael Foster',
				role: 'Co-Founder / CTO',
				href: '#',
				imageUrl:
					'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
			},
		},
		// More posts...
	]

	const handleOnClickTab = (name) => {
		const updatedTabs = tabs.map(tab => {
			if (tab.name === name) {
				return { ...tab, current: true };
			} else {
				return { ...tab, current: false };
			}
		});

		setTabs(updatedTabs);
	}


	return (
      <div className="w-full grid grid-cols-4 min-h-[79vh]">
				<div className="xl:col-span-3 col-span-4">
					<div className="bg-white">
						<div className="mx-auto max-w-7xl px-4 lg:px-6">
							{/*<div className="mx-auto max-w-2xl text-center">*/}
							{/*	<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>*/}
							{/*	<p className="mt-2 text-lg leading-8 text-gray-600">*/}
							{/*		Learn how to grow your business with our expert advice.*/}
							{/*	</p>*/}
							{/*</div>*/}
							<div
								className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-1">
								{posts.map((post) => (
									<article key={post.id} className="flex flex-col items-start justify-between">
										<div className="relative w-full">
											<img
												src={post.imageUrl}
												alt=""
												className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
											/>
											<div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"/>
										</div>
										<div className="w-full">
											<div className="mt-8 flex items-center gap-x-4 text-xs">
												<time dateTime={post.datetime} className="text-gray-500">
													{post.date}
												</time>
												<a
													href={post.category.href}
													className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
												>
													{post.category.title}
												</a>
											</div>
											<div className="group relative">
												<h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
													<a href={post.href}>
														<span className="absolute inset-0"/>
														{post.title}
													</a>
												</h3>
												<p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
											</div>
											<div className="relative mt-8 flex items-center gap-x-4">
												<img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-100"/>
												<div className="text-sm leading-6">
													<p className="font-semibold text-gray-900">
														<a href={post.author.href}>
															<span className="absolute inset-0"/>
															{post.author.name}
														</a>
													</p>
													<p className="text-gray-600">{post.author.role}</p>
												</div>
											</div>
										</div>
									</article>
								))}
							</div>
						</div>
					</div>

					{/*  <div>*/}
					{/*      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">*/}
					{/*          <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between">*/}
					{/*              <div className="ml-4 mt-4">*/}
					{/*                  <div className="flex items-center">*/}
					{/*                      <div className="flex-shrink-0">*/}
					{/*                          <img*/}
					{/*                            className="h-12 w-12 rounded-full"*/}
					{/*                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"*/}
					{/*                            alt=""*/}
					{/*                          />*/}
					{/*                      </div>*/}
					{/*                      <div className="ml-4">*/}
					{/*                          <h3 className="text-base font-semibold leading-6 text-gray-900">Tom Cook</h3>*/}
					{/*                          <p className="text-sm text-gray-500">*/}
					{/*                              <a href="#">@tom_cook</a>*/}
					{/*                          </p>*/}
					{/*                      </div>*/}
					{/*                  </div>*/}
					{/*              </div>*/}
					{/*              <div className="flex">*/}
					{/*                  <div className="mt-4 flex flex-shrink-0 xl:hidden">*/}
					{/*                      <button*/}
					{/*                        type="button"*/}
					{/*                        className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm*/}
					{/*					font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"*/}
					{/*                        // onClick={() => setOpenContactListModal((prevState) => !prevState)}*/}
					{/*                      >*/}
					{/*                          <UserGroupIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"*/}
					{/*                                         aria-hidden="true"/>*/}
					{/*                          <span>Chat list</span>*/}
					{/*                      </button>*/}
					{/*                  </div>*/}
					{/*                  <div className="mt-4 flex flex-shrink-0">*/}
					{/*                      <button*/}
					{/*                        type="button"*/}
					{/*                        className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"*/}
					{/*                      >*/}
					{/*                          <TrashIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true"/>*/}
					{/*                          <span>Delete</span>*/}
					{/*                      </button>*/}
					{/*                  </div>*/}
					{/*              </div>*/}
					{/*          </div>*/}
					{/*      </div>*/}
					{/*  </div>*/}
					{/*  <div className="h-[58vh] overflow-y-auto pt-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">*/}

					{/*  </div>*/}
					{/*  <div className="flex flex-row pt-2">*/}
					{/*      <input*/}
					{/*        type="text"*/}
					{/*        className="w-11/12 outline-none focus:outline-none border border-gray-300 rounded-lg px-4 py-2*/}
					{/*	focus:bg-white mr-2"*/}
					{/*      />*/}
					{/*      <div className="w-1/12 flex justify-center items-center outline-none focus:outline-none border*/}
					{/*border-gray-300 rounded-lg px-4 py-2 focus:bg-white text-green-600 hover:bg-green-600 hover:text-white*/}
					{/*hover:cursor-pointer">*/}
					{/*          <PaperAirplaneIcon className="h-5 w-5"/>*/}
					{/*      </div>*/}
					{/*  </div>*/}
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
											'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10'
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
				</div>
			</div>
	);
}

export default CommonWall;