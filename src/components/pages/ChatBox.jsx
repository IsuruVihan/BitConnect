const people = [
    {
      name: 'Leslie Alexander',
      email: 'leslie.alexander@example.com',
      role: 'Co-Founder / CEO',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    // More people...
  ]

const ChatBox = () => {
    return(
        <div>
            <main className="">
                <div className="">
                    <div className="">
                        {/* Main area started*/}
                        <div className="border-2 border-fuchsia-800 h-1/5 min-w-full">
                            dfgdfgdbbfbfbffgbhghfggbfg
                        </div>
                        <div className="border-2 border-fuchsia-800 h-3/5 min-w-full">
                            fgfdnrswascfnhnjj
                        </div>
                        <div className="border-2 border-fuchsia-800 h-1/5 min-w-full">
                            twefsdcscscawavnhmg
                        </div>
                        {/* Main area end*/}

                    </div>
                </div>
            </main>

            <aside
                className="fixed inset-y-0 overflow-y-auto border-r border-gray-200 left-72 w-96 xl:block">

                {/* add search bar here */}

                <ul role="list" className="pt-10 divide-y divide-gray-200">
                    {people.map((person, id) => (
                        <li key={id} className="px-4 py-4 sm:px-0">

                            {/* My content */}
                            <div
                                key={person.email}
                                className="relative flex items-center px-2 py-5 space-x-3 bg-white border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
                            >
                                <div className="flex-shrink-0">
                                    <img className="w-10 h-10 rounded-full" src={person.imageUrl} alt="" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <a href="#" className="focus:outline-none">
                                        <span className="absolute inset-0" aria-hidden="true" />
                                        <p className="text-sm font-medium text-gray-900">{person.name}</p>
                                        <p className="text-sm text-gray-500 truncate">{person.role}</p>
                                    </a>
                                </div>
                            </div>
                        
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    );
}

export default ChatBox;