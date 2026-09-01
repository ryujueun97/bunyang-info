// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Search, MapPin, X, PhoneCall } from 'lucide-react';

import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const KoreaGeoLayer = dynamic(() => import('./KoreaGeoLayer'), { ssr: false });

interface Property {
  id: string;
  title: string;
  province: string;
  city: string;
  status: '분양중' | '분양예정' | '분양완료';
  category: string;
  address: string;
  image: string;
  lat: number;
  lng: number;
  areaSize?: string;
  price?: string;
  description?: string;
}

const REPRESENTATIVE_PROPERTIES: Property[] = [
  {
    id: '1',
    title: '오송 바이오폴리스',
    province: '충청북도',
    city: '청주시',
    status: '분양중',
    category: '산업단지',
    address: '충청북도 청주시 흥덕구 오송읍',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80',
    lat: 36.6200,
    lng: 127.3200,
    areaSize: '1,200,000m²',
    price: '평당 약 150만원~',
    description: '바이오 헬스케어 및 첨단 소재 기업 중심 입지, KTX 오송역 인접.'
  },
  {
    id: '2',
    title: '경산 4 일반산단',
    province: '경상북도',
    city: '경산시',
    status: '분양중',
    category: '산업단지',
    address: '경상북도 경산시 진량읍',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80',
    lat: 35.8500,
    lng: 128.8000,
    areaSize: '850,000m²',
    price: '평당 약 120만원~',
    description: '자동차 부품 및 금속 가공 특화 산업단지, 경부고속도로 인접.'
  },
  {
    id: '3',
    title: '평택 고덕 첨단단지',
    province: '경기도',
    city: '평택시',
    status: '분양중',
    category: '복합단지',
    address: '경기도 평택시 고덕면',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80',
    lat: 37.0500,
    lng: 127.0500,
    areaSize: '2,100,000m²',
    price: '평당 약 280만원~',
    description: '삼성전자 평택캠퍼스 인접, 첨단 반도체 클러스터 공급 단지.'
  },
  {
    id: '4',
    title: '원주 수소산단',
    province: '강원특별자치도',
    city: '원주시',
    status: '분양중',
    category: '산업단지',
    address: '강원특별자치도 원주시 문막읍',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    lat: 37.3300,
    lng: 127.8500,
    areaSize: '620,000m²',
    price: '평당 약 95만원~',
    description: '수도권 접근성 우수, 친환경 에너지 특화 산업단지.'
  },
  {
    id: '5',
    title: '창원 국가산단',
    province: '경상남도',
    city: '창원시',
    status: '분양중',
    category: '국가산업단지',
    address: '경상남도 창원시 성산구',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80',
    lat: 35.2000,
    lng: 128.6500,
    areaSize: '1,500,000m²',
    price: '평당 약 210만원~',
    description: '기계·방산 클러스터 중심지, 최첨단 스마트 그린산단.'
  },
  {
    id: '6',
    title: '전주 탄소산단',
    province: '전라북도',
    city: '전주시',
    status: '분양중',
    category: '국가산업단지',
    address: '전라북도 전주시 덕진구',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    lat: 35.8500,
    lng: 127.1000,
    areaSize: '650,000m²',
    price: '평당 약 110만원~',
    description: '대한민국 탄소산업 허브 메카 산업단지.'
  },
  {
    id: '7',
    title: '여수 율촌 물류단지',
    province: '전라남도',
    city: '여수시',
    status: '분양중',
    category: '물류산업단지',
    address: '전라남도 여수시 율촌면',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80',
    lat: 34.8500,
    lng: 127.5500,
    areaSize: '980,000m²',
    price: '평당 약 88만원~',
    description: '광양항 인접 항만물류 및 석유화학 연계 단지.'
  }
];

