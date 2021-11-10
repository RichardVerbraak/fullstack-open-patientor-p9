import React from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { Button, Divider, Header, Container } from 'semantic-ui-react'

import { apiBaseUrl } from './constants'
import { useStateValue } from './state'
import { Patient } from './types'

import PatientListPage from './PatientListPage'

const App = () => {
	// Only using dispatch here
	const [, dispatch] = useStateValue()

	React.useEffect(() => {
		void axios.get<void>(`${apiBaseUrl}/ping`)

		const fetchPatientList = async () => {
			try {
				// Type Parameter for the axios.get function which tells us we expect to receive an Array of Patient objects
				// !!! This is not the same as validating data, this merely says this is what the data is supposed to look like
				// but this does not mean this is validated
				// To validate you could either take they entire payload and then return the correct types or use a type guard or use a library like io-ts
				const { data: patientListFromApi } = await axios.get<Patient[]>(
					`${apiBaseUrl}/patients`
				)

				dispatch({ type: 'SET_PATIENT_LIST', payload: patientListFromApi })
			} catch (e) {
				console.error(e)
			}
		}
		void fetchPatientList()
	}, [dispatch])

	return (
		<div className='App'>
			<Router>
				<Container>
					<Header as='h1'>Patientor</Header>
					<Button as={Link} to='/' primary>
						Home
					</Button>
					<Divider hidden />
					<Switch>
						<Route path='/'>
							<PatientListPage />
						</Route>
					</Switch>
				</Container>
			</Router>
		</div>
	)
}

export default App
