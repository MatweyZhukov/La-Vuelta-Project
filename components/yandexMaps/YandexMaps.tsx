"use client";

//Global
import {
  YMaps,
  Map,
  GeolocationControl,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import React, { useState, FC, useEffect } from "react";
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";

//Icons
import LocationPlacemark from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";

//Types
import {
  IBreakPoints,
  IMapConstructor,
  IMapOptions,
  ISize,
  IYandexMapsProps,
} from "../../types/types";

//Styles
import styles from "@/styles/maps.module.css";

const YandexMaps: FC<IYandexMapsProps> = ({
  YMapsState,
  setYMapsState,
  handleReset,
  mapRef,
  formRef,
}) => {
  type MapConstructorType = IMapConstructor | null;

  const [mapConstructor, setMapConstructor] =
      useState<MapConstructorType>(null),
    [size, setSize] = useState<ISize>({
      offsetHeight: 0,
      offsetWidth: 0,
    });

  const [mapOptions, setMapOptions] = useState<IMapOptions>({
    modules: ["geocode", "SuggestView"],
    defaultOptions: { suppressMapOpenBlock: true },
    width: 400,
    height: 400,
  });

  const breakpoints: IBreakPoints[] = [
    { clientWidth: 8000, mapHeight: 400, mapWidth: 400 },
    { clientWidth: 1380, mapHeight: 300, mapWidth: 300 },
    { clientWidth: 980, mapHeight: 250, mapWidth: 250 },
    { clientWidth: 650, mapHeight: 200, mapWidth: 200 },
  ];

  const resizeHandler = () => {
    if (formRef.current) {
      const { offsetHeight, offsetWidth } = formRef.current;
      setSize({ offsetHeight, offsetWidth });
    }
  };

  const YMapsQuery = {
    lang: "en_US",
    apikey: process.env.NEXT_PUBLIC_YMAPS_APIKEY,
    ns: "use-load-option",
    load: "Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon",
  } as const;

  const changeMapWidth = () => {
    const newMapOptions = breakpoints.reduce((options, breakpoint) => {
      const { clientWidth, mapHeight, mapWidth } = breakpoint;

      if (size.offsetWidth < clientWidth) {
        return {
          ...options,
          height: mapHeight,
          width: mapWidth,
        };
      }

      return options;
    }, mapOptions);

    setMapOptions(newMapOptions);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    resizeHandler();

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    changeMapWidth();

    //eslint-disable-next-line
  }, [size.offsetWidth]);

  const handleBoundsChange = () => {
    if (mapRef.current) {
      const newCoords = mapRef.current.getCenter();

      mapConstructor &&
        mapConstructor.geocode(newCoords).then(res => {
          //@ts-expect-error This line intentionally contains an error
          const nearest = res.geoObjects.get(0),
            foundAddress = nearest.properties.get("text"),
            [centerX, centerY] = nearest.geometry.getCoordinates(),
            [initialCenterX, initialCenterY] = YMapsState.center;

          if (centerX !== initialCenterX && centerY !== initialCenterY) {
            setYMapsState(prev => ({
              ...prev,
              title: foundAddress,
            }));
          }
        });
    }
  };

  return (
    <Box sx={{ width: mapOptions?.width }}>
      <Box className={styles.searchRoot}>
        <Box className={styles.searchFieldBox}>
          <input
            value={YMapsState.title}
            placeholder="Search location..."
            disabled={true}
          />
          <IconButton onClick={handleReset}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>

      <Box className={styles.mapRoot}>
        <YMaps query={YMapsQuery}>
          <Map
            {...mapOptions}
            state={YMapsState}
            onBoundsChange={handleBoundsChange}
            //@ts-expect-error This line intentionally contains an error
            onLoad={ymaps => setMapConstructor(() => ymaps)}
            //@ts-expect-error This line intentionally contains an error
            instanceRef={map => (mapRef.current = map)}
          >
            <LocationPlacemark className={styles.placemark} color="error" />
            <GeolocationControl options={{ maxWidth: 128 }} />
            <ZoomControl />
          </Map>
        </YMaps>
      </Box>
    </Box>
  );
};

export { YandexMaps };
