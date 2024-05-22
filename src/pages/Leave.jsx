import {PrimaryButton, SuccessButton} from "../components/Button";

const people = [
  {startDate: '2020/09/01', endDate: '2020/09/01', reason: 'Sick', type: 'Full-Day'},
  // More people...
]

const Leave = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="mt-4 sm:mt-0 sm:ml-4">
            <SuccessButton onClick={() => {}} width={'full'} label={'Submit a Leave Request'}/>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-4">
            <PrimaryButton onClick={() => {}} width={'full'} label={'Generate Report'}/>
          </div>
        </div>
      </div>
      <div className="flow-root mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
              <tr className="divide-x divide-gray-200">
                <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Start Date
                </th>
                <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                  End Date
                </th>
                <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Reason
                </th>
                <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0">
                  Type
                </th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {people.map((person) => (
                <tr key={person.reason} className="divide-x divide-gray-200">
                  <td className="py-4 pl-4 pr-4 text-sm font-medium text-gray-500 whitespace-nowrap sm:pl-0">
                    {person.startDate}
                  </td>
                  <td className="p-4 text-sm text-gray-500 whitespace-nowrap">{person.endDate}</td>
                  <td className="p-4 text-sm text-gray-500 whitespace-nowrap">{person.reason}</td>
                  <td className="py-4 pl-4 pr-4 text-sm text-gray-500 whitespace-nowrap sm:pr-0">{person.type}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leave;