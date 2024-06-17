import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import { FuelType, ICluster, Station } from "../../interfaces/stations";
import SortIcon from "@mui/icons-material/Sort";
import ResetIcon from "@mui/icons-material/RestartAlt";

interface IProps {
  stations: Station[];
  typesOfFuel?: FuelType[];
  clusters?: ICluster[];
}

const StationsCards = ({ stations, typesOfFuel, clusters }: IProps) => {
  const [sortedStations, setSortedStations] = useState<Station[]>(stations);
  const [sortConfig, setSortConfig] = useState<{
    fuelTypeId: number | null;
    direction: "asc" | "desc" | null;
  }>({
    fuelTypeId: null,
    direction: null,
  });

  useEffect(() => {
    setSortedStations(stations);
    setSortConfig({ fuelTypeId: null, direction: null });
  }, [stations]);

  const handleSort = (fuelTypeId: number) => {
    const newDirection =
      sortConfig.fuelTypeId === fuelTypeId && sortConfig.direction === "asc"
        ? "desc"
        : "asc";

    const sorted = [...stations].sort((a, b) => {
      const priceA =
        a.prices.find((price) => price.fuelTypeId === fuelTypeId)?.price ??
        Infinity;
      const priceB =
        b.prices.find((price) => price.fuelTypeId === fuelTypeId)?.price ??
        Infinity;

      if (priceA === Infinity && priceB === Infinity) return 0;
      if (priceA === Infinity) return 1;
      if (priceB === Infinity) return -1;

      return newDirection === "asc" ? priceA - priceB : priceB - priceA;
    });

    setSortedStations(sorted);
    setSortConfig({ fuelTypeId, direction: newDirection });
  };

  const handleResetFilters = () => {
    setSortedStations(stations);
    setSortConfig({ fuelTypeId: null, direction: null });
  };

  return (
    <>
      {typesOfFuel?.map((fuelType) => (
        <Button
          key={fuelType.id}
          variant="contained"
          color="warning"
          onClick={() => handleSort(fuelType.id)}
          sx={{ ml: 1, mt: 2 }}
          endIcon={
            sortConfig.fuelTypeId === fuelType.id ? (
              sortConfig.direction === "asc" ? (
                <SortIcon />
              ) : (
                <SortIcon style={{ transform: "rotate(180deg)" }} />
              )
            ) : (
              <SortIcon />
            )
          }
        >
          {fuelType.type === "Газ пропан" ? "ГП" : fuelType.type}
        </Button>
      ))}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleResetFilters}
        sx={{ ml: 1, mt: 1 }}
        startIcon={<ResetIcon />}
      >
        Скинути
      </Button>
      <Box
        sx={{
          maxHeight: 640,
          overflow: "auto",
          mt: 2,
          bgcolor: "background.default",
          color: "text.primary",
          p: 2,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        ></Box>
        {clusters?.map((cluster) => (
          <Box
            key={cluster.clusterName}
            sx={{
              mb: 4,
              border: "2px solid",
              borderColor: "warning.main",
              borderRadius: 2,
              p: 2,
            }}
          >
            <Typography variant="h5" color="primary" gutterBottom>
              {cluster.clusterName}
            </Typography>
            <Divider />
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {cluster.stations.map((station) => (
                <Grid item xs={12} key={station.id}>
                  <Card className="my-1 shadow-md dark:bg-gray-800">
                    <CardContent>
                      <Box className="flex items-center">
                        <Avatar
                          alt={station.brand.name}
                          src={station.brand.logo}
                          sx={{ width: 50, height: 50, mr: 2 }}
                        />
                        <div className="flex flex-col">
                          <Typography
                            variant="h6"
                            className="dark:text-gray-200"
                          >
                            {station.name}
                          </Typography>
                          <Typography className="text-gray-500 dark:text-gray-400">
                            {station.address}
                          </Typography>
                          <Typography className="text-orange-500 dark:text-orange-400">
                            {station.distanceFromSearchCoords} км від точки
                            пошуку
                          </Typography>
                        </div>
                      </Box>
                      <Typography
                        variant="h6"
                        className="mt-2 dark:text-gray-200"
                      >
                        Ціни на пальне:
                      </Typography>
                      <Box className="grid grid-cols-2 gap-2 mt-2">
                        {station.prices.map((price) => (
                          <Box
                            key={price.id}
                            className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex justify-between items-center"
                          >
                            <Typography className="font-medium dark:text-gray-200">
                              {price.fuelType.type}
                            </Typography>
                            <Typography className="font-semibold dark:text-gray-200">
                              {price.price} грн
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                      <Typography
                        variant="h6"
                        className="mt-2 dark:text-gray-200"
                      >
                        Послуги:
                      </Typography>
                      <Box className="flex flex-wrap mt-2">
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
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
        <Typography variant="h5" color="primary" gutterBottom>
          {sortedStations.length > 0 ? "Інші станції" : ""}
        </Typography>
        <Divider />
        {sortedStations.length > 0 ? (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {sortedStations.map((station) => (
              <Grid item xs={12} key={station.id}>
                <Card className="my-1 shadow-md dark:bg-gray-800">
                  <CardContent>
                    <Box className="flex items-center">
                      <Avatar
                        alt={station.brand.name}
                        src={station.brand.logo}
                        sx={{ width: 50, height: 50, mr: 2 }}
                      />
                      <div className="flex flex-col">
                        <Typography variant="h6" className="dark:text-gray-200">
                          {station.name}
                        </Typography>
                        <Typography className="text-gray-500 dark:text-gray-400">
                          {station.address}
                        </Typography>
                        <Typography className="text-orange-500 dark:text-orange-400">
                          {station.distanceFromSearchCoords} км від точки пошуку
                        </Typography>
                      </div>
                    </Box>
                    <Typography
                      variant="h6"
                      className="mt-2 dark:text-gray-200"
                    >
                      Ціни на пальне:
                    </Typography>
                    <Box className="grid grid-cols-2 gap-2 mt-2">
                      {station.prices.map((price) => (
                        <Box
                          key={price.id}
                          className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex justify-between items-center"
                        >
                          <Typography className="font-medium dark:text-gray-200">
                            {price.fuelType.type}
                          </Typography>
                          <Typography className="font-semibold dark:text-gray-200">
                            {price.price} грн
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                    <Typography
                      variant="h6"
                      className="mt-2 dark:text-gray-200"
                    >
                      Послуги:
                    </Typography>
                    <Box className="flex flex-wrap mt-2">
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
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" className="dark:text-gray-200">
            {"Search Stations. If you get an error, please try again"}
          </Typography>
        )}
      </Box>
    </>
  );
};

export default StationsCards;
