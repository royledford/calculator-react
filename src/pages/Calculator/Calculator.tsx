import { useReducer } from 'react'
import { State, Actions, ActionTypes } from './calculator-types'
import { calculatorInitState, reducer } from './calculator-utils'
import Button from '@components/Button/Button'

export default function Calculator() {
  const [state, dispatch] = useReducer(reducer, calculatorInitState)

  const handleClearClick = () => {
    dispatch({ type: ActionTypes.Clear })
  }

  const handleKeyboardButton = (value: string) => {
    // handle numbers
    if ([...Array(10).keys()].includes(Number(value))) {
      dispatch({ type: ActionTypes.Number, payload: value })
      return
    }

    // handle operators
    handleOperator(value)
  }

  const handleOperator = (value: string) => {
    if (value === '%') {
      dispatch({ type: ActionTypes.Operator, payload: '/' })
      return
    }
    if (value === '=') {
      dispatch({ type: ActionTypes.Equals, payload: value })
      return
    }

    dispatch({ type: ActionTypes.Operator, payload: value })
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
