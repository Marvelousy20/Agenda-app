import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { MDBInput } from 'mdbreact'

function form({handleShow, handleClose, handleAddEvent, handleInputChange, handleSubmit}) {
    return (
    <Modal show = {handleShow}  onHide={handleClose}>
      <form className="mx-3 grey-text" onSubmit = {handleAddEvent}>
        <Modal.Header closeButton>
            <Modal.Title>Add new event</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <MDBInput
              name="time"
              label="Time"
              icon="clock"
              hint="12:30"
              group
              type="text"
              id="materialFormRegisterNameEx"
              onChange = {handleInputChange('time')}
              id="materialFormRegisterNameEx"
              className = 'was-validated'
              required
              // outline
            />
            <MDBInput
              name="title"
              label="Title"
              icon="edit"
              hint="Briefing"
              group
              type="text"
              onChange = {handleInputChange('title')}
              id="materialFormRegisterNameEx2"
              className = ' was-validated'
              required
            />
            <MDBInput
              name="location"
              label="Location (optional)"
              icon="map"
              group
              type="text"
              onChange = {handleInputChange('location')}
              id="materialFormRegisterNameEx"
            />
            <MDBInput
              name="description"
              label="Description (optional)"
              icon="sticky-note"
              group
              type="textarea"
              onChange = {handleInputChange('description')}
              id="materialFormRegisterNameEx4"
            />
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick = {handleClose}>Close</Button>
            <Button className = 'btn' variant="primary" type = "submit">Add</Button>
        </Modal.Footer>
      </form> 
    </Modal>
    )
}

export default form
