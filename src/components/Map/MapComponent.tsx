import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import {
  Container,
  Grid,
  TextField,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Slider,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Avatar,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import {
  searchStationsController,
  getAllFuelTypes,
  getAllFacilities,
  getAllBrands,
} from "../../api/axios.controller";
import { MapViewUpdater } from "./MapViewUpdater";
import DisplayStationMarkers from "./DisplayStationMarkers";
import StationsCards from "./StationsCards";
import { ICluster, Station } from "../../interfaces/stations";

const MapComponent = () => {
  const [position, setPosition] = useState([
    49.9923181, 36.2310146,
  ] as LatLngExpression);
  const [searchQuery, setSearchQuery] = useState("Харків");
  const [maxDistance, setMaxDistance] = useState(5);
  const [fuelTypes, setFuelTypes] = useState<
    { id: number; type: string; description: string }[]
  >([]);
  const [selectedFuelTypeIds, setSelectedFuelTypeIds] = useState<number[]>([]);
  const [facilities, setFacilities] = useState<
    { id: number; name: string; description: string }[]
  >([]);
  const [selectedFacilityIds, setSelectedFacilityIds] = useState<number[]>([]);
  const [brands, setBrands] = useState<
    { id: number; name: string; description: string; logo: string }[]
  >([]);
  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>([]);
  const [stations, setStations] = useState<Station[]>([]); // State to store stations
  const [clusters, setClusters] = useState<ICluster[]>([]); // State to store stations
  const [stationsNotInClusters, setStationsNotInClusters] = useState<Station[]>([]); 
  useEffect(() => {
    const fetchFuelTypes = async () => {
      try {
        const types = await getAllFuelTypes();
        setFuelTypes(types);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchFacilities = async () => {
      try {
        const facilities = await getAllFacilities();
        setFacilities(facilities);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchBrands = async () => {
      try {
        const brands = await getAllBrands();
        setBrands(brands);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFuelTypes();
    fetchFacilities();
    fetchBrands();
  }, []);

  const handleSearch = async () => {
    try {
      const query = `placeName="${searchQuery}&maxDistance=${maxDistance}&fuelTypeIds=${selectedFuelTypeIds.join(
        ","
      )}&facilityIds=${selectedFacilityIds.join(
        ","
      )}&brandIds=${selectedBrandIds.join(",")}`;

      const response = await searchStationsController(query);
      const location = response?.location;
      setPosition([location?.lat, location?.lng] as LatLngExpression);
      console.log(response)
      const stations = response?.stations;

      setStations(stations);
      const clusters = response?.clusters
      setStationsNotInClusters(response?.stationsNotInClusters)
      setClusters(clusters)
      console.log(clusters)
      console.log(stations);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMaxDistanceChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setMaxDistance(newValue as number);
  };

  const handleFuelTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = parseInt(event.target.name, 10);
    setSelectedFuelTypeIds((prev) =>
      event.target.checked ? [...prev, id] : prev.filter((t) => t !== id)
    );
  };

  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = parseInt(event.target.name, 10);
    setSelectedFacilityIds((prev) =>
      event.target.checked ? [...prev, id] : prev.filter((t) => t !== id)
    );
  };

  const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = parseInt(event.target.name, 10);
    setSelectedBrandIds((prev) =>
      event.target.checked ? [...prev, id] : prev.filter((t) => t !== id)
    );
  };

  return (
    <Container maxWidth={false}>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={5} md={4.1}>

          <Box display="flex" className="mt-5 mb-5" alignItems="center">
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </Box>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Фільтри</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography gutterBottom>
                Радіус пошуку {maxDistance} km
              </Typography>
              <Slider
                value={maxDistance}
                onChange={handleMaxDistanceChange}
                aria-labelledby="max-distance-slider"
                valueLabelDisplay="auto"
                step={1}
                min={1}
                max={50}
              />
              <Accordion
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Типи Пального</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    {Array.isArray(fuelTypes) &&
                      fuelTypes.map((type) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedFuelTypeIds.includes(type.id)}
                              onChange={handleFuelTypeChange}
                              name={type.id.toString()}
                            />
                          }
                          label={type.type}
                          key={type.id}
                        />
                      ))}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
              <Accordion
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  marginTop: "10px",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography>Послуги</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    {Array.isArray(facilities) &&
                      facilities.map((facility) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedFacilityIds.includes(
                                facility.id
                              )}
                              onChange={handleFacilityChange}
                              name={facility.id.toString()}
                            />
                          }
                          label={facility.name}
                          key={facility.id}
                        />
                      ))}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
              <Accordion
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  marginTop: "10px",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4a-content"
                  id="panel4a-header"
                >
                  <Typography>Бренди</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    {Array.isArray(brands) &&
                      brands.map((brand) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedBrandIds.includes(brand.id)}
                              onChange={handleBrandChange}
                              name={brand.id.toString()}
                            />
                          }
                          label={
                            <Box display="flex" alignItems="center">
                              <Avatar
                                alt={brand.name}
                                src={brand.logo}
                                sx={{ width: 35, height: 35, marginRight: 1 }}
                              />
                              {brand.name}
                            </Box>
                          }
                          key={brand.id}
                        />
                      ))}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
            </AccordionDetails>
          </Accordion>

          <StationsCards
           stations={stationsNotInClusters} typesOfFuel={fuelTypes} clusters={clusters}/>


        </Grid>
        <Grid item xs={12} sm={8} md={7.9}>
          <div id="map" style={{ height: "85vh" }}>
            <MapContainer
              className="w-full h-full"
              center={position}
              zoom={13}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>Точка пошуку.</Popup>
              </Marker>
              <DisplayStationMarkers stations={stations} />
              <MapViewUpdater position={position} />
            </MapContainer>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MapComponent;
