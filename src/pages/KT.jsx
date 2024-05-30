import React, {useEffect, useState} from 'react';
import ErrorModal from "../components/modals/ErrorModal";
import SuccessModal from "../components/modals/SuccessModal";
import CoursesHeader from "../components/KT/CourseHeader";
import LeaderboardHeader from "../components/KT/LeaderboardHeader";
import CoursesBody from "../components/KT/CoursesBody";
import LeaderboardBody from "../components/KT/LeaderboardBody";
import Tabs from "../components/KT/Tabs";
import SelectedCourseHeader from "../components/KT/SelectedCourseHeader";
import SelectedCourseBody from "../components/KT/SelectedCourseBody";

const KT = () => {
    const [tabs, setTabs] = useState([
        {name: 'Courses', current: true},
        {name: 'Leaderboard', current: false},
    ]);

    const [courses, setCourses] = useState([
        {
            title: "Workplace Conduct",
            description: "Guidelines on appropriate workplace behavior and conduct.",
            type: "Company Rules & Regulations",
            points: 70,
            createdBy: {
                name: "Isuru Harischandra",
                email: "isuru@bitzquad.com"
            },
            completed: false,
        },
        {
            title: "Effective Communication",
            description: "Training on improving communication skills in a professional setting.",
            type: "Soft Skills",
            points: 150,
            createdBy: {
                name: "Isuru Harischandra",
                email: "isuru@bitzquad.com"
            },
            completed: true,
        },
        {
            title: "JavaScript Fundamentals",
            description: "A course covering the basics of JavaScript programming.",
            type: "Technical Skills",
            points: 50,
            createdBy: {
                name: "Isuru Harischandra",
                email: "isuru@bitzquad.com"
            },
            completed: false,
        },
        {
            title: "Time Management",
            description: "Strategies and techniques for managing time effectively.",
            type: "Soft Skills",
            points: 80,
            createdBy: {
                name: "Isuru Harischandra",
                email: "isuru@bitzquad.com"
            },
            completed: false,
        },
        {
            title: "Security Policies",
            description: "Overview of the company's security policies and procedures.",
            type: "Company Rules & Regulations",
            points: 90,
            createdBy: {
                name: "Isuru Harischandra",
                email: "isuru@bitzquad.com"
            },
            completed: true,
        },
        {
            title: "Advanced CSS",
            description: "In-depth training on advanced CSS techniques and best practices.",
            type: "Technical Skills",
            points: 100,
            createdBy: {
                name: "Isuru Harischandra",
                email: "isuru@bitzquad.com"
            },
            completed: true,
        },
        {
            title: "Conflict Resolution",
            description: "Methods and strategies for resolving conflicts in the workplace.",
            type: "Soft Skills",
            points: 40,
            createdBy: {
                name: "Isuru Harischandra",
                email: "isuru@bitzquad.com"
            },
            completed: false,
        }
    ]);
    const [people, setPeople] = useState([
        {
            id: '1',
            name: 'Leslie Alexander',
            email: 'leslie.alexander@example.com',
            points: 100,
        },
        {
            id: '2',
            name: 'Michael Foster',
            email: 'michael.foster@example.com',
            points: 100,
        },
        {
            id: '3',
            name: 'Dries Vincent',
            email: 'dries.vincent@example.com',
            points: 100,
        },
        {
            id: '4',
            name: 'Lindsay Walton',
            email: 'lindsay.walton@example.com',
            points: 100,
        },
        {
            id: '5',
            name: 'Courtney Henry',
            email: 'courtney.henry@example.com',
            points: 100,
        },
        {
            id: '6',
            name: 'Tom Cook',
            email: 'tom.cook@example.com',
            points: 100,
        },
    ]);

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [quiz, setQuiz] = useState([
        {
            id: '1',
            question: "What is the capital of France?",
            answers: [
                {id: '1', text: "Paris", checked: true},
                {id: '2', text: "London", checked: false},
                {id: '3', text: "Rome", checked: false},
                {id: '4', text: "Berlin", checked: false},
            ],
        },
        {
            id: '2',
            question: "Which planet is known as the Red Planet?",
            answers: [
                {id: '1', text: "Mars", checked: true},
                {id: '2', text: "Earth", checked: false},
                {id: '3', text: "Jupiter", checked: false},
                {id: '4', text: "Saturn", checked: false},
            ],
        },
        {
            id: '3',
            question: "What is the largest ocean on Earth?",
            answers: [
                {id: '1', text: "Pacific Ocean", checked: true},
                {id: '2', text: "Atlantic Ocean", checked: false},
                {id: '3', text: "Indian Ocean", checked: false},
                {id: '4', text: "Arctic Ocean", checked: false},
            ],
        },
        {
            id: '4',
            question: "Who wrote 'Romeo and Juliet'?",
            answers: [
                {id: '1', text: "William Shakespeare", checked: true},
                {id: '2', text: "Charles Dickens", checked: false},
                {id: '3', text: "Jane Austen", checked: false},
                {id: '4', text: "Mark Twain", checked: false},
            ],
        },
        {
            id: '5',
            question: "What is the chemical symbol for water?",
            answers: [
                {id: '1', text: "H2O", checked: true},
                {id: '2', text: "CO2", checked: false},
                {id: '3', text: "O2", checked: false},
                {id: '4', text: "H2", checked: false},
            ],
        },
    ]);

    const [retrieveCourseModulesErrorModalOpen, setRetrieveCourseModulesErrorModalOpen]
      = useState(false);
    const [retrieveLeaderboardErrorModalOpen, setRetrieveLeaderboardErrorModalOpen] = useState(false);
    const [retrieveCourseContentErrorModalOpen, setRetrieveCourseContentErrorModalOpen]
      = useState(false);
    const [courseCompletionErrorModalOpen, setCourseCompletionErrorModalOpen] = useState(false);
    const [courseCompletionSuccessModalOpen, setCourseCompletionSuccessModalOpen] = useState(false);
    const [createCourseModuleErrorModalOpen, setCreateCourseModuleErrorModalOpen] = useState(false);
    const [createCourseModuleSuccessModalOpen, setCreateCourseModuleSuccessModalOpen] = useState(false);

    const [courseFilterQuery, setCourseFilterQuery] = useState("");

    const [leaderboardFilterQuery, setLeaderboardFilterQuery] = useState("");



    useEffect(() => {
        // TODO: setCourses()
        // TODO: setPeople()
    }, []);

    return (
      <div>
          {/*Modals*/}
          <>
              <ErrorModal
                title={"Course Modules"}
                message={"An error occurred while retrieving course modules. Please try again."}
                open={retrieveCourseModulesErrorModalOpen}
                setOpen={setRetrieveCourseModulesErrorModalOpen}
              />
              <ErrorModal
                title={"Leaderboard"}
                message={"An error occurred while retrieving the leaderboard. Please try again."}
                open={retrieveLeaderboardErrorModalOpen}
                setOpen={setRetrieveLeaderboardErrorModalOpen}
              />
              <ErrorModal
                title={"Course Content"}
                message={"An error occurred while retrieving course content. Please try again."}
                open={retrieveCourseContentErrorModalOpen}
                setOpen={setRetrieveCourseContentErrorModalOpen}
              />

              <ErrorModal
                title={"Course Completion"}
                message={"An error occurred while completing the course module. Please try again."}
                open={courseCompletionErrorModalOpen}
                setOpen={setCourseCompletionErrorModalOpen}
              />
              <SuccessModal
                title={"Course Completion"}
                message={"Course module has been completed successfully."}
                open={courseCompletionSuccessModalOpen}
                setOpen={setCourseCompletionSuccessModalOpen}
              />

              <ErrorModal
                title={"Create Course Module"}
                message={"An error occurred while creating the course module. Please try again."}
                open={createCourseModuleErrorModalOpen}
                setOpen={setCreateCourseModuleErrorModalOpen}
              />
              <SuccessModal
                title={"Create Course Module"}
                message={"Course module has been created successfully."}
                open={createCourseModuleSuccessModalOpen}
                setOpen={setCreateCourseModuleSuccessModalOpen}
              />
          </>

          {selectedCourse ?
            <> {/*Course selected*/}
                <SelectedCourseHeader selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse}/>
                <SelectedCourseBody quiz={quiz} setQuiz={setQuiz} selectedCourse={selectedCourse}/>
            </> :
            <> {/*Course not selected*/}
                {/*md <=*/}
                <div className="md:grid md:grid-cols-5 gap-y-2 gap-x-8 hidden">
                    <CoursesHeader courseFilterQuery={courseFilterQuery} setCourseFilterQuery={setCourseFilterQuery}/>
                    <LeaderboardHeader
                      leaderboardFilterQuery={leaderboardFilterQuery}
                      setLeaderboardFilterQuery={setLeaderboardFilterQuery}
                    />
                    <div className="md:col-span-3 divide-y divide-gray-200 rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2
						sm:gap-px sm:divide-y-0 xl:max-h-[70vh] md:max-h-[69vh] overflow-y-auto">
                        <CoursesBody courses={courses} setSelectedCourse={setSelectedCourse}/>
                    </div>
                    <div className="md:col-span-2 xl:max-h-[70vh] md:max-h-[69vh] overflow-y-auto">
                        <LeaderboardBody people={people}/>
                    </div>
                </div>

                {/*md >*/}
                <div className="md:hidden">
                    <Tabs tabs={tabs} setTabs={setTabs}/>
                    {tabs.filter(t => t.current)[0].name === "Courses" ?
                      <>
                          <CoursesHeader courseFilterQuery={courseFilterQuery} setCourseFilterQuery={setCourseFilterQuery}/>
                          <div className="max-h-[75vh] overflow-y-auto">
                              <CoursesBody courses={courses} setSelectedCourse={setSelectedCourse}/>
                          </div>
                      </> :
                      <>
                          <LeaderboardHeader
                            leaderboardFilterQuery={leaderboardFilterQuery}
                            setLeaderboardFilterQuery={setLeaderboardFilterQuery}
                          />
                          <div className="max-h-[67vh] overflow-y-auto">
                              <LeaderboardBody people={people}/>
                          </div>
                      </>
                    }
                </div>
            </>
          }
      </div>
    );
}
export default KT;