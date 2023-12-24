"use client";

//Global
import { MutableRefObject, useEffect } from "react";
import {
  YMaps,
  Map,
  GeolocationControl,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import { useState, useRef } from "react";
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";

//Icons
import LocationPlacemark from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";

//Types
import { IMapsInitialState } from "../../types/types";

//Styles
import styles from "../../styles/maps.module.css";

const mapOptions = {
  modules: ["geocode", "SuggestView"],
  defaultOptions: { suppressMapOpenBlock: true },
  width: 400,
  height: 400,
};

const initialState: IMapsInitialState = {
  title: "",
  center: [55.749451, 37.542824],
  zoom: 12,
};

const YMapsComponent = () => {
  const [state, setState] = useState<IMapsInitialState>({ ...initialState });
  const [mapConstructor, setMapConstructor] = useState(null);

  const mapRef: MutableRefObject<HTMLElement | null> = useRef(null);
  const searchRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

  const handleReset = () => {
    setState({ ...initialState });

    //@ts-ignore
    searchRef.current.value = "";
    //@ts-ignore
    mapRef.current.setCenter(initialState.center);
    //@ts-ignore
    mapRef.current.setZoom(initialState.zoom);
  };

  useEffect(() => {
    if (mapConstructor) {
      //@ts-ignore
      new mapConstructor.SuggestView(searchRef.current).events.add(
        "select",
        //@ts-ignore
        function (e) {
          const selectedName = e.get("item").value;
          //@ts-ignore
          mapConstructor.geocode(selectedName).then((result) => {
            const newCoords = result.geoObjects
              .get(0)
              .geometry.getCoordinates();
            setState((prevState) => ({ ...prevState, center: newCoords }));
          });
        }
      );
    }
  }, [mapConstructor]);

  //@ts-ignore
  const handleBoundsChange = (e) => {
    //@ts-ignore
    const newCoords = mapRef.current.getCenter();
    //@ts-ignore
    mapConstructor.geocode(newCoords).then((res) => {
      const nearest = res.geoObjects.get(0);
      const foundAddress = nearest.properties.get("text");
      const [centerX, centerY] = nearest.geometry.getCoordinates();
      const [initialCenterX, initialCenterY] = initialState.center;
      if (centerX !== initialCenterX && centerY !== initialCenterY) {
        setState((prevState) => ({ ...prevState, title: foundAddress }));
      }
    });
  };

  return (
    <Box sx={{ width: 400 }}>
      <Box className={styles.searchRoot}>
        <Box className={styles.searchFieldBox}>
          <input
            type="text"
            value={state.title}
            ref={searchRef}
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
            state={state}
            //@ts-ignore
            onLoad={setMapConstructor}
            onBoundsChange={handleBoundsChange}
            //@ts-ignore
            instanceRef={mapRef}
          >
            <LocationPlacemark className={styles.placemark} color="warning" />
            <GeolocationControl defaultOptions={{ maxWidth: 128 }} />
            <ZoomControl />
          </Map>
        </YMaps>
      </Box>
    </Box>
  );
};

export { YMapsComponent };
