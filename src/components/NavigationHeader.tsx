'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = {
  title?: string
}

export default function NavigationHeader({ title }: Props) {
  const router = useRouter()

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        backgroundColor: '#1e293b',
        borderBottom: '1px solid #334155',
        marginBottom: '24px',
        borderRadius: '12px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* 이전 페이지로 뒤로가기 */}
        <button
          onClick={() => router.back()}
          style={{
            backgroundColor: '#334155',
            color: '#fff',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          ← 뒤로가기
        </button>

        {/* 지도로 바로 돌아가기 */}
        <Link
          href="/map"
          style={{
            backgroundColor: '#0284c7',
            color: '#fff',
            textDecoration: 'none',
            padding: '8px 14px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          🗺️ 지도로 돌아가기
        </Link>
      </div>

      {title && (
        <span style={{ color: '#94a3b8', fontSize: '14px', fontWeight: 600 }}>
          {title}
        </span>
      )}
    </div>
  )
}