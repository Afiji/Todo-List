const date = new Date()
const day = new Date().getDate()
const month = date.getMonth() + 1
const year = date.getFullYear()
const hours = date.getHours()
const minutes = date.getMinutes()
const seconds = date.getSeconds()

// console.log(`day: ${day},month: ${month},year:${year}, ${hours}:${minutes}:${seconds}`);
// console.log(new Date());
const generateZeroToDate = (time) => {
    return time < 10 ? '0' + time : time
}
const newMinutes = generateZeroToDate(minutes)
const newSeconds = generateZeroToDate(seconds)
const newDays = generateZeroToDate(day)

const currentDate = `Date: ${newDays}-${month}-${year} ${hours}:${newMinutes}:${newSeconds}`
// console.log(currentDate);

console.log(new Date().toISOString())