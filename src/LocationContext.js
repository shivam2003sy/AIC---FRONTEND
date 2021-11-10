import React, {createContext, useContext} from 'react';
import {usePosition} from 'use-position';

const initialState = {
    latitude: '',
    longitude: '',
    error: '',
    accuracy: '',
    timestamp: ''

}
const UserLocationContext = createContext({
    initialState
});


const UserLocationProvider = ({children}) => {
    const values = useLocation();
    return (
        <UserLocationContext.Provider value={values}>{children}</UserLocationContext.Provider>
    );
};

const useUserLocationContext = () => {
    return useContext(UserLocationContext);
};

const useLocation = () => {


    const watch = true;
    const {
        latitude,
        longitude,
        timestamp,
        accuracy,
        error,
    } = usePosition(watch);

    return (
        {
            latitude,
            longitude,
            timestamp,
            accuracy,
            error,
        }
    )
}

export {UserLocationProvider, useUserLocationContext};
