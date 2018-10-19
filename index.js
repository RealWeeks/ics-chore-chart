// const { writeFileSync } = require('fs')
const fs = require('fs');
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

  eventDateM = moment( new Date (eventDate)).format('"MM-DD-YYYY"')

  let trashEvent = {
    title: 'Trash: ' + personOnDuty.name,
    allDay : true,
    // moment(new Date("27/04/2016")).format
    start: eventDateM
  }

  let personTwo = remainingPeople[count -1] || people[people.length -1]

  let kitchenEvent = {
    title: 'Kitchen: ' + personTwo.name,
    allDay : true,
    start: eventDateM
  }

  let personThree = remainingPeople[count -2] || people[people.length -2]

  let mailEvent = {
    title: 'Mail: ' + personThree.name,
    allDay : true,
    start: eventDateM
  }

  let personFour = remainingPeople.filter(x => x !== personTwo).filter(x => x !== personThree)

  let generalEvent = {
    title: 'General: ' + personFour[0].name,
    allDay : true,
    start: eventDateM
  }

  // let dayToNum = eventDateM.day()
  // if (dayToNum === 1) {
  //   [trashEvent, kitchenEvent, mailEvent, generalEvent]
  //     .every(x => x.alarms = [{ action: 'display', trigger: { hours: 8, minutes: 30, before: false }}])
  // }else{
  //   [trashEvent, kitchenEvent, mailEvent, generalEvent].every(x => delete x.alarms)
  // }
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

const callback = (err, data) =>{
  if (err) {
    console.log(err)
  }else{
    console.log(data)
  }
}

let json = JSON.stringify(eventArray);

// console.log(eventArray)

// fs.writeFile('chore-calendar.json', json, 'utf8', callback)

fs.writeFile ("chore-calendar.json", json, function(err) {
    if (err) throw err;
    console.log('complete');
    }
);
// fs.writeFile();
// console.log(json);

// ics.createEvents(eventArray,callback)
