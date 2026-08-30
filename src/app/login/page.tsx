'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // 📌 관리자 테스트 계정 (admin / 1234)
    if (id === 'admin' && password === '1234') {
      // 1. 로컬스토리지 저장
      localStorage.setItem('isAdminLoggedIn', 'true')
      
      // 2. 미들웨어 검증용 쿠키 저장 (7일간 유지)
      document.cookie = 'isAdminLoggedIn=true; path=/; max-age=604800'

      alert('관리자로 로그인되었습니다.')
      router.push('/admin')
    } else {
      alert('아이디 또는 비밀번호가 일치하지 않습니다. (테스트 계정: admin / 1234)')
    }
  }

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '36px', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '24px' }}>🔒 관리자 로그인</h1>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>아이디</label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="admin"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '6px' }}>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="1234"
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: '#2563eb',
              color: '#fff',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '15px',
              marginTop: '8px',
            }}
          >
            로그인하기
          </button>
        </form>
      </div>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #475569',
  backgroundColor: '#0f172a',
  color: '#fff',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box' as const,
}