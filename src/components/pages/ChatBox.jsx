import {useState} from "react";
import { TrashIcon, UserGroupIcon, PaperAirplaneIcon } from '@heroicons/react/20/solid';

import ChatListModal from "../ChatListModal";

const ChatBox = () => {
    const [contactList, setContactList] = useState([
        {
            name: 'Leslie Alexander',
            email: 'aleslie.alexander@example.com',
            role: 'Co-Founder / CEO',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            name: 'Leslie Alexander',
            email: 'leslie.alexander@example.com',
            role: 'Co-Founder / CEO',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            name: 'Michael Foster',
            email: 'michael.foster@example.com',
            role: 'Co-Founder / CTO',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            name: 'Dries Vincent',
            email: 'dries.vincent@example.com',
            role: 'Business Relations',
            imageUrl:
                'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            name: 'Lindsay Walton',
            email: 'lindsay.walton@example.com',
            role: 'Front-end Developer',
            imageUrl:
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            name: 'Courtney Henry',
            email: 'courtney.henry@example.com',
            role: 'Designer',
            imageUrl:
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        {
            name: 'Tom Cook',
            email: 'tom.cook@example.com',
            role: 'Director of Product',
            imageUrl:
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    ]);
    const [openContactListModal, setOpenContactListModal] = useState(false);
    const [messages, setMessages] = useState([
        { from: "Tom Cook", message: "Hello how are you doing?" },
        { to: "Tom Cook", message: "Hey Tom!" },
        { from: "Tom Cook", message: "I'm doing pretty well, thanks for asking. How about you? I've been keeping busy with work and trying to find some time for hobbies too." },
        { to: "Tom Cook", message: "That's great to hear! I've been doing well too, just trying to juggle work and personal life as usual. Anything exciting happening lately?" },
        { from: "Tom Cook", message: "Not much, just been busy with work and catching up on some reading. How about you? Have you been up to anything interesting?" },
        { to: "Tom Cook", message: "Actually, yes! I've been working on a new project at work and also trying out some new recipes in my free time. It's been quite fun!" },
        { from: "Tom Cook", message: "That sounds interesting! What kind of project are you working on? I'd love to hear more about it." },
        { to: "Tom Cook", message: "It's a software development project. We're building a new app for managing tasks more efficiently. There are some exciting challenges, but it's coming along well." },
        { from: "Tom Cook", message: "That's cool! Let me know if you need any help with it. I've got some experience with similar projects and I'd be happy to lend a hand if needed." },
        { to: "Tom Cook", message: "Thanks, I appreciate it. Having an extra set of eyes would definitely be helpful at times. How about you? Anything exciting happening in your life apart from work?" },
        { from: "Tom Cook", message: "Not really, just trying to stay productive and enjoy some downtime whenever I can. It's important to find that balance, you know?" },
        { to: "Tom Cook", message: "Absolutely, balance is key. Well, if you ever want to grab a coffee or hang out, just let me know! It'd be great to catch up." },
        { from: "Tom Cook", message: "Sounds good! Let's definitely plan something soon. Maybe we can try out that new cafe downtown?" }
    ]);

    return(
        <>
            <ChatListModal open={openContactListModal} setOpen={setOpenContactListModal} contactList={contactList}/>
            <div className="w-full grid grid-cols-4 min-h-[76vh]">
                <div className="hidden xl:block mr-2">
                    <div className="p-4">
                        <div>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
							ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
							sm:text-sm sm:leading-6"
                                placeholder="Search employee"
                            />
                        </div>
                    </div>
                    <div className="h-[68vh] overflow-y-auto">
                        <ul role="list" className="flex flex-col divide-y divide-gray-100 gap-2">
                            {contactList.map((person) => (
                                <li key={person.email} className="flex items-center py-3 pl-3">
                                    <div className="flex min-w-0 gap-x-4 justify-center align-middle">
                                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt=""/>
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="xl:col-span-3 col-span-4">
                    <div>
                        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                            <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between">
                                <div className="ml-4 mt-4">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-12 w-12 rounded-full"
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-base font-semibold leading-6 text-gray-900">Tom Cook</h3>
                                            <p className="text-sm text-gray-500">
                                                <a href="#">@tom_cook</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="mt-4 flex flex-shrink-0 xl:hidden">
                                        <button
                                            type="button"
                                            className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm
											font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            onClick={() => setOpenContactListModal((prevState) => !prevState)}
                                        >
                                            <UserGroupIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true"/>
                                            <span>Chat list</span>
                                        </button>
                                    </div>
                                    <div className="mt-4 flex flex-shrink-0">
                                        <button
                                            type="button"
                                            className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        >
                                            <TrashIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true"/>
                                            <span>Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-[58vh] overflow-y-auto pt-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        {messages.map((m, idx) => {
                            if (m.from)
                                return <div key={idx} className="w-fit max-w-[90%] rounded-md p-2 mb-2 bg-blue-100 text-gray-800">
                                    {m.message}
                                </div>;
                            return <div key={idx} className="w-fit max-w-[90%] bg-emerald-100 text-gray-800 rounded-md p-2 mb-2 ml-auto">
                                {m.message}
                            </div>;
                        })}
                    </div>
                    <div className="flex flex-row pt-2">
                        <input
                            type="text"
                            className="w-11/12 outline-none focus:outline-none border border-gray-300 rounded-lg px-4 py-2
							focus:bg-white mr-2"
                        />
                        <div className="w-1/12 flex justify-center items-center outline-none focus:outline-none border
						border-gray-300 rounded-lg px-4 py-2 focus:bg-white text-green-600 hover:bg-green-600 hover:text-white
						hover:cursor-pointer">
                            <PaperAirplaneIcon className="h-5 w-5"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChatBox;