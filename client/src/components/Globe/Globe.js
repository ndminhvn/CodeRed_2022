import React, { useState, useEffect, useRef, useMemo } from 'react';
import Globe from 'react-globe.gl';
import './Globe.css';

export default function World() {
  const globeEl = useRef();
  const [regionData, setRegionData] = useState([]);
  // const [popData, setPopData] = useState([]);

  const w = window.innerWidth;
  const shiftFactor = 0.4;
  const shiftAmount = shiftFactor * w;
  
  useEffect(() => {
    // Auto-rotate
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.1;
  }, []);

  const getData = () => {
    fetch('regionalData.json',
        {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    )
    .then(response => response.json())
    .then(regionData => setRegionData(regionData))
    .catch(error => console.log(error));
  }

  useEffect(() => {
    getData()
  }, [])

  // Gen random data
  const N = 13;
  let gData = [];
  const latArr = [35,32.34,28.9,27,28.5,29.1,35.5,34.4,36,70.3,47.2,40.4,40];
  const lngArr = [-101,-102.7,-97.8,-91,-89.75,-87.9,-117,-120,-124,-148,-102.7,-106,-79];
  // latArr.forEach(element => {
  //   gData = [...Array(N).keys()].map(() => ({
  //     lat: element,
  //     lng: -101,
  //     size: Math.random() / 3,
  //     color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
  //   }));
  // });

  for (let i = 0; i < N; i++) {
    gData = [...Array(N).keys()].map(() => ({
      lat: latArr[i],
      lng: lngArr[i],
      size: Math.random() / 3,
      color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
    }));
  }

  return (
    <div id="globe"
      style={{
        marginLeft: `-${shiftAmount}px`
      }}
    >
      <Globe
        // Globe
        ref={globeEl}
        globeImageUrl="image1.jpeg"
        // bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        // pathsData={ gData }
        width={w + shiftAmount}
        pointsData={gData}
        pointAltitude="size"
        pointColor="color"
        // hexBinPointsData={popData}
        // hexBinPointWeight="pop"
        // hexAltitude={d => d.sumWeight * 6e-8}
        // hexBinResolution={4}
        // hexTopColor={d => weightColor(d.sumWeight)}
        // hexSideColor={d => weightColor(d.sumWeight)}
        // hexBinMerge={true}
        enablePointerInteraction={false}

      />
    </div>
  )
}