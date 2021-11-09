import React from 'react'

const Banner = () => {
    return (
        <div className = 'image-container d-flex justify-content-center align-items-center'>
            <div className = 'container'>
                <div className = 'row'>
                    <div className = 'col-lg-12  mx-auto'>
                        <h2 className = 'banner-title'>Welcome to AIC</h2>
                        <p className = 'banner-desc'> A platform to connect ambulance / car owners to paitent in  emergency and save lives of thousands,
                        connecting every possible corner of his world to reach healthcare fast.
                         </p>
                    </div>
                    <div className = 'col-lg-12 d-flex justify-content-center'>
                        <img 
                        src = {require('../../assets/images/A1.png')} 
                        alt = 'prevent-epidemic'
                        width = '100%'
                        height = '100%'/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;