import {PrimaryButton} from "../components/Button";
import CreateEmpAccModal from "../components/modals/CreateEmpAccModal";
import React, {useEffect, useMemo, useState} from "react";
import CreateTeamModal from "../components/modals/CreateTeamModal";
import ViewEmployeeModal from "../components/modals/ViewEmployeeModal";
import ConfirmCreateEmployeeModal from "../components/modals/ConfirmCreateEmployeeModal";
import SuccessModal from "../components/modals/SuccessModal";
import ErrorModal from "../components/modals/ErrorModal";
import ConfirmCreateTeamModal from "../components/modals/ConfirmCreateTeamModal";
import ViewTeamModal from "../components/modals/ViewTeamModal";
import {useAuth} from "../context/AuthContext";
import ConfirmUpdateEmployeeModal from "../components/modals/ConfirmUpdateEmployeeModal";
import ConfirmDeleteEmployeeModal from "../components/modals/ConfirmDeleteEmployeeModal";
import AddTeamMemberModal from "../components/modals/AddMemberModal";
import ConfirmUpdateTeamModal from "../components/modals/ConfirmUpdateTeamModal";
import ConfirmDeleteTeamModal from "../components/modals/ConfirmDeleteTeamModal";
import areObjectsIdentical from "../lib/areObjectsIdentical";
import UserImage from "../components/UserImage";

