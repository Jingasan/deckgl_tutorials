import React from "react";
import DeckGL from "@deck.gl/react";
import { TileLayer, BitmapLayer } from "deck.gl";
import { InitialViewStateProps } from "@deck.gl/core/lib/deck";

// Appコンポーネント
export default function App() {
  // 地図タイルの設定
  const tileLayer = new TileLayer({
    data: "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
    minZoom: 0,
    maxZoom: 19,
    tileSize: 256,
    renderSubLayers: (props) => {
      const {
        bbox: { west, south, east, north },
      } = props.tile;
      return new BitmapLayer(props, {
        data: undefined,
        image: props.data,
        bounds: [west, south, east, north],
      });
    },
  });
  // 初期視点の設定
  const [initialViewState, setInitialViewState] =
    React.useState<InitialViewStateProps>({
      longitude: 139.753,
      latitude: 35.6844,
      zoom: 14,
      minZoom: 5,
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
        layers={[tileLayer]}
        controller={true}
        initialViewState={initialViewState}
      ></DeckGL>
      <div className="attribution">
        <a
          href="https://www.openstreetmap.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Street Map
        </a>
      </div>
    </div>
  );
}
