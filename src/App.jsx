/* eslint-disable react/prop-types */
import { useReducer } from 'react'
import Button from '@components/Button/Button'
import './App.css'

function App() {
  const initState = {
    result: 0, // total
    number: '0', // current entry
    operator: '', // current operator
    display: '0', // what is currently displayed
  }

  const ACTIONS = {
    CLEAR: 'CLEAR',
    NUMBER: 'NUMBER',
    OPERATOR: 'OPERATOR',
    EQUALS: 'EQUALS',
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case ACTIONS.CLEAR:
        return {
          ...initState,
        }
      case ACTIONS.NUMBER: {
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
      case ACTIONS.OPERATOR: {
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
      case ACTIONS.EQUALS:
        if (state.number === 0) return state // handle divide by 0
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

  const [state, dispatch] = useReducer(reducer, initState)

  const handleClearClick = () => {
    dispatch({ type: ACTIONS.CLEAR })
  }

  const handleKeyboardButton = (value) => {
    // handle numbers
    if ([...Array(10).keys()].includes(Number(value))) {
      dispatch({ type: ACTIONS.NUMBER, payload: value })
      return
    }

    // handle operators
    handleOperator(value)
  }

  const handleOperator = (value) => {
    if (value === '%') {
      dispatch({ type: ACTIONS.OPERATOR, payload: '/' })
      return
    }
    if (value === '=') {
      dispatch({ type: ACTIONS.EQUALS, payload: value })
      return
    }

    dispatch({ type: ACTIONS.OPERATOR, payload: value })
  }

  return (
    <div className="main">
      <section className="display">
        <h6>{state.number !== '0' && state.number}</h6>
        <h3>{state.display}</h3>
      </section>

      <section className="keypad">
        <Button
          label="Clear"
          style={{ gridColumn: 'span 3' }}
          onClick={handleClearClick}
        />
        <Button label="%" highlight onClick={handleKeyboardButton} />

        <Button label="7" onClick={handleKeyboardButton} />
        <Button label="8" onClick={handleKeyboardButton} />
        <Button label="9" onClick={handleKeyboardButton} />
        <Button label="*" highlight onClick={handleKeyboardButton} />

        <Button label="4" onClick={handleKeyboardButton} />
        <Button label="5" onClick={handleKeyboardButton} />
        <Button label="6" onClick={handleKeyboardButton} />
        <Button label="-" highlight onClick={handleKeyboardButton} />

        <Button label="1" onClick={handleKeyboardButton} />
        <Button label="2" onClick={handleKeyboardButton} />
        <Button label="3" onClick={handleKeyboardButton} />
        <Button label="+" highlight onClick={handleKeyboardButton} />

        <Button
          label="0"
          style={{ gridColumn: 'span 3' }}
          onClick={handleKeyboardButton}
        />
        <Button label="=" highlight onClick={handleKeyboardButton} />
      </section>
    </div>
  )
}

export default App
