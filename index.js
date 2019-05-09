const {fetch} = require('simple-fetch-cache')
const cache = require('simple-map-cache')
const ch = require('console-hue')
const {promisify} = require('util')
const xml = require('xml2js')
const parseXml = promisify(xml.parseString)

const getToday = require('./getToday')
const convertXMLtoObject = require('./ecbXmlToObject')

const ttl = 1800000 // 20min fetch cache
const ecbFxUrl = 'http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml'

function fetchLiveFx () {
  return fetch(ecbFxUrl, ttl)
    .then(response => parseXml(String(response.reply)))
    .then(parsedXML => convertXMLtoObject(parsedXML, cache))
    .catch(err => { ch.error(err) })
}

module.exports = function () {
  const cached = cache.get(getToday())
  return cached ? Promise.resolve(cached) : fetchLiveFx()
}
