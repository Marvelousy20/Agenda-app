import React from 'react';
import './App.css';
import Weather from './components/weather'
import Navbar from './components/navbar'
import {  MDBContainer, MDBRow, MDBCol, } from 'mdbreact'
import Events from './components/events'
import Form from './components/form'

function App() {

  const [state, setState] = React.useState({
    events: [],
    modalIsOpen: false,
  })

  const [country, setCountry] = React.useState('')

  // Controlled by the event components. Toggles the modal.
  const handleAddBtn = () => {
    setState((prevState) => {
      return {...state, modalIsOpen: !prevState.modalIsOpen}
    })
  }

  // Allows closing of the modal when clicking outside the screen i.e backdrop. 
  const handleClose = () => {
    setState(() => (
      {...state, modalIsOpen: !state.modalIsOpen}
    ))
  }

  // Takes the input field name as an argument.
  const handleInputChange = inputName => e => {
    setState({...state,
      [inputName]: e.target.value
    });
  };

  // Handles the addition of events into both the database and the state.
  const handleAddEvent = (event) => {
    // Do we have an event? if yes, new event = last event length + 1, if no event, the first event
    // should have an id of 1.
    const id = state.events.length ? state.events[state.events.length - 1].id + 1 : 1
    const time = state.time
    const title = state.title
    const description = state.description
    const location = state.location

    console.log(title,description,location)
    const sendData = (url, data) => {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
      }).then(response => response.json())
    }

    const postData = () => {
      sendData('http://localhost:5000/agenda/add/', {
        title: title,
        description: description,
        location: location
      })
    }

    postData()
    
    const newArray = [] ;
    newArray.push(...state.events, {id, time, title, description, location}) ;
    setState({events: newArray}) 

    event.preventDefault()
  }

  // deletes an event from the database and use the id provided by mongodb to
  // delete and event.
  const handleDelete = id => {
    fetch("http://localhost:5000/agenda/" + id, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(responseData => console.log(responseData))

    const newEvent = state.events.filter(e => e._id !== id)
    setState(() => (
      {...state, events: newEvent}
    ))
  }

  // Gets the weather and displays it depending a users country.
  const [weather, setWeather] = React.useState({})
  // const [query, setQuery] = React.useState('Nigeria')
  
  // This code runs immediately when the country changes. Country is my dependency.
  React.useEffect(() => {
    const myData = () => {
      // get latitude and longitude of the users current position.
      window.navigator.geolocation.getCurrentPosition((res) => {
      const lat = res.coords.latitude
      const long = res.coords.longitude

      // This services gives a specific country using lat and long.
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=7f7c3422b0244b43afc54f31c2ad23c9&language=en&pretty=1`
      
      const api = {
        key: "1f92e6337f4dd8d7396a77a9c3dac39f",
        base: "https://api.openweathermap.org/data/2.5/"
      }
      // Get the country of a specific user using the lat and long.
      const fetchData = async () => {
        try {
          const response = await fetch(url)
          const { results } = await response.json()
          setCountry(results[0].components.country)
        }
        catch(err) {
          console.log(err)
        }
      }
      fetchData()
      const query = country ;
      const weatherData = async () => {
        try {
          const weatherResponse = await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
          const data = await weatherResponse.json()
          console.log(data)
          return setWeather(data)
        }

        catch(err) {
          console.log(err)
        }
      }

      weatherData()
      
      }, () => {
        console.log('failed!')
      })  
    }
    myData()
  
    // checks and fetches any agenda in the database.
  fetch('http://localhost:5000/agenda/').then(response => response.json())
  .then((responseData) => {
      console.log(responseData)
      setState({...state, events: responseData})
  })
  .catch(err => console.log(err))

  }, [country])

  // Destructure events from state.
  const { events } = state;
  console.log(country)
  
  return (
    <>
      <Navbar />
      <MDBContainer className="App">
        <MDBRow>
          <MDBCol md = '9'>
          <Form 
            handleShow = {state.modalIsOpen}
            handleClose = {handleClose} 
            handleAddEvent = {handleAddEvent}
            handleInputChange = {handleInputChange}
          />
            <Events 
              events = {events}
              handleAddBtn = {handleAddBtn}
              handleDelete = {handleDelete}
              key = {state._id}
            />
          </MDBCol>

          <MDBCol>
            <Weather 
              handleLength = {events.length}
              weather = {weather}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default App;
