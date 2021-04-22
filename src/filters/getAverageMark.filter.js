export default function getAverageMarkFilter(value = []) {
  return (value.reduce((acc, i) =>{
    return acc += i.mark
  }, 0) / value.length).toFixed(1)
}
