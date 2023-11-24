import React, { useEffect, useState } from "react";
import supabase from "../../src/components/supabase";
import { DateTimePicker } from "@/components/ui/date-time-picker";
// import * as React from 'react';
import { DateTime } from "luxon";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { SelectSingleEventHandler } from "react-day-picker";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import DeleteModal from "./deleteModal"

interface DateTimePickerProps {
  date: Date;
  setDate: (date: Date) => void;
}
import Modal from "./modal";

type Scheduler = {
  id: number;
  activities: any[];
  name: string;
  color: string;
};

const Collection = ({ session }: any) => {
  const [schedulers, setSchedulers] = useState<Scheduler[]>([]);
  const [selectedScheduler, setSelectedScheduler] = useState<Scheduler | null>(
    null
  );
  const [openModal, setOpenModal] = useState(false);
  const [content, setContent] = useState("");
  const [activityName, setActivityName] = useState("");
  const [date, setDate] = useState(new Date());
  const [buttonClicked, setButtonClicked] = useState(false);
  const [completedActivities, setCompletedActivities] = useState<number[]>([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = React.useState<DateTime>(
    DateTime.fromJSDate(date)
  );

  const handleSelect: SelectSingleEventHandler = (day, selected) => {
    const selectedDay = DateTime.fromJSDate(selected);
    const modifiedDay = selectedDay.set({
      hour: selectedDateTime.hour,
      minute: selectedDateTime.minute,
    });

    setSelectedDateTime(modifiedDay);
    setDate(modifiedDay.toJSDate());
  };

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    const hours = Number.parseInt(value.split(":")[0] || "00", 10);
    const minutes = Number.parseInt(value.split(":")[1] || "00", 10);
    const modifiedDay = selectedDateTime.set({ hour: hours, minute: minutes });

    setSelectedDateTime(modifiedDay);
    setDate(modifiedDay.toJSDate());
  };

  const footer = (
    <>
      <div className="px-4 pt-0 pb-4 bg-card text-white rounded-b border-t dark-nav-border-color">
        <Label>Time</Label>
        <Input
          type="time"
          className="bg-card text-white border dark-nav-border-color"
          onChange={handleTimeChange}
          value={selectedDateTime.toFormat("HH:mm")}
        />
      </div>
      {!selectedDateTime && <p>Please pick a day.</p>}
    </>
  );

  // }

  let userId: any;

  if (session) {
    userId = session.user.id;
  }

  useEffect(() => {
    // Fetch scheduler data from Supabase
    const fetchSchedulers = async () => {
      const { data, error } = await supabase
        .from("schedulers")
        .select("*")
        .eq("user_id", userId);
      if (error) {
        console.error("Error fetching schedulers:", error.message);
      } else {
        setSchedulers(data);
        console.log(
          "These are the schedules why: " + JSON.stringify(schedulers, null, 2)
        );
      }
    };

    fetchSchedulers();

    const channel = supabase
      .channel("schedulers-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "schedulers",
          // filter: `id=eq.${userId}`
        },
        (payload) => {
          console.log("This is the payload: " + payload);
          setSchedulers(
            (prevSchedulers) => [...prevSchedulers, payload.new] as Scheduler[]
          );
          console.log(
            "These are the schedules why: " +
              JSON.stringify(schedulers, null, 2)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]); // Run this effect only once on component mount

  // Fetch activities data from Supabase
  const fetchActivities = async () => {
    // Fetch activities associated with each scheduler
    for (const scheduler of schedulers) {
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .eq("scheduler_id", scheduler.id);
      if (error) {
        console.error("Error fetching activities:", error.message);
      } else {
        // Update the scheduler with the fetched activities
        scheduler.activities = data || [];
        console.log("Activities: " + JSON.stringify(scheduler.activities));
      }
    }

    setSchedulers([...schedulers]); // Update state to trigger re-render
  };

  useEffect(() => {
    // ... (existing useEffect code)
    fetchActivities();

    const activitiesChannel = supabase
      .channel("activities-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "activities",
        },
        (payload) => {
          // Handle real-time changes to activities
          console.log("Real-time activity update:", payload);
          fetchActivities(); // Update activities when changes occur
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(activitiesChannel);
    };

    // ... (existing code)
  }, [supabase, schedulers]);

  const closeAddActivityModal = () => {
    setOpenModal(false);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setSelectedScheduler(null);
    setContent("");
  };

  const openAddActivityModal = (scheduler: Scheduler) => {
    setOpenModal(true);
    setSelectedScheduler(scheduler);
    setContent(scheduler.name); // Set other content if needed
  };

  const openDeleteModal = (scheduler: Scheduler) => {
    setDeleteModal(true);
    setSelectedScheduler(scheduler);
    setContent(scheduler.name);
  };

  const handleDelete = (deletedSchedulerId: number) => {
    setSchedulers((prevSchedulers) =>
      prevSchedulers.filter((scheduler) => scheduler.id !== deletedSchedulerId)
    );
  }

  const formatActivityDate = (activityDateTime: string) => {
    const activityDate = DateTime.fromISO(activityDateTime);
    if (activityDate.toFormat("DDD HH:mm") === "Invalid DateTime") {
      return "";
    } else {
      return activityDate.toFormat("DDD HH:mm");
    }
  };

  const isActivityExpired = (activityDateTime: string) => {
    const activityDate = DateTime.fromISO(activityDateTime);
    const currentDate = DateTime.now();
    return currentDate > activityDate;
  };

  const handleCompleted = async (activityId: number) => {
    const isCompleted = completedActivities.includes(activityId);

    try {
      // Upsert the completed status to Supabase
      const { data, error } = await supabase
        .from("activities")
        .update({ completed: !isCompleted })
        .eq("id", activityId);

      if (error) {
        console.error("Error updating completed status:", error.message);
        return;
      }

      // Fetch the updated activities from Supabase
      const updatedActivities = await supabase
        .from("activities")
        .select("id", { head: true });

      // Update completedActivities state based on the response
      const updatedCompletedActivities = updatedActivities.data?.map(
        (activity) => activity.id
      );

      setCompletedActivities(updatedCompletedActivities || []);
    } catch (error) {
      console.error("Error handling completion:", error);
    }
  };

  useEffect(() => {
    const storedCompletedActivities = schedulers.reduce(
      (accumulator: number[], scheduler: Scheduler) => {
        return [
          ...accumulator,
          ...(scheduler.activities
            ?.filter(
              (activity: any) =>
                activity.completed && !accumulator.includes(activity.id)
            )
            .map((activity: any) => activity.id) || []),
        ];
      },
      []
    );

    setCompletedActivities(storedCompletedActivities);

    // ... (existing code)
  }, [supabase, schedulers]);

  return (
    <div className="grid grid-cols-3 gap-4 mx-28">
      {schedulers.map((scheduler: any) => (
        <div
          key={scheduler.id}
          className="rounded shadow-md border dark-nav-border-color relative grid grid-rows-[auto,1fr,auto]"
        >
          <div
            className="bg-gray-200 px-4 py-3 rounded-t"
            style={{ backgroundImage: scheduler.color }}
          >
            <h3 className="text-lg font-semibold mb-2">{scheduler.name}</h3>
            {/* Add more details or actions if needed */}
          </div>
          <div className="border-b min-h-[100px] bg-card dark-nav-border-color flex flex-col gap-y-2 px-2 py-2">
            {scheduler.activities?.map((activity: any) => (
              <div
                key={activity.id}
                className={`border rounded dark-nav-border-color p-1 relative`}
              >
                <div className="text-md w-[85%]">{activity.activity_name}</div>
                <div className="text-sm w-[85%]">
                  {formatActivityDate(activity.date_time)}
                </div>

                <div
                  className={`${
                    isActivityExpired(activity.date_time)
                      ? "expired-activity w-3 h-3 rounded-full absolute top-2 right-2 border border-black"
                      : completedActivities.includes(activity.id)
                      ? "completed-activity w-3 h-3 rounded-full absolute top-2 right-2 border border-black"
                      : ""
                  }`}
                ></div>

                <div className="flex items-center absolute top-1/2 transform -translate-y-1/2 right-2">
                  <svg
                    onClick={() => handleCompleted(activity.id)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className={`${
                      isActivityExpired(activity.date_time) ||
                      completedActivities.includes(activity.id)
                        ? `hidden`
                        : `w-6 h-6 hover:buttons hover:rounded-full hover:cursor-pointer`
                    }`}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-transparent flex-grow flex flex-row justify-end items-center relative bottom-0 left-0">
            <button
              onClick={() => openAddActivityModal(scheduler)}
              className="transition-all ease-in-out mt-2 mb-2 p-1 bg-transparent rounded border dark-nav-border-color hover:buttons"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>

            <button
              onClick={() => openDeleteModal(scheduler)}
              className="transition-all ease-in-out mt-2 mb-2 mr-2 ml-2 p-1 bg-transparent rounded border dark-nav-border-color hover:buttons"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}

      <DeleteModal
        isOpen={deleteModal}
        onClose={closeDeleteModal}
        selectedSchedulers={selectedScheduler}
        content_name={content}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={openModal}
        onClose={closeAddActivityModal}
        selectedSchedulers={selectedScheduler}
        fetchActivities={fetchActivities}
        content_name={content}
      />
    </div>
  );
};

export default Collection;
