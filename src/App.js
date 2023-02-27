import { useState, useRef } from "react";
import HoursSumm from "./calc.js"
import './style.css'

function App() {
  const [poleta,setPoleta]=useState([{service:""}])
  // const [rezultat,setRezultat]=useState("It\'s...")
  const [visible, setVisible] = useState(true);
  const [tick,setTick]=useState(<button className="btn" onClick={handler}
    style={{scale:"0.8", justifyContent:"center"}}>Add</button>)
  const checkin=useRef();
  const checkout=useRef();
  const arr=[];
  const payrate=useRef();
  var totalMin=0;
  const pay = useRef(0);
  const [hours,setHours]=useState(0);
  const [nok,setNok]=useState(0);
  const[payrateVisibility,setPRV]=useState(true);
  const [everything,setAll]=useState(false);
  

  const ready= () =>{setTick('✅');}
  const removeElement = () => {
    setVisible((prev) => !prev);}
  function handler(e){
    const cin=checkin.current.value;
    const cout=checkout.current.value;
    arr.push(pay.current,cin,cout); 
    const p=arr.shift();
    arr.push(p);
    let aup=HoursSumm(arr);
    aup=aup.map((a)=>{return Number(a)})
    setHours(Number(hours)+aup[1]);
    setNok(Number(nok)+aup[2]);
    removeElement();
    ready();

  }
  function isPayrateVisible(e){
    setPRV((isVisible) => !isVisible);
    debugger
    pay.current=Number(payrate.current.value);
    // arr.push(pay); UPDATED
    setAll(true);
  }
  function add(e){
    tick!=="✅"? alert("⚠️Please add some data before that!"):
    setPoleta([...poleta,{service:""}]) 
    setTick(<button className="btn" onClick={handler}
    >Add</button>)   
  }
      return (
    console.log("Please use 24h format. The software rounds hours, but calculates the payment exact to the last minute."),
        <div className="boddy" >
    {payrateVisibility && <><input type="text"
      ref={payrate}
      placeholder="Payrate"
      maxLength={3}
      style={{margin:"20px",height:'40px',width:"100px",borderRadius:'10px',padding:"3px",justifyContent:"center",textAlign:"center",fontSize:"20pt"}}/>    <button className="btn" onClick={isPayrateVisible}>That's it</button></>}
{everything && <>{poleta.map((pole,index) => ( 
      <div key={index}><div className="day">
      <label htmlFor="service">Day {index+1}</label>   
    <div >
    <input ref={checkin} 
    type="text" 
    placeholder="Check-in"
    maxLength="5"
    style={{marginRight:"30px",height:'30px',width:"97px",borderRadius:'9px',padding:"3px",justifyContent:"center",textAlign:"left",fontSize:"16pt"}}/>
    <input ref={checkout} className="Check-out"
    type="text" 
    placeholder="Check-out"
    maxLength="5"
    style={{marginLeft:"30px",height:'30px',width:"97px",borderRadius:'9px',padding:"3px",justifyContent:"center",textAlign:"right",fontSize:"16pt"}}/><br/></div>
    {poleta.length - 1 === index  && (
       tick
        )
      }
</div></div>
    ))}
<div className="smqtalo" style={{margin:"5px"}}>
    Total hours : {isNaN(hours)?"❌Enter proper values":hours}   <br/>
        Total NOK : {isNaN(nok)?"❌Enter proper values":nok}  <br/>
        Total BGN : {isNaN(nok)?"❌Enter proper values":nok*0.181221.toFixed(1)} 
        </div>
    <button className="btn" onClick={add}
    style={{scale:"0.8", justifyContent:"center"}}>Another day</button></>}
    </div>
  )
}

export default App;
