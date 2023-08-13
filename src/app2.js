import { useState, useRef, useEffect } from "react";
import HoursSumm from "./calc.js";
import './style.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {vacay} from './nonWorkDays.js';

function App() {
  const [poleta, setPoleta] = useState([{ service: "" }])
  const [dayBeingIs, setDayBeing] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tick, setTick] = useState("Add");
  const [anotherOne, setAnotherOne] = useState(null);

  const checkin = useRef();
  const checkout = useRef();
  const arr = [];
  const payrate = useRef();
  const pay = useRef(0);
  const [hours, setHours] = useState(0);
  const [nok, setNok] = useState(0);
  const [payrateVisibility, setPRV] = useState(true);
  const [everything, setAll] = useState(false);

  useEffect(() => {
    if (tick === "✅") {
      setAnotherOne(
        <button className="btn" onClick={anotherDay} style={{ scale: "0.8", justifyContent: "center" }}>
          Another day
        </button>
      );
    }
  }, [tick]);

  function add() {
    const cin = checkin.current.value;
    const cout = checkout.current.value;
    arr.push(pay.current, cin, cout);
    const p = arr.shift();
    arr.push(p);
    let aup = HoursSumm(arr);
    aup = aup.map((a) => { return Number(a) })
    setHours(Number(hours) + aup[1]);
    setNok(Number(nok) + aup[2]);
    ready();
    const selectedDateString = selectedDate.toLocaleDateString();
    const dayBeing = vacay(selectedDateString);
    dayBeing ? setDayBeing(dayBeing) : setDayBeing(null);
    console.log(poleta);
  }

  function isPayrateVisible() {
    const boddy = document.querySelector(`.boddy`);
    boddy.style.transition = "scale 0.25s ease-out, opacity 0.25s ease-out";
    boddy.style.scale = "0.1";
    boddy.style.opacity = "0.2";
    setPRV((isVisible) => !isVisible);
    pay.current = Number(payrate.current.value);
    setTimeout(() => {
      requestAnimationFrame(() => {
        boddy.style.transition = "scale 0.3s ease-in, opacity 0.3s ease-in";
        boddy.style.scale = "1";
        boddy.style.opacity = '1'
        setAll(true);
      });
    }, 300);
  }

  function ready() {
    setTick("✅");
  }

  function anotherDay() {
    tick !== "✅" ? alert("⚠️Please add some data before that!") :
      setPoleta([...poleta, { service: "" }]);
    setTick("Add");
  }

  return (
    console.log("Please use 24h format. The software rounds hours, but calculates the payment exact to the last minute."),
    <div className="boddy" >
      {payrateVisibility && <>
        <input type="text"
          ref={payrate}
          placeholder="Payrate"
          maxLength={3}
          style={{ margin: "20px", height: '40px', width: "100px", borderRadius: '10px', padding: "3px", justifyContent: "center", textAlign: "center", fontSize: "20pt" }} />
        <button className="btn" onClick={isPayrateVisible}>That's it</button></>}
      {everything && <>{poleta.map((pole, index) => (
        <div key={index}><div className="day">
          <h1>{pole}</h1>
          <label htmlFor="service">{dayBeingIs ? `${dayBeingIs}` : `Day ${index + 1}`}</label>
          <br />
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            className="date-picker"
          /><br /> <br />
          <div >
            <input ref={checkin}
              type="text"
              placeholder="Check-in"
              maxLength="5"
              style={{ marginRight: "30px", height: '30px', width: "97px", borderRadius: '9px', padding: "3px", justifyContent: "center", textAlign: "left", fontSize: "16pt" }} />
            <input ref={checkout} className="Check-out"
              type="text"
              placeholder="Check-out"
              maxLength="5"
              style={{ marginLeft: "30px", height: '30px', width: "97px", borderRadius: '9px', padding: "3px", justifyContent: "center", textAlign: "right", fontSize: "16pt" }} /><br /></div>
        </div></div>
      ))}
      <div className="smqtalo" style={{ margin: "5px" }}>
        Total hours: {isNaN(hours) ? "❌Enter proper values" : hours}   <br />
        Total NOK: {isNaN(nok) ? "❌Enter proper values" : nok}  <br />
        Total BGN: {isNaN(nok) ? "❌Enter proper values" : (nok * 0.181221).toFixed(2)}
      </div>
      {tick === "Add" && <button className="btn" onClick={add}>Add</button>}
      {tick === "✅" && <button className="btn" onClick={add}>Another day</button>}
      {anotherOne}
    </div>
  )
}

export default App;
