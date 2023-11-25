import React, { ReactNode, useState } from "react";
import supabase from "../../src/components/supabase";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DateTime } from "luxon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { SelectSingleEventHandler } from "react-day-picker";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Scheduler = {
  id: number;
  name: string;
  color: string;
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedSchedulers: Scheduler | null; // Assuming Scheduler type is defined somewhere
  fetchActivities: () => void; // Function to refetch activities after submission
  content_name: string
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, selectedSchedulers, fetchActivities, content_name }) => {
  const [schedulers, setSchedulers] = useState<Scheduler[]>([]);
  const [selectedScheduler, setSelectedScheduler] = useState<Scheduler | null>(
    null
  );
  const [openModal, setOpenModal] = useState(false);
  const [activityDetails, setActivityDetails] = useState("");
  const [content, setContent] = useState("");
  const [activityName, setActivityName] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedDateTime, setSelectedDateTime] = React.useState<DateTime>(
    DateTime.fromJSDate(date)
  );

  const handleReset = () => {
    setSchedulers([]);
    setSelectedScheduler(null);
    setOpenModal(false);
    setActivityDetails("");
    setContent("");
    setActivityName("");
    setButtonClicked(false);
    setIsDateSelected(false);
    setDate(new Date());
    setSelectedDateTime(DateTime.fromJSDate(new Date()));
  };

  const handleSelect: SelectSingleEventHandler = (day, selected) => {
    const selectedDay = DateTime.fromJSDate(selected);
    const modifiedDay = selectedDay.set({
      hour: selectedDateTime.hour,
      minute: selectedDateTime.minute,
    });

    setSelectedDateTime(modifiedDay);
    setDate(modifiedDay.toJSDate());

    setIsDateSelected(true);
  };

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    const hours = Number.parseInt(value.split(":")[0] || "00", 10);
    const minutes = Number.parseInt(value.split(":")[1] || "00", 10);
    const modifiedDay = selectedDateTime.set({ hour: hours, minute: minutes });

    setSelectedDateTime(modifiedDay);
    setDate(modifiedDay.toJSDate());

    setIsDateSelected(true);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedSchedulers) {
      console.log(selectedDateTime)
      // Save the activity details to the Supabase database
      const { data , error } = await supabase.from("activities").insert([
        {
          scheduler_id: selectedSchedulers.id,
          activity_name: activityName,
          date_time: isDateSelected ? String(selectedDateTime) : null,
          // Add other relevant fields
        },
      ]);

      // Refetch activities after submission
      await fetchActivities();

      await handleReset();
      // Close the modal after submitting
      await onClose()
    }
  };

  const handleDone = () => {
    setButtonClicked(true)
    setIsDateSelected(true)
  }

  const overlayClickHandler = () => {
    handleReset();
    onClose();
  };
  
  const overlayStyle: React.CSSProperties = {
    display: isOpen ? "block" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(30, 30, 30, 0.7)",
    zIndex: 100, // Higher z-index than the sidebar
  };

  const modalStyle: React.CSSProperties = {
    width: "30%",
    display: "block",
    overflow: "hidden",
    borderWidth: "0.5px",
    borderColor: "rgba(156, 163, 175, 0.5)",
    borderStyle: "solid",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%) scale(${isOpen ? 1 : 0})`, // Use scale for animation
    opacity: isOpen ? 1 : 0, // Set opacity for animation
    transition: "transform 0.3s ease, opacity 0.3s ease", // Add transition property
    backgroundColor: "#0C0C0C",
    padding: "35px",
    borderRadius: "8px",
    zIndex: 101, // Higher z-index than the overlay
  };

  return (
    <>
      <div style={overlayStyle} onClick={overlayClickHandler}></div>
      <div style={modalStyle}>
      <div className="text-left">
          <h3 className="text-2xl py-2">Add activities</h3>
          <p className="text-lg pb-2 text-gray-400">
            Add activities to the "{content_name}" schedule
          </p>

          <form onSubmit={handleSubmit}>
            <label className="block text-lg pb-2">Activity Details</label>
            <textarea
              value={activityName}
              placeholder="Please enter details of the activity"
              onChange={(e) => setActivityName(e.target.value)}
              className="mt-1 p-2 border rounded bg-transparent dark-nav-border-color w-[100%] min-h-[100px] resize-y"
              style={{ lineHeight: "1.5" }}
              required
            />

            <Popover>
              <PopoverTrigger asChild className="z-[105] bg-transparent">
                <Button
                  onClick={handleDone}
                  suppressHydrationWarning
                  // onClick={handleCalendarClick}
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal bg-card dark-nav-border-color text-white hover:buttons hover:text-white",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {/* {date} */}
                  {buttonClicked ? (
                    selectedDateTime.toFormat("DDD HH:mm")
                  ) : (
                    <span>No Expirary Date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0 border dark-nav-border-color bg-transparent z-[105]">
                <Calendar
                  className="text-white bg-card rounded-t w-full"
                  mode="single"
                  selected={selectedDateTime.toJSDate()}
                  onSelect={handleSelect}
                  initialFocus
                />
                {footer}
              </PopoverContent>
            </Popover>

            <button
              type="submit"
              className="text-left py-2 px-2 mx-[auto] bg-transparent w-[100%] my-5 hover:buttons text-white font-semibold hover:text-white border dark-nav-border-color rounded"
              style={{
                backgroundImage: selectedSchedulers
                  ? selectedSchedulers.color
                  : "",
              }}
            >
              Done
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Modal;
