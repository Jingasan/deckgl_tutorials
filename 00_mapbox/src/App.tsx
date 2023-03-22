import Map from "react-map-gl";
import "./App.css";

// Appコンポーネント
export default function App() {
  return (
    <Map
      initialViewState={{
        longitude: 135,
        latitude: 35,
        zoom: 4,
      }}
      style={{ width: "100%", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    />
  );
}
