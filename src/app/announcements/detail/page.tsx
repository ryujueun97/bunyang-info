'use client'

import React, { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { sampleProperties } from '@/data/properties'
import NavigationHeader from '@/components/NavigationHeader'

function PropertyDetailContent() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const property = sampleProperties.find((p) => p.id === id)

  if (!property) {
    return (
      <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#fff', padding: '40px', textAlign: 'center' }}>
        <NavigationHeader />
        <h2>매물 정보를 찾을 수 없습니다.</h2>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#fff', padding: '24px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* 📌 상단 뒤로가기 / 지도로 돌아가기 공통 헤더 */}
        <NavigationHeader title={`${property.regionName} 분양 상세`} />

        {/* 대형 조감도/현장 사진 */}
        {property.imageUrl && (
          <div style={{ width: '100%', height: '360px', borderRadius: '16px', overflow: 'hidden', marginBottom: '28px' }}>
            <img
              src={property.imageUrl}
              alt={property.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}

        {/* 헤더 타이틀 정보 */}
        <div style={{ marginBottom: '24px' }}>
          <span style={{ fontSize: '13px', backgroundColor: '#0284c7', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontWeight: 600 }}>
            {property.type}
          </span>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '12px', marginBottom: '8px' }}>
            {property.title}
          </h1>
          <p style={{ color: '#38bdf8', fontSize: '26px', fontWeight: 'bold', margin: 0 }}>
            {property.price}
          </p>
        </div>

        <hr style={{ borderColor: '#334155', margin: '24px 0' }} />

        {/* 상세 현장 요약 표 */}
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: 0, marginBottom: '16px', color: '#38bdf8' }}>
            📌 핵심 분양 요약
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '15px' }}>
            <div>
              <span style={{ color: '#94a3b8', fontSize: '13px', display: 'block' }}>지역 위치</span>
              <span style={{ fontWeight: 600 }}>{property.regionName} ({property.address || '상세주소 문의'})</span>
            </div>
            <div>
              <span style={{ color: '#94a3b8', fontSize: '13px', display: 'block' }}>건물 유형</span>
              <span style={{ fontWeight: 600 }}>{property.type}</span>
            </div>
            <div>
              <span style={{ color: '#94a3b8', fontSize: '13px', display: 'block' }}>문의 및 상담 번호</span>
              <span style={{ fontWeight: 600, color: '#38bdf8' }}>{property.contact}</span>
            </div>
            <div>
              <span style={{ color: '#94a3b8', fontSize: '13px', display: 'block' }}>입주 예정일</span>
              <span style={{ fontWeight: 600 }}>2027년 상반기 예정</span>
            </div>
          </div>
        </div>

        {/* 현장 상세 설명 및 특징 */}
        <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: 0, marginBottom: '12px', color: '#38bdf8' }}>
            💡 현장 상세 설명
          </h3>
          <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '15px', marginTop: 0 }}>
            {property.description || '본 현장은 우수한 입지와 프리미엄 교통망을 자랑하는 대단지 분양 정보입니다.'}
          </p>

          <div style={{ marginTop: '20px', backgroundColor: '#0f172a', padding: '16px', borderRadius: '10px' }}>
            <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#94a3b8' }}>특장점 프리미엄</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#cbd5e1', fontSize: '14px', lineHeight: '1.8' }}>
              <li>초역세권 중심 생활권 및 인프라 우수</li>
              <li>학군, 대형마트, 대중교통 이용 용이</li>
              <li>중도금 무이자 혜택 제공 중</li>
            </ul>
          </div>
        </div>

        {/* 하단 전화 연결 버튼 */}
        <div style={{ position: 'sticky', bottom: '20px' }}>
          <a
            href={`tel:${property.contact}`}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'center',
              backgroundColor: '#2563eb',
              color: '#fff',
              padding: '16px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '18px',
              boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.5)',
            }}
          >
            📞 분양 문의 바로 연결하기 ({property.contact})
          </a>
        </div>

      </div>
    </div>
  )
}

export default function PropertyDetailPage() {
  return (
    <Suspense fallback={<div style={{ color: '#fff', padding: '20px' }}>로딩 중...</div>}>
      <PropertyDetailContent />
    </Suspense>
  )
}