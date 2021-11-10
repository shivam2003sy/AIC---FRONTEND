import React, {useEffect, useRef, useState} from "react";
import socketIOClient from 'socket.io-client'
import ReactMapGL, {Marker} from 'react-map-gl'
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./App.css";
import {Location} from "./components/Location";
import {Button, Card, ProgressBar} from 'react-bootstrap';
import {useUserLocationContext} from "./LocationContext";
const socket = socketIOClient("http://localhost:5000")

const User = () => {


    

    const userCoordinates = useUserLocationContext();


    const initialUserInfo = {
        addressPatient: "",
    }


    const initialViewport = {
        width: "75vw",
        height: "75vh",
        latitude: 25.436298,
        longitude: 78.567352,
        zoom: 10
    }


    const initialAmbulanceInfo = {
        ambulanceLocation: {},
        displayName: "",
        address: "",
    }

    const [userInfo, setUserInfo] = useState(initialUserInfo);
    const [ambulanceInfo, setAmbulanceInfo] = useState(initialAmbulanceInfo);
    const [viewport, setViewport] = useState(initialViewport);


    useEffect(() => {

        socket.on("request-sent", (data) => {
            setAmbulanceInfo({
                displayName: data.displayName,
                address: data.address,
                ambulanceLocation: {
                    latitude: data.ambulanceLocation.latitude,
                    longitude: data.ambulanceLocation.longitude
                }
            });
        })
    }, []);


    const requestforHelp = () => {
        const requestDetails = {
            patientId: "1",
            patientName: "Random",
            location: {
                addressPatient: userInfo.addressPatient,
                userLocation: {
                    longitude: userCoordinates.longitude,
                    latitude: userCoordinates.latitude
                },
            }
        }
        //Emitting the request event
        //@App 6+Component
        console.log("REQUEST DETAILS: ", requestDetails);
        socket.emit("request-for-help", requestDetails);
    }

//Map Integration
    const mapRef = useRef();

    const handleViewportChange = (newviewport) => {
        setViewport({...viewport, ...newviewport}
        )
    }


    const {displayName, address} = ambulanceInfo;
    console.log("lol");

    return (
        <div>

            <center><Location/></center>
            <div className="heading">
                {displayName && address ? (
                    <div>
                        <h3>{displayName} is on the way towards you from {address}</h3>
                        <ProgressBar variant="success" now={60}/>
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <div className="map">
                <Card>
                    <ReactMapGL
                        {...viewport}
                        ref={mapRef}
                        onViewportChange={handleViewportChange}
                        mapStyle="mapbox://styles/mapbox/navigation-preview-day-v2"
                        mapboxApiAccessToken="pk.eyJ1Ijoic2hpdmFtMjAwM3N5IiwiYSI6ImNrdm1semw0cTFoNGcybnRrMjlnazR2eHkifQ.dM2_j8n8x2xJ7UF9JfDtVw">


                        {Object.keys(ambulanceInfo.ambulanceLocation).length !== 0 ? (
                            <Marker
                                latitude={ambulanceInfo.ambulanceLocation.latitude}
                                longitude={ambulanceInfo.ambulanceLocation.longitude}
                            >
                                <img className="marker" alt='fun' src="ambulancemarker.png"/>
                            </Marker>
                        ) : (
                            <Marker
                                latitude={viewport.latitude}
                                longitude={viewport.longitude}
                            >
                                <img className="marker" alt='for fun' src="logo.png"/>
                            </Marker>
                        )}

                    </ReactMapGL>
                    <Card.Text>

                        If you not allowing your location, search your location in search box in above map and press
                        the
                        help needed button
                    </Card.Text>
                    <Button onClick={requestforHelp} variant="outline-success">Help needed</Button>{' '}

                </Card>

            </div>

        </div>
    );
}

export default User;
