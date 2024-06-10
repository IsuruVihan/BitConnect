import {PrimaryButton} from "../components/Button";
import CreateEmpAccModal from "../components/modals/CreateEmpAccModal";
import React, {useEffect, useState} from "react";
import CreateTeamModal from "../components/modals/CreateTeamModal";
import ViewEmployeeModal from "../components/modals/ViewEmployeeModal";
import {Menu, Transition} from "@headlessui/react";
import {EllipsisVerticalIcon} from "@heroicons/react/20/solid";
import ConfirmCreateEmployeeModal from "../components/modals/ConfirmCreateEmployeeModal";
import SuccessModal from "../components/modals/SuccessModal";
import ErrorModal from "../components/modals/ErrorModal";
import ConfirmCreateTeamModal from "../components/modals/ConfirmCreateTeamModal";
import ViewTeamModal from "../components/modals/ViewTeamModal";
import {useAuth} from "../context/AuthContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const EmpView = () => {
  const {loading, isTL, isAdmin} = useAuth();

  const [employees, setEmployees] = useState([
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      role: "Developer",
      team: "Team A",
      isTL: true,
      isAdmin: false,
      birthDay: "1990-01-15",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      role: "Project Manager",
      team: "Team A",
      isTL: false,
      isAdmin: false,
      birthDay: "1985-05-30",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    },
    {
      firstName: "Emily",
      lastName: "Johnson",
      email: "emily.johnson@example.com",
      role: "UX Designer",
      team: "Team B",
      isTL: false,
      isAdmin: false,
      birthDay: "1992-07-21",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    },
    {
      firstName: "Michael",
      lastName: "Brown",
      email: "michael.brown@example.com",
      role: "QA Engineer",
      team: "",
      isTL: false,
      isAdmin: true,
      birthDay: "1988-03-10",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    },
    {
      firstName: "Lisa",
      lastName: "Davis",
      email: "lisa.davis@example.com",
      role: "Data Analyst",
      team: "Team B",
      isTL: true,
      isAdmin: false,
      birthDay: "1993-11-25",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    }
  ]);
  const [searchEmployee, setSearchEmployee] = useState("");
  const [visibleEmployees, setVisibleEmployees] = useState([]);
  const [createEmployeeAccountModalOpen, setCreateEmployeeAccountModalOpen] = useState(false);
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [team, setTeam] = useState('');
  const [joinedDate, setJoinedDate] = useState('');
  const [confirmCreateEmployeeAccountModalOpen, setConfirmCreateEmployeeAccountModalOpen]
    = useState(false);
  const [createEmployeeAccountSuccessModalOpen, setCreateEmployeeAccountSuccessModalOpen]
    = useState(false);
  const [createEmployeeAccountErrorModalOpen, setCreateEmployeeAccountErrorModalOpen]
    = useState(false);
  const [viewEmployeeModalOpen, setViewEmployeeModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null
    // {
    // 	firstName: "John",
    // 	lastName: "Doe",
    // 	email: "john.doe@example.com",
    // 	role: "Developer",
    // 	team: "Backend",
    // 	isTL: false,
    // 	isAdmin: false,
    // 	birthDay: "1990-01-15",
    // 	imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    // }
  );
  const [confirmUpdateEmployeeAccountModalOpen, setConfirmUpdateEmployeeAccountModalOpen]
    = useState(false);
  const [updateEmployeeAccountSuccessModalOpen, setUpdateEmployeeAccountSuccessModalOpen]
    = useState(false);
  const [updateEmployeeAccountErrorModalOpen, setUpdateEmployeeAccountErrorModalOpen]
    = useState(false);
  const [confirmDeleteEmployeeAccountModalOpen, setConfirmDeleteEmployeeAccountModalOpen]
    = useState(false);
  const [deleteEmployeeAccountSuccessModalOpen, setDeleteEmployeeAccountSuccessModalOpen]
    = useState(false);
  const [deleteEmployeeAccountErrorModalOpen, setDeleteEmployeeAccountErrorModalOpen]
    = useState(false);

  const [teams, setTeams] = useState([
    {
      id: 1,
      name: 'GraphQL API',
      client: 'Leslie Alexander',
      members: 2,
    },
    {
      id: 2,
      name: 'New benefits plan',
      client: 'Leslie Alexander',
      members: 23,
    },
    {
      id: 3,
      name: 'Onboarding emails',
      client: 'Courtney Henry',
      members: 34,
    },
    {
      id: 4,
      name: 'iOS app',
      client: 'Leonard Krasner',
      members: 12,
    },
    {
      id: 5,
      name: 'Marketing site redesign',
      client: 'Courtney Henry',
      members: 31,
    },
  ]);
  const [searchTeam, setSearchTeam] = useState("");
  const [visibleTeams, setVisibleTeams] = useState([]);
  const [openCreateTeamModal, setOpenCreateTeamModal] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [clientName, setClientName] = useState("");
  const [eligibleTeamLeads, setEligibleTeamLeads] = useState([
    { id: 1, name: 'Leslie Alexander' },
  ]);
  const [teamLead, setTeamLead] = useState(null);
  const [confirmCreateTeamModalOpen, setConfirmCreateTeamModalOpen] = useState(false);
  const [createTeamSuccessModalOpen, setCreateTeamSuccessModalOpen] = useState(false);
  const [createTeamErrorModalOpen, setCreateTeamErrorModalOpen] = useState(false);
  const [viewTeamModalOpen, setViewTeamModalOpen] = useState(false);
  const [selectedTeamData, setSelectedTeamData] = useState();
  const [confirmUpdateTeamModalOpen, setConfirmUpdateTeamModalOpen] = useState(false);
  const [updateTeamSuccessModalOpen, setUpdateTeamSuccessModalOpen] = useState(false);
  const [updateTeamErrorModalOpen, setUpdateTeamErrorModalOpen] = useState(false);
  const [confirmDeleteTeamModalOpen, setConfirmDeleteTeamModalOpen] = useState(false);
  const [deleteTeamSuccessModalOpen, setDeleteTeamSuccessModalOpen] = useState(false);
  const [deleteTeamErrorModalOpen, setDeleteTeamErrorModalOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const tempEmployees = employees.filter((employee) => {
        const fullName = employee.firstName + employee.lastName;
        return fullName.toLowerCase().trim().includes(searchEmployee.toLowerCase().trim());
      });
      setVisibleEmployees(tempEmployees);
    }, 1000);
  }, [employees, searchEmployee]);

  useEffect(() => {
    setTimeout(() => {
      const tempTeams = teams.filter((team) => {
        return team.name.toLowerCase().trim().includes(searchTeam.toLowerCase().trim());
      });
      setVisibleTeams(tempTeams);
    }, 1000);
  }, [teams, searchTeam]);

  const createEmployee = () => {}
  const confirmCreateEmployee = () => {
    createEmployee();
  }

  return (
    <div>
      <>
        <CreateEmpAccModal
          open={createEmployeeAccountModalOpen}
          setOpen={setCreateEmployeeAccountModalOpen}
          firstName={fName}
          setFirstName={setFName}
          lastName={lName}
          setLastName={setLName}
          empEmail={email}
          setEmpEmail={setEmail}
          empRole={role}
          setEmpRole={setRole}
          teams={teams}
          empTeam={team}
          setEmpTeam={setTeam}
          joinedDate={joinedDate}
          setJoinedDate={setJoinedDate}
          createAccount={() => setConfirmCreateEmployeeAccountModalOpen(true)}
        />
        <ConfirmCreateEmployeeModal
          open={confirmCreateEmployeeAccountModalOpen}
          setOpen={setConfirmCreateEmployeeAccountModalOpen}
          onClickComplete={confirmCreateEmployee}
        />
        <SuccessModal
          title={"Create Employee Account"}
          message={"Employee account has been created successfully"}
          open={createEmployeeAccountSuccessModalOpen}
          setOpen={setCreateEmployeeAccountSuccessModalOpen}
        />
        <ErrorModal
          title={"Create Employee Account"}
          message={"An error occurred while creating the Employee account. Please try again."}
          open={createEmployeeAccountErrorModalOpen}
          setOpen={setCreateEmployeeAccountErrorModalOpen}
        />
        {selectedEmployee && <ViewEmployeeModal
          open={viewEmployeeModalOpen}
          setOpen={setViewEmployeeModalOpen}
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
          isAdmin={isAdmin}
        />}
        <SuccessModal
          title={"Update Employee Account"}
          message={"Employee account has been updated successfully"}
          open={updateEmployeeAccountSuccessModalOpen}
          setOpen={setUpdateEmployeeAccountSuccessModalOpen}
        />
        <ErrorModal
          title={"Update Employee Account"}
          message={"An error occurred while updating the Employee account. Please try again."}
          open={updateEmployeeAccountErrorModalOpen}
          setOpen={setUpdateEmployeeAccountErrorModalOpen}
        />
        <SuccessModal
          title={"Delete Employee Account"}
          message={"Delete account has been created successfully"}
          open={deleteEmployeeAccountSuccessModalOpen}
          setOpen={setDeleteEmployeeAccountSuccessModalOpen}
        />
        <ErrorModal
          title={"Delete Employee Account"}
          message={"An error occurred while deleting the Employee account. Please try again."}
          open={deleteEmployeeAccountErrorModalOpen}
          setOpen={setDeleteEmployeeAccountErrorModalOpen}
        />

        <CreateTeamModal
          open={openCreateTeamModal}
          setOpen={setOpenCreateTeamModal}
          teamName={teamName}
          setTeamName={setTeamName}
          clientName={clientName}
          setClientName={setClientName}
          eligibleTeamLeads={eligibleTeamLeads}
          teamLead={teamLead}
          setTeamLead={setTeamLead}
          createTeam={() => setConfirmCreateTeamModalOpen(true)}
        />
        <ConfirmCreateTeamModal
          open={confirmCreateTeamModalOpen}
          setOpen={setConfirmCreateTeamModalOpen}
          onClickComplete={() => {}}
        />
        <SuccessModal
          title={"Create a Team"}
          message={"New team has been created successfully"}
          open={createTeamSuccessModalOpen}
          setOpen={setCreateTeamSuccessModalOpen}
        />
        <ErrorModal
          title={"Create a Team"}
          message={"An error occurred while creating the new team. Please try again."}
          open={createTeamErrorModalOpen}
          setOpen={setCreateTeamErrorModalOpen}
        />
        {/*<ViewTeamModal*/}
        {/*	open={viewTeamModalOpen}*/}
        {/*	setOpen={setViewTeamModalOpen}*/}
        {/*	selectedTeamData={selectedTeamData}*/}
        {/*	setSelectedTeamData={setSelectedTeamData}*/}
        {/*/>*/}
        <SuccessModal
          title={"Update a Team"}
          message={"Team has been updated successfully"}
          open={updateTeamSuccessModalOpen}
          setOpen={setUpdateTeamSuccessModalOpen}
        />
        <ErrorModal
          title={"Update a Team"}
          message={"An error occurred while updating the new team. Please try again."}
          open={updateTeamErrorModalOpen}
          setOpen={setUpdateTeamErrorModalOpen}
        />
        <SuccessModal
          title={"Delete a Team"}
          message={"Team has been deleted successfully"}
          open={deleteTeamSuccessModalOpen}
          setOpen={setDeleteTeamSuccessModalOpen}
        />
        <ErrorModal
          title={"Delete a Team"}
          message={"An error occurred while deleting the new team. Please try again."}
          open={deleteTeamErrorModalOpen}
          setOpen={setDeleteTeamErrorModalOpen}
        />
      </>

      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3 p-4 rounded-md shadow-md">
          <div className="bg-white mb-4">
            <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-4">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Employees</h3>
              </div>
              <div className="ml-4 mt-4 flex-shrink-0 flex gap-2">
                <PrimaryButton
                  onClick={() => setCreateEmployeeAccountModalOpen(true)}
                  label={'Create Account'}
                  color={'indigo'}
                />
              </div>
            </div>
          </div>
          <input
            type="text"
            name="employee-search"
            id="employee-search"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
            placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-4"
            placeholder="Employee name"
            value={searchEmployee}
            onChange={(e) => setSearchEmployee(e.target.value)}
          />
          <ul role="list" className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {visibleEmployees.map((person) => (
              <li
                key={person.email}
                className="flex flex-col col-span-1 text-center bg-white divide-y divide-gray-200 rounded-lg shadow
								cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setSelectedEmployee(person);
                  setViewEmployeeModalOpen(true);
                }}
              >
                <div className="flex flex-col flex-1 p-4">
                  <img className="flex-shrink-0 w-32 h-32 mx-auto rounded-full" src={person.imageUrl} alt=""/>
                  <h3 className="mt-6 text-sm font-medium text-gray-900">{person.firstName} {person.lastName}</h3>
                  <dl className="flex flex-col justify-between flex-grow mt-1">
                    <dt className="sr-only">Role</dt>
                    <dd className="text-sm text-gray-500">{person.role}</dd>
                    <dt className="sr-only">Team</dt>
                    <dd className="mt-3">
                      {person.isAdmin ? <span
                          className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-700 rounded-full
													bg-red-50 ring-1 ring-inset ring-red-600/20"
                        >
													Admin
												</span> :
                        <span
                          className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-700 rounded-full
													bg-green-50 ring-1 ring-inset ring-green-600/20"
                        >
													{person.team}
												</span>
                      }
                    </dd>
                  </dl>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 p-4 rounded-md shadow-md">
          <div className="bg-white mb-4">
            <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
              <div className="ml-4 mt-4">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Teams</h3>
              </div>
              <div className="ml-4 mt-4 flex-shrink-0 flex gap-2">
                <PrimaryButton
                  onClick={() => setOpenCreateTeamModal(true)}
                  label={'Create Team'}
                  color={'indigo'}
                />
              </div>
            </div>
          </div>
          <input
            type="text"
            name="team-search"
            id="team-search"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
            placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-4"
            placeholder="Team name"
            value={searchTeam}
            onChange={(e) => setSearchTeam(e.target.value)}
          />
          <ul role="list" className="divide-y divide-gray-100">
            {visibleTeams.map((team) => (
              <li key={team.id} className="flex items-center justify-between gap-x-6 py-5 cursor-pointer
							hover:bg-gray-100 px-4 rounded-lg">
                <div className="min-w-0">
                  <div className="flex items-start gap-x-3">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{team.name}</p>
                  </div>
                  <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                    <p className="whitespace-nowrap">
                      Client: {team.client}
                    </p>
                    <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                      <circle cx={1} cy={1} r={1}/>
                    </svg>
                    <p className="truncate">{team.members} members</p>
                  </div>
                </div>
                <div className="flex flex-none items-center gap-x-4">
                  <Menu as="div" className="relative flex-none">
                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                      <span className="sr-only">Open options</span>
                      <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true"/>
                    </Menu.Button>
                    <Transition
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg
												ring-1 ring-gray-900/5 focus:outline-none">
                        <Menu.Item>
                          {({focus}) => (
                            <div
                              className={classNames(
                                focus ? 'bg-gray-50' : '',
                                'block px-3 py-1 text-sm leading-6 text-gray-900'
                              )}
                            >
                              Edit<span className="sr-only">, {team.name}</span>
                            </div>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({focus}) => (
                            <div
                              className={classNames(
                                focus ? 'bg-gray-50' : '',
                                'block px-3 py-1 text-sm leading-6 text-gray-900'
                              )}
                            >
                              Delete<span className="sr-only">, {team.name}</span>
                            </div>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EmpView;