import { State, Actions, ActionTypes } from './calculator-types'

export const calculatorInitState = {
  result: 0, // total
  number: '0', // current entry
  operator: '', // current operator
  display: '0', // what is currently displayed
}

export function reducer(state: State, action: Actions) {
  switch (action.type) {
    case ActionTypes.Clear:
      return {
        ...calculatorInitState,
      }
    case ActionTypes.Number: {
      // handle case where 0 is showing and user clicks 0
      if (action.payload === '0' && state.display === '0') return state

      // handle case where 0 is showing and user clicks a number
      if (state.number === '0') {
        return { ...state, number: action.payload, display: action.payload }
      }

      // if there is an operator, clear it and show new number only
      if (state.operator !== '') {
        return {
          ...state,
          number: state.number + action.payload,
          display: action.payload,
          operator: '',
        }
      }

      return {
        ...state,
        number: state.number + action.payload,
        display: state.display + action.payload,
        operator: '',
      }
    }
    case ActionTypes.Operator: {
      // handle operators clicked back to back
      if (state.operator !== '') return state

      // When an operator is clicked, and there is previous input, display the result
      // We save the operator so the number case can tell if the display should show the result or not
      const number = (state.number += action.payload)
      let display = state.display

      // remove the operator and evaluate the result for the display
      display = eval(number.slice(0, -1))

      return {
        ...state,
        number,
        display,
        operator: action.payload,
      }
    }
    case ActionTypes.Equals:
      if (state.number === '0') return state // handle divide by 0
      return {
        ...state,
        number: eval(state.number),
        display: eval(state.number),
        operator: action.payload,
      }
    default:
      console.warn(`ACTION ${action.type} was not found`)
      return state
  }
}
