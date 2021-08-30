import { useState } from 'react'
import ReactMapGl, {Marker, Popup} from 'react-map-gl'
import getCenter from 'geolib/es/getCenter'

function Map({searchResults}) {

    const [selectedLocation, setSelectedLocation] = useState({})

    //Transform the search results object into the {latitude: 123123, longitude: 12321}
    //object 
    const coordinates = searchResults.map(result=>({
        longitude: result.long,
        latitude: result.lat
    }))

    const center = getCenter(coordinates)
    
    const [viewPort, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    })

    return <ReactMapGl
    mapStyle="mapbox://styles/artizan7/ckstwywno1cnn18qmn2xa86kl"
    mapboxApiAccessToken={process.env.mapbox_key}
    {...viewPort}
    onViewportChange={(nextViewport)=> setViewport(nextViewport)}
    >
    {searchResults.map(result=>(
        <div key={result.long}>
            <Marker
                longitude={result.long}
                latitude={result.lat}
                offsetLeft={-20}
                offsetTop={-10}
                >
                    <p
                    role="img"
                    onClick={()=> setSelectedLocation(result)}
                    className="cursor-pointer text-2xl animate-bounce"
                    aria-label="push-pin"
                    >📌</p>
            </Marker>
            {selectedLocation.long == result.long ? (
                <Popup
                onClose={ () => setSelectedLocation ({}) }
                closeOnClick={true}
                latitude={result.lat}
                longitude={result.long}
                >
                    {result.title}
                </Popup>
            ):(
                false
            )}
        </div>
    ))}
    </ReactMapGl>
}

export default Map
