import React from 'react'
import {useUserLocationContext} from "../LocationContext";


export function Location() {

    const {
        latitude,
        longitude,
        timestamp,
        accuracy,
        error,
    } = useUserLocationContext();

    return (
        <div>
            <code>
                <>your current location</>
                <br/>
                latitude: {latitude}<br/>
                longitude: {longitude}<br/>
                timestamp: {timestamp}<br/>
                accuracy: {accuracy && `${accuracy}m`}<br/>
                error: {error}
            </code>
        </div>
    )
}






