'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>
        
        {/* 서비스 타이틀 */}
        <span style={{ fontSize: '14px', color: '#38bdf8', fontWeight: 'bold', backgroundColor: 'rgba(56, 189, 248, 0.1)', padding: '6px 12px', borderRadius: '20px' }}>
          대한민국 부동산 지도 서비스
        </span>
        
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginTop: '16px', marginBottom: '12px' }}>
          전국 분양·부동산 지도 현황
        </h1>
        
        <p style={{ color: '#94a3b8', fontSize: '16px', lineHeight: '1.6', marginBottom: '40px' }}>
          회원가입 없이 시·군·구별 매물 분포와 분양 정보를 한눈에 확인하세요.
        </p>

        {/* 메인 메뉴 버튼 영역 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* 1. 일반 사용자 (바로 지도 조회) */}
          <Link
            href="/map"
            style={{
              backgroundColor: '#2563eb',
              color: '#fff',
              padding: '16px 24px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontSize: '18px',
              fontWeight: 'bold',
              display: 'block',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
            }}
          >
            🗺️ 지도에서 매물 바로보기 (비회원 이용)
          </Link>

          {/* 2. 관리자 로그인/대시보드 */}
          <Link
            href="/admin"
            style={{
              backgroundColor: '#1e293b',
              color: '#94a3b8',
              border: '1px solid #334155',
              padding: '14px 24px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontSize: '15px',
              display: 'block',
              marginTop: '10px',
            }}
          >
            ⚙️ 관리자 전용 페이지
          </Link>

        </div>

      </div>
    </div>
  )
}