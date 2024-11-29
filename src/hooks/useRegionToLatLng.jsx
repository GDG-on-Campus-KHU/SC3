/** string 타입의 데이터인 Region을 좌표로 변환합니다 */

import { useState } from "react";

const useRegionToLatLng = () => {

    const [lat,setLat] = useState(null); // 위도
    const [lng,setLng] = useState(null); // 경도
    
    const setLatLng =  (region) => {
        console.log("region:", region);
        naver.maps.Service.geocode(
            {query: region},
             function(status, response) {
            if (status !== naver.maps.Service.Status.OK) {
                return console.log('찾을 수 없는 지역입니다');
            }
            
            const result = response.v2.addresses[0]; 
            if (result) {
                setLat(result.y); 
                setLng(result.x);
                
            } else {
                console.log('주소 결과가 없습니다.');
            }


    
        });
    }


    return {setLatLng, lat, lng }
}

export default useRegionToLatLng;
