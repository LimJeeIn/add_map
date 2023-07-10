import React, { useState, useEffect } from 'react';
import * as S from './PreschoolMap.style';

export default function PreschoolMap({ list }) {
  useEffect(() => {
    if (list.length === 0) {
      // list가 비어 있으면 지도를 그리지 않는다.
      return;
    }

    const { kakao } = window;
    if (!kakao || !kakao.maps) return; // 검사해서 Kakao 지도 API가 로드되지 않았다면 return.

    const getAverageLatLng = (data) => {
      let totalLat = 0;
      let totalLng = 0;

      data.forEach((element) => {
        totalLat += element.lat;
        totalLng += element.lng;
      });

      const averageLat = totalLat / data.length;
      const averageLng = totalLng / data.length;

      return { averageLat, averageLng };
    };

    const createMap = () => {
      const container = document.getElementById('map');
      const { averageLat, averageLng } = getAverageLatLng(list);
      const options = {
        center: new kakao.maps.LatLng(averageLat, averageLng),
        level: 8,
        draggable: true,
        scrollwheel: true,
      };
      const kakaoMap = new kakao.maps.Map(container, options);
      kakaoMap.setZoomable(true);

      const zoomControl = new kakao.maps.ZoomControl();
      kakaoMap.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      return kakaoMap;
    };

    const addMarkers = (kakaoMap, data) => {
      data.forEach((el) => {
        const marker = new kakao.maps.Marker({
          map: kakaoMap,
          position: new kakao.maps.LatLng(el.lat, el.lng),
          title: el.name,
        });

        const iwContent = `<div style="padding:10px; font-weight:700;">${el.name}</div>`;
        const infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
        });

        kakao.maps.event.addListener(marker, 'mouseover', () => {
          infowindow.open(kakaoMap, marker);
        });

        kakao.maps.event.addListener(marker, 'mouseout', () => {
          infowindow.close();
        });

        kakao.maps.event.addListener(marker, 'click', () => {
          kakaoMap.setCenter(marker.getPosition());
          kakaoMap.setLevel(1);
        });
      });
    };

    if (!list) return;
    const kakaoMap = createMap();
    addMarkers(kakaoMap, list);
  }, [list]);
  return (
    <S.Main>
      <div id="map" className="mapDetail"></div>
    </S.Main>
  );
}
