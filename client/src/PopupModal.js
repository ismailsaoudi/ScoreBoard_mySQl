import React, { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the root element for accessibility

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width: '100%',
      height: '100%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      backgroundColor: 'black'
    },
    p: {
      textAlign: 'center',
      fontSize: '13rem',
      color: '#FDC72E',
      margin: '4rem 0',
    },
    button: {
      display: 'block',
      margin: '2rem auto',
      fontSize: '1rem',
      backgroundColor: 'black',
      color: '#FDC72E',
      padding: '1rem 2rem',
      border: 'none',
      borderRadius: '1rem',
      cursor: 'pointer',
    }
  };


const PopupModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkTime = () => {
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      });

      if (currentTime === "6:00") {
        setMessage("Let's start work!");
        setModalIsOpen(true);
      } else if (currentTime === "8:45") {
        setMessage("Let's take a break.");
        setModalIsOpen(true);
      } else if (currentTime === "9:00") {
        setMessage("Daily Huddle.");
        setModalIsOpen(true);
      } else if (currentTime === "11:45") {
        setMessage("Let's eat.");
        setModalIsOpen(true);
      } else if (currentTime === "12:15") {
        setMessage("Let's get back to work.");
        setModalIsOpen(true);
      } else if (currentTime === "14:00") {
        setMessage("Remember to drink some water.");
        setModalIsOpen(true);
      } else if (currentTime === "14:10") {
        setMessage("Let's get back to work.");
        setModalIsOpen(true);
      } else if (currentTime === "16:20") {
        setMessage("5S Your area");
        setModalIsOpen(true);
      } else if (currentTime === "16:30") {
        setMessage("It's 4:30 pm. That’s a wrap!");

        setModalIsOpen(true);
      } else {
        setModalIsOpen(false);
      }
    };

    const timer = setInterval(checkTime, 1000); // Run every second

    return () => {
      clearInterval(timer); // Cleanup the timer on component unmount
    };
  }, []);

  useEffect(() => {
    if (modalIsOpen) {
      const timer = setTimeout(() => {
        setModalIsOpen(false); // Close the modal after 3 minutes
      }, 180000);

      return () => {
        clearTimeout(timer); // Cleanup the timer if modal is closed earlier
      };
    }
  }, [modalIsOpen]);

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };


 

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Popup Modal"
      style={customStyles} // Apply the custom modal styles
    >
      <div>
        
        {message ? (
         <p style={customStyles.p}> {message} </p>
        ) : (
          <p style={customStyles.p}>No message to display at the moment.</p>
        )}
        <button style={customStyles.button} onClick={handleCloseModal}>Close</button>
      </div>
    </Modal>
  );
};

export default PopupModal;