export default function MapView() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [geoData, setGeoData] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [leafletIcons, setLeafletIcons] = useState<Record<string, any>>({});

  useEffect(() => {
    setIsMounted(true);

    // 📌 시·도 큰 단위 경계선 데이터 순차 로딩 (public/geo/ 내 파일 우선 연결)
    fetch('/geo/kor_sido_test_b.json')
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch(() => {
        // 온라인 백업 광역시/도 경계 데이터
        fetch('https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2013/json/skorea_provinces_2013_geo.json')
          .then((res) => res.json())
          .then((data) => setGeoData(data))
          .catch(() => setGeoData({ type: 'FeatureCollection', features: [] }));
      });

    import('leaflet').then((L) => {
      const iconMap: Record<string, any> = {};
      REPRESENTATIVE_PROPERTIES.forEach((prop) => {
        iconMap[prop.id] = L.divIcon({
          className: 'custom-card-marker-clickable',
          html: `
            <div style="display:flex; flex-direction:column; align-items:center; transform: translate(-50%, -100%); width: 105px; cursor: pointer;">
              <div style="width:105px; background:rgba(255,255,255,0.98); border:1.5px solid #0284c7; border-radius:8px; box-shadow:0 8px 16px rgba(0,0,0,0.2); overflow:hidden;">
                <div style="position:relative; height:44px; width:100%; background:#e2e8f0;">
                  <img src="${prop.image}" alt="${prop.title}" style="width:100%; height:100%; object-fit:cover;" />
                  <span style="position:absolute; top:4px; left:4px; background:#06b6d4; color:#ffffff; font-weight:bold; font-size:8px; padding:1px 4px; border-radius:3px;">
                    ${prop.status}
                  </span>
                </div>
                <div style="padding:4px; text-align:center; background:#ffffff;">
                  <span style="display:block; font-weight:800; font-size:10px; color:#0f172a; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                    ${prop.title}
                  </span>
                </div>
              </div>
              <div style="width:10px; height:10px; background:#dc2626; border:2px solid #ffffff; border-radius:50%; margin-top:-2px; box-shadow:0 2px 4px rgba(0,0,0,0.3);"></div>
            </div>
          `,
          iconSize: [0, 0],
          iconAnchor: [0, 0]
        });
      });
      setLeafletIcons(iconMap);
    });
  }, []);

  const filteredProperties = REPRESENTATIVE_PROPERTIES.filter(
    (prop) =>
      prop.title.includes(searchQuery) ||
      prop.province.includes(searchQuery) ||
      prop.city.includes(searchQuery) ||
      prop.address.includes(searchQuery)
  );

  if (!isMounted) return null;

  return (
    <div className="relative w-full h-[calc(100vh-53px)] bg-[#e0f2fe] flex items-center justify-center overflow-hidden [&_.leaflet-control-attribution]:hidden">
      
      {/* 1. 상단 시·도 검색 바 */}
      <div className="absolute top-4 z-[2000] w-11/12 max-w-md">
        <div className="relative flex items-center bg-white rounded-xl shadow-md border border-slate-200">
          <Search className="w-5 h-5 text-slate-400 ml-3.5 flex-shrink-0" />
          <input 
            type="text" 
            placeholder="지역 검색 예: 경기도, 충청북도, 경상남도"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 px-3 text-sm bg-transparent focus:outline-none text-slate-700 font-medium"
          />
        </div>
      </div>

      {/* 2. 지도 및 마커 영역 */}
      <div className="w-full h-full relative">
        <MapContainer
          center={[36.0, 127.8]}
          zoom={7}
          zoomControl={true}
          attributionControl={false}
          className="w-full h-full bg-[#e0f2fe]"
        >
          {/* 대한민국 광역시/도 단위 경계 지도 */}
          {geoData && (
            <KoreaGeoLayer
              geo={geoData}
              selectedCode={selectedCode}
              onSelect={(region) => setSelectedCode(region?.code || null)}
            />
          )}

          {/* 주요 카드 핀 */}
          {filteredProperties.map((prop) => (
            leafletIcons[prop.id] && (
              <Marker
                key={prop.id}
                position={[prop.lat, prop.lng]}
                icon={leafletIcons[prop.id]}
                zIndexOffset={5000}
                eventHandlers={{
                  click: () => setSelectedProperty(prop)
                }}
              />
            )
          ))}
        </MapContainer>
      </div>

      {/* 3. 상세 모달 팝업 */}
      {selectedProperty && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="relative h-44 bg-slate-100">
              <img 
                src={selectedProperty.image} 
                alt={selectedProperty.title} 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setSelectedProperty(null)}
                className="absolute top-2.5 right-2.5 bg-black/50 text-white p-1 rounded-full hover:bg-black/80 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-2">
              <div>
                <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                  {selectedProperty.province} 대표 단지
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">{selectedProperty.title}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {selectedProperty.address}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block font-semibold text-[10px]">공급 면적</span>
                  <span className="font-bold text-slate-700">{selectedProperty.areaSize || '상담 문의'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold text-[10px]">분양가 단가</span>
                  <span className="font-bold text-red-600">{selectedProperty.price || '상담 문의'}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-blue-50/40 p-2.5 rounded-lg border border-blue-100 text-[11px]">
                {selectedProperty.description}
              </p>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex gap-2">
              <a 
                href="tel:1588-0000" 
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg text-xs flex items-center justify-center gap-1 shadow transition"
              >
                <PhoneCall className="w-3.5 h-3.5" /> 상담 연결
              </a>
              <button 
                onClick={() => setSelectedProperty(null)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}