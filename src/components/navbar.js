import React from 'react'
import { MDBNavbar, MDBNavbarBrand} from 'mdbreact'

function navbar() {
    return (
        <div>
            <MDBNavbar color="indigo" dark>
                <MDBNavbarBrand>
                    <strong className="white-text">Agenda App</strong>
                </MDBNavbarBrand>
            </MDBNavbar>
        </div>
    )
}

export default navbar
