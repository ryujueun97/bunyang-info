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
  isRepresentative?: boolean;
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
    description: '바이오 헬스케어 및 첨단 소재 기업 중심 입지, KTX 오송역 인접.',
    isRepresentative: true
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
    description: '자동차 부품 및 금속 가공 특화 산업단지, 경부고속도로 인접.',
    isRepresentative: true
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
    description: '삼성전자 평택캠퍼스 인접, 첨단 반도체 클러스터 공급 단지.',
    isRepresentative: true
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
    description: '서울 마곡지구 R&D 융복합 클러스터 핵심 입지.',
    isRepresentative: true
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
    description: '바이오 메디컬 글로벌 기업 집적화 단지.',
    isRepresentative: true
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
    description: '수도권 접근성 우수, 친환경 에너지 특화 산업단지.',
    isRepresentative: true
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
    description: '경부고속도로 북천안IC 5분 거리의 사통팔달 교통망.',
    isRepresentative: true
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
    description: '기계·방산 클러스터 중심지, 최첨단 스마트 그린산단.',
    isRepresentative: true
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
    description: '대한민국 탄소산업 허브 메카 산업단지.',
    isRepresentative: true
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
    description: '광양항 인접 항만물류 및 석유화학 연계 단지.',
    isRepresentative: true
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
    description: 'IT·BT 기술 및 청정 융복합 글로벌 연구단지.',
    isRepresentative: true
  }
];

const PROVINCES = [
  '전체', '서울특별시', '경기도', '인천광역시', '강원특별자치도', 
  '충청북도', '충청남도', '경상북도', '경상남도', '전라북도', '전라남도', '제주특별자치도'
];

const CITIES_MAP: Record<string, string[]> = {
  '서울특별시': ['전체', '강서구', '금천구', '구로구', '성동구'],
  '경기도': ['전체', '평택시', '수원시', '용인시', '화성시', '성남시'],
  '인천광역시': ['전체', '연수구', '계양구', '서구', '남동구'],
  '강원특별자치도': ['전체', '원주시', '춘천시', '강릉시'],
  '충청북도': ['전체', '청주시', '충주시', '제천시', '음성군'],
  '충청남도': ['전체', '천안시', '아산시', '서산시', '당진시'],
  '경상북도': ['전체', '경산시', '포항시', '구미시', '경주시'],
  '경상남도': ['전체', '창원시', '김해시', '양산시', '진주시'],
  '전라북도': ['전체', '전주시', '익산시', '군산시'],
  '전라남도': ['전체', '여수시', '장성군', '순천시', '목포시'],
  '제주특별자치도': ['전체', '제주시', '서귀포시']
};

