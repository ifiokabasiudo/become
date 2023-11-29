import React, { ReactNode, useState } from "react";
import supabase from "../../../src/components/supabase";

type Scheduler = {
  id: number;
  name: string;
  color: string;
};


type DeleteModalProps = {
    isOpen: boolean;
    onClose: () => void;
    selectedSchedulers: Scheduler | null;
    content_name: string;
    onDelete: (schedulerId: number) => void;
    session: any
  };
  
  const DeleteModal: React.FC<DeleteModalProps> = ({
    isOpen,
    onClose,
    selectedSchedulers,
    content_name,
    onDelete,
    session
  }) => {

    let userId: any;

    if (session) {
      userId = session.user.id;
    }

  const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (selectedSchedulers) {
          try {
            // Delete the scheduler from Supabase
            const { data, error } = await supabase
              .from("schedulers")
              .delete()
              .eq("id", selectedSchedulers.id)
              .eq("user_id", userId)
    
            if (error) {
              console.error("Error deleting scheduler:", error.message);
              return;
            }
    
            // Call the onDelete callback to update the local state
            onDelete(selectedSchedulers.id);
          } catch (error) {
            console.error("Error handling scheduler deletion:", error);
          }
          // Close the modal after submitting
          onClose();
        }
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
      <div style={overlayStyle} onClick={onClose}></div>
      <div style={modalStyle}>
        <div className="text-left">
          <h3 className="text-lg py-2">
            Are you sure you want to delete the "{content_name}" schedule?
          </h3>
          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              className="text-left py-2 px-2 mx-[auto] bg-transparent w-[100%] my-5 hover:bg-rose-600 text-rose-600 font-semibold hover:text-white border dark-nav-border-color rounded"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
