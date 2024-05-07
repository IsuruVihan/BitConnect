import {Fragment, useEffect, useState} from 'react'
import {Dialog, Menu, Transition} from '@headlessui/react'
import {Route, Routes, useNavigate} from 'react-router-dom';

import Attendance from '../pages/Attendance';
import Leave from '../pages/Leave';
import CommonWall from '../pages/CommonWall';
import ChatBox from '../pages/ChatBox';
import SpecialNotices from '../pages/SpecialNotices';
import KT from '../pages/KT';
import Calendar from '../pages/Calendar';
import EmpView from '../pages/EmpView';

import {
  AcademicCapIcon,
  ArrowUpTrayIcon,
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  CheckIcon,
  ClipboardDocumentListIcon,
  EnvelopeIcon,
  IdentificationIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import {ChevronDownIcon} from '@heroicons/react/20/solid'

const navigation = [
  { name: 'Attendance', path: '/attendance', icon: CheckIcon, current: true },
  { name: 'Leave', path: '/leave', icon: EnvelopeIcon, current: false },
  { name: 'Common Wall', path: '/common-wall', icon:ArrowUpTrayIcon , current: false },
  { name: 'ChatBox', path: '/chat-box', icon:ChatBubbleLeftRightIcon , current: false },
  { name: 'Special Notices', path: '/special-notices', icon:ClipboardDocumentListIcon , current: false },
  { name: 'KT Courses', path: '/kt-courses', icon:AcademicCapIcon , current: false },
  { name: 'Calendar', path: '/calendar', icon:CalendarIcon, current: false },
  { name: 'Employees View', path: '/employees-view', icon:IdentificationIcon, current: false },
]

const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Header = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [navigation, setNavigation] = useState([
    { name: 'Attendance', path: '/attendance', icon: CheckIcon, current: true },
    { name: 'Leave', path: '/leave', icon: EnvelopeIcon, current: false },
    { name: 'Common Wall', path: '/common-wall', icon:ArrowUpTrayIcon , current: false },
    { name: 'ChatBox', path: '/chat-box', icon:ChatBubbleLeftRightIcon , current: false },
    { name: 'Special Notices', path: '/special-notices', icon:ClipboardDocumentListIcon , current: false },
    { name: 'KT Courses', path: '/kt-courses', icon:AcademicCapIcon , current: false },
    { name: 'Calendar', path: '/calendar', icon:CalendarIcon, current: false },
    { name: 'Employees View', path: '/employees-view', icon:IdentificationIcon, current: false },
  ]);
  const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(() => {
    const getLoggedInUser = async (token) => {
      try {
        return await fetch('http://localhost:4000/user', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token
          },
        });
      } catch (error) {
        console.error('Logged in user error:', error);
      }
    }

    const token = localStorage.getItem("token")
    getLoggedInUser(token)
      .then(response => response.json())
      .then(data => {
        setLoggedInUser(data);
      })
      .catch(error => {
        console.error("Error fetching data from API:", error);
      });
  }, []);

  const getCurrentNavigationName = () => {
    const currentNavigationItem = navigation.find(item => item.current);
    return currentNavigationItem ? currentNavigationItem.name : '';
  };

  const redirect = (path) => {
    navigate(path)
    const updatedNavigation = navigation.map(item => {
      if (item.path === path) {
        return { ...item, current: true };
      } else {
        return { ...item, current: false };
      }
    });
    setNavigation(updatedNavigation);
  }

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex flex-1 w-full max-w-xs mr-16">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 flex justify-center w-16 pt-5 left-full">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="w-6 h-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex flex-col px-6 pb-4 overflow-y-auto bg-gray-900 grow gap-y-5 ring-1 ring-white/10">
                    <div className="flex items-center h-16 shrink-0">
                      <img
                        className="w-auto h-8"
                        src="https://www.bitzquad.com/logo.webp"
                        alt="Company"
                      />
                    </div>
                    <nav className="flex flex-col flex-1">
                      <ul role="list" className="flex flex-col flex-1 gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  onClick={() => redirect(item.path)}
                                  className={classNames(
                                    item.current
                                      ? 'bg-gray-800 text-white'
                                      : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <item.icon className="w-6 h-6 shrink-0" aria-hidden="true" />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col px-6 pb-4 overflow-y-auto bg-gray-900 grow gap-y-5">
            <div className="flex items-center h-16 shrink-0">
              <img
                className="w-auto h-8"
                src="https://www.bitzquad.com/logo.webp"
                alt="Company"
              />
            </div>
            <nav className="flex flex-col flex-1">
              <ul role="list" className="flex flex-col flex-1 gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <p
                          onClick={() => redirect(item.path)}
                          className={classNames(
                            item.current
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon className="w-6 h-6 shrink-0" aria-hidden="true" />
                          {item.name}
                        </p>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div
            className="sticky top-0 z-40 flex items-center h-16 px-4 bg-white border-b border-gray-200 shadow-sm shrink-0 gap-x-4 sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="w-6 h-6" aria-hidden="true"/>
            </button>

            <div className="text-3xl font-bold">
              {getCurrentNavigationName()}
            </div>

            {/* Separator */}
            <div className="w-px h-6 bg-gray-900/10 lg:hidden" aria-hidden="true"/>

            <div className="flex self-stretch flex-1 gap-x-4 lg:gap-x-6">
              <div className="flex items-center justify-end flex-1 gap-x-4 lg:gap-x-6">
                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="w-6 h-6" aria-hidden="true"/>
                </button>

                {/* Separator */}
                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true"/>

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                        {loggedInUser}
                      </span>
                      <ChevronDownIcon className="w-5 h-5 ml-2 text-gray-400" aria-hidden="true"/>
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({active}) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray-50' : '',
                                'block px-3 py-1 text-sm leading-6 text-gray-900'
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/attendance" element={<Attendance/>}/>
                <Route path="/leave" element={<Leave/>}/>
                <Route path="/common-wall" element={<CommonWall/>}/>
                <Route path="/chat-box" element={<ChatBox/>}/>
                <Route path="/special-notices" element={<SpecialNotices/>}/>
                <Route path="/kt-courses" element={<KT/>}/>
                <Route path="/calendar" element={<Calendar/>}/>
                <Route path="/employees-view" element={<EmpView/>}/>
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default Header;