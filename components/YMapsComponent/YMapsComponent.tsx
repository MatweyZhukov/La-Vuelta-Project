"use client";

//Global
import {
  YMaps,
  Map,
  GeolocationControl,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import { useState, useRef, MutableRefObject, FC } from "react";
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";

//Icons
import LocationPlacemark from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";

//Types
import {
  IMapConstructor,
  IMapRef,
  IYMapsComponentProps,
} from "../../types/types";

//Styles
import styles from "../../styles/maps.module.css";

const YMapsComponent: FC<IYMapsComponentProps> = ({
  YMapsState,
  setYMapsState,
}) => {
  const [mapConstructor, setMapConstructor] = useState<IMapConstructor | null>(
    null
  );

  const mapRef: MutableRefObject<IMapRef | null> = useRef(null);

  const mapOptions = {
    modules: ["geocode", "SuggestView"],
    defaultOptions: { suppressMapOpenBlock: true },
    width: 400,
    height: 400,
  };

  const handleReset = () => {
    setYMapsState({ ...YMapsState, title: "" });

    if (mapRef.current) {
      mapRef.current.setCenter(YMapsState.center);
      mapRef.current.setZoom(YMapsState.zoom);
    }
  };

  const handleBoundsChange = () => {
    if (mapRef.current) {
      const newCoords = mapRef.current.getCenter();

      mapConstructor &&
        mapConstructor.geocode(newCoords).then((res) => {
          const nearest = res.geoObjects.get(0),
            foundAddress = nearest.properties.get("text"),
            [centerX, centerY] = nearest.geometry.getCoordinates(),
            [initialCenterX, initialCenterY] = YMapsState.center;

          if (centerX !== initialCenterX && centerY !== initialCenterY) {
            setYMapsState((prev) => ({
              ...prev,
              title: foundAddress,
            }));
          }
        });
    }
  };

  return (
    <Box sx={{ width: mapOptions.width }}>
      <Box className={styles.searchRoot}>
        <Box className={styles.searchFieldBox}>
          <input
            value={YMapsState.title}
            placeholder="Search location..."
            disabled={true}
          />
          <IconButton onClick={handleReset}>
            <CloseIcon style={{ color: "#ffa500" }} />
          </IconButton>
        </Box>
      </Box>

      <Box className={styles.mapRoot}>
        <YMaps
          query={{
            lang: "en_US",
            apikey: process.env.NEXT_PUBLIC_YMAPS_APIKEY,
            ns: "use-load-option",
            load: "Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon",
          }}
        >
          <Map
            {...mapOptions}
            state={YMapsState}
            onBoundsChange={handleBoundsChange}
            //@ts-ignore
            onLoad={setMapConstructor}
            //@ts-ignore
            instanceRef={mapRef}
          >
            <LocationPlacemark className={styles.placemark} color="error" />
            <GeolocationControl defaultOptions={{ maxWidth: 128 }} />
            <ZoomControl />
          </Map>
        </YMaps>
      </Box>
    </Box>
  );
};

export { YMapsComponent };
