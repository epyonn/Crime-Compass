// Import packages
import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../redux/actions';
import '../styles/CrimeMap.css';
import ReportForm from '../components/ReportForm';
import axios from 'axios';

const mapStyles = [
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
            { visibility: "off"}
        ],
        disableDoubleClickZoom: true,  // Add this line
        clickableIcons: false,

    }
];


const CrimeMap: React.FC = () => {
    const dispatch = useDispatch();
    const [markerPosition, setMarkerPosition] = useState<{ lat: number, lng: number } | null>(null);
    const [address, setAddress] = useState<string | null>(""); // String or null value, will be initialized to null when app starts
    const [map, setMap] = useState<google.maps.Map | null>(null);

    const [mapCenter, setMapCenter] = useState({ lat: 37.8044, lng: -122.2712 }); // Initial center
    const [locations, setLocations] = useState<{ lat: number, lng: number}[]>([]);

    const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

    const date = useSelector((state: any) => state.form.date);
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';



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

    // Fetch Locations
    // Use useEffect to fetch data when the component mounts.


    
  // Use useEffect to fetch data when the component mounts.
  useEffect(() => {
    if (isGoogleMapsLoaded) {
        // Define an async function to fetch locations from the server.
        const fetchLocations = async () => {
        try {
            // Make a GET request to the server to retrieve the collection.
            //const response = await axios.get('http://localhost:5038/todoappcollection');

            const response = await axios.get('https://obscure-scrubland-34656-8bc24b932b2d.herokuapp.com/todoappcollection')
            // Extract the location strings from the response data.
            const locationStrings = response.data.map((item: any) => item.location);

            // Initialize the geocoder object.
            const geocoder = new google.maps.Geocoder();
            // Iterate over each location string to geocode them.
            for (const locationString of locationStrings) {
            // Use the geocoder to convert the address to lat/lng coordinates.
            geocoder.geocode({ address: locationString }, (results, status) => {
                if (status === 'OK' && results?.[0]) {
                console.log('Geocoded String')
                // If geocoding is successful, get the location from the results.
                const { location } = results[0].geometry;
                // Update the locations state with the new coordinates.
                setLocations(prevLocations => [...prevLocations, { lat: location.lat(), lng: location.lng() }]);
                } else {
                // Log an error if geocoding was not successful.
                console.error('Geocode was not successful for the following reason:', status);
                }
            });
            }
        } catch (error) {
            // Log any errors that occur during the fetch.
            console.error("Error fetching locations:", error);
        }
        };

        fetchLocations();
    }
    // Call the function to fetch locations.
    
  }, [isGoogleMapsLoaded, date]);

    




    


    const handleMapClick = async (event: any) => {
        const latitude = event.latLng.lat();
        const longitude = event.latLng.lng();
        const newCenter = {lat: latitude, lng:longitude};
        setMapCenter(newCenter);
        setMarkerPosition({ lat: latitude, lng: longitude });

        map?.panTo(new google.maps.LatLng(latitude, longitude));
    
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
            <LoadScript googleMapsApiKey={apiKey} onLoad={() => setIsGoogleMapsLoaded(true)}>
                
                <GoogleMap
                    mapContainerClassName="crime-map-container"
                    center={mapCenter} // Default center (San Francisco)
                    zoom={13}
                    onClick={handleMapClick}
                    onLoad={map => setMap(map)}
                    options={{ 
                        styles: mapStyles, 
                        disableDoubleClickZoom: true,
                        mapTypeControl: false,
                        clickableIcons: false,
                    }}
                >
                    <ReportForm/>

                    {markerPosition && <Marker position={markerPosition} />}
                    {locations.map((location, index) => (
                        <Marker key={index} position={location} />
                    ))}
                </GoogleMap>
            </LoadScript>

        </div>
    )
}
export default CrimeMap;

//  
// Issues to fix after lunch. Fix how it looks in mobile. 
// Setup Database
// Check for anymore other errors when using. 
// Retype each line of code so you remember how to use it. 


// 11/06
// Google map markers completed. Database is setup. 
// Don't see apps on mobile device for some reason? 