module.exports = function () {
  const currentDate = new Date()
  const offset = currentDate.getTimezoneOffset()
  const currentDateWTimeZone = new Date(currentDate.getTime() + (offset * 60 * 1000))
  return currentDateWTimeZone.toISOString().split('T')[0]
}
