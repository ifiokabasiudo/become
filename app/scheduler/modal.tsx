// Modal.tsx
import React, { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
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
      <div style={modalStyle}>{children}</div>
    </>
  );
};

export default Modal;
