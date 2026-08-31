'use client';

import React, { useState } from 'react';
import { 
  MapPin, Building, CheckCircle2, Clock, AlertCircle, 
  Navigation, PhoneCall, X
} from 'lucide-react';

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

const PROPERTIES: Property[] = [
  {
    id: '1',
    title: '오송 바이오폴리스',
    province: '충청북도',
    city: '청주시',
    status: '분양중',
    category: '산업단지',
    address: '충청북도 청주시 흥덕구 오송읍',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80',
    lat: 38,
    lng: 48,
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
    lat: 48,
    lng: 70,
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
    lat: 25,
    lng: 40,
    areaSize: '2,100,000m²',
    price: '평당 약 280만원~',
    description: '삼성전자 평택캠퍼스 인접, 첨단 반도체 클러스터 공급 단지.'
  },
  {
    id: '4',
    title: '마곡 R&D 센터',
    province: '서울특별시',
    city: '강서구',
    status: '분양중',
    category: '지식산업센터',
    address: '서울특별시 강서구 마곡동',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    lat: 18,
    lng: 36,
    areaSize: '35,000m²',
    price: '평당 약 1,800만원~',
    description: '서울 마곡지구 R&D 융복합 클러스터 핵심 입지.'
  },
  {
    id: '5',
    title: '송도 바이오단지',
    province: '인천광역시',
    city: '연수구',
    status: '분양중',
    category: '첨단단지',
    address: '인천광역시 연수구 송도동',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=600&q=80',
    lat: 22,
    lng: 28,
    areaSize: '500,000m²',
    price: '평당 약 450만원~',
    description: '바이오 메디컬 글로벌 기업 집적화 단지.'
  },
  {
    id: '6',
    title: '원주 수소산단',
    province: '강원특별자치도',
    city: '원주시',
    status: '분양중',
    category: '산업단지',
    address: '강원특별자치도 원주시 문막읍',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    lat: 20,
    lng: 62,
    areaSize: '620,000m²',
    price: '평당 약 95만원~',
    description: '수도권 접근성 우수, 친환경 에너지 특화 산업단지.'
  },
  {
    id: '7',
    title: '천안 성거 산단',
    province: '충청남도',
    city: '천안시',
    status: '분양중',
    category: '산업단지',
    address: '충청남도 천안시 서북구',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80',
    lat: 34,
    lng: 32,
    areaSize: '400,000m²',
    price: '평당 약 160만원~',
    description: '경부고속도로 북천안IC 5분 거리의 사통팔달 교통망.'
  },
  {
    id: '8',
    title: '창원 국가산단',
    province: '경상남도',
    city: '창원시',
    status: '분양중',
    category: '국가산업단지',
    address: '경상남도 창원시 성산구',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80',
    lat: 56,
    lng: 60,
    areaSize: '1,500,000m²',
    price: '평당 약 210만원~',
    description: '기계·방산 클러스터 중심지, 최첨단 스마트 그린산단.'
  },
  {
    id: '9',
    title: '전주 탄소산단',
    province: '전라북도',
    city: '전주시',
    status: '분양중',
    category: '국가산업단지',
    address: '전라북도 전주시 덕진구',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    lat: 48,
    lng: 36,
    areaSize: '650,000m²',
    price: '평당 약 110만원~',
    description: '대한민국 탄소산업 허브 메카 산업단지.'
  },
  {
    id: '10',
    title: '여수 율촌 물류단지',
    province: '전라남도',
    city: '여수시',
    status: '분양중',
    category: '물류산업단지',
    address: '전라남도 여수시 율촌면',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80',
    lat: 64,
    lng: 36,
    areaSize: '980,000m²',
    price: '평당 약 88만원~',
    description: '광양항 인접 항만물류 및 석유화학 연계 단지.'
  },
  {
    id: '11',
    title: '제주 첨단단지',
    province: '제주특별자치도',
    city: '제주시',
    status: '분양중',
    category: '첨단단지',
    address: '제주특별자치도 제주시 아라동',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=600&q=80',
    lat: 84,
    lng: 26,
    areaSize: '840,000m²',
    price: '평당 약 130만원~',
    description: 'IT·BT 기술 및 청정 융복합 글로벌 연구단지.'
  }
];

