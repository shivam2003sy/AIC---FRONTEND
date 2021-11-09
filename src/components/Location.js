import React from 'react'
import { usePosition } from 'use-position';


export function Location() {

    const watch = true;
    const {
        latitude,
        longitude,
        timestamp,
        accuracy,
        error,
  } = usePosition(watch);
    return (
        <div>
            <code>
                <>your current location</><br/>
      latitude: {latitude}<br/>
      longitude: {longitude}<br/>
      timestamp: {timestamp}<br/>
      accuracy: {accuracy && `${accuracy}m`}<br/>
      error: {error}
    </code>
        </div>
    )
}






