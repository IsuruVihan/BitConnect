import {PrimaryButton} from "../components/Button";
import {Menu, Transition} from "@headlessui/react";
import {EllipsisVerticalIcon} from "@heroicons/react/20/solid";
import CreateSpecialNoticeModal from "../components/modals/CreateSpecialNoticeModal";
import {useEffect, useState} from "react";
import ViewNoticeModal from "../components/modals/ViewNoticeModal";
import ConfirmCreateNoticeModal from "../components/modals/ConfirmCreateNoticeModal";
import SuccessModal from "../components/modals/SuccessModal";
import ErrorModal from "../components/modals/ErrorModal";
import ConfirmUpdateNoticeModal from "../components/modals/ConfirmUpdateNoticeModal";
import ConfirmDeleteNoticeModal from "../components/modals/ConfirmDeleteNoticeModal";

const statuses = {
  true: 'text-green-700 bg-green-50 ring-green-600/20',
  false: 'text-gray-600 bg-gray-50 ring-gray-500/10',
}
const stats = [
  {name: 'Total Notices', stat: '13'},
  {name: 'No. of un-viewed notices', stat: '3'},
  {name: 'No. of viewed notices', stat: '10'},
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const SpecialNotices = () => {
  const [notices, setNotices] = useState([
    // {
    //   id: 1,
    //   title: 'GraphQL API',
    //   description: "This is the special notice description",
    //   viewed: true,
    //   createdBy: 'Leslie Alexander',
    //   createdOn: 'March 17, 2023',
    // }
  ]);
  const [getNoticeDataErrorModalOpen, setGetNoticeDataErrorModalOpen] = useState(false);

  const [createNoticeModalOpen, setCreateNoticeModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [confirmCreateNoticeModalOpen, setConfirmCreateNoticeModalOpen] = useState(false);
  const [createNoticeSuccessModalOpen, setCreateNoticeSuccessModalOpen] = useState(false);
  const [createNoticeErrorModalOpen, setCreateNoticeErrorModalOpen] = useState(false);

  const [viewNoticeModalOpen, setViewNoticeModalOpen] = useState(false);
  const [viewNoticeData, setViewNoticeData] = useState(
    // {
    // 		id: 1,
    // 		title: 'GraphQL API',
    // 		description: "This is the special notice description",
    // 		viewed: true,
    // 		createdBy: 'Leslie Alexander',
    // 		createdOn: 'March 17, 2023',
    // 	}
  );
  const [viewNoticeErrorModalOpen, setViewNoticeErrorModalOpen] = useState(false);

  const [updateMode, setUpdateMode] = useState(false);
  const [confirmUpdateNoticeModalOpen, setConfirmUpdateNoticeModalOpen] = useState(false);
  const [updateNoticeSuccessModalOpen, setUpdateNoticeSuccessModalOpen] = useState(false);
  const [updateNoticeErrorModalOpen, setUpdateNoticeErrorModalOpen] = useState(false);

  const [confirmDeleteNoticeModalOpen, setConfirmDeleteNoticeModalOpen] = useState(false);
  const [deleteNoticeSuccessModalOpen, setDeleteNoticeSuccessModalOpen] = useState(false);
  const [deleteNoticeErrorModalOpen, setDeleteNoticeErrorModalOpen] = useState(false);

  const markAsViewed = () => {

  }

  const publishSpecialNotice = () => {

  }

  const updateSpecialNotice = () => {

  }

  const deleteSpecialNotice = () => {

  }

  const getSpecialNotices = async () => {
    try {
      return {
        result: await fetch(`http://localhost:4000/notices`, {
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
    getSpecialNotices()
      .then((r) => {
        if (r.error)
          return setGetNoticeDataErrorModalOpen(true);
        return r.result.json();
      })
      .then((data) => {
        setNotices(data.specialNotices.map((d) => {
          return {
            id: d.Id,
            title: d.Title,
            description: d.Description,
            viewed: d.viewed,
            createdBy: d.FirstName + d.LastName,
            createdOn: d.PublishedOn,
          };
        }))
      });
  }, []);

  return (
    <div>
      {/*Modals*/}
      <>
        <ErrorModal
          title={"Retrieve Special Notices"}
          message={"There was an error while retrieving special notices. Please try again."}
          open={getNoticeDataErrorModalOpen}
          setOpen={setGetNoticeDataErrorModalOpen}
        />

        <CreateSpecialNoticeModal
          open={createNoticeModalOpen}
          setOpen={setCreateNoticeModalOpen}
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          newDescription={newDescription}
          setNewDescription={setNewDescription}
          onPublish={() => setConfirmCreateNoticeModalOpen(true)}
        />
        <ConfirmCreateNoticeModal
          open={confirmCreateNoticeModalOpen}
          setOpen={setConfirmCreateNoticeModalOpen}
          onClickAccept={publishSpecialNotice}
        />
        <SuccessModal
          title={"Create Special Notice"}
          message={"The special notice has been created and published successfully."}
          open={createNoticeSuccessModalOpen}
          setOpen={setCreateNoticeSuccessModalOpen}
        />
        <ErrorModal
          title={"Create Special Notice"}
          message={"There was an error while creating and publishing the special notice. Please try again."}
          open={createNoticeErrorModalOpen}
          setOpen={setCreateNoticeErrorModalOpen}
        />

        {viewNoticeData && <ViewNoticeModal
          open={viewNoticeModalOpen}
          setOpen={setViewNoticeModalOpen}
          data={viewNoticeData}
          onClickMarkAsViewed={markAsViewed}
          updateMode={updateMode}
          setUpdateMode={setUpdateMode}
          onClickUpdate={() => setConfirmUpdateNoticeModalOpen(true)}
          onClickDelete={() => setConfirmDeleteNoticeModalOpen(true)}
        />}
        <ErrorModal
          title={"View Special Notice"}
          message={"There was an error while viewing the special notice. Please try again."}
          open={viewNoticeErrorModalOpen}
          setOpen={setViewNoticeErrorModalOpen}
        />

        <ConfirmUpdateNoticeModal
          open={confirmUpdateNoticeModalOpen}
          setOpen={setConfirmUpdateNoticeModalOpen}
          onClickAccept={updateSpecialNotice}
        />
        <SuccessModal
          title={"Update Special Notice"}
          message={"The special notice has been updated and re-published successfully."}
          open={updateNoticeSuccessModalOpen}
          setOpen={setUpdateNoticeSuccessModalOpen}
        />
        <ErrorModal
          title={"Update Special Notice"}
          message={"There was an error while updating and re-publishing the special notice. Please try again."}
          open={updateNoticeErrorModalOpen}
          setOpen={setUpdateNoticeErrorModalOpen}
        />

        <ConfirmDeleteNoticeModal
          open={confirmDeleteNoticeModalOpen}
          setOpen={setConfirmDeleteNoticeModalOpen}
          onClickAccept={deleteSpecialNotice}
        />
        <SuccessModal
          title={"Delete Special Notice"}
          message={"The special notice has been deleted successfully."}
          open={deleteNoticeSuccessModalOpen}
          setOpen={setDeleteNoticeSuccessModalOpen}
        />
        <ErrorModal
          title={"Delete Special Notice"}
          message={"There was an error while deleting the special notice. Please try again."}
          open={deleteNoticeErrorModalOpen}
          setOpen={setDeleteNoticeErrorModalOpen}
        />
      </>

      <div>
        <div className="flex sm:flex-row flex-col justify-between items-start sm:gap-0 gap-2">
          <h3 className="text-base font-semibold leading-6 text-gray-900">Special notices summary</h3>
          <PrimaryButton label="Create a Notice" onClick={() => setCreateNoticeModalOpen(true)}/>
        </div>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((item) => (
            <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
            </div>
          ))}
        </dl>
      </div>

      <ul role="list" className="divide-y divide-gray-100">
        {notices.length > 0 ?
          notices.map((notice) => (
            <li key={notice.id} className="flex items-center justify-between gap-x-6 py-5">
              <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{notice.title}</p>
                  <p
                    className={classNames(
                      statuses[!notice.viewed],
                      'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                    )}
                  >
                    {notice.viewed ? "Viewed" : "New"}
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                  <p className="whitespace-nowrap">
                    Published on <time dateTime={notice.createdOn}>
                    {notice.createdOn.split('T')[0]} at {notice.createdOn.split('T')[1].split('.')[0]}
                  </time>
                  </p>
                  <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                    <circle cx={1} cy={1} r={1}/>
                  </svg>
                  <p className="truncate">Created by {notice.createdBy}</p>
                </div>
              </div>
              <div className="flex flex-none items-center gap-x-4">
                <div
                  className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm
									ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                  onClick={() => {
                    setViewNoticeData(notice);
                    setViewNoticeModalOpen(true);
                  }}
                >
                  View
                </div>
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
                    ring-1 ring-gray-900/5 focus:outline-none"
                    >
                      <Menu.Item>
                        {({focus}) => (
                          <div
                            className={classNames(
                              focus ? 'bg-gray-50' : '',
                              'block px-3 py-1 text-sm leading-6 text-gray-900'
                            )}
                          >View</div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({focus}) => (
                          <div
                            className={classNames(
                              focus ? 'bg-gray-50' : '',
                              'block px-3 py-1 text-sm leading-6 text-gray-900'
                            )}
                          >Edit</div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({focus}) => (
                          <div
                            className={classNames(
                              focus ? 'bg-gray-50' : '',
                              'block px-3 py-1 text-sm leading-6 text-gray-900'
                            )}
                          >Move</div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({focus}) => (
                          <div
                            className={classNames(
                              focus ? 'bg-gray-50' : '',
                              'block px-3 py-1 text-sm leading-6 text-gray-900'
                            )}
                          >Delete</div>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </li>
          )) :
          <div className="p-8 text-center text-lg font-semibold text-gray-400">
            No special notices published yet
          </div>
        }
      </ul>
    </div>
  )
}

export default SpecialNotices;