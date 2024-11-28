import { useEffect, useState } from 'react'
import './App.css'
import Header from 'components/Header';
import useLocation from 'hooks/useLocation';


function App() {
  const [map, setMap] = useState(null);
  const { location, setCurrentLocation} = useLocation();

  /** 지도를 불러옵니다 */
  const initMap = (location) => {

      const map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(location.latitude, location.longitude), // 초기 위치
        zoom: 18,
      });
      setMap(map);
    }


  useEffect(() => { 
    setCurrentLocation();
  }, []);

  useEffect(()=>{
    if (location) {
      if (!map)  initMap(location); 
      else {
        let newPosition = new naver.maps.LatLng(location.latitude, location.longitude);
        map.setCenter(newPosition);
      }
    }

  },[location]);

 


  return (
    <>
      <Header/>
      <div id="map" style={{ width: "100%", height: "100vh" }} />
    </>
  )
}

export default App

