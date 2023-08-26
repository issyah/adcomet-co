/**
 * Google map initialising component
 * */

import { useEffect, useRef, useState } from "react";
const MapComponent = ({
  center,
  zoom,
  height,
  markers,
  autoCompleteRef,
  reRenderAutocomplete,
  autoCompleteValue,
}) => {
  const ref = useRef();
  const [map, setMap] = useState(null);
  const googleMaps = window.google.maps || undefined;

  const renderAutoComplete = () => {
    const autocomplete = new googleMaps.places.Autocomplete(
      autoCompleteRef.current,
      {
        fields: ["formatted_address", "name", "geometry"],
        strictBounds: false,
      }
    );

    // const marker = new googleMaps.Marker({
    //   map,
    // });

    const pinStyling = new googleMaps.marker.PinElement({
      background: "#3a36db",
      borderColor: "#211D42",
      glyphColor: "#FFF",
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        return;
      }

      if (autoCompleteValue) {
        autoCompleteValue(place);
      }

      map.setCenter(place.geometry.location);
      map.setZoom(17);
      const marker = new googleMaps.marker.AdvancedMarkerElement({
        map,
        position: place.geometry.location,
        content: pinStyling.element,
      });
    });
  };

  useEffect(() => {
    const m = new googleMaps.Map(ref.current, {
      center,
      zoom,
      mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID,
    });
    setMap(m);
  }, []);

  useEffect(() => {
    if (autoCompleteRef) {
      renderAutoComplete();
    }
  }, [map]);

  useEffect(() => {
    if (markers) {
      markers.forEach((item, index) => {
        const pinStyling = new googleMaps.marker.PinElement({
          background: "#3a36db",
          borderColor: "#211D42",
          glyphColor: "#FFF",
        });
        const priceTag = document.createElement("div");
        priceTag.className = "price-tag-map";
        if (item.price.length) {
          priceTag.textContent = `$${item.price[0].value}`;
        }
        const marker = new googleMaps.marker.AdvancedMarkerElement({
          map,
          position: item.location,
          content: priceTag,
        });
      });
      // markers.forEach((item, index) => {
      //   const m = new googleMaps.Marker({
      //     position: new google.maps.LatLng(item.center),
      //     title: item.title || "Created marker",
      //   });
      //   m.setMap(map);
      // });
    }
  }, [map, markers]);

  // rerender autocomplete field
  useEffect(() => {
    if (reRenderAutocomplete) {
      renderAutoComplete();
    }
  }, [reRenderAutocomplete]);

  return (
    <div style={{ height: height || 250, width: "100%" }} ref={ref} id="map" />
  );
};

export default MapComponent;
