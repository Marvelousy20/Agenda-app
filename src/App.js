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
  }
  )
  const [country, setCountry] = React.useState('')

  const handleAddBtn = () => {
    setState((prevState) => {
      return {...state, modalIsOpen: !prevState.modalIsOpen}
    })
  }

  const handleClose = () => {
    setState(() => (
      {...state, modalIsOpen: !state.modalIsOpen}
    ))
  }

  const handleInputChange = inputName => e => {
    setState({...state,
      [inputName]: e.target.value
    });
  };

  const handleAddEvent = (event) => {
    
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

  const [weather, setWeather] = React.useState({})
  // const [query, setQuery] = React.useState('Nigeria')
    
  React.useEffect(() => {
    const myData = () => {
      window.navigator.geolocation.getCurrentPosition((res) => {
      const lat = res.coords.latitude
      const long = res.coords.longitude

      const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=7f7c3422b0244b43afc54f31c2ad23c9&language=en&pretty=1`
      
      const api = {
        key: "1f92e6337f4dd8d7396a77a9c3dac39f",
        base: "https://api.openweathermap.org/data/2.5/"
      }

      const fetchData = async () => {
        try {
          const response = await fetch(url)
          const {results} = await response.json()
          console.log(results)
          return setCountry(results[0].components.country)
        }
        catch(err) {
          console.log(err)
        }
      }
      fetchData()
      const query = 'nigeria'
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

  fetch('http://localhost:5000/agenda/').then(response => response.json())
  .then((responseData) => {
      console.log(responseData)
      setState({...state, events: responseData})
  })
  .catch(err => console.log(err))

  }, [])

  const { events } = state;
  
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
