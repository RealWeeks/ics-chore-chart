const { writeFileSync } = require('fs')
const ics = require('ics')
const moment = require('moment');
require('moment-recur');


let eventArray = [];

let changeOwnership = moment().recur({
    start: moment(),
    end: moment().add(1 , 'y')
}).every(7, "days");


let changeOwnerArray = changeOwnership.all("L");
// Outputs: ["01/01/2014", "01/03/2014", "01/05/2014", "01/07/2014"]

let count = 0

const handleEventCreate = (eventDate) =>{

  let people = [
    {name: 'Matt', email:'matthew.g.sommers@gmail.com'},
    {name: 'Eric', email:'ehessenbruch@gmail.com'},
    {name: 'Jason', email:'weeksjasons@gmail.com' },
    {name: 'Adam', email:'akadane87@gmail.com'},
   ]

  let personOnDuty = people[count] || people[0]

  let remainingPeople = people.filter(x => x !== personOnDuty)

  if (count === 4) {
    let lastPerson = people.pop()
    people.unshift(lastPerson)
    count = 0
  }

  eventDateM = moment(eventDate)

  let trashEvent = {
    title: 'Trash: ' + personOnDuty.name,
    description: 'Takeout all trashes',
    start: [eventDateM.format('YYYY'), eventDateM.format('MM'), eventDateM.format('D')],
    duration: { hours: 24},
    attendees: [
      { name: personOnDuty.name, email: personOnDuty.email, rsvp: true },
    ]
  }

  let personTwo = remainingPeople[count -1] || people[people.length -1]

  let kitchenEvent = {
    title: 'Kitchen: ' + personTwo.name,
    description: 'Clean kitchen',
    start: [eventDateM.format('YYYY'), eventDateM.format('MM'), eventDateM.format('D')],
    duration: { hours: 24},
    attendees: [
      { name: personTwo.name, email: personTwo.email, rsvp: true },
    ]
  }

  let personThree = remainingPeople[count -2] || people[people.length -2]

  let mailEvent = {
    title: 'Mail: ' + personThree.name,
    description: 'Get mail',
    start: [eventDateM.format('YYYY'), eventDateM.format('MM'), eventDateM.format('D')],
    duration: { hours: 24},
    attendees: [
      { name: personThree.name, email: personThree.email, rsvp: true },
    ]
  }

  let personFour = remainingPeople.filter(x => x !== personTwo).filter(x => x !== personThree)

  let generalEvent = {
    title: 'General: ' + personFour[0].name,
    description: '',
    start: [eventDateM.format('YYYY'), eventDateM.format('MM'), eventDateM.format('D')],
    duration: { hours: 24},
    attendees: [
      { name: personFour[0].name, email: personFour[0].email, rsvp: true },
    ]
  }

  let dayToNum = eventDateM.day()
  if (dayToNum === 1) {
    [trashEvent, kitchenEvent, mailEvent, generalEvent]
      .every(x => x.alarms = [{ action: 'display', trigger: { hours: 8, minutes: 30, before: false }}])
  }else{
    [trashEvent, kitchenEvent, mailEvent, generalEvent].every(x => delete x.alarms)
  }
  eventArray.push(trashEvent, kitchenEvent, mailEvent, generalEvent)

}

let someTime = moment().recur({
    start: moment(),
    end: moment().add(3 , 'month')
}).every(1, "days");

let fewMonths = someTime.all("L");

for (var i = 0; i < fewMonths.length; i++) {
  if (changeOwnerArray.includes(fewMonths[i])) {
    count += 1
    handleEventCreate(fewMonths[i])
  }else{
    handleEventCreate(fewMonths[i])
  }

}

const callback = (err, value) =>{
  if (err) {
    console.log(err)
  }else{
    writeFileSync(`${__dirname}/event.ics`, value)
  }
}

console.log(ics.createEvents(eventArray))

ics.createEvents(eventArray,callback)
