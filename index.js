const { writeFileSync } = require('fs')
const ics = require('ics')
var moment = require('moment');
require('moment-recur');

const handleEventCreate = (eventDate) =>{
  let personOnDuty = people[count]
  if (count === 3) {
    count = 0
  }

  eventDate = moment(eventDate)

  let event = {
    title: personOnDuty,
    description: 'Nightly thing I do',
    start: [eventDate.format('YYYY'), eventDate.format('MM'), eventDate.format('D')],
    end: [eventDate.add(1, 'day').format('YYYY'), eventDate.add(1, 'day').format('MM'), eventDate.add(1, 'day').format('D')],
    attendees: [
    { name: personOnDuty, email: 'weeksjasons@gmail.com', rsvp: true },
  ]
  }

  eventArray.push(event)

}

let trash = moment().recur({
    start: moment(),
    end: moment().add(1 , 'y')
}).every(1, "days");

let trashArray = trash.all("L");


let changeOwnership = moment().recur({
    start: moment(),
    end: moment().add(1 , 'y')
}).every(7, "days");

let people = ['jason', 'hess', 'adam', 'matt']
let eventArray = [];
// Outputs: ["01/01/2014", "01/03/2014", "01/05/2014", "01/07/2014"]
let changeOwnerArray = changeOwnership.all("L");
let count = 0
for (var i = 0; i < trashArray.length; i++) {
  //go through every trash day
// debugger

  if (changeOwnerArray.includes(trashArray[i])) {
    count++
    handleEventCreate(trashArray[i])
    // change ownership
  }else{
    handleEventCreate(trashArray[i])
    //set ownership
  }

}




// let event = {
//   title: 'Dinner',
//   description: 'Nightly thing I do',
//   start: [2018, 1, 15, 6, 30],
//   duration: { minutes: 50 },
//   attendees: [
//   { name: 'Jason Weeks', email: 'weeksjasons@gmail.com', rsvp: true },
// ]
// }

const callback = (err, value) =>{
  if (err) {
    console.log(err)
  }else{
    writeFileSync(`${__dirname}/event.ics`, value)
  }
}

console.log(ics.createEvents(eventArray))

ics.createEvents(eventArray,callback)



// ics.createEvents({
//   title: 'Dinner',
//   description: 'Nightly thing I do',
//   start: [2018, 1, 15, 6, 30],
//   duration: { minutes: 50 }
// }, (error, value) => {
//   if (error) {
//     console.log(error)
//   }
//
//
//   writeFileSync(`${__dirname}/event.ics`, value)
// })
