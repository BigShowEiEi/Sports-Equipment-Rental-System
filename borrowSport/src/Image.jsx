import React from 'react';
import Ball from './Images/Ball.jpg'
import BasketBall from './Images/220px-Basketball.jpeg'
import TennisBall from './Images/Tennis.jpg'
import Bat from './Images/Bat.jpg'
import GolfBall from './Images/Golf.jpg'
import Pingpong from './Images/PingPong.png'
import VolleBall from './Images/Volle.jpg'

export const imageBall = () => {
    return <img style={{ width: "220px", height: "200px", objectFit: "cover"  }}  src={Ball} alt="Ball" />;
};

export const imageBas = () => {
    return <img style={{ width: "220px", height: "200px", objectFit: "cover"  }} src={BasketBall} alt="BasketBall" />;
};

export const imageBat = () => {
    return <img style={{ width: "220px", height: "200px", objectFit: "cover"  }} src={Bat} alt="Bat" />;
};

export const imageTennis = () => {
    return <img style={{ width: "220px", height: "200px", objectFit: "cover"  }} src={TennisBall} alt="TennisBall" />;
};

export const imageGolf = () => {
    return <img style={{ width: "220px", height: "200px", objectFit: "cover"  }} src={GolfBall} alt="GolfBall" />;
};

export const imagePingpong = () => {
    return <img style={{ width: "220px", height: "200px", objectFit: "cover"  }} src={Pingpong} alt="Pingpong" />;
};

export const imageVolle = () => {
    return <img style={{ width: "220px", height: "200px", objectFit: "cover"  }} src={VolleBall} alt="VolleBall" />;
};
