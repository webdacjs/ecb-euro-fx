const {fetch} = require('simple-fetch-cache')
const ch = require('console-hue')
const {promisify} = require('util')
const xml = require('xml2js')
const parseXml = promisify(xml.parseString)

const ttl = 3600000 // 1h cache
const ecbFxUrl = 'http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml'
const convertXMLtoObject = require('./ecbXmlToObject')

module.exports = function () {
  return fetch(ecbFxUrl, ttl)
    .then(response => parseXml(String(response.reply)))
    .then(parsedXML => convertXMLtoObject(parsedXML))
    .catch(err => { ch.error(err) })
}
