import React from 'react'
import moment from 'moment'

export function calculateDate(todo, wedding) {
  let dueDate = moment().add(1, 'y').subtract(todo.days_before_wedding, 'days')

  if(wedding !== undefined && wedding.date !== undefined) {
    dueDate = moment(wedding.date, 'MM/DD/YYYY').subtract(todo.days_before_wedding, 'days')
  }

  if(todo.date !== undefined && todo.date !== '' && todo.date !== null) {
    dueDate = moment(todo.date, 'MM/DD/YYYY')
  }

  return dueDate
}
