import React from 'react';
import './App.css';
import Weather from './components/weather'
import Navbar from './components/navbar'
import {  MDBContainer, MDBRow, MDBCol, } from 'mdbreact'
import Events from './components/events'
import Form from './components/form'
// import { FaSatelliteDish } from 'react-icons/fa';

function App() {

  const [state, setState] = React.useState({
    events: [
    {
      id: 1,
      time: '12:30',
      title: 'Breakfast',
      description: 'Eating my backfrast by 10pm',
      location: 'Fate road, ilorin, kwara state.'
    },

    {
      id: 2,
      time: '10:30',
      title: 'Sleep',
      description: 'I am sleeping very soon',
      location: 'Behinf rhema chappel'
    },

    {
      id: 3,
      time: '4:30',
      title: 'Football',
      description: 'Play football at ori oke field',
      location: 'Ori oke primary school, ilorin'
    }, 
  ],

  modalIsOpen: false,
  }
  )

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

    const newArray = [] ;
    newArray.push(...state.events, {id, time, title, description, location}) ;
    setState({events: newArray})
  }

  const handleDelete = id => {
    const newEvent =  state.events.filter(e => e.id !== id)
    setState(() => (
      {...state, events: newEvent}
    ))
  }

  const handleSubmit = (event) => {
    event.preventDefault() ;
    console.log("clicked!")
  }

  const handleSb = (event) => {
    event.preventDefault()

    console.log('submitted!')
}
  
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
            handleSubmit = {handleSubmit}
          />
            <Events 
              time = {state.time}
              title = {state.title}
              description = {state.description}
              location = {state.location}
              events = {events}
              handleAddBtn = {handleAddBtn}
              handleDelete = {handleDelete}
            />
          </MDBCol>

          <MDBCol>
            <Weather 
              handleLength = {events.length}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default App;
