import moment from 'moment';

export default function spentTimeFilter (value= []) {
  const finish = moment(new Date(value[0]));
  const start = new Date(value[1]);
  const duration = moment.duration(finish.diff(start));
  if(!duration._isValid) {
    return  'Sorry. Invalid date'
  }

  return duration.asHours().toFixed(1)
}
