import React from 'react'
import { MDBBadge } from 'mdbreact'
import { FaLocationArrow } from 'react-icons/fa'
import moment from 'moment'


function events({ events, handleAddBtn, handleDelete, }) {
    const dateHandler = (d = new Date()) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] ;
        const months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December']
    
        const day = days[d.getDay()] ;
        const date = d.getDate() ;
        const month = months[d.getMonth()]
        const year = d.getFullYear() ;
        
        return (`${day} ${date} ${month} ${year}`)
    }
    console.log(events)

    // const myDate = events.length > 1 ? new Date(createdAt).getHours() + ':' + new Date(createdAt).getMinutes() : 4 ;

    return (
        <div>
            <h2 className = 'my-3'>{dateHandler()}</h2>
            {events.length !== 'undefined' ? events.map((event) => (
                <div key = {event._id} className = 'mb-3'>
                    <div className = 'media'>
                        <h4 className = 'h4-responsive font-weight-bold'>
                            {moment(event.createdAt).format('LT')}
                        </h4>
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
            )) : null}       
            
            <div className = 'justify-content-center text-center'>
                <button className = 'btn bg-primary text-white' onClick = {handleAddBtn}>
                    Add Event
                </button>
            </div>
        </div>
    )
}

export default events
