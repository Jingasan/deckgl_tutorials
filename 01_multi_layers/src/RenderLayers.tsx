import { TileLayer, BitmapLayer, GeoJsonLayer } from "deck.gl/typed";

export function renderLayers() {
  // 県境界GeoJSONレイヤー
  const geoJSONlayer = new GeoJsonLayer({
    id: "geojson-layer",
    data: "./pref.geojson", // GeoJSON読み込み
    pickable: true,
    stroked: true,
    filled: true,
    getFillColor: [0, 160, 0, 180],
    getLineColor: [0, 0, 0, 255],
    lineWidthMinPixels: 1,
  });

  // OSMタイルレイヤー（ベースマップとして表示）
  const tileLayer = new TileLayer({
    data: "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
    minZoom: 0,
    maxZoom: 19,
    tileSize: 256,
    // サブレイヤー設定
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

  // レイヤーの重ね順を配列で指定
  return [tileLayer, geoJSONlayer];
}
