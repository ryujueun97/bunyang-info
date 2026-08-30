'use client'

import { GeoJSON, useMap } from 'react-leaflet'
import type { FeatureCollection } from 'geojson'
import L from 'leaflet'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export type SelectedRegion = {
  code: string | null
  name: string
}

type Props = {
  geo: FeatureCollection
  selectedCode: string | null
  onSelect: (v: SelectedRegion) => void
  autoFitOnSelect?: boolean
  regionCountMap?: Record<string, number>
}

function normalizeKoreanSpacing(s: string): string {
  return s
    .trim()
    .replace(/([가-힣])\s+([가-힣])/g, '$1$2')
}

function toStr(v: any): string | null {
  if (typeof v === 'string') {
    const t = v.trim()
    return t ? t : null
  }
  if (typeof v === 'number' && Number.isFinite(v)) return String(v)
  return null
}

function pickCode(p: Record<string, any>): string | null {
  const candidates = ['SIG_CD', 'sig_cd', 'SGG_CD', 'sgg_cd', 'ADM_CD', 'adm_cd']

  for (const k of candidates) {
    const v = toStr(p?.[k])
    if (v && !v.includes('ARB')) return v
  }

  for (const [k, v0] of Object.entries(p || {})) {
    const kk = k.toLowerCase()
    if ((kk.includes('sig') || kk.includes('sgg')) && kk.includes('cd')) {
      const v = toStr(v0)
      if (v) return v
    }
  }

  return toStr(p?.SIG_CD || p?.sig_cd || p?.code || null)
}

function pickName(p: Record<string, any>): string {
  const candidates = ['SIG_KOR_NM', 'sig_kor_nm', 'SIG_NM', 'sig_nm', 'SGG_NM', 'sgg_nm']

  for (const k of candidates) {
    const v = toStr(p?.[k])
    if (v) return normalizeKoreanSpacing(v)
  }

  const korNm = toStr(p?.KOR_NM || p?.kor_nm)
  if (korNm) return normalizeKoreanSpacing(korNm)

  const strings = Object.entries(p || {})
    .filter(([, v]) => typeof v === 'string' && (v as string).trim())
    .map(([, v]) => (v as string).trim())
    .filter((v) => /[가-힣]/.test(v))
    .filter((v) => !v.includes('(주)') && !v.includes('주식회사') && !v.includes('시스템'))

  if (strings.length > 0) {
    return normalizeKoreanSpacing(strings[0])
  }

  return '알 수 없는 지역'
}

function getFillColorByCount(count: number): string {
  if (!count || count === 0) return '#ffffff'
  if (count <= 2) return '#60a5fa'
  if (count <= 5) return '#2563eb'
  return '#1d4ed8'
}

export default function KoreaGeoLayer({
  geo,
  selectedCode,
  onSelect,
  autoFitOnSelect = true,
  regionCountMap = {},
}: Props) {
  const map = useMap()
  const router = useRouter()
  const [paneReady, setPaneReady] = useState(false)

  useEffect(() => {
    const paneName = 'geojsonPane'
    let pane = map.getPane(paneName)
    if (!pane) {
      pane = map.createPane(paneName)
      pane.style.zIndex = '650'
      pane.style.pointerEvents = 'auto'
    }
    setPaneReady(true)
  }, [map])

  const getCount = (code: string | null, name: string): number => {
    if (!name && !code) return 0

    if (code && regionCountMap[code] !== undefined) {
      return regionCountMap[code]
    }

    const cleanName = name ? name.replace(/\s+/g, '') : ''

    for (const [key, count] of Object.entries(regionCountMap)) {
      const cleanKey = key.replace(/\s+/g, '')

      if (cleanName && (cleanName.includes(cleanKey) || cleanKey.includes(cleanName))) {
        return count
      }
    }

    return 0
  }

  const getStyleForFeature = (feature: any, isHover = false, isSelected = false): L.PathOptions => {
    const p = feature?.properties || {}
    const code = pickCode(p)
    const name = pickName(p)
    
    const count = getCount(code, name)
    const baseFillColor = getFillColorByCount(count)

    if (isSelected) {
      return {
        weight: 3,
        color: '#1e293b',
        fillColor: '#38bdf8',
        fillOpacity: 0.9,
      }
    }

    if (isHover) {
      return {
        weight: 2.5,
        color: '#000000',
        fillColor: count > 0 ? baseFillColor : '#e2e8f0',
        fillOpacity: 0.85,
      }
    }

    return {
      weight: 1.2,
      color: 'rgba(0,0,0,0.3)',
      fillColor: baseFillColor,
      fillOpacity: count > 0 ? 0.75 : 0.15,
    }
  }

  const onEachFeature = (feature: any, layer: L.Layer) => {
    const p = feature?.properties || {}
    const code = pickCode(p)
    const name = pickName(p)
    const count = getCount(code, name)

    const isSelected = Boolean(selectedCode && code && selectedCode === code)
    ;(layer as any).setStyle?.(getStyleForFeature(feature, false, isSelected))

    try {
      ;(layer as any).bindTooltip?.(
        `${name} | 매물 정보 ${count}건`,
        { sticky: true, direction: 'top', interactive: false }
      )
    } catch {}

    if (isSelected) {
      ;(layer as any).bringToFront?.()
    }

    layer.on('mouseover', () => {
      if (selectedCode && code && selectedCode === code) return
      ;(layer as any).setStyle?.(getStyleForFeature(feature, true, false))
      ;(layer as any).bringToFront?.()
    })

    layer.on('mouseout', () => {
      const currentlySelected = Boolean(selectedCode && code && selectedCode === code)
      ;(layer as any).setStyle?.(getStyleForFeature(feature, false, currentlySelected))
    })

    layer.on('click', (e: any) => {
      try {
        if (e?.originalEvent) L.DomEvent.stopPropagation(e.originalEvent)
      } catch {}

      onSelect({ code, name })

      // 📌 핵심 해결: 페이지 전환 직전 fitBounds 애니메이션 충돌로 인한 _leaflet_pos 에러 방지
      // animate: false 처리 및 바로 router.push 실행
      router.push(`/announcements?code=${code || ''}&regionName=${encodeURIComponent(name ?? '')}`)
    })
  }

  if (!paneReady) return null

  return (
    <GeoJSON
      key={selectedCode ?? 'none'}
      pane="geojsonPane"
      interactive={true}
      data={geo as any}
      onEachFeature={onEachFeature as any}
    />
  )
}