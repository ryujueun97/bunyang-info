'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { sampleProperties, addProperty, deleteProperty, Property } from '@/data/properties'

export default function AdminPropertiesPage() {
  const router = useRouter()
  const [properties, setProperties] = useState<Property[]>([])

  // 폼 입력 상태
  const [regionName, setRegionName] = useState('')
  const [regionCode, setRegionCode] = useState('')
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [type, setType] = useState('아파트')
  const [contact, setContact] = useState('')

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn')
    if (isLoggedIn !== 'true') {
      router.push('/login')
    } else {
      setProperties([...sampleProperties])
    }
  }, [router])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()

    if (!regionName || !title || !price || !contact) {
      alert('필수 입력 항목(지역명, 매물명, 분양가, 연락처)을 입력해주세요.')
      return
    }

    addProperty({
      regionName: regionName.trim(),
      regionCode: regionCode.trim(),
      title: title.trim(),
      price: price.trim(),
      type,
      contact: contact.trim(),
    })

    setProperties([...sampleProperties])
    setRegionName('')
    setRegionCode('')
    setTitle('')
    setPrice('')
    setContact('')
    alert('새 분양 매물이 등록되었습니다.')
  }

  const handleDelete = (id: string) => {
    if (confirm('해당 매물을 삭제하시겠습니까?')) {
      deleteProperty(id)
      setProperties([...sampleProperties])
    }
  }

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#fff', padding: '32px 24px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <Link
          href="/admin"
          style={{
            color: '#94a3b8',
            textDecoration: 'none',
            fontSize: '14px',
            display: 'inline-block',
            marginBottom: '20px',
          }}
        >
          ← 관리자 대시보드로 돌아가기
        </Link>

        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>🏢 분양 매물 등록 및 관리</h1>
          <p style={{ color: '#94a3b8', marginTop: '6px', fontSize: '14px' }}>
            시·군·구별 매물을 추가하거나 기존 매물을 삭제할 수 있습니다.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '24px' }}>
          
          {/* 등록 폼 */}
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: 0, marginBottom: '20px', color: '#38bdf8' }}>
              ➕ 매물 등록
            </h2>

            <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>
                  지역명 (예: 음성군, 달성군) *
                </label>
                <input
                  type="text"
                  value={regionName}
                  onChange={(e) => setRegionName(e.target.value)}
                  placeholder="예: 음성군"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>
                  지역 코드 (선택사항, 예: 43720)
                </label>
                <input
                  type="text"
                  value={regionCode}
                  onChange={(e) => setRegionCode(e.target.value)}
                  placeholder="예: 43720"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>
                  분양 매물명 *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="예: 달성 파크 푸르지오"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>
                  분양가 *
                </label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="예: 3억 5,000만원 ~"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>
                  건물 유형
                </label>
                <select value={type} onChange={(e) => setType(e.target.value)} style={inputStyle}>
                  <option value="아파트">아파트</option>
                  <option value="오피스텔">오피스텔</option>
                  <option value="상가">상가</option>
                  <option value="토지">토지</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '4px' }}>
                  문의 연락처 *
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="010-0000-0000"
                  style={inputStyle}
                />
              </div>

              <button
                type="submit"
                style={{
                  marginTop: '10px',
                  backgroundColor: '#2563eb',
                  color: '#fff',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '15px',
                }}
              >
                매물 등록하기
              </button>
            </form>
          </div>

          {/* 등록된 목록 */}
          <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: 0, marginBottom: '20px', color: '#38bdf8' }}>
              📋 등록된 매물 목록 ({properties.length}건)
            </h2>

            {properties.length === 0 ? (
              <p style={{ color: '#94a3b8', textAlign: 'center', padding: '40px 0' }}>등록된 매물이 없습니다.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '560px', overflowY: 'auto' }}>
                {properties.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: '#0f172a',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 'bold' }}>
                        [{item.regionName}] {item.type}
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', margin: '4px 0' }}>{item.title}</div>
                      <div style={{ fontSize: '14px', color: '#94a3b8' }}>{item.price} | 📞 {item.contact}</div>
                    </div>

                    <button
                      onClick={() => handleDelete(item.id)}
                      style={{
                        backgroundColor: '#ef4444',
                        color: '#fff',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        cursor: 'pointer',
                      }}
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: '6px',
  border: '1px solid #475569',
  backgroundColor: '#0f172a',
  color: '#fff',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box' as const,
}