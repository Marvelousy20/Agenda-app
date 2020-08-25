import React from 'react'
import { FiSun } from 'react-icons/fi'
import { FaLightbulb } from 'react-icons/fa'

function weather({handleLength, weather}) {
    let text = ''
    if(typeof weather.main !== 'undefined') {
        if(weather.weather[0].main === 'Clouds' || weather.weather[0].main === 'Rains') {
            text = "Don't forget to go with your unbrella today in case it rains today."
        }
        else if(weather.weather[0].main === 'Sunny') {
            text = "Dont't forget to out with your Sunglasses in case it's sunny today."
        }
    }
    return (
        <div>
            <h2 className = 'h3-responsive mt-3'>Schedule</h2>
            <h4>It is going to be a busy day today. You have {handleLength} events today.</h4>
            {typeof weather.main !== 'undefined' ?
                <>
                    <h3 className = 'h3-responsive mt-3'>
                        {weather.name}, {weather.sys.country}
                    </h3>
                    <FiSun style = {{width: '40px', height: '40px'}} className = 'mr-2 mt-2 mb-1' /><span>{weather.weather[0].main}</span> <br />
                    <FaLightbulb style = {{width: '40px', height: '40px'}} className = 'mr-2 mb-2'/> 
                    <span className = 'mb-2'>
                        {Math.round(weather.main.temp)} <i style ={{fontSize: '30px'}}>{'\u00b0'}</i>
                    </span>
                    <div  style = {{fontSize: '20px'}}>
                    {text}
                    </div>
                </> : null
            }
        </div>
    )
}

export default weather
