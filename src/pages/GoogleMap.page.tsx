import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { GOOGLE_MAP_API_KEY } from "../app.constants";

// const containerStyle = {
//   width: "400px",
//   height: "400px",
// };

// const center = {
//   lat: -3.745,
//   lng: -38.523,
// };

// function SimpleMap() {
//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: GOOGLE_MAP_API_KEY,
//   });

//   const [map, setMap] = React.useState(null);

//   const onLoad = React.useCallback(function callback(map: any) {
//     // This is just an example of getting and using the map instance!!! don't just blindly copy!
//     const bounds = new window.google.maps.LatLngBounds(center);
//     map.fitBounds(bounds);

//     setMap(map);
//   }, []);

//   const onUnmount = React.useCallback(function callback(map: any) {
//     setMap(null);
//   }, []);

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={10}
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//     >
//       {/* Child components, such as markers, info windows, etc. */}
//       <></>
//     </GoogleMap>
//   ) : (
//     <></>
//   );
// }

// interface MapProps extends google.maps.MapOptions {
//   style: { [key: string]: string };
//   onClick?: (e: google.maps.MapMouseEvent) => void;
//   onIdle?: (map: google.maps.Map) => void;
//   children?: React.ReactNode;
// }

// const Map: React.FC<MapProps> = ({
//   onClick,
//   onIdle,
//   children,
//   style,
//   ...options
// }) => {
//   const ref = React.useRef<HTMLDivElement>(null);
//   const [map, setMap] = React.useState<google.maps.Map>();

//   React.useEffect(() => {
//     if (ref.current && !map) {
//       setMap(new window.google.maps.Map(ref.current, {}));
//     }
//   }, [ref, map]);

//   // because React does not do deep comparisons, a custom hook is used
//   // see discussion in https://github.com/googlemaps/js-samples/issues/946
//   useDeepCompareEffectForMaps(() => {
//     if (map) {
//       map.setOptions(options);
//     }
//   }, [map, options]);

//   function useDeepCompareEffectForMaps(
//     callback: React.EffectCallback,
//     dependencies: any[]
//   ) {
//     React.useEffect(callback, dependencies.map());
//   }

//   React.useEffect(() => {
//     if (map) {
//       ["click", "idle"].forEach((eventName) =>
//         google.maps.event.clearListeners(map, eventName)
//       );

//       if (onClick) {
//         map.addListener("click", onClick);
//       }

//       if (onIdle) {
//         map.addListener("idle", () => onIdle(map));
//       }
//     }
//   }, [map, onClick, onIdle]);

//   return (
//     <>
//       <div ref={ref} style={style} />
//       {React.Children.map(children, (child) => {
//         if (React.isValidElement(child)) {
//           // set the map prop on the child component
//           // @ts-ignore
//           return React.cloneElement(child, { map });
//         }
//       })}
//     </>
//   );
// };

// export default React.memo(SimpleMap);
