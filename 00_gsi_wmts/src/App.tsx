import React from "react";
import DeckGL from "@deck.gl/react/typed";
import { TileLayer, BitmapLayer } from "deck.gl/typed";
import "./App.css";

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
        // @ts-ignore
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
  const [initialViewState, setInitialViewState] = React.useState({
    longitude: 139.753, // 経度
    latitude: 35.6844, // 緯度
    zoom: 14, // ズーム値
    minZoom: 5, // ズーム最小値
    maxZoom: 16, // ズーム最大値
    pitch: 0, // マップの傾き
    minPitch: 0, // マップの傾き最小値
    maxPitch: 80, // マップの傾き最大値
    bearing: 0, // マップの回転方向
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
