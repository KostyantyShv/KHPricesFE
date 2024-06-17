import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import { Avatar, Box, Typography, Chip, } from '@mui/material'
import 'tailwindcss/tailwind.css'
import { Station } from '../../interfaces/stations';


interface IProps {
  stations: Station[];
}


const DisplayStationMarkers = ({ stations }: IProps) => {
  return (
    <>
      {stations.map((station) => (
        <Marker
          riseOnHover={true}
          key={station.id}
          position={[station.lat, station.lng]}
          eventHandlers={{
            mouseover: (event) => event.target.openPopup(),
            mouseout: (event) => event.target.closePopup(),
          }}
        >
          <Popup minWidth={200} maxWidth={630}>
              <Box className="flex items-center mb-2">
                <Avatar
                  alt={station.brand.name}
                  src={station.brand.logo}
                  className="w-10 h-10 mr-2"
                />
                <Typography variant="subtitle1" className="font-bold">
                  {station.name}
                </Typography>
              </Box>
              <Typography variant="body2" className="text-gray-600">{station.address}</Typography>
              <Typography variant="body2" className="text-gray-600 mb-2">{station.description}</Typography>
              <Typography variant="subtitle2" className="font-bold mb-1">Ціни на пальне:</Typography>
              <Box className="grid grid-cols-2 gap-1 mt-2">
                {station.prices.map((price) => (
                  <Box
                    key={price.id}
                    className="bg-gray-100 dark:bg-gray-700 rounded-lg p-1 pt-0 flex justify-between "
                  >
                    <Typography className="font-thin dark:text-gray-200 p-0">{price.fuelType.type}</Typography>
                    <Typography className="font-semibold dark:text-gray-200 p-0">{price.price} грн</Typography>
                  </Box>
                ))}
              </Box>
              <Typography variant="subtitle2" className="font-bold mb-1 mt-2">Послуги:</Typography>
              <Box className="flex flex-wrap">
                {station.facilities.map((facility) => (
                  <Chip
                    key={facility.id}
                    label={facility.facility.name}
                    className="mr-1 mb-1"
                    size="small"
                    variant="outlined"
                    color="info"
                  />
                ))}
              </Box>
          </Popup>
        </Marker>
      ))}
    </>
  )
}

export default DisplayStationMarkers
