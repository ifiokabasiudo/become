import React, { useEffect, useState } from "react";
import supabase from "../../src/components/supabase";
import Modal from "./modal";

type Scheduler = {
  id: number;
  name: string;
  color: string;
};

const Collection = ({ session }: any) => {
  const [schedulers, setSchedulers] = useState<Scheduler[]>([]);
  const [openModal, setOpenModal] = useState(false);

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
        }
      )
      .subscribe();

    console.log(
      "These are the schedules: " + JSON.stringify(schedulers, null, 2)
    );

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]); // Run this effect only once on component mount

  const openAddActivityModal = () => {
    setOpenModal(true);
  };

  const closeAddActivityModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="grid grid-cols-3 gap-4 mx-28">
      {schedulers.map((scheduler) => (
        <div
          key={scheduler.id}
          className="rounded shadow-md border dark-nav-border-color"
        >
          <div
            className="bg-gray-200 px-4 py-3"
            style={{ backgroundColor: scheduler.color }}
          >
            <h3 className="text-lg font-semibold mb-2">{scheduler.name}</h3>
            {/* Add more details or actions if needed */}
          </div>
          <div className="border-b min-h-[100px] bg-card dark-nav-border-color"></div>
          <div className="bg-transparent min-h-[2rem] flex flex-row justify-end items-center">
            <button
              onClick={openAddActivityModal}
              className="transition-all ease-in-out mt-2 mb-2 p-1 bg-transparent rounded border dark-nav-border-color"
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

            <button className="transition-all ease-in-out mt-2 mb-2 mr-2 ml-2 p-1 bg-transparent rounded border dark-nav-border-color hover:bg-gray-950">
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

       {/* Render the modal conditionally based on the state */}
       <Modal isOpen={openModal} onClose={closeAddActivityModal}>
        {/* Content of your modal goes here */}
        <h1>Add Activity</h1>
        <p>This is the content of your modal.</p>
      </Modal>
    </div>
  );
};

export default Collection;
