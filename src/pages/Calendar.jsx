import React, {useEffect, useMemo, useState} from 'react'
import getMonthWithAdjacentDays from "../lib/getMonthWithAdjacentDays";
import AllocationDetailsCard from "../components/AllocationDetailsCard";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";
import getMonthString from "../lib/getMonthString";
import {PrimaryButton} from "../components/Button";
import CreateEventModal from "../components/modals/CreateEventModal";
import ViewEventModal from "../components/modals/ViewEventModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Calendar = () => {
  const today = useMemo(() => new Date(), []);

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  const [createEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [viewEventModalOpen, setViewEventModalOpen] = useState(false);

  const [currentEvent, setCurrentEvent] = useState({
    title: "", startDate: "", startTime: "", endDate: "", endTime: "",
  });
  const [events, setEvents] = useState([]);
  const [visibleEvents, setVisibleEvents] = useState([]);

  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  const [currentMonth, setCurrentMonth]
    = useState({month: today.getMonth(), year: today.getFullYear()});
  const [consideredMonth, setConsideredMonth]
    = useState({month: today.getMonth(), year: today.getFullYear()});

  useEffect(() => {
    const tempEvents = events.filter((e) => {
      const startDate = new Date(e.startDate);
      const endDate = new Date(e.endDate);

      return startDate <= selectedDay && endDate >= selectedDay;
    });
    setVisibleEvents(tempEvents);
  }, [events, selectedDay]);

  useEffect(() => {
    const currentMonthDays = getMonthWithAdjacentDays(currentMonth.year, currentMonth.month + 1);
    let tempDays = [];
    currentMonthDays.map((currentMonthDay) => {
      const checkIsToday = today.getDate() === currentMonthDay.getDate() &&
        today.getMonth() === currentMonthDay.getMonth() &&
        today.getFullYear() === currentMonthDay.getFullYear();
      tempDays.push({
        date: `${currentMonthDay.getFullYear()}-${currentMonthDay.getMonth() + 1}-${currentMonthDay.getDate()}`,
        isCurrentMonth:
          currentMonthDay.getMonth() === consideredMonth.month && currentMonthDay.getFullYear() === consideredMonth.year,
        isToday: checkIsToday,
        isSelected: checkIsToday,
      });
    });
    setDays(tempDays);
  }, [consideredMonth.month, consideredMonth.year, currentMonth]);

  useEffect(() => {
    const tempEvents = [
      { title: "Task A", startDate: "2023-11-01", startTime: "08:00", endDate: "2023-11-01", endTime: "11:55" },
      { title: "Task B", startDate: "2023-11-01", startTime: "12:00", endDate: "2023-11-01", endTime: "13:00" },
      { title: "Task C", startDate: "2024-06-03", startTime: "15:00", endDate: "2024-06-07", endTime: "17:00" },
      { title: "Task D", startDate: "2024-06-01", startTime: "17:00", endDate: "2024-06-05", endTime: "19:00" },
    ];
    setEvents(tempEvents);
  }, [days, setEvents]);

  const handleOnClickDay = (day) => {
    if (day.isSelected) {
      setSelectedDay(null);
    } else {
      const splitDay = day.date.split("-");
      const year = splitDay[0];
      const month = splitDay[1] < 10 ? "0" + splitDay[1] : splitDay[1];
      const date = splitDay[2] < 10 ? "0" + splitDay[2] : splitDay[2];
      const myDate = new Date(`${year}-${month}-${date}`);
      setSelectedDay(myDate);
    }

    let updatedDays = days.map((d) => {
      if (day === d)
        return {...day, isSelected: true};
      return {...d, isSelected: false};
    });
    setDays(updatedDays);
  }

  const handleOnClickPrevious = () => {
    const updatedDay = {
      month: currentMonth.month === 0 ? 11 : currentMonth.month - 1,
      year: currentMonth.month === 0 ? currentMonth.year - 1 : currentMonth.year,
    };
    setConsideredMonth(updatedDay);
    setCurrentMonth(updatedDay);
  }

  const handleOnClickNext = () => {
    const updatedDay = {
      month: (currentMonth.month + 1) % 12,
      year: currentMonth.month === 11 ? currentMonth.year + 1 : currentMonth.year,
    };
    setConsideredMonth(updatedDay);
    setCurrentMonth(updatedDay);
  }

  const handleOnClickAllocation = (oldEvent) => {
    setCurrentEvent(oldEvent);
    setViewEventModalOpen(true);
  }

  return (
    <div>
      <CreateEventModal
        open={createEventModalOpen}
        setOpen={setCreateEventModalOpen}
        title={title}
        setTitle={setTitle}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
      />
      <ViewEventModal
        open={viewEventModalOpen}
        setOpen={setViewEventModalOpen}
        eventDetails={currentEvent}
        setEventDetails={setCurrentEvent}
      />

      <div className="sm:flex-auto">
        <h1 className="text-base font-semibold leading-6 text-gray-900">Company Events</h1>
        <p className="mt-1 mb-5 text-sm text-gray-700">
          Select a date to view event of that particular date.
        </p>
      </div>
      <div className="w-full flex lg:flex-row flex-col-reverse pt-4">
        <div className="lg:w-2/5 w-full">
          <div role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 xl:gap-x-8">
            {selectedDay === null ?
              events.map((event, idx) => (
                <AllocationDetailsCard key={idx} event={event} onClick={handleOnClickAllocation}/>
              )) :
              visibleEvents.length > 0 ? visibleEvents.map((event, idx) => (
                <AllocationDetailsCard key={idx} event={event} onClick={handleOnClickAllocation}/>
              )) : "No events"
            }
          </div>
        </div>
        <div className="lg:w-3/5 w-full lg:pl-8 lg:pb-0 pb-8">
          <div className="w-full flex-none block mb-2">
            <div className="w-full flex items-center text-center text-gray-900">
              <button
                type="button"
                className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                onClick={handleOnClickPrevious}
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true"/>
              </button>
              <div className="flex-auto text-sm font-semibold">
                {getMonthString(currentMonth.month).fullName} {currentMonth.year}
              </div>
              <button
                type="button"
                className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                onClick={handleOnClickNext}
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true"/>
              </button>
            </div>
            <div className="w-full mt-6 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
              {["M", "T", "W", "T", "F", "S", "S"].map((letter, idx) => {
                return <div key={idx}>{letter}</div>;
              })}
            </div>
            <div className="w-full isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1
            ring-gray-200">
              {days.map((day, dayIdx) => (
                <button
                  key={day.date}
                  type="button"
                  className={classNames(
                    'py-2.5 hover:bg-gray-100 focus:z-10',
                    day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                    (day.isSelected || day.isToday) && 'font-semibold',
                    day.isSelected && 'text-white',
                    !day.isSelected && day.isCurrentMonth && !day.isToday && 'text-gray-900',
                    !day.isSelected && !day.isCurrentMonth && !day.isToday && 'text-gray-400',
                    day.isToday && !day.isSelected && 'text-indigo-600',
                    dayIdx === 0 && 'rounded-tl-lg',
                    dayIdx === 6 && 'rounded-tr-lg',
                    dayIdx === days.length - 7 && 'rounded-bl-lg',
                    dayIdx === days.length - 1 && 'rounded-br-lg'
                  )}
                  onClick={() => handleOnClickDay(day)}
                >
                  <time
                    dateTime={day.date}
                    className={classNames(
                      'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                      day.isSelected && day.isToday && 'bg-indigo-600',
                      day.isSelected && !day.isToday && 'bg-gray-900'
                    )}
                  >
                    {day.date.split('-').pop()?.replace(/^0/, '')}
                  </time>
                </button>
              ))}
            </div>
          </div>
          <PrimaryButton
            label={"Create Event"}
            width={"full"}
            onClick={() => setCreateEventModalOpen(true)}
          />
        </div>
      </div>
    </div>
  )
}

export default Calendar;