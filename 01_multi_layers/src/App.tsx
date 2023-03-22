import React from "react";
import DeckGL from "@deck.gl/react/typed";
import { TileLayer, BitmapLayer } from "deck.gl/typed";
import { renderLayers } from "./RenderLayers";
import "./App.css";

// Appコンポーネント
export default function App() {
  // 初期視点の設定
  const [initialViewState, setInitialViewState] = React.useState({
    longitude: 139.753,
    latitude: 35.6844,
    zoom: 4,
    minZoom: 4,
    maxZoom: 16,
    pitch: 0,
    minPitch: 0,
    maxPitch: 80,
    bearing: 0,
  });
  // 地図画面
  return (
    <div className="App">
      <DeckGL
        layers={renderLayers()}
        controller={true}
        initialViewState={initialViewState}
      ></DeckGL>
      <div className="attribution">
        <a
          href="https://www.openstreetmap.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          © Open Street Map
        </a>
      </div>
    </div>
  );
}
