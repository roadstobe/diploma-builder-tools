export default function searchFilter (arr= [], value = '') {
  if(!value.trim()){
    return arr
  }

  return arr.filter(ch => ch.name.toLowerCase().trim().includes(value.toLowerCase().trim()));
}
