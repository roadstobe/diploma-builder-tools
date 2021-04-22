export default function timeFilter (value) {
  const dtf = new Intl.DateTimeFormat('uk-UK', { timezome: 'UTC' })
  return dtf.format(new Date(value))
}
