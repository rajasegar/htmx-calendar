const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3000;

  const dayNames = ['Sunday','Monday','Tuesday', 'Wednesday', 'Thursday','Friday','Saturday'];
const app = express();
app.set('view engine', 'pug');
app.use(express.static('assets'));

function getCalendarRows(month, year) {
  const daysInMonth = 32 - new Date(year, month, 32).getDate();
  console.log(daysInMonth);
  const firstDay = new Date(year, month, 1).getDay();
  console.log(dayNames[firstDay]);
  const firstWeekDays = 7 - firstDay;
  const remainingDays = daysInMonth - firstWeekDays;
  const rowsNeeded = remainingDays / 7 ;

  const emptyCols = ['','','','','','',''];
  const rows = [];
  for(let i =0;i<5;i++) {
    rows[i] = emptyCols;
  }

  // populate 1st week
  let cols = emptyCols;
  for(let j = firstDay; j< 7;j++) {
    cols[j] = j;
  }
  rows[0] = cols;

  // populate the remaining rows
  for(let i = 1; i< 5;i++) {
    const temp = [];
    for(let j = 0;j < 7; j++) {
      temp[j] = (i* firstWeekDays) + (j );
    }
    rows[i] = temp;
  }

  return rows;
}

app.get('/', (req, res) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  /*
  const daysInMonth = 32 - new Date(currentYear, currentMonth, 32).getDate();
  console.log(daysInMonth);
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  console.log(dayNames[firstDay]);
  const firstWeekDays = 7 - firstDay;
  const remainingDays = daysInMonth - firstWeekDays;
  const rowsNeeded = remainingDays / 7 ;

  const emptyCols = ['','','','','','',''];
  const rows = [];
  for(let i =0;i<5;i++) {
    rows[i] = emptyCols;
  }

  // populate 1st week
  let cols = emptyCols;
  for(let j = firstDay; j< 7;j++) {
    cols[j] = j;
  }
  rows[0] = cols;

  // populate the remaining rows
  for(let i = 1; i<= 4;i++) {
    const temp = [];
    for(let j = 0;j < 7; j++) {
      temp[j] = (i* firstWeekDays) + (j + 1);
    }
    rows[i] = temp;
  }
  */
  const rows = getCalendarRows(currentMonth, currentYear)

  res.render('index', { dayNames, rows });
});

app.listen(PORT);
console.log('Listening on port: ' + PORT);
