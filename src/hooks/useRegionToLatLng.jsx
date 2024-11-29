import { useState } from "react";

const useRegionToLatLng = () => {
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [error, setError] = useState(null);
  
  // 지역 캐싱을 위한 Map
  const cache = new Map();

  const setLatLng = (region) => {
    if (cache.has(region)) {
      setCoordinates(cache.get(region)); // 캐싱된 값 사용
      return;
    }

    naver.maps.Service.geocode({ query: region }, (status, response) => {
      if (status !== naver.maps.Service.Status.OK) {
        const errorMsg = '찾을 수 없는 지역입니다.';
        setError(errorMsg);
        console.error(errorMsg);
        return;
      }

      const result = response.v2.addresses[0];
      if (result) {
        const newCoordinates = { lat: result.y, lng: result.x };
        cache.set(region, newCoordinates); // 캐싱 저장
        setCoordinates(newCoordinates);
      } else {
        const errorMsg = '주소 결과가 없습니다.';
        setError(errorMsg);
        console.error(errorMsg);
      }
    });
  };

  return { setLatLng, coordinates, error };
};

export default useRegionToLatLng;

