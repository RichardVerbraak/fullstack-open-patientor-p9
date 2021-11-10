import React, { createContext, useContext, useReducer } from 'react'
import { Patient } from '../types'

import { Action } from './reducer'

// State is defined as an object holding a patients object, which holds a dictionary as in an object with a string id as a key and Patient object as value
// Defining state like this means you won't misuse the state since it will now conform to only these types
export type State = {
	patients: { [id: string]: Patient }
}

// InitialState that will conform to the defined state
const initialState: State = {
	patients: {},
}

// createContext which comes with a Provider component which takes in a value of the State and Dispatch actions
// createContext (.Provider component) returns the state to all of it's consumers
// Here it takes a default value of InitialState
export const StateContext = createContext<[State, React.Dispatch<Action>]>([
	initialState,
	() => initialState,
])

// Define what type the reducer and children are
// Children just being the React Elements (the ones that will have access to the state)
type StateProviderProps = {
	reducer: React.Reducer<State, Action>
	children: React.ReactElement
}

// React FC = React Functional Component
// StateProvider returns a ReactFC with props (props conforming to the above type)
export const StateProvider: React.FC<StateProviderProps> = ({
	reducer,
	children,
}: StateProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState)

	return (
		<StateContext.Provider value={[state, dispatch]}>
			{children}
		</StateContext.Provider>
	)
}
export const useStateValue = () => useContext(StateContext)
