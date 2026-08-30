'use client'

import React, { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { sampleProperties } from '@/data/properties'
import NavigationHeader from '@/components/NavigationHeader'

function AnnouncementListContent() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const regionName = searchParams.get('regionName') || '해당 지역'

  const cleanRegionName = regionName.replace(/\s+/g, '')

  const items = sampleProperties.filter((p) => {
    const cleanPropName = p.regionName.replace(/\s+/g, '')
    return (
      (code && p.regionCode === code) ||
      cleanPropName.includes(cleanRegionName) ||
      cleanRegionName.includes(cleanPropName)
    )
  })

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#fff', padding: '24px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* 공통 네비게이션 헤더 */}
        <NavigationHeader title={`${regionName} 분양 목록`} />

        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
            분양 정보 <span style={{ color: '#38bdf8' }}>총 {items.length}건</span>
          </h1>
        </div>

        {items.length === 0 ? (
          <div style={{ padding: '40px', backgroundColor: '#1e293b', borderRadius: '12px', textAlign: 'center', color: '#94a3b8' }}>
            현재 등록된 분양 정보가 없습니다.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                {item.imageUrl && (
                  <div style={{ width: '220px', minWidth: '220px', height: 'auto', position: 'relative' }}>
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}

                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '12px', backgroundColor: '#0284c7', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontWeight: 600 }}>
                      {item.type}
                    </span>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '10px', marginBottom: '6px' }}>
                      {item.title}
                    </h3>
                    <p style={{ color: '#38bdf8', fontSize: '18px', fontWeight: 600, margin: 0 }}>
                      {item.price}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                    <Link
                      href={`/announcements/detail?id=${item.id}`}
                      style={{
                        backgroundColor: '#334155',
                        color: '#fff',
                        textDecoration: 'none',
                        padding: '12px 18px',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        textAlign: 'center',
                        flex: 1,
                      }}
                    >
                      🔍 상세 정보 보기
                    </Link>

                    <a
                      href={`tel:${item.contact}`}
                      style={{
                        backgroundColor: '#2563eb',
                        color: '#fff',
                        padding: '12px 18px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      📞 전화 문의
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function AnnouncementListPage() {
  return (
    <Suspense fallback={<div style={{ color: '#fff', padding: '20px' }}>로딩 중...</div>}>
      <AnnouncementListContent />
    </Suspense>
  )
}