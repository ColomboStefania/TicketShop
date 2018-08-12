

export const convert = date => { if (date.toISOString().split('T')[1].split('.')[0] === '22:00:00'
  ) {
    const [day, time] = date.toISOString().split('T')
    const newDay = day.split('-').map((e, i) => (i === 2 ? parseInt(e, 10) + 1 : e)).join('-')

    const newDate = [newDay, time].join('T')

    return newDate
  } else {
    return date.toISOString()
  }
}

