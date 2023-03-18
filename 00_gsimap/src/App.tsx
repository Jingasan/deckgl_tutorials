import React from "react";
import DeckGL from "@deck.gl/react";
import { TileLayer, BitmapLayer } from "deck.gl";
import { InitialViewStateProps } from "@deck.gl/core/lib/deck";

// Appコンポーネント
export default function App() {
  // 地図タイルの設定
  const tileLayer = new TileLayer({
    data: "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",
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
  const [viewport, setViewport] = React.useState<InitialViewStateProps>({
    longitude: 139.753,
    latitude: 35.6844,
    zoom: 14,
    minZoom: 5,
    maxZoom: 16,
    pitch: 0,
    bearing: 0,
  });
  // 地図画面
  return (
    <div className="App">
      <DeckGL
        layers={[tileLayer]}
        controller={true}
        initialViewState={viewport}
      ></DeckGL>
      <div className="attribution">
        <a
          href="https://maps.gsi.go.jp/development/ichiran.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          国土地理院タイル
        </a>
      </div>
    </div>
  );
}
