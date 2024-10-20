"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import api from "../../api";
import { getTimeDifference } from "../../util";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

import styles from "./style.module.css";
import { FaSearch } from "react-icons/fa";

const MessagesSidebar = () => {
  const [contacts, setContacts] = useState([]);
  const [lastMessages, setLastMessages] = useState({});
  const [apiUrl, setApiUrl] = useState(
    "http://127.0.0.1:8000/api/user/contacts/"
  );
  const searchParams = useSearchParams();
  const [roomId, setRoomId] = useState(searchParams.get("room") || null);
  const [activeContact, setActiveContact] = useState(false);

  const fetchLastMessages = async (id) => {
    try {
      const response = await api.get(
        `http://127.0.0.1:8000/api/user/messages/?other_user=${id}`
      );

      let lastMessage =
        response.data.length > 0
          ? response.data[response.data.length - 1].message
          : "No messages";

      return [
        lastMessage.length > 20
          ? lastMessage.slice(0, 20) + "..."
          : lastMessage,
        response.data.length > 0
          ? getTimeDifference(
              response.data[response.data.length - 1].created_at
            )
          : "",
      ];
    } catch (error) {
      console.log(error);
      return ["No messages", ""];
    }
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    const search = e.target.value;
    if (search === "") {
      setApiUrl("http://127.0.0.1:8000/api/user/contacts/");
    } else {
      setApiUrl(`http://127.0.0.1:8000/api/user/contacts/?search=${search}`);
    }
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await api.get(apiUrl);
        setContacts(response.data);

        // Fetch last messages for all contacts
        const messages = {};
        for (const contact of response.data) {
          const [message, time] = await fetchLastMessages(contact.id);
          messages[contact.id] = { message, time };
        }
        setLastMessages(messages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchContacts();
  }, [apiUrl]);

  useEffect(() => {
    if (roomId) {
      setRoomId(searchParams.get("room"));
    }
    setActiveContact(false);
  }, [searchParams]);

  return (
    <>
      <div
        className={`${activeContact ? styles.active : ""} ${styles.sidebar}`}
      >
        <div
          className={styles.closeBtn}
          onClick={() => setActiveContact(false)}
        >
          <FaArrowLeft />
        </div>
        <h1 className="section-title">Messages</h1>
        <form className={styles.search}>
          <input
            type="text"
            name="search"
            placeholder="Search for contacts"
            onChange={handleSearchChange}
          />
          <button type="submit" aria-label="Search">
            <FaSearch />
          </button>
        </form>
        <ul className={styles.contacts}>
          {contacts.length > 0 ? (
            contacts.map((contact, index) => (
              <li
                className={`${roomId == contact.id ? styles.active : ""} ${
                  styles.contact
                }`}
                key={index}
              >
                <Link href={`?room=${encodeURIComponent(contact.id)}`}>
                  <div className={styles.userImage}>
                    {contact.profile_image ? (
                      <Image
                        src={contact.profile_image}
                        alt="User Image"
                        loading="eager"
                        width={50}
                        height={50}
                      />
                    ) : (
                      <span>
                        {contact.first_name.charAt(0)}
                        {contact.last_name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className={styles.name}>
                      {contact.first_name} {contact.last_name}
                    </h4>
                    <span className={styles.message}>
                      {lastMessages[contact.id]?.message || "Loading..."}
                    </span>
                  </div>
                  <span className={styles.time}>
                    {lastMessages[contact.id]?.time || ""}
                  </span>
                </Link>
              </li>
            ))
          ) : (
            <li className={styles.noContacts}>
              No Contacts, Start by creating a new project or submitting a
              proposal.
            </li>
          )}
        </ul>
      </div>

      <div
        className={styles.activeContact}
        onClick={() => setActiveContact(!activeContact)}
      >
        {activeContact ? <FaArrowLeft /> : <FaArrowRight />}
      </div>
    </>
  );
};

export default MessagesSidebar;
