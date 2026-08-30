'use client'

import { useEffect, useMemo, useState } from 'react'
import { MapContainer, useMap } from 'react-leaflet'
import { useRouter } from 'next/navigation'
import type { FeatureCollection } from 'geojson'
import L from 'leaflet'

import KoreaGeoLayer, {
  type SelectedRegion,
} from './KoreaGeoLayer'

import 'leaflet/dist/leaflet.css'

// 현재 정상 작동 중인 지도 파일 경로
// 파일 경로가 다르면 이 한 줄만 바꾸면 됨
const GEO_URL = '/geo/kor_sig_simplified.geojson'

type RegionOption = {
  code: string
  name: string
  feature: any
}

function toText(value: unknown): string | null {
  if (typeof value === 'string') {
    const trimmed = value.trim()
    return trimmed || null
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value)
  }

  return null
}

function getRegionCode(properties: Record<string, any>): string | null {
  const candidates = [
    'SIG_CD',
    'sig_cd',
    'SGG_CD',
    'sgg_cd',
    'ADM_CD',
    'adm_cd',
    'CODE',
    'code',
    'A1',
    'NF_ID',
  ]

  for (const key of candidates) {
    const value = toText(properties?.[key])

    if (value) {
      return value
    }
  }

  for (const [key, rawValue] of Object.entries(properties ?? {})) {
    const lowerKey = key.toLowerCase()

    if (lowerKey.includes('cd') || lowerKey.includes('code')) {
      const value = toText(rawValue)

      if (value) {
        return value
      }
    }
  }

  return null
}

function getRegionName(properties: Record<string, any>): string | null {
  const candidates = [
    'SIG_KOR_NM',
    'sig_kor_nm',
    'SIG_NM',
    'sig_nm',
    'SGG_NM',
    'sgg_nm',
    'ADM_NM',
    'adm_nm',
    'NAME',
    'name',
    'KOR_NM',
    'kor_nm',
    'A2',
    'ADZONE_NM',
  ]

  for (const key of candidates) {
    const value = toText(properties?.[key])

    if (value) {
      return value.replace(/\s+/g, '')
    }
  }

  const fallback = Object.values(properties ?? {}).find(
    (value) =>
      typeof value === 'string' &&
      /[가-힣]/.test(value) &&
      value.trim().length >= 2
  )

  return typeof fallback === 'string'
    ? fallback.trim().replace(/\s+/g, '')
    : null
}

function FitKoreaBounds({
  geo,
}: {
  geo: FeatureCollection
}) {
  const map = useMap()

  useEffect(() => {
    const layer = L.geoJSON(geo as any)
    const bounds = layer.getBounds()

    if (!bounds.isValid()) {
      return
    }

    map.fitBounds(bounds, {
      padding: [24, 24],
      animate: false,
    })

    map.setMaxBounds(bounds.pad(0.08))
  }, [geo, map])

  return null
}

function MoveToRegion({
  selectedFeature,
}: {
  selectedFeature: any | null
}) {
  const map = useMap()

  useEffect(() => {
    if (!selectedFeature) {
      return
    }

    const layer = L.geoJSON(selectedFeature)
    const bounds = layer.getBounds()

    if (!bounds.isValid()) {
      return
    }

    map.fitBounds(bounds, {
      padding: [40, 40],
      maxZoom: 10,
      animate: true,
    })
  }, [selectedFeature, map])

  return null
}

