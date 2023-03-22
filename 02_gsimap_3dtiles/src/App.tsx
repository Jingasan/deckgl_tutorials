import React from "react";
import DeckGL from "@deck.gl/react";
import { TileLayer, BitmapLayer, Tile3DLayer } from "deck.gl";
import { InitialViewStateProps } from "@deck.gl/core/lib/deck";
import { Tiles3DLoader } from "@loaders.gl/3d-tiles";

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
  const [initialViewState, setInitialViewState] =
    React.useState<InitialViewStateProps>({
      longitude: 135,
      latitude: 35,
      zoom: 16,
      minZoom: 5,
      maxZoom: 16,
      pitch: 0,
      minPitch: 0,
      maxPitch: 80,
      bearing: 0,
    });
  // 3DTiles読み込み直後に実行する処理
  const onTilesetLoad = (tileset: any) => {
    // 読み込んだタイルセットが中心にくる視点に再移動
    const { cartographicCenter, zoom } = tileset;
    setInitialViewState({
      ...initialViewState,
      longitude: cartographicCenter[0],
      latitude: cartographicCenter[1],
      zoom,
    });
    console.log("Tile is loaded.");
  };
  // 3DTilesレイヤーの設定
  const tile3dLayer = new Tile3DLayer({
    id: "tile3dlayer",
    pointSize: 1,
    data: "https://plateau.geospatial.jp/main/data/3d-tiles/bldg/13100_tokyo/13101_chiyoda-ku/texture/tileset.json",
    loader: Tiles3DLoader,
    onTilesetLoad: onTilesetLoad,
  });
  // 地図画面
  return (
    <div className="App">
      <DeckGL
        layers={[tileLayer, tile3dLayer]}
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
