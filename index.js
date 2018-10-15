const { writeFileSync } = require('fs')
const ics = require('ics')
var moment = require('moment');
require('moment-recur');



let eventArray = [];

let changeOwnership = moment().recur({
    start: moment(),
    end: moment().add(1 , 'y')
}).every(7, "days");

// Outputs: ["01/01/2014", "01/03/2014", "01/05/2014", "01/07/2014"]
let changeOwnerArray = changeOwnership.all("L");

let count = 0


const handleEventCreate = (eventDate) =>{
  let people = ['jason', 'hess', 'adam', 'matt']
  let personOnDuty = people[count] || people[0]

  let remainingPeople = people.filter(x => x !== personOnDuty)

  if (count === 4) {
    let lastPerson = people.pop()
    people.unshift(lastPerson)
    count = 0
  }



  eventDateM = moment(eventDate)


  let trashEvent = {
    title: 'Trash ' + personOnDuty,
    description: 'Nightly thing I do',
    start: [eventDateM.format('YYYY'), eventDateM.format('MM'), eventDateM.format('D')],
    duration: { hours: 24},
    attendees: [
      { name: personOnDuty, email: 'weeksjasons@gmail.com', rsvp: true },
    ]
  }

  let personTwo = remainingPeople[count -1] || people[people.length -1]

  let kitchenEvent = {
    title: 'kitchen ' + personTwo,
    description: 'Nightly thing I do',
    start: [eventDateM.format('YYYY'), eventDateM.format('MM'), eventDateM.format('D')],
    duration: { hours: 24},
    attendees: [
      { name: personTwo, email: 'weeksjasons@gmail.com', rsvp: true },
    ]
  }

  // let kitchenEvent = {
  //   title: 'kitchen ' + remainingPeople.pop(),
  //   description: 'Nightly thing I do',
  //   start: [eventDateM.format('YYYY'), eventDateM.format('MM'), eventDateM.format('D')],
  //   duration: { hours: 24},
  //   attendees: [
  //     { name: remainingPeople.pop(), email: 'weeksjasons@gmail.com', rsvp: true },
  //   ]
  // }

  eventArray.push(trashEvent, kitchenEvent)

}

let trash = moment().recur({
    start: moment(),
    end: moment().add(1 , 'y')
}).every(1, "days");

let trashArray = trash.all("L");

for (var i = 0; i < trashArray.length; i++) {
  //go through every trash day
  if (changeOwnerArray.includes(trashArray[i])) {
    count += 1
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