export default function MapView() {
  const router = useRouter()

  const [geo, setGeo] = useState<FeatureCollection | null>(null)
  const [selectedCode, setSelectedCode] = useState<string | null>(null)
  const [selectedFeature, setSelectedFeature] = useState<any | null>(null)

  const [searchText, setSearchText] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const loadGeo = async () => {
      try {
        const response = await fetch(GEO_URL)

        if (!response.ok) {
          throw new Error(
            `지도 데이터 요청 실패: ${response.status}`
          )
        }

        const data = (await response.json()) as FeatureCollection

        if (data.type !== 'FeatureCollection') {
          throw new Error(
            '지도 데이터 형식이 올바르지 않습니다.'
          )
        }

        setGeo(data)
      } catch (error) {
        console.error('[GEO LOAD ERROR]', error)

        setErrorMessage(
          error instanceof Error
            ? error.message
            : '지도 데이터를 불러오지 못했습니다.'
        )
      }
    }

    loadGeo()
  }, [])

  const regions = useMemo<RegionOption[]>(() => {
    if (!geo) {
      return []
    }

    const result = geo.features
      .map((feature: any) => {
        const properties = feature?.properties ?? {}
        const code = getRegionCode(properties)
        const name = getRegionName(properties)

        if (!code || !name) {
          return null
        }

        return {
          code,
          name,
          feature,
        }
      })
      .filter(
        (item): item is RegionOption =>
          item !== null
      )

    const unique = new Map<string, RegionOption>()

  for (const item of result) {
    const normalizedName = item.name.replace(/\s+/g, '')

    if (!unique.has(normalizedName)) {
    unique.set(normalizedName, item)
  }
}

    return Array.from(unique.values()).sort((a, b) =>
      a.name.localeCompare(b.name, 'ko')
    )
  }, [geo])

  const filteredRegions = useMemo(() => {
    const keyword = searchText.trim().replace(/\s+/g, '')

    if (!keyword) {
      return []
    }

    return regions
      .filter((region) =>
        region.name.includes(keyword)
      )
      .slice(0, 12)
  }, [regions, searchText])

  const openRegionListings = (
    region: Pick<RegionOption, 'code' | 'name'>
  ) => {
    setSelectedCode(region.code)

    const url =
      `/announcements/${encodeURIComponent(region.code)}` +
      `?regionName=${encodeURIComponent(region.name)}`

    router.push(url)
  }

  const handleMapRegionSelect = (
    region: SelectedRegion
  ) => {
    if (!region.code) {
      return
    }

    setSelectedCode(region.code)

    openRegionListings({
      code: region.code,
      name: region.name,
    })
  }

  const handleSearchRegionSelect = (
    region: RegionOption
  ) => {
    setSearchText(region.name)
    setShowResults(false)
    setSelectedCode(region.code)
    setSelectedFeature(region.feature)

    // 검색 결과를 눌렀을 때 잠깐 해당 지역으로 확대
    // 곧바로 목록으로 이동하려면 아래 setTimeout을 제거하고
    // openRegionListings(region)만 남겨도 됨
    setTimeout(() => {
      openRegionListings(region)
    }, 350)
  }

  if (errorMessage) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-neutral-100 px-6">
        <div className="rounded-xl bg-white p-6 shadow">
          <h1 className="text-xl font-bold">
            지도를 불러오지 못했습니다.
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            {errorMessage}
          </p>
        </div>
      </main>
    )
  }

  if (!geo) {
    return (
      <div className="flex h-screen items-center justify-center bg-neutral-100 text-gray-700">
        대한민국 지도를 불러오는 중...
      </div>
    )
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-neutral-100">
      <div className="absolute left-1/2 top-5 z-[1000] w-[calc(100%-32px)] max-w-md -translate-x-1/2">
        <div className="rounded-xl bg-white shadow-lg">
          <div className="flex items-center px-4">
            <span className="mr-3 text-gray-400">
              🔍
            </span>

            <input
              value={searchText}
              onChange={(event) => {
                setSearchText(event.target.value)
                setShowResults(true)
              }}
              onFocus={() => {
                setShowResults(true)
              }}
              onKeyDown={(event) => {
                if (
                  event.key === 'Enter' &&
                  filteredRegions.length > 0
                ) {
                  handleSearchRegionSelect(
                    filteredRegions[0]
                  )
                }

                if (event.key === 'Escape') {
                  setShowResults(false)
                }
              }}
              placeholder="시·군·구 검색 예: 음성군"
              className="h-14 w-full bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-400"
            />

            {searchText && (
              <button
                type="button"
                onClick={() => {
                  setSearchText('')
                  setShowResults(false)
                }}
                className="ml-2 text-gray-400 hover:text-gray-700"
                aria-label="검색어 지우기"
              >
                ✕
              </button>
            )}
          </div>

          {showResults && searchText.trim() && (
            <div className="max-h-80 overflow-y-auto border-t border-gray-100">
              {filteredRegions.length === 0 ? (
                <p className="px-4 py-4 text-sm text-gray-500">
                  일치하는 지역이 없습니다.
                </p>
              ) : (
                filteredRegions.map((region) => (
                  <button
                    key={region.code}
                    type="button"
                    onClick={() =>
                      handleSearchRegionSelect(region)
                    }
                    className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
                  >
                    <span className="font-medium text-gray-900">
                      {region.name}
                    </span>

                    <span className="text-xs text-gray-400">
                      {region.code}
                    </span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <MapContainer
        center={[36.3, 127.8]}
        zoom={7}
        minZoom={7}
        maxZoom={13}
        zoomControl={true}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
        worldCopyJump={false}
        maxBoundsViscosity={1}
        style={{
          height: '100%',
          width: '100%',
          background: '#f5f5f5',
        }}
      >
        <FitKoreaBounds geo={geo} />

        <MoveToRegion
          selectedFeature={selectedFeature}
        />

        <KoreaGeoLayer
          geo={geo}
          selectedCode={selectedCode}
          onSelect={handleMapRegionSelect}
          autoFitOnSelect={false}
        />
      </MapContainer>
    </div>
  )
}