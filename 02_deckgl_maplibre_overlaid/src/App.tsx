import React from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Tile3DLayer } from "deck.gl/typed";
import { Tiles3DLoader } from "@loaders.gl/3d-tiles";
import { MapboxOverlay } from "@deck.gl/mapbox/typed";
import "./App.css";

// MapLibreのMapオブジェクト
let map: maplibregl.Map;

// Appコンポーネント
export default function App() {
  const mapContainer = React.useRef<HTMLDivElement | null>(null);
  // 初期化
  React.useEffect(() => {
    if (!map) {
      if (!mapContainer.current) return;
      // 地図の作成
      map = new maplibregl.Map({
        container: mapContainer.current,
        style: "https://demotiles.maplibre.org/style.json", // style URL
        center: [139.753, 35.6844], // 初期緯度経度
        zoom: 16, // 初期ズーム値
        minZoom: 4, // 最小ズーム値
        maxZoom: 20, // 最大ズーム値
      });
      map.addControl(new maplibregl.NavigationControl({}), "top-right"); // ズーム・回転コントロールの表示
      map.addControl(new maplibregl.ScaleControl({}), "bottom-left"); // スケール値の表示
      map.showTileBoundaries = true; // タイル境界線の表示
      const deckglOverlay = new MapboxOverlay({
        layers: [
          new Tile3DLayer({
            id: "tile3dlayer",
            pointSize: 1,
            data: "https://plateau.geospatial.jp/main/data/3d-tiles/bldg/13100_tokyo/13101_chiyoda-ku/texture/tileset.json",
            loader: Tiles3DLoader,
          }),
        ],
      });
      // @ts-ignore
      map.addControl(deckglOverlay);
    }
  });

  return (
    <div className="App">
      <div ref={mapContainer} className="map" />
      <div className="attribution">
        <a
          href="https://github.com/Project-PLATEAU/plateau-streaming-tutorial"
          target="_blank"
          rel="noopener noreferrer"
        >
          PLATEAU
        </a>
        /
        <a
          href="https://github.com/maplibre/demotiles"
          target="_blank"
          rel="noopener noreferrer"
        >
          MapLibre Demo Tiles
        </a>
      </div>
    </div>
  );
}
