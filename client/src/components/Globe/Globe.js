import React, { useState, useEffect, useRef } from 'react';
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
  // const N = 2;
  var gData = [];
  const latArr = [35,32.34,28.9,27,28.5,29.1,35.5,34.4,36,70.3,47.2,40.4,40];
  const lngArr = [-101,-102.7,-97.8,-91,-89.75,-87.9,-117,-120,-124,-148,-102.7,-106,-79];

  // test
  let list = [];
  latArr.forEach((element, index) => {
    list.push([element , lngArr[index]]);
  });
  console.log(list);

  list.forEach(element => {
    gData = [...Array(N)].map(() => ({
      lat: element[0],
      lng: element[1],
      size: Math.random() / 5,
      color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
    }
    ));
  });

  //sampleData
  let pointTexas = { lat: 35, lng: -101, size: 0.25,  color: 'yellow'}
  let pointAlaska = { lat: 76, lng: -148, size: 0.1,  color: 'blue'}

  let sampleData = [pointTexas, pointAlaska];
  // let size= Math.random() / 5;
  // let color = ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)];
  // console.log(gData);

  // const latArr = [35,32.34];
  // const lngArr = [-101,-102.7];
  // latArr.forEach((element, index) => {
  //   gData = [...Array(N)].map(() => ({
  //     lat: element,
  //     lng: lngArr[index],
  //     size: Math.random() / 5,
  //     color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
  //   }
  //   ));
  //   // console.log(element, lngArr[index]);
  // });

  // gData = [...Array(N).keys()].map((element, index) => ({
  //   lat: 35,
  //   lng: -101,
  //   size: Math.random() / 5,
  //   color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
  // }
  // ));

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
        // pointsData={gData}
        pointsData={sampleData}
        pointAltitude="size"
        pointColor="color"
        showGraticules={true}
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