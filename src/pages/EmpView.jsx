import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import {PrimaryButton} from "../components/Button";

const people = [
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    dep: 'HR',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    dep: 'HR',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    dep: 'HR',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    dep: 'HR',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    dep: 'HR',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    dep: 'HR',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    dep: 'HR',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jane Cooper',
    title: 'Paradigm Representative',
    dep: 'HR',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },

]

const createAccount = () => {
  // Implement report generation logic
  console.log('Account created');
};

const EmpView = () => {
  return (
    <>
      <div className="flex justify-center mb-4">
        <PrimaryButton onClick={() => {}} width={'96'} label={'Create Account'} color={'indigo'}/>
      </div>
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {people.map((person) => (
          <li
            key={person.email}
            className="flex flex-col col-span-1 text-center bg-white divide-y divide-gray-200 rounded-lg shadow"
          >
            <div className="flex flex-col flex-1 p-8">
              <img className="flex-shrink-0 w-32 h-32 mx-auto rounded-full" src={person.imageUrl} alt="" />
              <h3 className="mt-6 text-sm font-medium text-gray-900">{person.name}</h3>
              <dl className="flex flex-col justify-between flex-grow mt-1">
                <dt className="sr-only">Title</dt>
                <dd className="text-sm text-gray-500">{person.title}</dd>
                <dt className="sr-only">Department</dt>
                <dd className="mt-3">
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-700 rounded-full bg-green-50 ring-1 ring-inset ring-green-600/20">
                        {person.dep}
                      </span>
                </dd>
              </dl>
            </div>
            <div>
              <div className="flex -mt-px divide-x divide-gray-200">
                <div className="flex flex-1 w-0">
                  <a
                    href={`mailto:${person.email}`}
                    className="relative inline-flex items-center justify-center flex-1 w-0 py-4 -mr-px text-sm font-semibold text-gray-900 border border-transparent rounded-bl-lg gap-x-3"
                  >
                    <EnvelopeIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                    Email
                  </a>
                </div>
                <div className="flex flex-1 w-0 -ml-px">
                  <a
                    href={`tel:${person.telephone}`}
                    className="relative inline-flex items-center justify-center flex-1 w-0 py-4 text-sm font-semibold text-gray-900 border border-transparent rounded-br-lg gap-x-3"
                  >
                    <PhoneIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                    Call
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default EmpView;