export default function CustomMap() {
  const [selectedProvince, setSelectedProvince] = useState<string>('전체');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [myLocation, setMyLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const handleGetMyLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setMyLocation({ lat: 25, lng: 38 });
          setIsLocating(false);
        },
        () => {
          alert('위치 권한을 확인해 주세요.');
          setIsLocating(false);
        }
      );
    } else {
      alert('위치 서비스를 지원하지 않습니다.');
      setIsLocating(false);
    }
  };

  const filteredProperties = PROPERTIES.filter(p => 
    selectedProvince === '전체' || p.province === selectedProvince
  );

  return (
    <div className="w-full h-full flex flex-col bg-slate-100 p-4 rounded-2xl relative">
      
      {/* MAP HEADER CONTROL */}
      <div className="flex items-center justify-between mb-3 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-sm z-10">
        <div>
          <h2 className="font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-600" />
            전국 도별 대표 분양 지도
          </h2>
          <p className="text-[11px] text-slate-500">붉은 테두리: 도 단위 경계 | 대표 이미지 카드 클릭 시 상세 팝업</p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleGetMyLocation}
            disabled={isLocating}
            className="flex items-center gap-1 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1.5 rounded-lg shadow transition"
          >
            <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
            {isLocating ? '위치 확인중...' : '내위치표시'}
          </button>

          {selectedProvince !== '전체' && (
            <button 
              onClick={() => setSelectedProvince('전체')}
              className="text-xs bg-red-100 text-red-600 font-bold px-2.5 py-1.5 rounded-lg hover:bg-red-200 transition"
            >
              전체보기
            </button>
          )}
        </div>
      </div>

      {/* MAP CANVAS */}
      <div className="relative flex-1 w-full h-full min-h-[520px] flex items-center justify-center overflow-hidden rounded-xl bg-slate-50/50 border border-slate-200">
        
        {/* SVG PROVINCE BOUNDARIES IN RED */}
        <svg 
          viewBox="0 0 500 700" 
          className="w-full h-full max-h-[600px] drop-shadow-md select-none"
        >
          <g stroke="#EF4444" strokeWidth="2.5" strokeLinejoin="round" fill="#F8FAFC" className="transition-all">
            <path 
              d="M170,120 L210,110 L250,140 L230,200 L180,220 L140,180 Z" 
              className={`cursor-pointer hover:fill-red-100/80 transition ${selectedProvince === '경기도' || selectedProvince === '서울특별시' || selectedProvince === '인천광역시' ? 'fill-red-200/80 stroke-red-600 stroke-[3.5]' : ''}`}
              onClick={() => setSelectedProvince('경기도')}
            />
            <path 
              d="M210,110 L340,90 L380,180 L250,210 L250,140 Z" 
              className={`cursor-pointer hover:fill-red-100/80 transition ${selectedProvince === '강원특별자치도' ? 'fill-red-200/80 stroke-red-600 stroke-[3.5]' : ''}`}
              onClick={() => setSelectedProvince('강원특별자치도')}
            />
            <path 
              d="M230,200 L300,210 L280,300 L210,280 L210,230 Z" 
              className={`cursor-pointer hover:fill-red-100/80 transition ${selectedProvince === '충청북도' ? 'fill-red-200/80 stroke-red-600 stroke-[3.5]' : ''}`}
              onClick={() => setSelectedProvince('충청북도')}
            />
            <path 
              d="M140,180 L210,230 L210,280 L150,330 L100,260 Z" 
              className={`cursor-pointer hover:fill-red-100/80 transition ${selectedProvince === '충청남도' ? 'fill-red-200/80 stroke-red-600 stroke-[3.5]' : ''}`}
              onClick={() => setSelectedProvince('충청남도')}
            />
            <path 
              d="M300,210 L380,180 L420,340 L340,390 L280,300 Z" 
              className={`cursor-pointer hover:fill-red-100/80 transition ${selectedProvince === '경상북도' ? 'fill-red-200/80 stroke-red-600 stroke-[3.5]' : ''}`}
              onClick={() => setSelectedProvince('경상북도')}
            />
            <path 
              d="M280,300 L340,390 L320,460 L230,440 L250,370 Z" 
              className={`cursor-pointer hover:fill-red-100/80 transition ${selectedProvince === '경상남도' ? 'fill-red-200/80 stroke-red-600 stroke-[3.5]' : ''}`}
              onClick={() => setSelectedProvince('경상남도')}
            />
            <path 
              d="M150,330 L210,280 L250,370 L180,420 L130,370 Z" 
              className={`cursor-pointer hover:fill-red-100/80 transition ${selectedProvince === '전라북도' ? 'fill-red-200/80 stroke-red-600 stroke-[3.5]' : ''}`}
              onClick={() => setSelectedProvince('전라북도')}
            />
            <path 
              d="M130,370 L180,420 L230,440 L200,530 L100,500 Z" 
              className={`cursor-pointer hover:fill-red-100/80 transition ${selectedProvince === '전라남도' ? 'fill-red-200/80 stroke-red-600 stroke-[3.5]' : ''}`}
              onClick={() => setSelectedProvince('전라남도')}
            />
            <path 
              d="M110,580 L170,580 L160,620 L100,610 Z" 
              className={`cursor-pointer hover:fill-red-100/80 transition ${selectedProvince === '제주특별자치도' ? 'fill-red-200/80 stroke-red-600 stroke-[3.5]' : ''}`}
              onClick={() => setSelectedProvince('제주특별자치도')}
            />
          </g>
        </svg>

        {/* MY LOCATION PIN */}
        {myLocation && (
          <div 
            style={{ top: `${myLocation.lat}%`, left: `${myLocation.lng}%` }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30"
          >
            <div className="flex flex-col items-center">
              <div className="bg-emerald-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1">
                <Navigation className="w-3 h-3 fill-white" /> 내 위치
              </div>
              <div className="w-4 h-4 bg-emerald-500/30 rounded-full flex items-center justify-center -mt-1 animate-ping">
                <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
              </div>
            </div>
          </div>
        )}

        {/* REPRESENTATIVE PROPERTY IMAGE CARDS */}
        {filteredProperties.map((p) => (
          <div 
            key={p.id}
            style={{ top: `${p.lat}%`, left: `${p.lng}%` }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
            onClick={() => setSelectedProperty(p)}
          >
            <div className="flex flex-col items-center">
              <div className="bg-white/95 backdrop-blur-md border border-slate-300 shadow-xl rounded-xl overflow-hidden w-28 sm:w-32 transition transform group-hover:scale-110 group-hover:border-red-500">
                <div className="relative h-14 sm:h-16 w-full bg-slate-100 overflow-hidden">
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1 left-1">
                    <span className="bg-cyan-500 text-white font-bold text-[9px] px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
                      <CheckCircle2 className="w-2.5 h-2.5"/> 분양중
                    </span>
                  </div>
                </div>
                <div className="p-1.5 text-center bg-white">
                  <span className="block font-extrabold text-[11px] text-slate-900 truncate">
                    {p.title}
                  </span>
                  <span className="block text-[9px] text-slate-400 font-medium truncate">
                    {p.province}
                  </span>
                </div>
              </div>
              <div className="w-3 h-3 bg-red-600 rounded-full border-2 border-white shadow-md -mt-1 animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* POPUP MODAL */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden z-10 animate-in zoom-in-95 duration-150">
            <div className="relative h-48 bg-slate-100">
              <img 
                src={selectedProperty.image} 
                alt={selectedProperty.title} 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setSelectedProperty(null)}
                className="absolute top-3 right-3 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/80 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3">
              <div>
                <span className="text-xs font-bold text-blue-600">{selectedProperty.category}</span>
                <h3 className="text-xl font-extrabold text-slate-900">{selectedProperty.title}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {selectedProperty.address}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block font-semibold">공급 면적</span>
                  <span className="font-bold text-slate-700">{selectedProperty.areaSize || '상담 문의'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">분양가 단가</span>
                  <span className="font-bold text-red-600">{selectedProperty.price || '상담 문의'}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                {selectedProperty.description}
              </p>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-2">
              <a 
                href="tel:1588-0000" 
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow transition"
              >
                <PhoneCall className="w-4 h-4" /> 분양 상담하기
              </a>
              <button 
                onClick={() => setSelectedProperty(null)}
                className="px-4 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
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