import React, { Component } from "react";
import socketIOClient from 'socket.io-client'
import ReactMapGL, {Marker} from 'react-map-gl'
import Geocoder from 'react-map-gl-geocoder'
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./App.css";
import {Location} from "./components/Location";
import {Card,Button,ProgressBar} from 'react-bootstrap';

const socket =  socketIOClient("http://localhost:5000")

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName : "",
      address : "",
      addressPatient : "",
      viewport: {
        width : "75vw",
        height : "75vh",
        latitude: 25.436298,
        longitude: 78.567352,
        zoom : 10
      },
      userLocation : {},
      ambulanceLocation : {}
    }
  }




  
  componentDidMount() {
    socket.on("request-sent",(data) => {
      var setAmbulanceLocation = {
        latitude : data.ambulanceLocation.latitude,
        longitude : data.ambulanceLocation.longitude
      }
      
      this.setState ({
          displayName : data.displayName,
          address : data.address,
          ambulanceLocation : setAmbulanceLocation
      })
    })
  }

requestforHelp = () => {
  var requestDetails = {
      patientId : "1",
      patientName : "Random",
      location: {
        addressPatient: this.state.addressPatient,
        userLocation : this.state.userLocation
      }
  }
  //Emitting the request event
  //@App 6+Component
  socket.emit("request-for-help",requestDetails);
}

//Map Integration
mapRef = React.createRef()
 
  handleViewportChange = (viewport) => {
    this.setState({
      viewport: { ...this.state.viewport, ...viewport }
    })
  }

  handleGeocoderViewportChange = (viewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 }
    return this.handleViewportChange({
      ...viewport,
      ...geocoderDefaultOverrides
    })
  }

handleOnResult = (event) => {
  var patientLocation = {
    latitude : event.result.center[1],
    longitude : event.result.center[0]
  }
  this.setState({
    addressPatient : event.result.place_name,
    userLocation : patientLocation
  })
}



render() {
  const {displayName,address} = this.state;
console.log("lol");
 
  return (
    <div>
      
      <center><Location/></center>
      <div class="heading">
      {displayName && address ? (
        <div>
           <h3>{displayName} is on  the way towards you  from {address}</h3>
           <ProgressBar variant="success" now={40} />
        </div>
      ) : (
        <h3> </h3>
      )}
      </div>
      <div className = "map">
        <Card>
        <ReactMapGL
          {...this.state.viewport}
          ref={this.mapRef}
          onViewportChange = {viewport => this.setState({
            viewport
          })}
          
          mapStyle = "mapbox://styles/mapbox/navigation-preview-day-v2"
          mapboxApiAccessToken ="pk.eyJ1Ijoic2hpdmFtMjAwM3N5IiwiYSI6ImNrdm1semw0cTFoNGcybnRrMjlnazR2eHkifQ.dM2_j8n8x2xJ7UF9JfDtVw">
          

        <Geocoder
          mapRef={this.mapRef}
          onResult={this.handleOnResult}
          onViewportChange={this.handleGeocoderViewportChange}
          mapboxApiAccessToken="pk.eyJ1Ijoic2hpdmFtMjAwM3N5IiwiYSI6ImNrdm1semw0cTFoNGcybnRrMjlnazR2eHkifQ.dM2_j8n8x2xJ7UF9JfDtVw"
        />

            {Object.keys(this.state.ambulanceLocation).length !== 0 ? (
          <Marker
            latitude={this.state.ambulanceLocation.latitude}
            longitude={this.state.ambulanceLocation.longitude}
          >
            <img className="marker"alt='fun' src="ambulancemarker.png"></img>
          </Marker>
        ) : ( 
          <Marker
            latitude={this.state.viewport.latitude}
            longitude={this.state.viewport.longitude}
          >
            <img className="marker" alt='for fun'src="logo.png"></img>
          </Marker>
        )}

        </ReactMapGL>
        <Card.Text>

          If you not allowing your location, search your location in search box in above map and press the help needed button
    </Card.Text>
    <Button onClick={this.requestforHelp} variant="outline-success">Help needed</Button>{' '}

        </Card>

      </div>
      
       </div>
  );
}
}

export default User;