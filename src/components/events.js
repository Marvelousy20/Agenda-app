import React from 'react'
import { MDBBadge } from 'mdbreact'
import { FaLocationArrow } from 'react-icons/fa'


function events({ events, handleAddBtn, handleDelete}) {
    
    return (
        <div>
            <h2 className = 'my-3'>Today</h2>
            {events.map((event) => (
                <div key = {event.id} className = 'mb-3'>
                <div className = 'media'>
                    <h3 className = 'h3-responsive font-weight-bold'>{event.time}</h3>
                    <div className = 'media-body ml-3'>
                        <h5>{event.title}</h5>
                        <MDBBadge
                         className = 'float-right' 
                         color = 'danger'
                         onClick = {() => handleDelete(event.id)}
                         style = {{marginTop: '-25px'}}>
                            -
                        </MDBBadge>
                        <hr className = 'hr-bold mt-2 mb-2' /> 
                        <div className = 'media'>
                            <FaLocationArrow color = "blue" />
                            <small className = "ml-2">{event.location}</small>
                        </div>
                    </div>
                </div>
                {event.description &&
                <div className = 'p-2 mb-4 mt-2 blue-grey lighten-5 blue-grey lighten-5'>
                    {event.description}
                </div>} 
                </div>
            ))}       
            
            <div className = 'justify-content-center text-center'>
                <button className = 'btn bg-primary text-white' onClick = {handleAddBtn}>
                    Add Event
                </button>
            </div>
        </div>
    )
}

export default events
