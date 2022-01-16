import React, { useRef, useEffect } from "react";
import { hot } from "react-hot-loader/root";
import {
  createWorldTerrain,
  createOsmBuildings,
  JulianDate,
  SampledPositionProperty,
  Cartesian3,
  Color,
  TimeIntervalCollection,
  TimeInterval,
  PathGraphics,
  VelocityOrientationProperty,
  PolylineGlowMaterialProperty,
} from "cesium";
import { Viewer } from "resium";
import { flightData } from "./utils/consts";

function App() {
  const ref = useRef();
  const timeStepInSeconds = 30;
  const totalSeconds = timeStepInSeconds * (flightData.length - 1);
  const start = JulianDate.fromIso8601(new Date().toISOString());
  const stop = JulianDate.addSeconds(start, totalSeconds, new JulianDate());
  useEffect(() => {
    const viewer = ref?.current?.cesiumElement;
    if (viewer) {
      viewer.scene.primitives.add(createOsmBuildings());
      viewer.clock.startTime = start.clone();
      viewer.clock.stopTime = stop.clone();
      viewer.clock.currentTime = start.clone();
      viewer.timeline.zoomTo(start, stop);
      viewer.clock.multiplier = 2;
      viewer.clock.shouldAnimate = true;

      const positionProperty = new SampledPositionProperty();

      for (let i = 0; i < flightData.length; i++) {
        const dataPoint = flightData[i];
        const time = JulianDate.addSeconds(
          start,
          i * timeStepInSeconds,
          new JulianDate()
        );
        const position = Cartesian3.fromDegrees(
          dataPoint.longitude,
          dataPoint.latitude,
          dataPoint.height
        );
        positionProperty.addSample(time, position);

        viewer.entities.add({
          description: `Location: (${dataPoint.longitude}, ${dataPoint.latitude}, ${dataPoint.height})`,
          position: position,
          point: {
            pixelSize: 10,
            color: Color.TRANSPARENT,
            outlineColor: Color.RED,
            outlineWidth: 2,
          },
        });
      }

      const airplaneEntity = viewer.entities.add({
        availability: new TimeIntervalCollection([
          new TimeInterval({ start: start, stop: stop }),
        ]),
        position: positionProperty,
        model: {
          uri: "https://s3.amazonaws.com/cesiumjs/downloads/Cesium_Air.glb",
        },
        orientation: new VelocityOrientationProperty(positionProperty),
        path: new PathGraphics({
          resolution: 4,
          material: new PolylineGlowMaterialProperty({
            glowPower: 0.5,
            color: Color.YELLOW,
          }),
          width: 3,
        }),
      });

      viewer.trackedEntity = airplaneEntity;
    }
  }, [start, stop]);

  return (
    <Viewer
      ref={ref}
      homeButton={false}
      sceneModePicker={false}
      full
      terrainProvider={createWorldTerrain()}
    />
  );
}

export default hot(App);
