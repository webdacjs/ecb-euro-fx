function getSubject (envelope) {
  const subjectArray = envelope['gesmes:subject']
  return Array.isArray(subjectArray) ? subjectArray[0] : 'Reference rates'
}

function getSender (envelope) {
  const senderArray = envelope['gesmes:Sender']
  return Array.isArray(senderArray) ? senderArray[0]['gesmes:name'][0] : 'ECB'
}

function getRatesBySymbol (rateArray) {
  const ratesBySymbol = {}
  rateArray.forEach(thisCurrency => {
    ratesBySymbol[thisCurrency.currency] = parseFloat(thisCurrency.rate)
  })
  return ratesBySymbol
}

module.exports = function (parsedXMl, cache) {
  const envelope = parsedXMl['gesmes:Envelope']
  const basecube = (envelope.Cube[0] || {Cube: []}).Cube[0]
  const rates = basecube.Cube.map(r => r['$'])
  const time = basecube['$']['time']
  const fxObj = {
    subject: getSubject(envelope),
    sender: getSender(envelope),
    time,
    rates,
    ratesBySymbol: getRatesBySymbol(rates)
  }
  cache.set(time, fxObj)
  return fxObj
}
