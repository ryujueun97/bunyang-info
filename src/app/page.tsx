'use client';

import React, { useState } from 'react';
import { 
  Menu, X, Search, PhoneCall, ChevronRight, ChevronDown, 
  MapPin, Building, Filter, CheckCircle2, Clock, AlertCircle, RefreshCw, Navigation,
  FileText, Users, Award, ShieldCheck
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
    description: '바이오 헬스케어 및 첨단 소재 기업 중심 입지.'
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
    description: '자동차 부품 및 금속 가공 특화 산업단지.'
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
    description: '삼성전자 평택캠퍼스 인접 첨단 클러스터.'
  }
];

const PROVINCES = ['전체', '서울특별시', '경기도', '인천광역시', '강원특별자치도', '충청북도', '충청남도', '경상북도', '경상남도', '전라북도', '전라남도', '제주특별자치도'];

export default function BunyangPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>('company');
  const [selectedProvince, setSelectedProvince] = useState<string>('전체');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      
      {/* 1. 상단 헤더 */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 lg:px-6 py-2.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-700 transition flex items-center gap-1 font-bold text-xs"
          >
            <Menu className="w-5 h-5 text-red-600" />
            <span className="hidden sm:inline">메뉴</span>
          </button>
          <div className="flex items-center gap-1.5">
            <Building className="w-5 h-5 text-red-600" />
            <span className="font-extrabold text-lg tracking-tight text-slate-900">
              분양<span className="text-red-600">HUB</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition"
          >
            <Search className="w-3.5 h-3.5" />
            <span>조건 검색</span>
          </button>
          <a href="tel:1588-0000" className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition">
            <PhoneCall className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* 2. 회사소개 전용 사이드바 */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)} />
          <div className="relative w-72 bg-white h-full shadow-2xl flex flex-col z-10">
            <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
              <span className="font-bold text-sm flex items-center gap-1.5">
                <Building className="w-4 h-4 text-red-500" /> 메뉴
              </span>
              <button onClick={() => setIsDrawerOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-2">
              <div className="border-b border-slate-100 bg-red-50/30">
                <button 
                  onClick={() => setActiveSubMenu(activeSubMenu === 'company' ? null : 'company')}
                  className="w-full px-4 py-3 flex items-center justify-between font-bold text-red-600 text-sm"
                >
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-4 h-4" /> 회사소개
                  </span>
                  {activeSubMenu === 'company' ? <ChevronDown className="w-4 h-4"/> : <ChevronRight className="w-4 h-4"/>}
                </button>
                {activeSubMenu === 'company' && (
                  <div className="bg-white py-1.5 px-5 text-xs space-y-1 text-slate-600 border-t border-red-100">
                    <a href="#ceo" onClick={() => setIsDrawerOpen(false)} className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600 transition">
                      <Users className="w-3 h-3 text-red-500" /> CEO 인사말
                    </a>
                    <a href="#vision" onClick={() => setIsDrawerOpen(false)} className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600 transition">
                      <Award className="w-3 h-3 text-red-500" /> Motto & Vision
                    </a>
                    <a href="#organization" onClick={() => setIsDrawerOpen(false)} className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600 transition">
                      <ShieldCheck className="w-3 h-3 text-red-500" /> 조직도 및 시스템
                    </a>
                    <a href="#about" onClick={() => setIsDrawerOpen(false)} className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600 transition">
                      <Building className="w-3 h-3 text-red-500" /> 회사 소개
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. 메인 지도 메인 영역 */}
      <main className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto p-3 gap-4">
        
        {/* 지도 영역 */}
        <section className="flex-1 bg-slate-200 border border-slate-300 rounded-xl p-3 relative min-h-[550px] flex flex-col">
          
          {/* 지도 상단 필터/컨트롤 */}
          <div className="flex items-center justify-between mb-2 bg-white/90 backdrop-blur-md p-2 rounded-lg border border-slate-200 shadow-sm z-10 text-xs">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-red-600" /> 전국 분양 지도
            </span>

            <div className="flex gap-1 overflow-x-auto max-w-md py-0.5">
              {PROVINCES.slice(0, 6).map(prov => (
                <button
                  key={prov}
                  onClick={() => setSelectedProvince(prov)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
                    selectedProvince === prov ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {prov}
                </button>
              ))}
            </div>
          </div>

          {/* SVG 지도 베이스 및 축소된 카드 마커 */}
          <div className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden rounded-lg bg-slate-100">
            
            {/* 원래 사용하시던 시군구 경계 SVG 지도 유지 */}
            <svg viewBox="0 0 500 700" className="w-full h-full max-h-[580px] drop-shadow-sm select-none">
              <g stroke="#EF4444" strokeWidth="1.5" strokeLinejoin="round" fill="#F8FAFC">
                <path d="M170,120 L210,110 L250,140 L230,200 L180,220 L140,180 Z" className="hover:fill-red-100/70 transition cursor-pointer" />
                <path d="M210,110 L340,90 L380,180 L250,210 L250,140 Z" className="hover:fill-red-100/70 transition cursor-pointer" />
                <path d="M230,200 L300,210 L280,300 L210,280 L210,230 Z" className="hover:fill-red-100/70 transition cursor-pointer" />
                <path d="M140,180 L210,230 L210,280 L150,330 L100,260 Z" className="hover:fill-red-100/70 transition cursor-pointer" />
                <path d="M300,210 L380,180 L420,340 L340,390 L280,300 Z" className="hover:fill-red-100/70 transition cursor-pointer" />
                <path d="M280,300 L340,390 L320,460 L230,440 L250,370 Z" className="hover:fill-red-100/70 transition cursor-pointer" />
                <path d="M150,330 L210,280 L250,370 L180,420 L130,370 Z" className="hover:fill-red-100/70 transition cursor-pointer" />
                <path d="M130,370 L180,420 L230,440 L200,530 L100,500 Z" className="hover:fill-red-100/70 transition cursor-pointer" />
                <path d="M110,580 L170,580 L160,620 L100,610 Z" className="hover:fill-red-100/70 transition cursor-pointer" />
              </g>
            </svg>

            {/* 축소된 미니 이미지 마커 아이콘 카드 (w-20~24 크기) */}
            {PROPERTIES.map((p) => (
              <div 
                key={p.id}
                style={{ top: `${p.lat}%`, left: `${p.lng}%` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                onClick={() => setSelectedProperty(p)}
              >
                <div className="flex flex-col items-center">
                  <div className="bg-white border border-slate-300 shadow-md rounded-md overflow-hidden w-20 sm:w-24 transition transform group-hover:scale-110 group-hover:border-red-500">
                    <div className="relative h-10 w-full bg-slate-100">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                      <span className="absolute top-0.5 left-0.5 bg-cyan-500 text-white font-bold text-[8px] px-1 py-0.2 rounded">
                        분양중
                      </span>
                    </div>
                    <div className="p-1 text-center bg-white">
                      <span className="block font-bold text-[10px] text-slate-800 truncate leading-tight">
                        {p.title}
                      </span>
                    </div>
                  </div>
                  {/* 소형 핀 포인트 */}
                  <div className="w-2 h-2 bg-red-600 rounded-full border border-white shadow -mt-0.5" />
                </div>
              </div>
            ))}

          </div>
        </section>

        {/* 우측 간단 리스트 */}
        <section className="w-full lg:w-80 flex flex-col gap-3">
          <h2 className="font-bold text-slate-800 text-sm flex items-center justify-between">
            <span>추천 매물 목록</span>
            <span className="text-xs text-slate-400 font-normal">{PROPERTIES.length}건</span>
          </h2>

          <div className="space-y-2 overflow-y-auto max-h-[550px]">
            {PROPERTIES.map((item) => (
              <div 
                key={item.id}
                onClick={() => setSelectedProperty(item)}
                className="bg-white rounded-lg border border-slate-200 p-2.5 shadow-sm hover:border-blue-500 transition flex gap-3 cursor-pointer items-center"
              >
                <img src={item.image} alt={item.title} className="w-16 h-12 object-cover rounded bg-slate-100" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-xs text-slate-900 truncate">{item.title}</h3>
                  <p className="text-[10px] text-slate-500 truncate mt-0.5">{item.address}</p>
                  <span className="inline-block text-[9px] text-blue-600 font-semibold mt-1 bg-blue-50 px-1.5 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

    </div>
  );
}