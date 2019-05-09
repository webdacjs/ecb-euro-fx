const sampleXMl = require('./testdata/parsedXMLSample.json')
const cache = require('simple-map-cache')
const convertXMLtoObject = require('./ecbXmlToObject')

test('Testing convertXMLtoObject', () => {
  const xmlObj = convertXMLtoObject(sampleXMl, cache)
  expect(xmlObj.subject).toBe('Reference rates')
  expect(xmlObj.sender).toBe('European Central Bank')
  expect(xmlObj.time).toBe('2019-05-08')
  expect(xmlObj.rates.length).toBe(32)
  expect(xmlObj.rates[0].currency).toBe('USD')
  expect(xmlObj.ratesBySymbol.USD).toBe(1.1202)
})
