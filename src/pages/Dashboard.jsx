import React, {useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext";
import {Pie} from "react-chartjs-2";

const Dashboard = () => {
  const {isAdmin} = useAuth();

  const [employeeCounts, setEmployeeCounts] = useState([
    {
      role: 'Business Analysts',
      count: 0,
    },
    {
      role: 'Engineers',
      count: 0,
    },
    {
      role: 'Finance',
      count: 0,
    },
    {
      role: 'Human Resources',
      count: 0,
    },
    {
      role: 'Marketing',
      count: 0,
    },
  ]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [presentEmployees, setPresentEmployees] = useState(0);

  const getGreeting = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 12) {
      return "Good morning";
    } else if (hour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  }

  const getData = async () => {
    try {
      return {
        result: await fetch(`${process.env.REACT_APP_API_URL}/dashboard`, {
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
    getData()
      .then((r) => {
        if (r.error || r.result.status !== 200)
          return {error: true};
        return r.result.json();
      })
      .then((data) => {
        if (data.error) {
          console.log("Error");
        } else {
          setEmployeeCounts([
            {
              role: 'Business Analysts',
              count: data.employees.businessAnalyst,
            },
            {
              role: 'Engineers',
              count: data.employees.engineer,
            },
            {
              role: 'Finance',
              count: data.employees.finance,
            },
            {
              role: 'Human Resources',
              count: data.employees.humanResources,
            },
            {
              role: 'Marketing',
              count: data.employees.marketing,
            }
          ]);
          setTotalEmployees(data.attendance.total);
          setPresentEmployees(data.attendance.present);
        }
      });
  }, []);

  return (
    <div className="">
      <div className="w-full rounded-lg shadow p-3 text-3xl font-bold text-center flex flex-row justify-center
				items-center">
        <div className="w-fit p-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-700
					to-pink-500">
          {getGreeting()} Isuru!
        </div>
      </div>

      <div className="w-full sm:grid md:grid-cols-3 sm:grid-cols-2 gap-4 pt-4">
        <div className="rounded-lg shadow p-6">
          <p className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-700 to-pink-500
						font-bold text-lg text-center">
            Our strength
          </p>
          <ul role="list" className="divide-y divide-gray-100 px-4 pt-2">
            {employeeCounts.map((e, idx) => (
              <li key={idx} className="relative flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <div className="text-md font-semibold leading-6 text-gray-900">
                      <div>
                        <span className="absolute inset-x-0 -top-px bottom-0"/>
                        {e.role}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-x-4">
                  <div className="flex flex-col items-end">
                    <p className="text-md leading-6 text-gray-900">{e.count}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:my-0 my-4 rounded-lg shadow p-6 flex flex-col justify-start items-center">
          <p className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-700 to-pink-500
						font-bold text-lg mb-6">
            Employee of the month
          </p>
          <img
            className="aspect-[3/2] w-full rounded-2xl object-cover"
            src={'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80'}
            alt=""
          />
          <h3 className="mt-6 text-xl font-semibold leading-8 tracking-tight text-gray-900 text-center">
            Lindsay Walton
          </h3>
          <p className="text-lg leading-7 text-gray-600 text-center">
            Human Resources
          </p>
          <p className="text-md leading-7 text-gray-600 text-center">
            HR Team
          </p>
        </div>

        <div className="md:col-span-1 sm:col-span-2 rounded-lg shadow p-6">
          <p className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-700 to-pink-500
						font-bold text-lg mb-6 text-center">
            Today Attendance
          </p>
          <div className="flex justify-center items-center">
            <Pie
              className="w-12"
              data={{
                labels: ["On leave", "Working"],
                datasets: [
                  {
                    label: 'No. of leaves',
                    data: [totalEmployees - presentEmployees, presentEmployees],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
