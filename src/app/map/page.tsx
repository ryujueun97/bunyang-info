'use client'

import { useEffect, useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import type { FeatureCollection } from 'geojson'
import { getRegionCountMap } from '@/data/properties'

const MapContainer = dynamic(
  () => import('react-leaflet').then((m) => m.MapContainer),
  { ssr: false }
)
const KoreaGeoLayer = dynamic(
  () => import('@/components/KoreaGeoLayer'),
  { ssr: false }
)

export default function MapPage() {
  const [geo, setGeo] = useState<FeatureCollection | null>(null)
  const [selectedCode, setSelectedCode] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [searchQuery, setSearchQuery] = useState<string>('')

  // 📌 지역별 매물 건수 Map 가져오기
  const regionCountMap = getRegionCountMap()

  useEffect(() => {
    fetch('/geo/kor_sig.geojson')
      .then((res) => {
        if (!res.ok) throw new Error('GeoJSON 로드 실패')
        return res.json()
      })
      .then((data) => {
        setGeo(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('[GEO LOAD ERROR]:', err)
        setLoading(false)
      })
  }, [])

  // 🔍 GeoJSON 내 시군구 목록 추출 (검색용)
  const regionList = useMemo(() => {
    if (!geo?.features) return []
    return geo.features.map((f: any) => {
      const p = f.properties || {}
      const name = p.SIG_KOR_NM || p.sig_kor_nm || p.SIG_NM || p.sig_nm || p.NAME || ''
      const code = p.SIG_CD || p.sig_cd || p.SGG_CD || p.sgg_cd || p.code || ''
      return { name, code }
    }).filter((r) => r.name)
  }, [geo])

  // 🔍 검색어 입력 시 자동 선택 처리
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)

    if (!value.trim()) return

    const cleanQuery = value.replace(/\s+/g, '')
    const target = regionList.find((r) => {
      const cleanName = r.name.replace(/\s+/g, '')
      return cleanName.includes(cleanQuery) || cleanQuery.includes(cleanName)
    })

    if (target && target.code) {
      setSelectedCode(target.code)
    }
  }

  const handleSelectRegion = (region: { code: string | null; name: string }) => {
    if (!region) return
    setSelectedCode(region.code)
  }

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#0f172a', color: '#fff', height: '100vh' }}>
        지도를 불러오는 중입니다...
      </div>
    )
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', backgroundColor: '#f8fafc' }}>
      {/* 🔍 상단 지역 검색창 UI (다시 추가됨) */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          width: '90%',
          maxWidth: '400px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '12px 16px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
            border: '1px solid #e2e8f0',
          }}
        >
          <span style={{ marginRight: '8px', fontSize: '16px', color: '#64748b' }}>🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="시·군·구 검색 예: 음성군, 달성군"
            style={{
              border: 'none',
              outline: 'none',
              width: '100%',
              fontSize: '15px',
              backgroundColor: 'transparent',
              color: '#1e293b',
            }}
          />
        </div>
      </div>

      {/* 🗺️ 지도 영역 */}
      {geo ? (
        <MapContainer
          center={[36.5, 127.8]}
          zoom={7}
          style={{ width: '100%', height: '100%' }}
        >
          <KoreaGeoLayer
            geo={geo}
            selectedCode={selectedCode}
            onSelect={handleSelectRegion}
            regionCountMap={regionCountMap}
          />
        </MapContainer>
      ) : (
        <div style={{ padding: '40px', color: '#ef4444', textAlign: 'center' }}>
          지도를 불러오지 못했습니다. (/public/geo/kor_sig.geojson)
        </div>
      )}
    </div>
  )
}