const EmpView = () => {
  const {isAdmin} = useAuth();

  const roles = useMemo(() => [
    {id: 1, title: "Business Analyst"},
    {id: 2, title: "Engineer"},
    {id: 3, title: "Human Resources"},
    {id: 4, title: "Marketing"},
    {id: 5, title: "Finance"},
  ], []);

  const [teams, setTeams] = useState([
    // {
    //   id: 1,
    //   name: 'Team A',
    //   client: 'Leslie Alexander',
    //   members: [
    //     {email: "john.doe@example.com", firstName: "John", lastName: "Doe", role: "Engineer", isTL: false},
    //     {email: "jane.smith@example.com", firstName: "Jane", lastName: "Smith", role: "Engineer", isTL: false},
    //     {email: "alice.jones@example.com", firstName: "Alice", lastName: "Jones", role: "Engineer", isTL: true},
    //     {email: "bob.brown@example.com", firstName: "Bob", lastName: "Brown", role: "Engineer", isTL: false},
    //     {email: "charlie.davis@example.com", firstName: "Charlie", lastName: "Davis", role: "Engineer", isTL: false},
    //   ],
    // },
    // {
    //   id: 2,
    //   name: 'Team B',
    //   client: 'Leslie Alexander',
    //   members: [
    //     {email: "diane.evans@example.com", firstName: "Diane", lastName: "Evans", role: "Engineer", isTL: false},
    //     {email: "eric.frank@example.com", firstName: "Eric", lastName: "Frank", role: "Engineer", isTL: true},
    //     {email: "fiona.green@example.com", firstName: "Fiona", lastName: "Green", role: "Engineer", isTL: false},
    //     {email: "george.harris@example.com", firstName: "George", lastName: "Harris", role: "Engineer", isTL: false},
    //     {email: "hannah.jackson@example.com", firstName: "Hannah", lastName: "Jackson", role: "Engineer", isTL: false},
    //     {email: "ian.king@example.com", firstName: "Ian", lastName: "King", role: "Engineer", isTL: false},
    //     {email: "jill.lee@example.com", firstName: "Jill", lastName: "Lee", role: "Engineer", isTL: false},
    //     {email: "kevin.morris@example.com", firstName: "Kevin", lastName: "Morris", role: "Engineer", isTL: false},
    //     {email: "laura.nelson@example.com", firstName: "Laura", lastName: "Nelson", role: "Engineer", isTL: false},
    //   ],
    // },
    // {
    //   id: 3,
    //   name: 'Team C',
    //   client: 'Courtney Henry',
    //   members: [
    //     {email: "mike.owen@example.com", firstName: "Mike", lastName: "Owen", role: "Engineer", isTL: true},
    //     {email: "nina.perez@example.com", firstName: "Nina", lastName: "Perez", role: "Engineer", isTL: false},
    //     {email: "oliver.quinn@example.com", firstName: "Oliver", lastName: "Quinn", role: "Engineer", isTL: false},
    //     {email: "paula.ross@example.com", firstName: "Paula", lastName: "Ross", role: "Engineer", isTL: false},
    //   ],
    // },
    // {
    //   id: 4,
    //   name: 'Team D',
    //   client: 'Leonard Krasner',
    //   members: [
    //     {email: "quentin.smith@example.com", firstName: "Quentin", lastName: "Smith", role: "Engineer", isTL: false},
    //     {email: "rachel.taylor@example.com", firstName: "Rachel", lastName: "Taylor", role: "Engineer", isTL: true},
    //   ],
    // },
    // {
    //   id: 5,
    //   name: 'Team E',
    //   client: 'Courtney Henry',
    //   members: [
    //     {email: "sam.underwood@example.com", firstName: "Sam", lastName: "Underwood", role: "Engineer", isTL: false},
    //     {email: "tina.vaughn@example.com", firstName: "Tina", lastName: "Vaughn", role: "Engineer", isTL: false},
    //     {email: "ulysses.williams@example.com", firstName: "Ulysses", lastName: "Williams", role: "Engineer", isTL: false},
    //     {email: "victor.xavier@example.com", firstName: "Victor", lastName: "Xavier", role: "Engineer", isTL: true},
    //     {email: "wendy.young@example.com", firstName: "Wendy", lastName: "Young", role: "Engineer", isTL: false},
    //   ],
    // },
  ]);
  const [searchTeam, setSearchTeam] = useState("");
  const [visibleTeams, setVisibleTeams] = useState([]);
  const [openCreateTeamModal, setOpenCreateTeamModal] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [clientName, setClientName] = useState("");
  const [teamLead, setTeamLead] = useState(null);
  const [retrieveTeamDataErrorModalOpen, setRetrieveTeamDataErrorModalOpen] = useState(false);
  const [confirmCreateTeamModalOpen, setConfirmCreateTeamModalOpen] = useState(false);
  const [createTeamSuccessModalOpen, setCreateTeamSuccessModalOpen] = useState(false);
  const [createTeamErrorModalOpen, setCreateTeamErrorModalOpen] = useState(false);
  const [viewTeamModalOpen, setViewTeamModalOpen] = useState(false);
  const [initSelectedTeam, setInitSelectedTeam] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [eligibleEmployees, setEligibleEmployees] = useState([
    // {
    //   firstName: "John",
    //   lastName: "Doe",
    //   email: "john.doe@example.com",
    //   isAdmin: false,
    //   birthDay: "1990-01-15",
    //   imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    // },
    // {
    //   firstName: "Jane",
    //   lastName: "Smith",
    //   email: "jane.smith@example.com",
    //   isAdmin: false,
    //   birthDay: "1985-05-30",
    //   imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    // },
    // {
    //   firstName: "Emily",
    //   lastName: "Johnson",
    //   email: "emily.johnson@example.com",
    //   isAdmin: false,
    //   birthDay: "1992-07-21",
    //   imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    // },
    // {
    //   firstName: "John",
    //   lastName: "Doe",
    //   email: "1john.doe@example.com",
    //   isAdmin: false,
    //   birthDay: "1990-01-15",
    //   imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    // },
    // {
    //   firstName: "Jane",
    //   lastName: "Smith",
    //   email: "1jane.smith@example.com",
    //   isAdmin: false,
    //   birthDay: "1985-05-30",
    //   imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    // },
    // {
    //   firstName: "Emily",
    //   lastName: "Johnson",
    //   email: "1emily.johnson@example.com",
    //   isAdmin: false,
    //   birthDay: "1992-07-21",
    //   imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    // }
  ]);
  const [addedEmployees, setAddedEmployees] = useState([]);
  const [addTeamMemberModalOpen, setAddTeamMemberModalOpen] = useState(false);
  const [confirmUpdateTeamModalOpen, setConfirmUpdateTeamModalOpen] = useState(false);
  const [updateTeamSuccessModalOpen, setUpdateTeamSuccessModalOpen] = useState(false);
  const [updateTeamErrorModalOpen, setUpdateTeamErrorModalOpen] = useState(false);
  const [confirmDeleteTeamModalOpen, setConfirmDeleteTeamModalOpen] = useState(false);
  const [deleteTeamSuccessModalOpen, setDeleteTeamSuccessModalOpen] = useState(false);
  const [deleteTeamErrorModalOpen, setDeleteTeamErrorModalOpen] = useState(false);

  const [employees, setEmployees] = useState([
    // {
    //   firstName: "John",
    //   lastName: "Doe",
    //   email: "john.doe@example.com",
    //   role: "Developer",
    //   team: "Team A",
    //   isTL: true,
    //   isAdmin: false,
    //   birthDay: "1990-01-15",
    //   imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    // },
    // {
    //   firstName: "Jane",
    //   lastName: "Smith",
    //   email: "jane.smith@example.com",
    //   role: null,
    //   team: null,
    //   isTL: false,
    //   isAdmin: false,
    //   birthDay: "1985-05-30",
    //   imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    // },
    // {
    //   firstName: "Emily",
    //   lastName: "Johnson",
    //   email: "emily.johnson@example.com",
    //   role: "UX Designer",
    //   team: "Team B",
    //   isTL: false,
    //   isAdmin: false,
    //   birthDay: "1992-07-21",
    //   imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    // },
    // {
    //   firstName: "Michael",
    //   lastName: "Brown",
    //   email: "michael.brown@example.com",
    //   role: "CEO",
    //   team: "",
    //   isTL: false,
    //   isAdmin: true,
    //   birthDay: "1988-03-10",
    //   imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    // },
    // {
    //   firstName: "Lisa",
    //   lastName: "Davis",
    //   email: "lisa.davis@example.com",
    //   role: "Data Analyst",
    //   team: "Team B",
    //   isTL: true,
    //   isAdmin: false,
    //   birthDay: "1993-11-25",
    //   imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    // }
  ]);
  const [searchEmployee, setSearchEmployee] = useState("");
  const [visibleEmployees, setVisibleEmployees] = useState([]);
  const [createEmployeeAccountModalOpen, setCreateEmployeeAccountModalOpen] = useState(false);
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(roles[0]);
  const [team, setTeam] = useState('');
  const [joinedDate, setJoinedDate] = useState('');
  const [retrieveEmployeeDataErrorModalOpen, setRetrieveEmployeeDataErrorModalOpen] = useState(false);
  const [confirmCreateEmployeeAccountModalOpen, setConfirmCreateEmployeeAccountModalOpen]
      = useState(false);
  const [createEmployeeAccountSuccessModalOpen, setCreateEmployeeAccountSuccessModalOpen]
      = useState(false);
  const [createEmployeeAccountErrorModalOpen, setCreateEmployeeAccountErrorModalOpen]
      = useState(false);
  const [viewEmployeeModalOpen, setViewEmployeeModalOpen] = useState(false);
  const [initSelectedEmployee, setInitSelectedEmployee] = useState(null);
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

  // Retrieve employee and team data
  const getEmployeeData = async () => {
    try {
      return {
        result: await fetch(`${process.env.REACT_APP_API_URL}/employee`, {
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
  const getTeamData = async () => {
    try {
      return {
        result: await fetch(`${process.env.REACT_APP_API_URL}/team`, {
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
    getEmployeeData()
        .then((r) => {
          if (r.error || r.result.status !== 200)
            return {error: true};
          return r.result.json();
        })
        .then((data) => {
          if (data.error) {
            setRetrieveEmployeeDataErrorModalOpen(true);
          } else {
            setEmployees(data.employees);
          }
        });

    getTeamData()
        .then((r) => {
          if (r.error || r.result.status !== 200)
            return {error: true};
          return r.result.json();
        })
        .then((data) => {
          if (data.error) {
            setRetrieveTeamDataErrorModalOpen(true);
          } else {
            setTeams(data.teams);
          }
        });
    // setRetrieveTeamDataErrorModalOpen(true);
  }, []);

  // Set eligible employees
  useEffect(() => {
    const tempEligibleEmployees =
        employees.filter(e => !e.isAdmin && !e.team);
    setEligibleEmployees(tempEligibleEmployees);
  }, [employees]);

  // Search and filter employees
  useEffect(() => {
    setTimeout(() => {
      const tempEmployees = employees.filter((employee) => {
        const fullName = employee.firstName + employee.lastName;
        return fullName.toLowerCase().trim().includes(searchEmployee.toLowerCase().trim());
      });
      setVisibleEmployees(tempEmployees);
    }, 1000);
  }, [employees, searchEmployee]);

  // Search and filter teams
  useEffect(() => {
    setTimeout(() => {
      const tempTeams = teams.filter((team) => {
        return team.name.toLowerCase().trim().includes(searchTeam.toLowerCase().trim());
      });
      setVisibleTeams(tempTeams);
    }, 1000);
  }, [teams, searchTeam]);

  const createEmployee = async () => {
    try {
      return {
        result: await fetch(`${process.env.REACT_APP_API_URL}/employee`, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: fName,
            lastName: lName,
            email: email,
            team: team,
            role: role,
            joinedOn: joinedDate,
          }),
        }),
        error: false
      };
    } catch (error) {
      return {error: true};
    }
  }
  const confirmCreateEmployee = () => {
    createEmployee()
        .then((r) => {
          if (r.error || r.result.status !== 200)
            return setCreateEmployeeAccountErrorModalOpen(true);
          return setCreateEmployeeAccountSuccessModalOpen(true);
        });
  }

  const updateEmployee = async () => {
    try {
      return {
        result: await fetch(`${process.env.REACT_APP_API_URL}/employee`, {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: selectedEmployee.firstName,
            lastName: selectedEmployee.lastName,
            email: selectedEmployee.email,
            role: selectedEmployee.role,
            birthDay: selectedEmployee.birthDay,
            team: selectedEmployee.team,
            isTL: selectedEmployee.isTL,
          }),
        }),
        error: false
      };
    } catch (error) {
      return {error: true};
    }
  }
  const confirmUpdateEmployee = () => {
    if(!areObjectsIdentical(initSelectedEmployee, selectedEmployee)) {
      updateEmployee()
          .then((r) => {
            if (r.error || r.result.status !== 200)
              return setUpdateEmployeeAccountErrorModalOpen(true);
            return setUpdateEmployeeAccountSuccessModalOpen(true);
          });
    }
  }

  const deleteEmployee = async () => {
    try {
      return {
        result: await fetch(`${process.env.REACT_APP_API_URL}/employee`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: selectedEmployee.email,
            isTL: selectedEmployee.isTL,
          }),
        }),
        error: false
      };
    } catch (error) {
      return {error: true};
    }
  }
  const confirmDeleteEmployee = () => {
    deleteEmployee()
        .then((r) => {
          if (r.error || r.result.status !== 200)
            return setDeleteEmployeeAccountErrorModalOpen(true);
          return setDeleteEmployeeAccountSuccessModalOpen(true);
        });
  }

  const createTeam = async () => {
    try {
      return {
        result: await fetch(`${process.env.REACT_APP_API_URL}/team`, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: teamName.trim(),
            client: clientName.trim(),
            newTeamLeadEmail: teamLead ? teamLead.email : ''
          }),
        }),
        error: false
      };
    } catch (error) {
      return {error: true};
    }
  }
  const confirmCreateTeam = () => {
    createTeam()
        .then((r) => {
          if (r.error || r.result.status !== 200)
            return setCreateTeamErrorModalOpen(true);
          return setCreateTeamSuccessModalOpen(true);
        });
  }

  const updateTeam = async () => {
    try {
      return {
        result: await fetch(`${process.env.REACT_APP_API_URL}/team`, {
          method: 'PUT',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            team: selectedTeam
          }),
        }),
        error: false
      };
    } catch (error) {
      return {error: true};
    }
  }
  const confirmUpdateTeam = () => {
    if(!areObjectsIdentical(initSelectedTeam, selectedTeam)) {
      updateTeam()
          .then((r) => {
            if (r.error || r.result.status !== 200)
              return setUpdateTeamErrorModalOpen(true);
            return setUpdateTeamSuccessModalOpen(true);
          });
    }
  }

  const deleteTeam = async () => {
    try {
      return {
        result: await fetch(`${process.env.REACT_APP_API_URL}/team`, {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            teamId: selectedTeam.id,
          }),
        }),
        error: false
      };
    } catch (error) {
      return {error: true};
    }
  }
  const confirmDeleteTeam = () => {
    deleteTeam()
        .then((r) => {
          if (r.error || r.result.status !== 200)
            return setDeleteTeamErrorModalOpen(true);
          return setDeleteTeamSuccessModalOpen(true);
        });
  }

  const addTeamMembers = () => {
    const newEmployeesToBeAdded = addedEmployees.map(e => {
      return {
        birthDay: undefined,
        email: e.email,
        firstName: e.firstName,
        imageUrl: undefined,
        isAdmin: undefined,
        isTL: e.isTL,
        lastName: e.lastName,
        role: e.role,
        team: undefined,
      };
    });

    const uniqueEmails = new Set();
    const uniqueArray = [...selectedTeam.members, ...newEmployeesToBeAdded].filter(obj => {
      if (uniqueEmails.has(obj.email)) {
        return false;
      } else {
        uniqueEmails.add(obj.email);
        return true;
      }
    });

    const tempSelectedTeam = {
      id: 1,
      name: selectedTeam.name,
      client: selectedTeam.client,
      members: uniqueArray
    };
    setSelectedTeam(tempSelectedTeam);
  }

  return (
      <div>
        <>
          <ErrorModal
              title={"Employee Data"}
              message={"An error occurred while retrieving Employee data. Please try again."}
              open={retrieveEmployeeDataErrorModalOpen}
              setOpen={setRetrieveEmployeeDataErrorModalOpen}
          />
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
              roles={roles}
              createAccount={() => {setConfirmCreateEmployeeAccountModalOpen(true)}}
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
              teams={teams}
              roles={roles}
              onClickSave={() => {
                if (!areObjectsIdentical(initSelectedEmployee, selectedEmployee))
                  setConfirmUpdateEmployeeAccountModalOpen(true);
              }}
              onClickDelete={() => setConfirmDeleteEmployeeAccountModalOpen(true)}
          />}
          <ConfirmUpdateEmployeeModal
              open={confirmUpdateEmployeeAccountModalOpen}
              setOpen={setConfirmUpdateEmployeeAccountModalOpen}
              onClickComplete={confirmUpdateEmployee}
          />
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
          <ConfirmDeleteEmployeeModal
              open={confirmDeleteEmployeeAccountModalOpen}
              setOpen={setConfirmDeleteEmployeeAccountModalOpen}
              onClickComplete={confirmDeleteEmployee}
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

          <ErrorModal
              title={"Teams Data"}
              message={"An error occurred while retrieving Teams data. Please try again."}
              open={retrieveTeamDataErrorModalOpen}
              setOpen={setRetrieveTeamDataErrorModalOpen}
          />
          <CreateTeamModal
              open={openCreateTeamModal}
              setOpen={setOpenCreateTeamModal}
              teamName={teamName}
              setTeamName={setTeamName}
              clientName={clientName}
              setClientName={setClientName}
              eligibleTeamLeads={eligibleEmployees}
              teamLead={teamLead}
              setTeamLead={setTeamLead}
              createTeam={() => setConfirmCreateTeamModalOpen(true)}
          />
          <ConfirmCreateTeamModal
              open={confirmCreateTeamModalOpen}
              setOpen={setConfirmCreateTeamModalOpen}
              onClickComplete={confirmCreateTeam}
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
          {selectedTeam && <>
            <ViewTeamModal
                open={viewTeamModalOpen}
                setOpen={setViewTeamModalOpen}
                roles={roles}
                selectedTeam={selectedTeam}
                setSelectedTeam={setSelectedTeam}
                setAddTeamMemberModalOpen={setAddTeamMemberModalOpen}
                isAdmin={isAdmin}
                onClickSave={() => {
                  if (!areObjectsIdentical(initSelectedTeam, selectedTeam))
                    setConfirmUpdateTeamModalOpen(true);
                }}
                onClickDelete={() => setConfirmDeleteTeamModalOpen(true)}
            />
            <AddTeamMemberModal
                open={addTeamMemberModalOpen}
                setOpen={setAddTeamMemberModalOpen}
                eligibleEmployees={eligibleEmployees}
                addedEmployees={addedEmployees}
                setAddedEmployees={setAddedEmployees}
                addTeamMembers={addTeamMembers}
            />
          </>}
          <ConfirmUpdateTeamModal
              open={confirmUpdateTeamModalOpen}
              setOpen={setConfirmUpdateTeamModalOpen}
              onClickComplete={confirmUpdateTeam}
          />
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
          <ConfirmDeleteTeamModal
              open={confirmDeleteTeamModalOpen}
              setOpen={setConfirmDeleteTeamModalOpen}
              onClickComplete={confirmDeleteTeam}
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
                {isAdmin && <div className="ml-4 mt-4 flex-shrink-0 flex gap-2">
                  <PrimaryButton
                      onClick={() => setCreateEmployeeAccountModalOpen(true)}
                      label={'Create Account'}
                      color={'indigo'}
                  />
                </div>}
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
            <ul role="list" className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {visibleEmployees.map((person) => (
                  <li
                      key={person.email}
                      className="flex flex-col col-span-1 text-center bg-white divide-y divide-gray-200 rounded-lg shadow-lg
								cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setSelectedEmployee(person);
                        setInitSelectedEmployee(person);
                        setViewEmployeeModalOpen(true);
                      }}
                  >
                    <div className="flex flex-col flex-1 p-4">
                      {!['', null].includes(person.imageUrl) ?
                          <img
                              className="h-16 w-16 flex-none rounded-full bg-gray-50"
                              src={person.imageUrl}
                              alt=""
                          /> :
                          <UserImage size={16}/>
                      }
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
                {isAdmin && <div className="ml-4 mt-4 flex-shrink-0 flex gap-2">
                  <PrimaryButton
                      onClick={() => setOpenCreateTeamModal(true)}
                      label={'Create Team'}
                      color={'indigo'}
                  />
                </div>}
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
                  <li
                      key={team.id}
                      className="flex items-center justify-between gap-x-6 py-5 cursor-pointer hover:bg-gray-100 px-4
                rounded-lg"
                      onClick={() => {
                        setInitSelectedTeam(team);
                        setSelectedTeam(team);
                        setViewTeamModalOpen(true);
                      }}
                  >
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
                        <p className="truncate">{team.members.length} members</p>
                      </div>
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