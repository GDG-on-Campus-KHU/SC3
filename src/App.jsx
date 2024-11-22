import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header';


function App() {
  const [map, setMap] = useState(null);

  // 맵 호출
  useEffect(()=>{
    const initMap = () => {
      const map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(37.5665, 126.9780), // 초기 위치
        zoom: 18,
      });
      setMap(map);
    }
  initMap();
},[]);

  return (
    <>
      <Header/>
      <div id="map" style={{ width: "100%", height: "100vh" }} />
    </>
  )
}

export default App

