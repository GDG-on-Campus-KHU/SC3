import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import MissingPersonPanel from "./components/MissingPersonPanel";
import useLocation from "./hooks/useLocation";
import { MOCK_MISSING_PERSONS } from "./constants/mockData";

function App() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [visiblePersons, setVisiblePersons] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const { location, setCurrentLocation } = useLocation();

  console.log("[App] Current location:", location);

  /** 지도를 불러옵니다 */
  const initMap = (location) => {
    const map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(location.latitude, location.longitude), // 초기 위치
      zoom: 18,
    });

    // 지도 영역 변경 이벤트 처리
    naver.maps.Event.addListener(map, "bounds_changed", () => {
      const bounds = map.getBounds();
      console.log("[App] Map bounds changed");

      // 현재 지도 영역 내의 실종자 필터링
      const visible = MOCK_MISSING_PERSONS.filter((person) => {
        const position = new naver.maps.LatLng(person.location.latitude, person.location.longitude);
        return bounds.hasLatLng(position);
      });

      setVisiblePersons(visible);
      console.log("[App] Visible persons:", visible.length);
    });

    setMap(map);
  };

  // 마커 생성 함수
  const createMarkers = () => {
    console.log("[App] Creating markers");

    // 기존 마커 제거
    markers.forEach((marker) => marker.setMap(null));

    // 새 마커 생성
    const newMarkers = MOCK_MISSING_PERSONS.map((person) => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(person.location.latitude, person.location.longitude),
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
    setCurrentLocation();
  }, []);

  useEffect(() => {
    if (location) {
      if (!map) initMap(location);
      else {
        let newPosition = new naver.maps.LatLng(location.latitude, location.longitude);
        map.setCenter(newPosition);
      }
    }
  }, [location]);

  // 지도가 생성된 후 마커 생성
  useEffect(() => {
    if (map) {
      createMarkers();
    }
  }, [map]);

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
      <MissingPersonPanel persons={visiblePersons} selectedPerson={selectedPerson} onPersonClick={handlePersonClick} />
      <div id="map" style={{ width: "100%", height: "100vh" }} />
    </>
  );
}

export default App;
