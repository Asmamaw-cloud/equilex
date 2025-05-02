"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { getNewLawyers } from "../admin/api/lawyers";
import { getDisputes } from "../lawyer/api/dispute";
import { getSession } from "next-auth/react";


// Define types for context state
interface NotificationContextType {
  showPopup: Boolean;
  faqNotifications: number;
  lawyerNotifications: number;
  disputeNotifications: number;
  setFaqNotifications: (count: number) => void;
  setLawyerNotifications: (count: number) => void;
  setDisputeNotifications: (count: number) => void;
  fetchNotifications: () => void; // Add a method to fetch notifications
  setShowPopup: Dispatch<SetStateAction<boolean>>;
  handleClosePopup: () => void;
  handleNotificationClick: () => void;
}

// Create the context with default values
const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [faqNotifications, setFaqNotifications] = useState(0);
  const [lawyerNotifications, setLawyerNotifications] = useState(0);
  const [disputeNotifications, setDisputeNotifications] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const handleNotificationClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const fetchNotifications = async () => {
    try {
      const lawyers = await getNewLawyers();

      setLawyerNotifications(lawyers.lawyers.length); // Update lawyer notifications count

      const disputs = await getDisputes();

      setDisputeNotifications(disputs.length); // Example count
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };


  useEffect(() => {
    //this is to check if the user is admin or not i.e if the user is not admin getNewLawyers doesn't called
    const checkAndFetch = async () => {
      const session = await getSession();
      if (!session || session.user?.image?.type !== "admin") return;
  
      fetchNotifications();
    };
  
    checkAndFetch();
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        showPopup,
        faqNotifications,
        lawyerNotifications,
        disputeNotifications,
        setFaqNotifications,
        setLawyerNotifications,
        setDisputeNotifications,
        fetchNotifications, // Provide the fetch function
        handleClosePopup,
        handleNotificationClick,
        setShowPopup,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};
