// Import packages
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useDispatch } from 'react-redux';
import { setLocation } from '../redux/actions';
import '../styles/CrimeMap.css'
import ReportForm from '../components/ReportForm'

const center = {
    lat: 37.8044,
    lng: -122.271
}

const mapStyles = [
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
            { visibility: "off"}
        ],
        disableDoubleClickZoom: true,  // Add this line

    }
];


const CrimeMap: React.FC = () => {
    const dispatch = useDispatch();
    const [markerPosition, setMarkerPosition] = useState<{ lat: number, lng: number } | null>(null);
    const [address, setAddress] = useState<string | null>(""); // String or null value, will be initialized to null when app starts

    const geocodeLatLng = async (lat: number, lng: number) => {
        const geocoder = new google.maps.Geocoder();
        const latlng = { lat, lng };
        return new Promise<string>((resolve, reject) => {
            geocoder.geocode({ location: latlng }, (results, status) => {
                if (status === "OK") {
                    if (results && results[0]) {
                        resolve(results[0].formatted_address);
                    } else {
                        reject("No results found");
                    }
                } else {
                    reject("Geocoder failed due to: " + status);
                }
            });
        });
    };
    


    const handleMapClick = async (event: any) => {
        const latitude = event.latLng.lat();
        const longitude = event.latLng.lng();
        setMarkerPosition({ lat: latitude, lng: longitude });
    
        try {
            const fetchedAddress = await geocodeLatLng(latitude, longitude); // Using await here
            setAddress(fetchedAddress);
            dispatch(setLocation(fetchedAddress))

        } catch (error) {
            console.error("Error getting address:", error);
        }
    };
    

    return (
        <div className="crime-map-wrapper">
            <LoadScript googleMapsApiKey={'AIzaSyCLu25wqirs0pAPnvjvH4hV4Se7Kcpzmps'}>
                
                <GoogleMap
                    mapContainerClassName="crime-map-container"
                    center={{ lat: 37.8044, lng: -122.2712 }} // Default center (San Francisco)
                    zoom={13}
                    onClick={handleMapClick}
                    options={{ 
                        styles: mapStyles, 
                        disableDoubleClickZoom: true,
                        mapTypeControl: false,
                    }}
                >
                    <ReportForm/>
                    {markerPosition && <Marker position={markerPosition} />}
                </GoogleMap>
            </LoadScript>
            <div className="address-display">
                {address && <p>Selected Address: {address}</p>}
            </div>
        </div>
    )
}
export default CrimeMap;