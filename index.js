const express = require('express');
const path = require('path');
const pug = require('pug');

const PORT = process.env.PORT || 3000;

let currentMonth;
let currentYear;
const dayNames = ['Sunday','Monday','Tuesday', 'Wednesday', 'Thursday','Friday','Saturday'];
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const app = express();
app.set('view engine', 'pug');
app.use(express.static('assets'));

function getCalendarRows(month, year) {
  const daysInMonth = 32 - new Date(year, month, 32).getDate();
  //console.log('days in month: ' + daysInMonth);
  const firstDay = new Date(year, month, 1).getDay();
  //console.log('first day of month: ' + dayNames[firstDay]);
  const firstWeekDays = 7 - firstDay;
  //console.log('first week days: ' + firstWeekDays);
  const remainingDays = daysInMonth - firstWeekDays;
  //console.log('remaining days: ' + remainingDays);
  const rowsNeeded = Math.ceil(remainingDays / 7) ;
  //console.log('rows needed: ' + rowsNeeded);

  const emptyCols = ['','','','','','',''];
  const rows = [];
  for(let i =0;i<5;i++) {
    rows[i] = emptyCols;
  }

  // populate 1st week
  let cols = emptyCols;
  let x = 1;
  for(let j = firstDay; j< 7;j++) {
    cols[j] = x++;
  }
  rows[0] = cols;

  // populate the remaining rows
  for(let i = 1; i <= rowsNeeded;i++) {
    const temp = [];
    for(let j = 0;j < 7; j++) {
      const dt = firstWeekDays + ((i -1) * 7) + (j + 1) ;
      if(dt <= daysInMonth) {
        temp[j] =   dt;  
      } else {
        temp[j] = '';
      }
    }
    rows[i] = temp;
  }

  return rows;
}

function getMarkup(currentMonth, currentYear) {
  const rows = getCalendarRows(currentMonth, currentYear)
  const template = pug.compileFile('views/calendar.pug');
  const monthYear = `${monthNames[currentMonth]} - ${currentYear}`;
  const markup = template({ dayNames, rows, currentMonth, monthYear, currentYear });
  return markup;
}

app.get('/', (req, res) => {
  const today = new Date();
  currentMonth = today.getMonth();
  currentYear = today.getFullYear();
  const rows = getCalendarRows(currentMonth, currentYear)
  const monthYear = `${monthNames[currentMonth]} - ${currentYear}`;
  res.render('index', { dayNames, rows, currentMonth, monthYear, currentYear });
});

app.get('/next', (req,res) => {
  currentMonth += 1;
  if(currentMonth > 11 ) {
    currentMonth = 0;
    currentYear += 1;
  }
  const markup = getMarkup(currentMonth, currentYear);
  res.send(markup);
});

app.get('/previous', (req,res) => {
  currentMonth -= 1;
  if(currentMonth < 0 ) {
    currentMonth = 11;
    currentYear -= 1;
  }
  const markup = getMarkup(currentMonth, currentYear);
  res.send(markup);
});


app.get('/today', (req,res) => {
  const today = new Date();
  currentMonth = today.getMonth();
  currentYear = today.getFullYear();
  const markup = getMarkup(currentMonth, currentYear);
  res.send(markup);
});

app.get('/modal', (req, res) => {
  const template = pug.compileFile('views/modal.pug');
  const monthYear = `${monthNames[currentMonth]} - ${currentYear}`;
  const markup = template({  });
  res.send(markup);
});


app.listen(PORT);
console.log('Listening on port: ' + PORT);
