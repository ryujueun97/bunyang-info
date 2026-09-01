'use client';

import React, { useState } from 'react';
import { 
  Menu, X, Search, PhoneCall, ChevronRight, ChevronDown, 
  MapPin, Building, Filter, CheckCircle2, Clock, AlertCircle, RefreshCw, Navigation,
  FileText, Users, Award, ShieldCheck
} from 'lucide-react';
import MapView from '@/components/MapView';

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

export default function BunyangPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>('company');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      
      {/* 상단 헤더 (브랜드명: 분양HUB) */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 lg:px-6 py-2.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsDrawerOpen(true)}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-700 transition flex items-center gap-1.5 font-bold text-xs"
          >
            <Menu className="w-5 h-5 text-red-600" />
            <span>메뉴</span>
          </button>
          <div className="flex items-center gap-1.5">
            <Building className="w-5 h-5 text-red-600" />
            <span className="font-extrabold text-lg tracking-tight text-slate-900">
              분양<span className="text-red-600">HUB</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a href="tel:1588-0000" className="flex items-center gap-1 bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm hover:bg-red-700 transition">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>상담 문의</span>
          </a>
        </div>
      </header>

      {/* 회사소개 전용 메뉴 슬라이드 */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)} />
          <div className="relative w-72 bg-white h-full shadow-2xl flex flex-col z-10">
            <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
              <span className="font-bold text-sm flex items-center gap-1.5">
                <Building className="w-4 h-4 text-red-500" /> 전체 메뉴
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
                    <a href="#ceo" onClick={() => setIsDrawerOpen(false)} className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600 transition font-medium">
                      <Users className="w-3 h-3 text-red-500" /> CEO 인사말
                    </a>
                    <a href="#vision" onClick={() => setIsDrawerOpen(false)} className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600 transition font-medium">
                      <Award className="w-3 h-3 text-red-500" /> Motto & Vision
                    </a>
                    <a href="#organization" onClick={() => setIsDrawerOpen(false)} className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600 transition font-medium">
                      <ShieldCheck className="w-3 h-3 text-red-500" /> 조직도 및 시스템
                    </a>
                    <a href="#about" onClick={() => setIsDrawerOpen(false)} className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-red-50 hover:text-red-600 transition font-medium">
                      <Building className="w-3 h-3 text-red-500" /> 회사 소개
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-400 text-center">
              Copyright © BUNYANG HUB. All Rights Reserved.
            </div>
          </div>
        </div>
      )}

      {/* 원래 제작해두신 지도 컴포넌트 메인 렌더링 영역 */}
      <main className="flex-1 relative w-full h-[calc(100vh-53px)] overflow-hidden">
        
        {/* 기존 지도 컴포넌트 불러오기 */}
        <MapView />

        {/* 지도 위에 작게 떠있는 소형 아이콘 카드 마커들 */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {PROPERTIES.map((p) => (
            <div 
              key={p.id}
              style={{ top: `${p.lat}%`, left: `${p.lng}%` }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-auto group"
              onClick={() => setSelectedProperty(p)}
            >
              <div className="flex flex-col items-center">
                <div className="bg-white border border-slate-300 shadow-md rounded-md overflow-hidden w-20 sm:w-24 transition transform group-hover:scale-110 group-hover:border-red-500">
                  <div className="relative h-9 w-full bg-slate-100">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                    <span className="absolute top-0.5 left-0.5 bg-cyan-500 text-white font-bold text-[7px] px-1 py-0.2 rounded">
                      분양중
                    </span>
                  </div>
                  <div className="p-1 text-center bg-white">
                    <span className="block font-bold text-[9px] text-slate-800 truncate leading-tight">
                      {p.title}
                    </span>
                  </div>
                </div>
                <div className="w-2 h-2 bg-red-600 rounded-full border border-white shadow -mt-0.5" />
              </div>
            </div>
          ))}
        </div>

      </main>

    </div>
  );
}