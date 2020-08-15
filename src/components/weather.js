import React from 'react'
import { FiSun } from 'react-icons/fi'
import { FaLightbulb } from 'react-icons/fa'

function weather({handleLength}) {
    return (
        <div>
            <h2 className = "h2-responsive mt-3">Schedule</h2>
            <h4>It is going to be a busy day today. You have {handleLength} events today.</h4>
            <FiSun style = {{width: '40px', height: '40px'}} className = 'mr-2 mt-2 mb-1' /> <span>Sunny</span> <br />
            <FaLightbulb style = {{width: '40px', height: '40px'}} className = 'mr-2 mb-2'/> <span>23 degrees</span>
            <div>
                Don't forget to go with your sunglasses in case it's sunmy today.
            </div>
        </div>
    )
}

export default weather
