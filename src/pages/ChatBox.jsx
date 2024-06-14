import {useEffect, useState} from "react";
import {TrashIcon, UserGroupIcon, PaperAirplaneIcon} from '@heroicons/react/20/solid';

import ChatListModal from "../components/modals/ChatListModal";

const ChatBox = () => {
    const [contactList, setContactList] = useState([
        // {
        // 	name: 'Leslie Alexander',
        // 	email: 'aleslie.alexander@example.com',
        // 	imageUrl:
        // 		'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        // }
    ]);
    const [visibleContactList, setVisibleContactList] = useState([]);
    const [searchContact, setSearchContact] = useState("");
    const [selectedContact, setSelectedContact] = useState(null);

    const [openContactListModal, setOpenContactListModal] = useState(false);
    const [messages, setMessages] = useState([
        {from: "Tom Cook", message: "Hello how are you doing?"},
        {to: "Tom Cook", message: "Hey Tom!"},
        {
            from: "Tom Cook",
            message: "I'm doing pretty well, thanks for asking. How about you? I've been keeping busy with work and trying to find some time for hobbies too."
        },
        {
            to: "Tom Cook",
            message: "That's great to hear! I've been doing well too, just trying to juggle work and personal life as usual. Anything exciting happening lately?"
        },
        {
            from: "Tom Cook",
            message: "Not much, just been busy with work and catching up on some reading. How about you? Have you been up to anything interesting?"
        },
        {
            to: "Tom Cook",
            message: "Actually, yes! I've been working on a new project at work and also trying out some new recipes in my free time. It's been quite fun!"
        },
        {
            from: "Tom Cook",
            message: "That sounds interesting! What kind of project are you working on? I'd love to hear more about it."
        },
        {
            to: "Tom Cook",
            message: "It's a software development project. We're building a new app for managing tasks more efficiently. There are some exciting challenges, but it's coming along well."
        },
        {
            from: "Tom Cook",
            message: "That's cool! Let me know if you need any help with it. I've got some experience with similar projects and I'd be happy to lend a hand if needed."
        },
        {
            to: "Tom Cook",
            message: "Thanks, I appreciate it. Having an extra set of eyes would definitely be helpful at times. How about you? Anything exciting happening in your life apart from work?"
        },
        {
            from: "Tom Cook",
            message: "Not really, just trying to stay productive and enjoy some downtime whenever I can. It's important to find that balance, you know?"
        },
        {
            to: "Tom Cook",
            message: "Absolutely, balance is key. Well, if you ever want to grab a coffee or hang out, just let me know! It'd be great to catch up."
        },
        {
            from: "Tom Cook",
            message: "Sounds good! Let's definitely plan something soon. Maybe we can try out that new cafe downtown?"
        }
    ]);

    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        setTimeout(() => {
            const tempEmployees = contactList.filter((c) => {
                return c.name.toLowerCase().trim().replace(" ", "").includes(searchContact.toLowerCase().trim());
            });
            setVisibleContactList(tempEmployees);
        }, 1000);
    }, [contactList, searchContact]);

    const getParticipantsList = async () => {
        try {
            return {
                result: await fetch(`${process.env.REACT_APP_API_URL}/chat/contacts`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    }
                }),
                error: false
            };
        } catch (error) {
            return {error: true};
        }
    }
    useEffect(() => {
        getParticipantsList()
          .then((r) => {
              if (r.error || r.result.status !== 200)
                  return {error: true};
              return r.result.json();
          })
          .then((data) => {
              if (data.error) {
                  // setRetrieveTeamDataErrorModalOpen(true);
              } else {
                  setContactList(data.employees);
              }
          });
    }, []);

    const getMessages = async () => {
        try {
            return {
                result: await fetch(`${process.env.REACT_APP_API_URL}/chat/message/${selectedContact.Id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    }
                }),
                error: false
            };
        } catch (error) {
            return {error: true};
        }
    }
    useEffect(() => {
        if (selectedContact) {
            getMessages()
              .then((r) => {
                  if (r.error || r.result.status !== 200)
                      return {error: true};
                  return r.result.json();
              })
              .then((data) => {
                  if (data.error) {
                      // setRetrieveTeamDataErrorModalOpen(true);
                  } else {
                      setMessages(data.messages);
                  }
              });
        }
    }, [selectedContact]);

    const sendMessage = async () => {
        if (selectedContact && (newMessage.trim() !== "")) {
            try {
                await fetch(`${process.env.REACT_APP_API_URL}/chat/message/${selectedContact.Id}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        Content: newMessage.trim()
                    }),
                })

                getMessages()
                  .then((r) => {
                      if (r.error || r.result.status !== 200)
                          return {error: true};
                      return r.result.json();
                  })
                  .then((data) => {
                      if (data.error) {
                          // setRetrieveTeamDataErrorModalOpen(true);
                      } else {
                          setMessages(data.messages);
                      }
                  });
            } catch (error) {
                return {error: true};
            }
        }
    }

    const deleteMessage = async () => {}

    return (
      <>
          <ChatListModal
            open={openContactListModal}
            setOpen={setOpenContactListModal}
            visibleContactList={visibleContactList}
            searchContact={searchContact}
            setSearchContact={setSearchContact}
            setSelectedContact={setSelectedContact}
          />
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
                            value={searchContact}
                            onChange={(e) => setSearchContact(e.target.value)}
                          />
                      </div>
                  </div>
                  <div className="h-[68vh] overflow-y-auto">
                      <ul role="list" className="flex flex-col divide-y divide-gray-100 gap-2">
                          {visibleContactList.map((person) => (
                            <li
                              key={person.email}
                              className="flex items-center py-3 pl-3"
                              onClick={() => setSelectedContact(person)}
                            >
                                <div className="flex min-w-0 gap-x-4 justify-center align-middle">
                                    <img
                                      className="h-12 w-12 flex-none rounded-full bg-gray-50"
                                      src={'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                                      alt=""
                                    />
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
              {selectedContact ? <div className="xl:col-span-3 col-span-4">
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
                                          <h3 className="text-base font-semibold leading-6 text-gray-900">
                                              {selectedContact.name}
                                          </h3>
                                          <p className="text-sm text-gray-500">
                                              {selectedContact.email}
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
                                  {/*<div className="mt-4 flex flex-shrink-0">*/}
                                  {/*	<button*/}
                                  {/*		type="button"*/}
                                  {/*		className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"*/}
                                  {/*	>*/}
                                  {/*		<TrashIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true"/>*/}
                                  {/*		<span>Delete</span>*/}
                                  {/*	</button>*/}
                                  {/*</div>*/}
                              </div>
                          </div>
                      </div>
                  </div>
                  <div
                    className="h-[58vh] overflow-y-auto pt-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                      {messages.map((m) => {
                          if (!m.sent)
                              return <div key={m.Id} className="w-fit max-w-[90%] rounded-md p-2 mb-2 bg-blue-100 text-gray-800">
                                  {m.Content}
                              </div>;
                          return <div key={m.Id} className="w-fit max-w-[90%] bg-emerald-100 text-gray-800 rounded-md p-2 mb-2 ml-auto">
                              {m.Content}
                          </div>;
                      })}
                  </div>
                  <div className="flex flex-row pt-2">
                      <input
                        type="text"
                        className="w-11/12 outline-none focus:outline-none border border-gray-300 rounded-lg px-4 py-2
							focus:bg-white mr-2"
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                      />
                      <div
                        className="w-1/12 flex justify-center items-center outline-none focus:outline-none border
							border-gray-300 rounded-lg px-4 py-2 focus:bg-white text-green-600 hover:bg-green-600 hover:text-white
							hover:cursor-pointer"
                        onClick={() => {
                            sendMessage();
                            setNewMessage('');
                        }}
                      >
                          <PaperAirplaneIcon className="h-5 w-5"/>
                      </div>
                  </div>
              </div> : <div className="rounded-lg xl:col-span-3 col-span-4 shadow flex flex-row justify-center items-center text-gray-400">
                  Select a contact to start or continue a conversation...
                  <button
                    type="button"
                    className="relative xl:hidden ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold
						text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={() => setOpenContactListModal((prevState) => !prevState)}
                  >
                      <UserGroupIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true"/>
                      <span>Chat list</span>
                  </button>
              </div>}
          </div>
      </>
    );
}

export default ChatBox;