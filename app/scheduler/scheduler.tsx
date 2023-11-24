"use client";

import supabase from "../../src/components/supabase";
import AppNavbar from "../navbar";
import Collection from "./collections";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

// ... (previous imports)

export default function Scheduler({ session }: any) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [schedulerName, setSchedulerName] = useState("");
  const [selectedColor, setSelectedColor] = useState("none"); // Default color
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLabel, setSelectedlabel] = useState(
    "Choose your Schedule Color"
  );

  const openModal = () => {
    console.log("The modal was opened");
    setOpenSidebar(true);
  };

  const closeModal = () => {
    console.log("The modal was closed");
    setOpenSidebar(false);
    setDropdownOpen(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSchedulerName(e.target.value);
  };

  // const handleColorSelect = () => {
  //    // Toggle the dropdown visibility
  // };

  const handleForceCloseDropdown = () => {
    if (dropdownOpen) {
      setDropdownOpen(false);
      console.log("It closed");
    }
    // setSelectedColor(e.target.value);
  };

  const handleColorSelect = () => {
    setDropdownOpen(!dropdownOpen);
    console.log("It got here");
    // setSelectedColor(e.target.value);
  };

  const handleColorChange = (color: string, label: string) => {
    setSelectedlabel(label);
    setSelectedColor(color);
    setDropdownOpen(false); // Close the dropdown when a color is selected
  };

  let userId: any;

  if (session) {
    userId = session.user.id;
  }

  const handleSubmit = async () => {
    // Store the scheduler information in the Supabase database

    if (selectedColor === "none") {
      console.log("Please enter an appropriate color");
    } else {
      const { data, error } = await supabase
        .from("schedulers")
        .insert([
          { name: schedulerName, user_id: userId, color: selectedColor },
        ]);

      if (error) {
        console.error("Error adding scheduler:", error.message);
      }
    }
    // Close the sidebar after submission
    closeModal();
  };

  let username;

  if (session) {
    username = session.user.user_metadata.username;
    console.log("This is the user: " + username);
  }

  const overlayStyle: React.CSSProperties = {
    display: openSidebar ? "block" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(30, 30, 30, 0.7)", // Semi-transparent background
    zIndex: 9, // Higher z-index than the sidebar
  };

  const sidebarStyle = `transition-all flex flex-col text-left duration-1000 overflow-hidden fixed right-0 top-0 h-full ${
    openSidebar ? `w-[40%] border-l dark-nav-border-color px-10` : `w-0`
  } bg-black z-10`;

  const customDropdownStyle = `relative inline-block text-left`;
  const customDropdownButtonStyle = `relative py-2 px-4 border dark-nav-border-color rounded w-[100%] bg-black z-50 text-left`;
  const colorOptionsStyle = `transition-all duration-500 text-left pl-2 hover:pl-7 z-0 block w-[98%] ${
    dropdownOpen ? `border` : `hidden`
  } mx-[auto] m-1 dark-nav-border-color text-md text-gray-100 hover:bg-gray-100 hover:text-gray-300 rounded`;
  const customDropdownListStyle = `
    ${
      dropdownOpen ? "max-h-96 border overflow-y-scroll" : "max-h-0 -top-8"
    } // Set the maximum height based on the open state
    overflow-hidden
    transition-all
    ease-in-out
    duration-500
    top-0 left-0
    flex flex-col text-left
    rounded dark-nav-border-color
    bg-black absolute
    mt-12
    w-[100%]
    // rounded-md
    shadow-lg
    ring-1 ring-black ring-opacity-5
    focus:outline-none
    -z-10
  `;

  // const schedulerContainer = `
  // ${openSidebar ? `` : ``}
  // `

  const colorOptions = [
    // { value: "linear-gradient(to right, #f06, #9f6)", label: "Greenish" },
    { value: "linear-gradient(to right, #a1c4fd, #c2e9fb)", label: "Sky Blue" },
    // { value: "linear-gradient(to right, #00c6fb, #005bea)", label: "Blue Gradient" },
    // { value: "linear-gradient(to right, #f85032, #e73827)", label: "Orange Red" },
    { value: "linear-gradient(to right, #FF9A8B, #FF6A88)", label: "Peachy" },
    {
      value: "linear-gradient(to right, #36D1DC, #5B86E5)",
      label: "Ocean Blue",
    },
    {
      value: "linear-gradient(to right, #02AAB0, #00CDAC)",
      label: "Turquoise",
    },
    { value: "linear-gradient(to right, #FDC830, #F37335)", label: "Sunset" },
    {
      value: "linear-gradient(to right, #e0c3fc, #8ec5fc)",
      label: "Pastel Purple",
    },
    {
      value: "linear-gradient(to right, #fdfbfb, #ebedee)",
      label: "Soft Gradient",
    },
    {
      value: "linear-gradient(to right, #A770EF, #CF8BF3, #FDB99B)",
      label: "Multicolor",
    },
    {
      value: "linear-gradient(to right, #DE6262, #FFB88C)",
      label: "Warm Sunset",
    },
    {
      value: "linear-gradient(to right, #D1913C, #FFD194)",
      label: "Golden Hour",
    },
    {
      value: "linear-gradient(to right, #C9D6FF, #E2E2E2)",
      label: "Light Grayish Blue",
    },
    { value: "linear-gradient(to right, #E44D26, #F16529)", label: "Rust Red" },
    {
      value: "linear-gradient(to right, #48C6EF, #6F86D6)",
      label: "Gradient Blue",
    },
  ];

  return (
    <div>
      <AppNavbar username={username} />

      <div style={overlayStyle} onClick={closeModal}></div>

      <div onClick={handleForceCloseDropdown} className={sidebarStyle}>
        {openSidebar && (
          <>
            <h3 className="w-[100%] mt-28 text-xl">Add a schedule</h3>
            <p className="py-3">This is a way to group schedules</p>

            <h4 className="w-[100%] mt-4 mb-2 text-md text-gray-400">Name</h4>
            <input
              type="text"
              value={schedulerName}
              onChange={handleNameChange}
              placeholder="Enter scheduler name"
              className="py-2 px-4 border dark-nav-border-color rounded bg-transparent"
            />
            <h5 className="w-[100%] mt-2 text-sm text-gray-400">
              Enter the name of the scheduler
            </h5>

            <h4 className="w-[100%] mt-4 mb-2 text-md text-gray-400">Color</h4>
            <div className={customDropdownStyle}>
              <button
                type="button"
                className={customDropdownButtonStyle}
                onClick={handleColorSelect}
                style={{ backgroundImage: selectedColor, color: "#FFFFFF" }}
              >
                {selectedLabel}

                <div className="flex flex-col py-2 gap-1 items-center absolute top-1/2 transform -translate-y-1/2 right-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-3 h-3"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 15.75l7.5-7.5 7.5 7.5"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-3 h-3"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
              </button>
              <div className={customDropdownListStyle}>
                {colorOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={colorOptionsStyle}
                    onClick={() =>
                      handleColorChange(option.value, option.label)
                    }
                    style={{ backgroundImage: option.value }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <h5 className="w-[100%] mt-2 text-sm -z-20 text-gray-400">
              Choose the color of your scheduler
            </h5>

            <button
              onClick={handleSubmit}
              className="-z-20 text-left py-2 px-4 bg-transparent w-[100%] mx-[auto] my-5 hover:buttons text-white font-semibold hover:text-white border dark-nav-border-color rounded"
              style={{ backgroundImage: selectedColor, color: "#FFFFFF" }}
            >
              Done
            </button>
          </>
        )}
      </div>

      <div className="mt-28 relative mb-20 overflow-y-scroll">
        <div className="border-b dark-nav-border-color flex flex-row text-left">
          <h1 className="mb-12 px-28 text-4xl">Let's keep our day organized</h1>
        </div>

        <div className="py-5 px-28">
          <button
            onClick={openModal}
            className="py-2 transition-all ease-in-out bg-transparent w-full hover:buttons text-white font-semibold hover:text-white border dark-nav-border-color rounded"
          >
            Add Schedule
          </button>
        </div>

        <div id="collections">
          <Collection session={session} />
        </div>
      </div>
    </div>
  );
}
