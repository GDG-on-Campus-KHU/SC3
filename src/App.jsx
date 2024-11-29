import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import MissingPersonPanel from "./components/MissingPersonPanel";
import useLocation from "./hooks/useLocation";
import { useMissingPersons } from "./hooks/useMissingPersons";
//import { MOCK_MISSING_PERSONS } from "./constants/mockData";

function App() {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [visiblePersons, setVisiblePersons] = useState([]);
  const [processedPersons, setProcessedPersons] = useState([]);
  const { persons } = useMissingPersons();
  const { location, setCurrentLocation } = useLocation();
  //const [persons, setPersons] = useState([]);
  // 실종자 데이터 초기 처리
  useEffect(() => {
    if (!persons.length) return;

    const processed = async () => {
      const updatedPersons = await Promise.all(
        persons.map(async (person) => {
          // string 주소로 좌표 변환
          let location = { latitude: null, longitude: null };
          try {
            const { lat, lng } = await new Promise((resolve, reject) => {
              naver.maps.Service.geocode({ query: person.region[0] }, (status, response) => {
                if (status === naver.maps.Service.Status.OK && response.v2.addresses[0]) {
                  const result = response.v2.addresses[0];
                  resolve({ lat: result.y, lng: result.x });
                } else {
                  resolve({ lat: null, lng: null });
                }
              });
            });
            location = { latitude: lat, longitude: lng };
          } 
          catch (err) {
            console.error("Geocoding failed:", err);
          }
  
          return {
            ...person,
            location,
            image: `/dummy_image.jpg`, // public 폴더의 이미지 경로
          };
        })
      );
      
      console.log("Initial processed persons:", updatedPersons);
      setProcessedPersons(updatedPersons);
    }

    // geocoding 구현 후 변경
   /*  const processed = 
      persons.map((person, index) => ({
      ...person,
      location: {
        latitude: 37.5665 + Math.random() * 0.1,
        longitude: 126.978 + Math.random() * 0.1,
      },
      // 더미 이미지 경로 추가
      image: `/dummy_image.jpg`,  // public 폴더의 이미지 경로
    })); */

   processed();

  }, [persons]);

  /** 지도를 불러옵니다 */
  const initMap = (location) => {
    const map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(location.latitude, location.longitude), // 초기 위치
      zoom: 18,
    });

    setMap(map);
    //setPerson(MOCK_MISSING_PERSONS);
  };

  // 지도 영역 변경 이벤트 처리
  useEffect(() => {
    if (!map || !processedPersons.length) return;

    const handleBoundsChanged = () => {
      const bounds = map.getBounds();
      const visible = processedPersons.filter((person) => {
        const position = new naver.maps.LatLng(person.location.latitude, person.location.longitude);
        return bounds.hasLatLng(position);
      });

      console.log(`Found ${visible.length} visible persons`);
      setVisiblePersons(visible);
    };

    const listener = naver.maps.Event.addListener(map, "idle", handleBoundsChanged);

    handleBoundsChanged();

    return () => {
      if (listener) {
        naver.maps.Event.removeListener(listener);
      }
    };
  }, [map, processedPersons]);

  // 마커 생성 함수
  const createMarkers = (mapInstance, personsData) => {
    // 기존 마커 제거
    markers.forEach((marker) => marker.setMap(null));

    // 새 마커 생성
    const newMarkers = personsData.map((person) => {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(person.location.latitude, person.location.longitude),
        map: mapInstance,
      });

      // 마커 클릭 이벤트
      naver.maps.Event.addListener(marker, "click", () => {
        handlePersonClick(person);
      });

      return marker;
    });

    setMarkers(newMarkers);
  };

  useEffect(() => {
    setCurrentLocation();
  }, []);

  // 지도 초기화 및 위치 설정
  useEffect(() => {
    if (location && document.getElementById("map")) {
      if (!map) initMap(location);
      else {
        let newPosition = new naver.maps.LatLng(location.latitude, location.longitude);
        map.setCenter(newPosition);
      }
    }
  }, [location]);

  // 마커 생성
  useEffect(() => {
    if (map && processedPersons.length > 0) {
      console.log("Updating markers with processed persons:", processedPersons);
      createMarkers(map, processedPersons);
    }
  }, [map, processedPersons]);

  // 실종자 선택 핸들러
  const handlePersonClick = (person) => {
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