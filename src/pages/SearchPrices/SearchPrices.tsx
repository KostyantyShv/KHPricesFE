import React from 'react'
import MapComponent from '../../components/Map/MapComponent'
import { Container } from '@mui/material'

const SearchPrices = () => {
  return (
    <Container maxWidth={false} className="w-full">
      <MapComponent></MapComponent>
    </Container>
  )
}

export default SearchPrices