import React from "react";
import { hot } from 'react-hot-loader/root';
import { createWorldTerrain } from "cesium"
import { Viewer } from "resium";

function App() {
  return <Viewer full terrainProvider={createWorldTerrain()}/>;
}

export default hot(App);
