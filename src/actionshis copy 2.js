import React, { useState, useRef } from "react";
import "./actionhis.css";
import HoursSumm from "./calc";

export function Actionhis() {
  const [isActive, setIsActive] = useState(false);
  const [listed, setListed] = useState([]);
  const [zaplatata, setZaplatata] = useState([]);
  const scrollableRef = useRef(null);

  function loadPoletaFromLocalStorage() {
    const list = localStorage.getItem("history");
    const parsedList = JSON.parse(list);
    return (parsedList) || [];
  }
  function loadZaplata(){
    return JSON.parse(localStorage.getItem("zaplata"));
  }

  function actionToggle() {
    setIsActive((prevIsActive) => !prevIsActive);
    const loadedList = loadPoletaFromLocalStorage();
    setListed(loadedList);
    const zaplata=loadZaplata();
    setZaplatata(zaplata);
  }

  function handleDeleteClick() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all previously entered days?"
    );
    if (confirmDelete) {
      localStorage.removeItem("zaplata");
      localStorage.removeItem("history");
      setListed([]);
    }
  }

  const scrollableClass = listed.length > 3 ? "scrollable" : "";

  return (
    <div className={`actionhis ${isActive ? "active" : ""}`} onClick={actionToggle}>
      <span>📜</span>
      {isActive && (
        <ul ref={scrollableRef} className={scrollableClass}>
          {listed.length > 0 && (
            <li>
              <button className="delete-button" onClick={handleDeleteClick}></button>
            </li>
          )}
          {listed.map((item, index, zaplata) => (
            <li key={index}>
              {item.date.substring(0, 4)}, {item.chin} ➠ {item.chout}, {(HoursSumm([item.chin,item.chout, zaplatata]))[2]} NOK
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
