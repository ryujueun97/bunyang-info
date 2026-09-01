// @ts-nocheck
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
  return s.trim().replace(/([가-힣])\s+([가-힣])/g, '$1$2')
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
  return toStr(p?.SIG_CD || p?.sig_cd || p?.code || null)
}

function pickName(p: Record<string, any>): string {
  const candidates = ['SIG_KOR_NM', 'sig_kor_nm', 'SIG_NM', 'sig_nm', 'SGG_NM', 'sgg_nm']
  for (const k of candidates) {
    const v = toStr(p?.[k])
    if (v) return normalizeKoreanSpacing(v)
  }
  return '알 수 없는 지역'
}

export default function KoreaGeoLayer({
  geo,
  selectedCode,
  onSelect,
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
    }
    // 📌 핵심: 마커(zIndex: 600 이상)보다 지도가 항상 밑에깔리도록 zIndex를 400으로 낮춤
    pane.style.zIndex = '400'
    pane.style.pointerEvents = 'auto'
    setPaneReady(true)
  }, [map])

  const getStyleForFeature = (feature: any, isHover = false, isSelected = false): L.PathOptions => {
    if (isSelected) {
      return {
        weight: 2,
        color: '#0284c7',
        fillColor: '#38bdf8',
        fillOpacity: 0.8,
      }
    }

    if (isHover) {
      return {
        weight: 1.5,
        color: '#0369a1',
        fillColor: '#bae6fd',
        fillOpacity: 0.8,
      }
    }

    // 📌 대한민국 지도 기본 면 색상 설정 (화사한 파스텔 블루 톤)
    return {
      weight: 0.8,
      color: '#94a3b8',
      fillColor: '#f1f5f9',
      fillOpacity: 0.9,
    }
  }

  const onEachFeature = (feature: any, layer: L.Layer) => {
    const p = feature?.properties || {}
    const code = pickCode(p)
    const name = pickName(p)

    const isSelected = Boolean(selectedCode && code && selectedCode === code)
    ;(layer as any).setStyle?.(getStyleForFeature(feature, false, isSelected))

    layer.on('mouseover', () => {
      if (selectedCode && code && selectedCode === code) return
      ;(layer as any).setStyle?.(getStyleForFeature(feature, true, false))
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