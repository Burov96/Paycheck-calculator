import React, { useState } from "react";
import "./actionhis.css";

export function Actionhis() {
  const [isActive, setIsActive] = useState(false);
  const [listed, setListed] = useState([]);

  function loadPoletaFromLocalStorage() {
    const list = localStorage.getItem("history");
    const parsedList = JSON.parse(list);
    return parsedList || [];
  }

  function actionToggle() {
    setIsActive((prevIsActive) => !prevIsActive);
    const loadedList = loadPoletaFromLocalStorage();
    setListed(loadedList);
  }

  function handleDeleteClick() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all previously entered days?"
    );
    if (confirmDelete) {
      localStorage.removeItem("history");
      setListed([]);
    }
  }

  const scrollableClass = listed.length > 3 ? "scrollable" : "";

  return (
    <div className={`actionhis ${isActive ? "active" : ""}`} onClick={actionToggle}>
      <span>📜</span>
      {isActive && (
        <ul className={scrollableClass}>
          {listed.length > 0 && (
            <li>
              <button className="delete-button" onClick={handleDeleteClick}></button>
            </li>
          )}
          {listed.map((item, index) => (
            <li key={index}>
              Date: {item.date} <br />
              Check-in: {item.chin} <br />
              Check-out: {item.chout}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
