import moment from 'moment';

export default function spentTimeFilter (value= []) {
  let date = '';
  const finish = moment(new Date(value[0]));
  const start = new Date(value[1]);
  const duration = moment.duration(finish.diff(start));
  if(!duration._isValid) {
    return  'Sorry. Invalid date'
  }

  if(duration._data.years >= 1){
    date += duration._data.years + ' y, ';
  }if(duration._data.months >= 1){
    date += duration._data.months + ' m, ';
  }
  if(duration._data.days >= 1){
    date += duration._data.days + ' days, ';
  }
  if(duration._data.hours >= 1){
    date += duration._data.hours + ' h : ' + duration._data.minutes + ' m';
  }else if(duration._data.minutes >= 1){
    date += duration._data.minutes + ' m : ' + duration._data.seconds + ' s';
  }else if(duration._data.seconds >= 1){
    date += duration._data.seconds + ' seconds';
  }

  return date
}
