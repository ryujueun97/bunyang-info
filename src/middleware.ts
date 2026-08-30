import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // 1. 관리자 전용 경로인지 확인 (/admin 및 /admin/ 하위 모든 경로)
  const isAdminPath = path.startsWith('/admin')

  // 2. 쿠키에서 로그인 인증 여부 확인
  const isLoggedIn = request.cookies.get('isAdminLoggedIn')?.value === 'true'

  // 3. 비로그인 상태에서 관리자 경로 진입 시 로그인 페이지로 강제 리다이렉트
  if (isAdminPath && !isLoggedIn) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

// 📌 미들웨어가 동작할 경로 지정
export const config = {
  matcher: ['/admin/:path*'],
}