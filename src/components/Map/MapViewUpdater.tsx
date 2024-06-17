import { LatLngExpression } from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

export const MapViewUpdater = ({ position }: { position: LatLngExpression }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, 13); // Fly to the new position with a zoom level of 13
  }, [position, map]);

  return null;
};
