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

module.exports = function (parsedXMl) {
  const envelope = parsedXMl['gesmes:Envelope']
  const basecube = (envelope.Cube[0] || {Cube: []}).Cube[0]
  const rates = basecube.Cube.map(r => r['$'])
  return {
    subject: getSubject(envelope),
    sender: getSender(envelope),
    time: basecube['$']['time'],
    rates,
    ratesBySymbol: getRatesBySymbol(rates)
  }
}
