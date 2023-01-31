const toMin = (format) => {
  let [hh, mm] = format.split(":");
  hh *= 1;
  mm *= 1;
  while (hh > 0) {
    mm += 60;
    hh--;
  }
  return mm;
};
export default function HoursSumm(array) {
  var totalMin = 0;
  var dailyWork = [array[2]];
  for (let i = 0; i < array.length; i++) {
    let otivane = array[i];
    i++;
    let pribirane = array[i];
    otivane = toMin(otivane);
    pribirane = toMin(pribirane);
    if (pribirane < otivane) {
      pribirane += 24 * 60;
    }
    let day = pribirane - otivane;
    totalMin += day;
    dailyWork.push(day);
    let payrate = dailyWork.shift();
    let total = 0;
    for (let index = 0; index < dailyWork.length; index++) {
      const element = dailyWork[index];
      let payPerMin = payrate / 60;
      total += element * payPerMin;
    }
    const site=[];
    const hours=(totalMin / 60).toFixed(0);
    const nok=total.toFixed(2)

    site.push(totalMin,hours,nok)
    return site;
    // (`You've been working ${totalMin} minutes, that's ${(totalMin / 60).toFixed(0)} hours! You've made ${total.toFixed(2)}NOK.`)
  }}
// HoursSumm(["17:30","2:30","17:30","3:30","18:20","2:45","20:00","3:15","20:15","00:30","20:00","00:30","20:00","2:30","20:00","3:0","20:05","1:15"])
