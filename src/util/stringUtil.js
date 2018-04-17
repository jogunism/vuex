export function capitalizeFirstLetter (s) {
  if (!s) {
    return ''
  }
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function makeDotString (s, n) {
  if (s.length > n) {
    return s.substring(0, n) + '...'
  }
  return s
}

export function mallName (id) {
  let text = ''
  switch (id) {
    case 'dokhan': text = '독일직구(독한)'
      break
    case 'doichi': text = '도이치몰'
      break
    case 'hieuro': text = '하이유로'
      break
    case 'euromoms': text = '유로맘스'
      break
    case 'euroexpress': text = '유로익스프레스'
      break
  }
  return text
}
