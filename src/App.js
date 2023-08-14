import { useState, useRef, useEffect } from "react";
import HoursSumm from "./calc.js";
import "./style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { vacay } from "./nonWorkDays.js";
import { isVisible } from "@testing-library/user-event/dist/utils/index.js";

function App() {
  const [poleta, setPoleta] = useState([
    { service: "", date: new Date(), dayBeingIs: null },
  ]);
  const [dayBeingIs, setDayBeing] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tick, setTick] = useState(
    <button
      className="btn"
      onClick={add}
      style={{ scale: "0.8", justifyContent: "center" }}
    >
      Add
    </button>
  );
  const checkin = useRef();
  const checkout = useRef();
  const arr = [];
  const payrate = useRef();
  const pay = useRef(0);
  const [hours, setHours] = useState(0);
  const [nok, setNok] = useState(0);
  const [payrateVisibility, setPRV] = useState(true);
  const [everything, setAll] = useState(false);
  const [anotherOne, setAnotherOne] = useState(null);

  const list = localStorage.getItem("history");
  const parsedList = JSON.parse(list) || [];
  const [history, setHistory] = useState(parsedList);

  const ready = () => {
    setTick("✅");
  };

  useEffect(() => {
    if (tick === "✅") {
      setAnotherOne(
        <button
          className="btn"
          onClick={anotherDay}
          style={{ scale: "0.8", justifyContent: "center" }}
        >
          Another day
        </button>
      );
    }
  }, [tick]);
    
  useEffect(() => {
    savePoletaToLocalStorage(history);
  }, [history, pay.current]);
  
  useEffect(() => {
    if (selectedDate) {
      const selectedDateString = selectedDate.toLocaleDateString();
      const dayBeing = vacay(selectedDateString);
      setDayBeing(dayBeing);
    }
  }, [selectedDate]);
  
  function add(e) {
    const cin = checkin.current.value;
    const cout = checkout.current.value;
    arr.push(pay.current, cin, cout);
    const p = arr.shift();
    arr.push(p);
    let aup = HoursSumm(arr);
    aup = aup.map((a) => {
      return Number(a);
    });
    setHours(Number(hours) + aup[1]);
    setNok(Number(nok) + aup[2]);
    ready();

    setHistory([...history,{ date: selectedDate.toLocaleDateString(), chin: cin, chout: cout }]);
    savePoletaToLocalStorage(history);
  }

  function isPayrateVisible(e) {
    e.preventDefault();
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
        boddy.style.opacity = "1";
        setAll(true);
      });
    }, 300);
  }

  function anotherDay(e) {
    if (tick !== "✅") {
      alert("⚠️Please add some data before that!");
    } else {
      setTick(
        <button
          className="btn"
          onClick={() => {
            add();
          }}
        >
          Add
        </button>
      );
      setPoleta([...poleta, { service: "", date: new Date() }]);
      setAnotherOne(null)
    }
  }
  function handleDateChange(date, index) {
    const updatedPoleta = [...poleta];
    updatedPoleta[index].date = date;

    const selectedDateString = date.toLocaleDateString();
    updatedPoleta[index].dayBeingIs = vacay(selectedDateString);

    setPoleta(updatedPoleta);
    setSelectedDate(date);
  }

  function savePoletaToLocalStorage(historyObject) {
    localStorage.setItem("zaplata", JSON.stringify(pay.current)) 
    localStorage.setItem("history", JSON.stringify(historyObject));
  }

  return (
    console.log(
      "Please use 24h format. The software rounds hours, but calculates the payment exact to the last minute."),
    <div className="boddy">
      {payrateVisibility && (
        <>
          <input
            type="text"
            ref={payrate}
            placeholder="Payrate"
            maxLength={3}
            style={{
              margin: "20px",
              height: "40px",
              width: "100px",
              borderRadius: "10px",
              padding: "3px",
              justifyContent: "center",
              textAlign: "center",
              fontSize: "20pt",
            }}
          />{" "}
          <button className="btn" onClick={isPayrateVisible}>
            That's it
          </button>
        </>
      )}
      {everything && (
        <>
          {poleta.map((pole, index) => (
            <div key={index}>
              <div className="day">
                <h1>{pole.service}</h1>
                <label htmlFor="service" className={`dayBeing`}>
                  {pole.dayBeingIs ? `${pole.dayBeingIs}` : `Day ${index + 1}`}
                </label>
                <DatePicker
                  selected={pole.date}
                  dateFormat="dd/MM/yyyy"
                  className="date-picker"
                  onChange={(date) => {
                    handleDateChange(date, index);
                    setSelectedDate(pole.date);
                    const selectedDateString =
                      selectedDate.toLocaleDateString();
                    // console.log("selectedDate is " + selectedDate);
                    setDayBeing(vacay(selectedDateString));
                  }}
                />
                <br /> <br />
                <div>
                  <input
                    ref={checkin}
                    type="text"
                    placeholder="Check-in"
                    maxLength="5"
                    style={{
                      marginRight: "30px",
                      height: "30px",
                      width: "97px",
                      borderRadius: "9px",
                      padding: "3px",
                      justifyContent: "center",
                      textAlign: "left",
                      fontSize: "16pt",
                    }}
                  />
                  <input
                    ref={checkout}
                    className="Check-out"
                    type="text"
                    placeholder="Check-out"
                    maxLength="5"
                    style={{
                      marginLeft: "30px",
                      height: "30px",
                      width: "97px",
                      borderRadius: "9px",
                      padding: "3px",
                      justifyContent: "center",
                      textAlign: "right",
                      fontSize: "16pt",
                    }}
                  />
                  <br />
                </div>
              </div>
            </div>
          ))}
          <div className="smqtalo" style={{ margin: "5px" }}>
            Total hours : {isNaN(hours) ? "❌Enter proper values" : hours}{" "}
            <br />
            Total NOK : {isNaN(nok) ? "❌Enter proper values" : nok.toFixed(2)} <br />
            Total BGN :{" "}
            {isNaN(nok) ? "❌Enter proper values" : (nok * 0.181221).toFixed(2)}
          </div>
          {tick}
          {anotherOne}
        </>
      )}
    </div>
  );
}

export default App;

//to implement = kogato stanat 4 dni , da krie nay gorniq, i da suzdava nay novite nay-otdolu. easy shit to do...
// to finish: calendara e qk feature, no se renderira vednuj za vseki element ot masiva. a ne za vseki element. of da we razbra me ne se pravi
