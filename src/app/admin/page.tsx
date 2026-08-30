'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type PeriodType = 'daily' | 'weekly' | 'monthly'

// 📊 1. 일간 / 주간 / 월별 클릭 Top 5 데이터
const topRegionsByPeriod = {
  daily: [
    { name: '충청북도 음성군', clicks: 180 },
    { name: '대구광역시 달성군', clicks: 145 },
    { name: '서울특별시 강남구', clicks: 120 },
    { name: '경기도 화성시', clicks: 95 },
    { name: '경기도 평택시', clicks: 78 },
  ],
  weekly: [
    { name: '충청북도 음성군', clicks: 1240 },
    { name: '대구광역시 달성군', clicks: 980 },
    { name: '서울특별시 강남구', clicks: 850 },
    { name: '경기도 화성시', clicks: 720 },
    { name: '경기도 평택시', clicks: 610 },
  ],
  monthly: [
    { name: '대구광역시 달성군', clicks: 4850 },
    { name: '충청북도 음성군', clicks: 4620 },
    { name: '서울특별시 강남구', clicks: 3890 },
    { name: '경기도 화성시', clicks: 3100 },
    { name: '인천광역시 서구', clicks: 2750 },
  ],
}

// 📈 2. 일간 / 주간 / 월별 차트 데이터 (SVG 좌표 및 데이터 표기)
const chartDataByPeriod = {
  daily: [
    { label: '00시', visits: 40, clicks: 80, vx: 20, vy: 160, cx: 20, cy: 120 },
    { label: '04시', visits: 25, clicks: 45, vx: 95, vy: 180, cx: 95, cy: 155 },
    { label: '08시', visits: 110, clicks: 210, vx: 170, vy: 100, cx: 170, cy: 50 },
    { label: '12시', visits: 180, clicks: 340, vx: 245, vy: 50, cx: 245, cy: 20 },
    { label: '16시', visits: 150, clicks: 290, vx: 320, vy: 70, cx: 320, cy: 35 },
    { label: '20시', visits: 130, clicks: 250, vx: 395, vy: 85, cx: 395, cy: 45 },
    { label: '24시', visits: 60, clicks: 110, vx: 470, vy: 140, cx: 470, cy: 100 },
  ],
  weekly: [
    { label: '월', visits: 420, clicks: 850, vx: 20, vy: 140, cx: 20, cy: 95 },
    { label: '화', visits: 580, clicks: 1120, vx: 95, vy: 115, cx: 95, cy: 68 },
    { label: '수', visits: 650, clicks: 1300, vx: 170, vy: 105, cx: 170, cy: 50 },
    { label: '목', visits: 510, clicks: 980, vx: 245, vy: 128, cx: 245, cy: 82 },
    { label: '금', visits: 780, clicks: 1540, vx: 320, vy: 86, cx: 320, cy: 26 },
    { label: '토', visits: 920, clicks: 1890, vx: 395, vy: 65, cx: 395, cy: 10 },
    { label: '일', visits: 870, clicks: 1720, vx: 470, vy: 72, cx: 470, cy: 20 },
  ],
  monthly: [
    { label: '3월', visits: 1800, clicks: 3500, vx: 20, vy: 150, cx: 20, cy: 100 },
    { label: '4월', visits: 2200, clicks: 4200, vx: 95, vy: 130, cx: 95, cy: 80 },
    { label: '5월', visits: 2800, clicks: 5600, vx: 170, vy: 100, cx: 170, cy: 50 },
    { label: '6월', visits: 3100, clicks: 6100, vx: 245, vy: 85, cx: 245, cy: 38 },
    { label: '7월', visits: 2900, clicks: 5800, vx: 320, vy: 95, cx: 320, cy: 45 },
    { label: '8월', visits: 3500, clicks: 7200, vx: 395, vy: 65, cx: 395, cy: 15 },
    { label: '9월', visits: 3800, clicks: 7900, vx: 470, vy: 50, cx: 470, cy: 5 },
  ],
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [period, setPeriod] = useState<PeriodType>('weekly')

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn')
    if (isLoggedIn !== 'true') {
      router.push('/login')
    } else {
      setIsAuthorized(true)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn')
    document.cookie = 'isAdminLoggedIn=; path=/; max-age=0'
    alert('로그아웃 되었습니다.')
    router.push('/login')
  }

  if (!isAuthorized) {
    return (
      <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#fff', padding: '40px', textAlign: 'center' }}>
        권한 확인 중...
      </div>
    )
  }

  const currentChartData = chartDataByPeriod[period]
  const currentTopRegions = topRegionsDataByPeriod(period)

  function topRegionsDataByPeriod(p: PeriodType) {
    return topRegionsByPeriod[p]
  }

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#fff', padding: '32px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* 상단 헤더 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <span style={{ fontSize: '13px', color: '#38bdf8', fontWeight: 'bold' }}>SYSTEM ADMIN</span>
            <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '4px 0 0 0' }}>⚙️ 관리자 종합 통계 센터</h1>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link
              href="/map"
              style={{
                backgroundColor: '#334155',
                color: '#fff',
                padding: '10px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
              }}
            >
              🗺️ 지도 화면 이동
            </Link>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#ef4444',
                color: '#fff',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              로그아웃
            </button>
          </div>
        </div>

        {/* 🎛️ 일간 / 주간 / 월별 통계 선택 탭 버튼 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', backgroundColor: '#1e293b', padding: '4px', borderRadius: '10px', border: '1px solid #334155' }}>
            <button
              onClick={() => setPeriod('daily')}
              style={tabButtonStyle(period === 'daily')}
            >
              📅 일간 통계
            </button>
            <button
              onClick={() => setPeriod('weekly')}
              style={tabButtonStyle(period === 'weekly')}
            >
              📆 주간 통계
            </button>
            <button
              onClick={() => setPeriod('monthly')}
              style={tabButtonStyle(period === 'monthly')}
            >
              🗓️ 월별 통계
            </button>
          </div>

          <span style={{ fontSize: '14px', color: '#94a3b8' }}>
            * 선택된 조회 기간: <strong style={{ color: '#38bdf8' }}>{period === 'daily' ? '오늘 (24시간)' : period === 'weekly' ? '최근 7일' : '최근 7개월'}</strong>
          </span>
        </div>

        {/* 🚀 매물 관리 이동 큰 카드 */}
        <div
          style={{
            backgroundColor: '#1e293b',
            border: '2px solid #2563eb',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#38bdf8' }}>
              🏢 매물 등록 / 수정 / 삭제 관리
            </h2>
            <p style={{ color: '#94a3b8', margin: '6px 0 0 0', fontSize: '14px' }}>
              새로운 분양 매물을 등록하거나 기존 등록된 매물을 수정 및 삭제할 수 있습니다.
            </p>
          </div>
          <Link
            href="/admin/properties"
            style={{
              backgroundColor: '#2563eb',
              color: '#fff',
              padding: '12px 20px',
              borderRadius: '10px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '15px',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
            }}
          >
            매물 관리 페이지로 이동 ➔
          </Link>
        </div>

        {/* 📊 통계 대시보드 그리드 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px' }}>
          
          {/* 1. 일간/주간/월별 전체 접속 및 클릭 현황 차트 */}
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: 0, marginBottom: '20px' }}>
              📈 {period === 'daily' ? '일간' : period === 'weekly' ? '주간' : '월별'} 전체 클릭 및 접속 현황
            </h3>

            <div style={{ width: '100%', height: '260px', position: 'relative' }}>
              <svg width="100%" height="100%" viewBox="0 0 500 220" preserveAspectRatio="none">
                <line x1="0" y1="50" x2="500" y2="50" stroke="#334155" strokeDasharray="4" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="#334155" strokeDasharray="4" />
                <line x1="0" y1="150" x2="500" y2="150" stroke="#334155" strokeDasharray="4" />

                {/* 방문자 수 꺾은선 (하늘색) */}
                <polyline
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  points={currentChartData.map((d) => `${d.vx},${d.vy}`).join(' ')}
                />

                {/* 지도 클릭 수 꺾은선 (파란색) */}
                <polyline
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="3"
                  points={currentChartData.map((d) => `${d.cx},${d.cy}`).join(' ')}
                />

                {/* 각 구간 포인트 점 & 수치 표기 */}
                {currentChartData.map((item, idx) => (
                  <g key={idx}>
                    {/* 클릭 수 파란 점 & 숫자 */}
                    <circle cx={item.cx} cy={item.cy} r="5" fill="#2563eb" />
                    <text
                      x={item.cx}
                      y={item.cy - 10}
                      fill="#60a5fa"
                      fontSize="11"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {item.clicks.toLocaleString()}
                    </text>

                    {/* 방문자 수 하늘색 점 & 숫자 */}
                    <circle cx={item.vx} cy={item.vy} r="5" fill="#38bdf8" />
                    <text
                      x={item.vx}
                      y={item.vy + 18}
                      fill="#38bdf8"
                      fontSize="11"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {item.visits.toLocaleString()}
                    </text>

                    {/* 하단 X축 구분명 */}
                    <text
                      x={item.cx}
                      y="210"
                      fill="#94a3b8"
                      fontSize="12"
                      textAnchor="middle"
                    >
                      {item.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '16px', fontSize: '13px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: '#38bdf8', borderRadius: '50%' }}></span>
                <span>방문자 수 (명)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '12px', backgroundColor: '#2563eb', borderRadius: '50%' }}></span>
                <span>지도 클릭 수 (회)</span>
              </div>
            </div>
          </div>

          {/* 2. 일간/주간/월별 클릭 지역 Top 5 */}
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: 0, marginBottom: '20px' }}>
              🏆 {period === 'daily' ? '일간' : period === 'weekly' ? '주간' : '월별'} 클릭 지역 Top 5
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {currentTopRegions.map((item, idx) => (
                <div
                  key={item.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    backgroundColor: '#0f172a',
                    borderRadius: '10px',
                    border: idx === 0 ? '1px solid #2563eb' : '1px solid transparent',
                    fontSize: '14px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: idx < 3 ? '#2563eb' : '#334155',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        color: '#fff',
                      }}
                    >
                      {idx + 1}
                    </span>
                    <span style={{ fontWeight: idx < 3 ? 'bold' : 'normal' }}>{item.name}</span>
                  </div>
                  <span style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '15px' }}>
                    {item.clicks.toLocaleString()}회
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

function tabButtonStyle(isActive: boolean) {
  return {
    backgroundColor: isActive ? '#2563eb' : 'transparent',
    color: isActive ? '#ffffff' : '#94a3b8',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: isActive ? 'bold' : 'normal',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  } as const
}