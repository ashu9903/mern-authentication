const { isBefore, format, addDays, addMinutes } = require("date-fns");

let today = new Date();
console.log(today);
let x = format(today, "dd/LLLL/yyy/H:m:s:aaa");
let futureTime = addMinutes(new Date(), 5);
// let x = format(today, "dd/LLLL/yyyy");
// let fd = addDays(today, 2);
// console.log(format(fd, "dd/MM/Y"));
console.log(x);
console.log(format(futureTime, "dd/LLLL/yyy/H:m:s:aaa"));
