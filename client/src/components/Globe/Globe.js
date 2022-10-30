import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import './Globe.css';

export default function World() {
  // support rendering markers with simple data
  const globeEl = useRef();
  const [popData, setPopData] = useState([]);

  const w = window.innerWidth;
  const shiftFactor = 0.4;
  const shiftAmount = shiftFactor * w;
  
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
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
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