export default function BunyangPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>('company');

  const [selectedProvince, setSelectedProvince] = useState<string>('전체');
  const [selectedCity, setSelectedCity] = useState<string>('전체');
  const [selectedStatus, setSelectedStatus] = useState<string>('분양중'); 
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [myLocation, setMyLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

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

  const handleProvinceSelect = (prov: string) => {
    setSelectedProvince(prov);
    setSelectedCity('전체');
  };

  const filteredProperties = PROPERTIES.filter(p => {
    const matchProv = selectedProvince === '전체' || p.province === selectedProvince;
    const matchCity = selectedCity === '전체' || p.city === selectedCity;
    const matchStatus = selectedStatus === '전체' || p.status === selectedStatus;
    const matchQuery = searchQuery === '' || p.title.includes(searchQuery) || p.address.includes(searchQuery);
    return matchProv && matchCity && matchStatus && matchQuery;
  });

  const getStatusBadge = (status: Property['status']) => {
    switch (status) {
      case '분양중':
        return <span className="bg-cyan-500 text-white font-bold text-[10px] sm:text-xs px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm"><CheckCircle2 className="w-3 h-3"/> 분양중</span>;
      case '분양예정':
        return <span className="bg-amber-500 text-white font-bold text-[10px] sm:text-xs px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm"><Clock className="w-3 h-3"/> 분양예정</span>;
      case '분양완료':
        return <span className="bg-slate-400 text-white font-bold text-[10px] sm:text-xs px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm"><AlertCircle className="w-3 h-3"/> 분양완료</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      
      {/* 1. TOP HEADER */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm px-4 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg text-slate-700 transition flex items-center gap-1.5 font-bold"
            aria-label="메뉴 열기"
          >
            <Menu className="w-6 h-6" />
            <span className="text-xs hidden sm:inline">메뉴</span>
          </button>
          <div className="flex items-center gap-2">
            <Building className="w-6 h-6 text-red-600" />
            <span className="font-extrabold text-xl tracking-tight text-slate-900">
              분양<span className="text-red-600">HUB</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-lg text-sm font-semibold shadow-md transition"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">분양 조건 검색</span>
          </button>
          <a 
            href="tel:1588-0000" 
            className="p-2 text-slate-600 hover:text-red-600 hover:bg-slate-100 rounded-lg transition"
          >
            <PhoneCall className="w-5 h-5" />
          </a>
        </div>
      </header>

      {/* 2. LEFT SIDEBAR DRAWER (회사소개만 유지) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div className="relative w-80 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-red-500" />
                <span className="font-bold text-lg">전체 메뉴</span>
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="p-1 hover:bg-slate-800 rounded-md transition text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-2">
              <div className="border-b border-slate-100 bg-red-50/40">
                <button 
                  onClick={() => setActiveSubMenu(activeSubMenu === 'company' ? null : 'company')}
                  className="w-full px-5 py-3.5 flex items-center justify-between font-bold text-red-600 hover:bg-red-100/50 transition text-base"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4" /> 회사소개
                  </span>
                  {activeSubMenu === 'company' ? <ChevronDown className="w-4 h-4"/> : <ChevronRight className="w-4 h-4"/>}
                </button>
                {activeSubMenu === 'company' && (
                  <div className="bg-white py-2 px-6 text-sm space-y-1.5 text-slate-600 border-t border-red-100">
                    <a href="#ceo" onClick={() => setIsDrawerOpen(false)} className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-red-50 hover:text-red-600 font-semibold transition">
                      <Users className="w-3.5 h-3.5 text-red-500" /> CEO 인사말
                    </a>
                    <a href="#vision" onClick={() => setIsDrawerOpen(false)} className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-red-50 hover:text-red-600 font-semibold transition">
                      <Award className="w-3.5 h-3.5 text-red-500" /> Motto & Vision
                    </a>
                    <a href="#organization" onClick={() => setIsDrawerOpen(false)} className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-red-50 hover:text-red-600 font-semibold transition">
                      <ShieldCheck className="w-3.5 h-3.5 text-red-500" /> 조직도 및 시스템
                    </a>
                    <a href="#about" onClick={() => setIsDrawerOpen(false)} className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-red-50 hover:text-red-600 font-semibold transition">
                      <Building className="w-3.5 h-3.5 text-red-500" /> 회사 소개
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 text-center">
              Copyright © 2026 BUNYANG HUB. All Rights Reserved.
            </div>
          </div>
        </div>
      )}

      {/* 3. SEARCH FILTER MODAL */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden z-10 animate-in zoom-in-95 duration-150">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-lg">상세 분양 조건 검색</h3>
              </div>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="p-1 hover:bg-slate-800 rounded-md transition"
              >
                <X className="w-5 h-5 text-slate-400 hover:text-white" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">검색어</label>
                <input 
                  type="text"
                  placeholder="단지명 또는 지역명을 입력하세요"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">시 / 도</label>
                  <select 
                    value={selectedProvince}
                    onChange={(e) => handleProvinceSelect(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {PROVINCES.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">시 / 군 / 구</label>
                  <select 
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={selectedProvince === '전체' || !CITIES_MAP[selectedProvince]}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-slate-100 disabled:text-slate-400"
                  >
                    {(CITIES_MAP[selectedProvince] || ['전체']).map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">분양 상태</label>
                <div className="grid grid-cols-4 gap-2">
                  {['전체', '분양중', '분양예정', '분양완료'].map(st => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setSelectedStatus(st)}
                      className={`py-2 text-xs font-bold rounded-lg border transition ${
                        selectedStatus === st 
                          ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
              <button 
                onClick={() => {
                  setSelectedProvince('전체');
                  setSelectedCity('전체');
                  setSelectedStatus('분양중');
                  setSearchQuery('');
                }}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 font-semibold"
              >
                <RefreshCw className="w-3.5 h-3.5"/> 필터 초기화
              </button>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-lg text-sm shadow transition"
              >
                {filteredProperties.length}개 결과 보기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. DETAIL POPUP MODAL */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProperty(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden z-10 animate-in zoom-in-95 duration-150">
            <div className="relative h-52 bg-slate-100">
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
              <div className="absolute bottom-3 left-3 flex gap-2">
                {getStatusBadge(selectedProperty.status)}
                <span className="bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold backdrop-blur-sm">
                  {selectedProperty.province} 대표 단지
                </span>
              </div>
            </div>

            <div className="p-6 space-y-4">
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

      {/* 5. MAIN MAP & LIST VIEW */}
      <main className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto p-4 gap-6">
        <section className="flex-1 bg-gradient-to-b from-slate-100 to-slate-200 border border-slate-300 rounded-2xl p-4 shadow-inner relative min-h-[500px] lg:min-h-[640px] flex flex-col">
          <div className="flex items-center justify-between mb-2 z-10 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-sm">
            <div>
              <h2 className="font-extrabold text-slate-800 text-base sm:text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-600" />
                전국 도별 대표 분양 지도
              </h2>
              <p className="text-xs text-slate-500">붉은 테두리: 도 단위 경계 | 각 도 대표 1건 분양중 이미지 카드 노출</p>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={handleGetMyLocation}
                disabled={isLocating}
                className="flex items-center gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg shadow transition"
              >
                <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
                {isLocating ? '위치 찾는중...' : '내위치표시'}
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

          <div className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden rounded-xl bg-slate-50/50">
            <svg 
              viewBox="0 0 500 700" 
              className="w-full h-full max-h-[600px] drop-shadow-md select-none"
            >
              <g stroke="#EF4444" strokeWidth="2.5" strokeLinejoin="round" fill="#F8FAFC" className="transition-all">
                <path 
                  d="M170,120 L210,110 L250,140 L230,200 L180,220 L140,180 Z" 
                  className={`cursor-pointer hover:fill-red-100/80 transition ${selectedProvince === '경기도' || selectedProvince === '서울특별시' || selectedProvince === '인천광역시' ? 'fill-red-200/80 stroke-red-600 stroke-[3.5]' : ''}`}
                  onClick={() => handleProvinceSelect('경기도')}
                />
                <path 
                  d="M210,110 L340,90 L380,180 L250,210 L250,140 Z" 
                  className={`cursor-pointer hover:fill-red-100/80 transition ${selectedProvince === '강원특별자치도' ? 'fill-red-200/80 stroke-red-600 stroke-[3.5]' : ''}`}
                  onClick={() => handleProvinceSelect('강원특별자치도')}
                />
                <path 
                  d="M230,200 L300,210 L280,300 L210,280 L210,230 Z" 
                  className={`cursor-pointer hover:fill-red-100/80 transition ${selectedProvince === '충청북도' ? 'fill-red-200/80 stroke-red-600 stroke-[3.5]' : ''}`}
                  onClick={() => handleProvinceSelect('충청북도')}
                />
                <path 
                  d="M140,180 L210,230 L210,280 L150,330 L100,260 Z" 
                  className={`cursor-pointer hover:fill-red-100/80 transition ${selectedProvince === '충청남도' ? 'fill-red-200/80 stroke-red-600 stroke-[3.5]' : ''}`}
                  onClick={() => handleProvinceSelect('충청남도')}
                />
                <path 
                  d="M300,210 L380,180 L420,340 L340,390 L280,300 Z" 
                  className={`cursor-pointer hover:fill-red-100/80 transition ${selectedProvince === '경상북도' ? 'fill-red-200/80 stroke-red-600 stroke-[3.5]' : ''}`}
                  onClick={() => handleProvinceSelect('경상북도')}
                />
                <path 
                  d="M280,300 L340,390 L320,460 L230,440 L250,370 Z" 
                  className={`cursor-pointer hover:fill-red-100/80 transition ${selectedProvince === '경상남도' ? 'fill-red-200/80 stroke-red-600 stroke-[3.5]' : ''}`}
                  onClick={() => handleProvinceSelect('경상남도')}
                />
                <path 
                  d="M150,330 L210,280 L250,370 L180,420 L130,370 Z" 
                  className={`cursor-pointer hover:fill-red-100/80 transition ${selectedProvince === '전라북도' ? 'fill-red-200/80 stroke-red-600 stroke-[3.5]' : ''}`}
                  onClick={() => handleProvinceSelect('전라북도')}
                />
                <path 
                  d="M130,370 L180,420 L230,440 L200,530 L100,500 Z" 
                  className={`cursor-pointer hover:fill-red-100/80 transition ${selectedProvince === '전라남도' ? 'fill-red-200/80 stroke-red-600 stroke-[3.5]' : ''}`}
                  onClick={() => handleProvinceSelect('전라남도')}
                />
                <path 
                  d="M110,580 L170,580 L160,620 L100,610 Z" 
                  className={`cursor-pointer hover:fill-red-100/80 transition ${selectedProvince === '제주특별자치도' ? 'fill-red-200/80 stroke-red-600 stroke-[3.5]' : ''}`}
                  onClick={() => handleProvinceSelect('제주특별자치도')}
                />
              </g>
            </svg>

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
                        {getStatusBadge(p.status)}
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

          <div className="mt-2 flex items-center justify-between bg-white/80 backdrop-blur-sm p-2 rounded-xl text-xs font-semibold text-slate-600 border border-slate-200">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-cyan-500 rounded-full"></span> 분양중</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span> 분양예정</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-slate-400 rounded-full"></span> 분양완료</span>
            </div>
            <span className="text-[11px] text-slate-500">* 이미지 카드 클릭 시 상세 팝업 오픈</span>
          </div>
        </section>

        <section className="w-full lg:w-96 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              분양 목록
              <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                {filteredProperties.length}
              </span>
            </h2>
            <div className="flex gap-1">
              {['전체', '분양중'].map(st => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-bold transition ${
                    selectedStatus === st ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 overflow-y-auto max-h-[640px] pr-1">
            {filteredProperties.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
                <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                <p className="text-sm font-semibold">선택한 조건의 분양 정보가 없습니다.</p>
                <button 
                  onClick={() => {
                    setSelectedProvince('전체');
                    setSelectedCity('전체');
                    setSelectedStatus('전체');
                    setSearchQuery('');
                  }}
                  className="mt-3 text-xs text-blue-600 font-bold hover:underline"
                >
                  조건 초기화하기
                </button>
              </div>
            ) : (
              filteredProperties.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setSelectedProperty(item)}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col group cursor-pointer"
                >
                  <div className="relative h-36 w-full bg-slate-100 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      {getStatusBadge(item.status)}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded font-medium">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-4 flex flex-col gap-2">
                    <h3 className="font-extrabold text-slate-900 text-base group-hover:text-blue-600 transition">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      {item.address}
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-medium">{item.province}</span>
                      <span className="text-xs font-bold text-blue-600 flex items-center gap-0.5">
                        상세 팝업보기 <ChevronRight className="w-3.5 h-3.5"/>
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}