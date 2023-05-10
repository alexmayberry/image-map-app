import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl'; 

interface MapProps {

    center: number[];
    zoom: number;
};

const Map: React.FC<MapProps> = ({ center, zoom }) => {
    return <p>{`${center}, ${zoom}`}</p>
}

export default Map;