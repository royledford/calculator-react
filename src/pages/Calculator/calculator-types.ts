export interface State {
  result: number
  number: string
  operator: string
  display: string
}

type ClearAction = { type: 'CLEAR' }
type NumberAction = { type: 'NUMBER'; payload: string }
type OperatorAction = { type: 'OPERATOR'; payload: string }
type EqualsAction = { type: 'EQUALS'; payload: string }
export type Actions = ClearAction | NumberAction | OperatorAction | EqualsAction

export enum ActionTypes {
  Clear = 'CLEAR',
  Number = 'NUMBER',
  Operator = 'OPERATOR',
  Equals = 'EQUALS',
}
