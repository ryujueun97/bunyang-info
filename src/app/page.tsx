'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Menu, X, PhoneCall, ChevronRight, ChevronDown, Building, FileText, Users, Award, ShieldCheck } from 'lucide-react';

const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-500 font-bold text-sm">
      지도를 불러오는 중입니다...
    </div>
  ),
});

export default function BunyangPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>('company');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      
      {/* 1. 상단 헤더 */}
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

      {/* 2. 회사소개 전용 메뉴 슬라이드 */}
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

      {/* 3. 지도 렌더링 영역 */}
      <main className="flex-1 relative w-full h-[calc(100vh-53px)] overflow-hidden">
        <MapView />
      </main>

    </div>
  );
}