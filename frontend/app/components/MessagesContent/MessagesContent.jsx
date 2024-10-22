"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import api from "../../api";

import { FaArrowUp } from "react-icons/fa";
import styles from "./style.module.css";

const MessagesContent = () => {
  const searchParams = useSearchParams();
  const [currentUser, setCurrentUser] = useState(null);
  const [otherUserData, setOtherUserData] = useState(null);
  const roomId = searchParams.get("room") || null;
  const [messages, setMessages] = useState([]);

  const fetchCurrentUser = async () => {
    try {
      const response = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/current-user/`
      );
      setCurrentUser(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOtherUser = async () => {
    try {
      const response = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${roomId}`
      );
      setOtherUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await api.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/messages/?other_user=${roomId}`
      );
      setMessages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    fetchOtherUser();
    fetchMessages();
  }, [searchParams]);

  const myMessages = (senderId) => {
    if (senderId === currentUser.id) {
      return true;
    } else {
      return false;
    }
  };

  const formatTimestamp = (isoString) => {
    const date = new Date(isoString);
    const now = new Date();

    // Calculate the difference in days
    const differenceInTime = now - date;
    const differenceInDays = Math.floor(
      differenceInTime / (1000 * 60 * 60 * 24)
    );

    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const timeString = date.toLocaleString("en-US", options);

    if (differenceInDays === 0) {
      return `Today at ${timeString}`;
    } else if (differenceInDays === 1) {
      return `Yesterday at ${timeString}`;
    } else if (differenceInDays <= 7) {
      return `${differenceInDays}d ago at ${timeString}`;
    } else {
      // If it's older than a week, show full date
      return `${date.toLocaleDateString("en-US")} at ${timeString}`;
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    let message = document.getElementById("send_message").value;
    if (message) {
      const response = await api.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/messages/`,
        {
          sender: currentUser.id,
          receiver: roomId,
          message: message,
        }
      );
      setMessages([...messages, response.data]);
      document.getElementById("send_message").value = "";
    }
  };

  return (
    <>
      {otherUserData && currentUser ? (
        <div>
          <div className={styles.head}>
            <h3>
              {otherUserData?.first_name} {otherUserData?.last_name}
            </h3>
          </div>
          <div className={styles.messagesContainer}>
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <p
                  className={`${styles.message} ${
                    myMessages(message.sender) && styles.myMessage
                  }`}
                  key={index}
                >
                  {message.message}
                  <span>{formatTimestamp(message.created_at)}</span>
                </p>
              ))
            ) : (
              <p className={styles.noMessages}>
                No Messages, Start by saying hi 👋🏻
              </p>
            )}
          </div>
          <form className={styles.sendForm}>
            <input
              type="text"
              name="send_message"
              id="send_message"
              placeholder="Send Message"
            />
            <button
              type="submit"
              aria-label="Send Message"
              onClick={sendMessage}
            >
              <FaArrowUp />
            </button>
          </form>
        </div>
      ) : (
        <div className={styles.noRoom}>
          <p>Please select a room to start chatting</p>
        </div>
      )}
    </>
  );
};

export default MessagesContent;
