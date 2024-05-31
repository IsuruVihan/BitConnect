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
import CreateCourseModal from "../components/modals/CreateCourseModal";
import ConfirmCompleteKTCourseModal from "../components/modals/ConfirmCompleteKTCourseModal";

const KT = () => {
    const [tabs, setTabs] = useState([
        {name: 'Courses', current: true},
        {name: 'Leaderboard', current: false},
    ]);

    const [people, setPeople] = useState([
        // {
        // 	id: '1',
        // 	name: 'Leslie Alexander',
        // 	email: 'leslie.alexander@example.com',
        // 	points: 100,
        // },
    ]);
    const [leaderboardFilterQuery, setLeaderboardFilterQuery] = useState("");
    const [visiblePeople, setVisiblePeople] = useState([]);

    const [courses, setCourses] = useState([
        // {
        // 	id: '1',
        // 	title: "Workplace Conduct",
        // 	description: "Guidelines on appropriate workplace behavior and conduct.",
        // 	type: "Company Rules & Regulations",
        // 	points: 70,
        // 	createdBy: {
        // 		name: "Isuru Harischandra",
        // 		email: "isuru@bitzquad.com"
        // 	},
        // 	completed: false,
        // },
    ]);
    const [visibleCourses, setVisibleCourses] = useState([]);
    const [courseFilterQuery, setCourseFilterQuery] = useState("");
    const [courseTypeFilterQuery, setCourseTypeFilterQuery] = useState("All");
    const [selectedCourse, setSelectedCourse] = useState(null
      // {
      // 	id: '1',
      // 	title: "Workplace Conduct",
      // 	description: "Guidelines on appropriate workplace behavior and conduct.",
      // 	type: "Company Rules & Regulations",
      // 	points: 70,
      // 	createdBy: {
      // 		name: "Isuru Harischandra",
      // 		email: "isuru@bitzquad.com"
      // 	},
      // 	completed: true,
      // 	pdfUrl: "https://firebasestorage.googleapis.com/v0/b/bitconnect-f6fc8.appspot.com/o/kt-courses%2Fdbb780103c94a3dba3e3297cc3cd52678fb9b0e21ebd13b01d8a1ac74225e252.pdf?alt=media&token=65b963c4-3270-47bd-a7d0-dac42835c553",
      // 	score: 30,
    );
    const [quiz, setQuiz] = useState([
        // {
        // 	id: '1',
        // 	question: "What is the capital of France?",
        // 	answers: [
        // 		{id: '1', text: "Paris", checked: true},
        // 		{id: '2', text: "London", checked: false},
        // 		{id: '3', text: "Rome", checked: false},
        // 		{id: '4', text: "Berlin", checked: false},
        // 	],
        // },
    ]);

    const [retrieveCourseModulesErrorModalOpen, setRetrieveCourseModulesErrorModalOpen]
      = useState(false);

    const [retrieveLeaderboardErrorModalOpen, setRetrieveLeaderboardErrorModalOpen] = useState(false);

    const [retrieveCourseContentErrorModalOpen, setRetrieveCourseContentErrorModalOpen]
      = useState(false);

    const [confirmCourseCompletionModalOpen, setConfirmCourseCompletionModalOpen] = useState(false);
    const [courseCompletionErrorModalOpen, setCourseCompletionErrorModalOpen] = useState(false);
    const [courseCompletionSuccessModalOpen, setCourseCompletionSuccessModalOpen] = useState(false);

    const [createCourseModalOpen, setCreateCourseModalOpen] = useState(false);
    const [createCourseModuleErrorModalOpen, setCreateCourseModuleErrorModalOpen] = useState(false);
    const [createCourseModuleSuccessModalOpen, setCreateCourseModuleSuccessModalOpen] = useState(false);

    // filter leaderboard
    useEffect(() => {
        setTimeout(() => {
            const filteredPeople
              = people.filter(p => p.name.toLowerCase().includes(leaderboardFilterQuery.trim().toLowerCase()));
            setVisiblePeople(filteredPeople);
        }, 2000);
    }, [people, leaderboardFilterQuery]);

    // filter courses
    useEffect(() => {
        setTimeout(() => {
            const filteredCourses = courses.filter(c =>
              c.title.toLowerCase().includes(courseFilterQuery.trim().toLowerCase()) &&
              (courseTypeFilterQuery === "All" ? true : c.type === courseTypeFilterQuery)
            );
            setVisibleCourses(filteredCourses);
        }, 2000);
    }, [courses, courseFilterQuery, courseTypeFilterQuery]);

    const getCourses = async () => {
        try {
            return {
                result: await fetch(`http://localhost:4000/courses`, {
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
    const getLeaderboard = async () => {
        try {
            return {
                result: await fetch(`http://localhost:4000/leaderboard`, {
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
        // get courses
        getCourses()
          .then(r => {
              if (r.error)
                  return setRetrieveCourseModulesErrorModalOpen(true);
              return r.result.json();
          })
          .then((data) => {
              setCourses(data.courses);
          });

        // get leaderboard
        getLeaderboard()
          .then(r => {
              if (r.error)
                  return setRetrieveLeaderboardErrorModalOpen(true);
              return r.result.json();
          })
          .then((data) => {
              setPeople(data.leaderboard);
          });
    }, []);

    const getCourse = async (courseId) => {
        try {
            return {
                result: await fetch(`http://localhost:4000/courses/${courseId}`, {
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
    const handleOnClickCourse = (course) => {
        getCourse(course.id)
          .then((r) => {
              if (r.error) {
                  return setRetrieveCourseContentErrorModalOpen(true);
              }
              return r.result.json();
          })
          .then((data) => {
              setSelectedCourse({
                  ...course,
                  ...data.courseData,
                  pdfUrl: data.courseData.pdfUrl,
                  score: data.courseData.score,
              });

              setQuiz(data.courseData.quiz.map((q) => {
                  return {
                      id: q.QuizId,
                      question: q.Question,
                      answers: q.answerOptions.map((a) => {
                          return {
                              id: a.AnswerOptionId,
                              text: a.Text,
                              checked: !!(a.Answer && a.Answer === 1),
                          };
                      }),
                  };
              }));
          });
    }

    const completeCourse = async () => {
        try {
            return {
                result: await fetch(`http://localhost:4000/courses/${selectedCourse.id}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token"),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        quiz: quiz.map((q) => {
                            return {
                                id: q.id,
                                answers: q.answers.map((a) => {
                                    return {
                                        id: a.id,
                                        checked: a.checked,
                                    };
                                }),
                            };
                        }),
                    }),
                }),
                error: false
            };
        } catch (error) {
            return {error: true};
        }
    }
    const handleOnCourseComplete = () => {
        completeCourse()
          .then((r) => {
              if (r.error || r.result.status !== 200) {
                  setCourseCompletionErrorModalOpen(true);
              } else {
                  setCourseCompletionSuccessModalOpen(true);
                  setTimeout(() => window.location.reload(), 2000);
              }
          })
          .catch(() => {
              setCourseCompletionErrorModalOpen(true);
          });
    }

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

              <ConfirmCompleteKTCourseModal
                open={confirmCourseCompletionModalOpen}
                setOpen={setConfirmCourseCompletionModalOpen}
                onClickComplete={handleOnCourseComplete}
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

              <CreateCourseModal open={createCourseModalOpen} setOpen={setCreateCourseModalOpen}/>
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
                <SelectedCourseHeader
                  selectedCourse={selectedCourse}
                  setSelectedCourse={setSelectedCourse}
                  handleOnClickCompleteCourse={() => setConfirmCourseCompletionModalOpen(true)}
                />
                <SelectedCourseBody quiz={quiz} setQuiz={setQuiz} selectedCourse={selectedCourse}/>
            </> :
            <> {/*Course not selected*/}
                {/*md <=*/}
                <div className="md:grid md:grid-cols-5 gap-y-2 gap-x-8 hidden">
                    <CoursesHeader
                      courseFilterQuery={courseFilterQuery}
                      setCourseFilterQuery={setCourseFilterQuery}
                      setCreateCourseModalOpen={setCreateCourseModalOpen}
                      courseTypeFilterQuery={courseTypeFilterQuery}
                      setCourseTypeFilterQuery={setCourseTypeFilterQuery}
                    />
                    <LeaderboardHeader
                      leaderboardFilterQuery={leaderboardFilterQuery}
                      setLeaderboardFilterQuery={setLeaderboardFilterQuery}
                    />
                    <div className="md:col-span-3 divide-y divide-gray-200 rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2
						sm:gap-px sm:divide-y-0 xl:max-h-[70vh] md:max-h-[69vh] overflow-y-auto">
                        <CoursesBody courses={visibleCourses} handleOnClickCourse={handleOnClickCourse}/>
                    </div>
                    <div className="md:col-span-2 xl:max-h-[70vh] md:max-h-[69vh] overflow-y-auto">
                        <LeaderboardBody people={visiblePeople}/>
                    </div>
                </div>

                {/*md >*/}
                <div className="md:hidden">
                    <Tabs tabs={tabs} setTabs={setTabs}/>
                    {tabs.filter(t => t.current)[0].name === "Courses" ?
                      <>
                          <CoursesHeader
                            courseFilterQuery={courseFilterQuery}
                            setCourseFilterQuery={setCourseFilterQuery}
                            setCreateCourseModalOpen={setCreateCourseModalOpen}
                            courseTypeFilterQuery={courseTypeFilterQuery}
                            setCourseTypeFilterQuery={setCourseTypeFilterQuery}
                          />
                          <div className="max-h-[75vh] overflow-y-auto">
                              <CoursesBody courses={visibleCourses} handleOnClickCourse={handleOnClickCourse}/>
                          </div>
                      </> :
                      <>
                          <LeaderboardHeader
                            leaderboardFilterQuery={leaderboardFilterQuery}
                            setLeaderboardFilterQuery={setLeaderboardFilterQuery}
                          />
                          <div className="max-h-[67vh] overflow-y-auto">
                              <LeaderboardBody people={visiblePeople}/>
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