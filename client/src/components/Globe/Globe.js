import React, { useState, useEffect, useRef, useMemo } from 'react';
import Globe from 'react-globe.gl';
import './Globe.css';

export default function World() {
  // support rendering markers with simple data
  const globeEl = useRef();
  const [popData, setPopData] = useState([]);

  const w = window.innerWidth;
  const shiftFactor = 0.4;
  const shiftAmount = shiftFactor * w;

  // Gen random paths
  // const N_PATHS = 10;
  // const MAX_POINTS_PER_LINE = 10000;
  // const MAX_STEP_DEG = 1;
  // const MAX_STEP_ALT = 0.015;

  // const gData = useMemo(() => [...Array(N_PATHS).keys()].map(() => {
  //   let lat = (Math.random() - 0.5) * 90;
  //   let lng = (Math.random() - 0.5) * 360;
  //   let alt = 0;

  //   return [[lat, lng, alt], ...[...Array(Math.round(Math.random() * MAX_POINTS_PER_LINE)).keys()].map(() => {
  //     lat += (Math.random() * 2 - 1) * MAX_STEP_DEG;
  //     lng += (Math.random() * 2 - 1) * MAX_STEP_DEG;
  //     alt += (Math.random() * 2 - 1) * MAX_STEP_ALT;
  //     alt = Math.max(0, alt);

  //     return [lat, lng, alt];
  //   })];
  // }),
  // []
  // );

  
  useEffect(() => {
    // Auto-rotate
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.1;
  }, []);
  // simple component usage
  return (
    <div id="globe"
      style={{
        marginLeft: `-${shiftAmount}px`
      }}
    >
      <Globe
        // Globe
        ref={globeEl}
        globeImageUrl="image1.jpeg"//change 
        // bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        // pathsData={ gData }
        width={w + shiftAmount}
        hexBinPointsData={popData}
        hexBinPointWeight="pop"
        hexAltitude={d => d.sumWeight * 6e-8}
        hexBinResolution={4}
        // hexTopColor={d => weightColor(d.sumWeight)}
        // hexSideColor={d => weightColor(d.sumWeight)}
        hexBinMerge={true}
        enablePointerInteraction={false}
      />
    </div>
  )
}