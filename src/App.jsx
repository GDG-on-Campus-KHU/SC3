import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import MissingPersonPanel from "./components/MissingPersonPanel";
import useLocation from "./hooks/useLocation";
import { MOCK_MISSING_PERSONS } from "./constants/mockData";
import useRegionToLatLng from "./hooks/useRegionToLatLng";

function App() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [visiblePersons, setVisiblePersons] = useState([]);
  const {lat,lng,  setLatLng } = useRegionToLatLng();
  const [selectedPerson, setSelectedPerson] = useState(null);
  const { location, setCurrentLocation } = useLocation();


  /** 지도를 불러옵니다 */
  const initMap = (location) => {
    const map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(location.latitude, location.longitude), // 초기 위치
      zoom: 18,
    });

    

    // 지도 영역 변경 이벤트 처리
    naver.maps.Event.addListener(map, "bounds_changed", () => {
      const bounds = map.getBounds();

      // 현재 지도 영역 내의 실종자 필터링
      const visible = MOCK_MISSING_PERSONS.filter((person) => {
        const position = new naver.maps.LatLng(person.location.latitude, person.location.longitude);
        return bounds.hasLatLng(position);
      });
      setVisiblePersons(visible);
    
     
    });

   
    


    setMap(map);
  };

 
  // 목록에 있는 인원을 기준으로 마커 생성
  useEffect(() => {

    if (visiblePersons) {
      createMarkers();
    }

  },[visiblePersons])

  useEffect(() => {
    setCurrentLocation();

  }, []);

   // 마커 생성 함수
   const createMarkers = () => {
    // 기존 마커 제거
    //markers.forEach((marker) => marker.setMap(null));

    // 새 마커 생성
    const newMarkers = visiblePersons.map((person) => {
    
      setLatLng(person.region[0]); 
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lat, lng),
        map: map,
      });  

      // 마커 클릭 이벤트
      naver.maps.Event.addListener(marker, "click", () => {
        console.log("[App] Marker clicked:", person.name);
        setSelectedPerson(person);
       
      });

      return marker;
    });

    setMarkers(newMarkers);

  };



  useEffect(() => {
    if (location) {
  
      // 이 부분에서 위치 좌표값 (location) 기반으로 API 호출하기
      if (!map) initMap(location);
      else {
        let newPosition = new naver.maps.LatLng(location.latitude, location.longitude);
        map.setCenter(newPosition);
        
      }
    }
  }, [location]);

  //지도가 생성된 후 마커 생성
  // useEffect(() => {
  //   if (map) {
      
  //    }
  // }, [map]);

  // 실종자 선택 핸들러
  const handlePersonClick = (person) => {
    setSelectedPerson(person);

    // 지도 중심 이동
    const position = new naver.maps.LatLng(person.location.latitude, person.location.longitude);
    map.setCenter(position);
    map.setZoom(18);
  };

  return (
    <>
      <Header />
      <MissingPersonPanel persons={visiblePersons} onPersonClick={handlePersonClick} />
      <div id="map" style={{ width: "100%", height: "100vh" }} />
    </>
  );
}

export default App;
