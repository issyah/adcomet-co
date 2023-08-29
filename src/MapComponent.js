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
  role,
}) => {
  const ref = useRef();
  const [map, setMap] = useState(null);
  const googleMaps = window.google.maps || undefined;
  const [markersArray, setMarkersArray] = useState([]);
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
  const renderMarkers = () => {
    if (markers) {
      // clear the current markers
      if (markersArray.length) {
        markersArray.forEach((item) => {
          item.map = null;
        });
      }
      let markerArr = [];
      markers.forEach((item, index) => {
        const infoWindow = new googleMaps.InfoWindow();
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

        const infoWindowDom = document.createElement("div");
        infoWindowDom.className = "card-map";
        const imgDom = document.createElement("img");
        const titleDom = document.createElement("p");
        const link = document.createElement("a");
        const addressDom = document.createElement("span");
        titleDom.innerHTML = item.name;
        imgDom.src = item?.media[0]?.src;
        imgDom.className = "card-map-image";
        addressDom.innerHTML = item?.address?.split(",")[0];
        const prefixHref = role == 'advertiser' ? '/ad/ads-locator' : '/ad-space/locations';
        link.href = `${prefixHref}/view/?id=${item.id}`;
        link.append(imgDom);
        infoWindowDom.append(link, titleDom, addressDom);

        marker.addListener("click", ({ domEvent, latLng }) => {
          const { target } = domEvent;
          infoWindow.close();
          infoWindow.setContent(infoWindowDom);
          infoWindow.open(marker.map, marker);
        });
        markerArr.push(marker);
      });
      if (markerArr.length) {
        setMarkersArray(markerArr);
      }
    }
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
    renderMarkers();
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
