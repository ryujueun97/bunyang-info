export interface Property {
  id: string
  regionCode: string
  regionName: string
  title: string
  price: string
  type: string
  contact: string
  imageUrl?: string // 📌 매물 대표 사진
  description?: string
  address?: string
}

export let sampleProperties: Property[] = [
  {
    id: 'P001',
    regionCode: '43720',
    regionName: '음성군',
    title: '음성 푸르지오 센터파크',
    price: '3억 2,000만원 ~',
    type: '아파트',
    contact: '010-0000-0000',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    address: '충청북도 음성군 대소면 일원',
    description: '음성 기업도시의 핵심 입지! 초역세권 단지 및 최신 커뮤니티 시설 보유.',
  },
  {
    id: 'P002',
    regionCode: '43720',
    regionName: '음성군',
    title: '음성 아이파크',
    price: '2억 9,000만원 ~',
    type: '아파트',
    contact: '010-0000-0000',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    address: '충청북도 음성군 맹동면 일원',
    description: '혁신도시 프리미엄 라이프를 누리는 브랜드 대단지 라이프.',
  },
  {
    id: 'P003',
    regionCode: '27710',
    regionName: '달성군',
    title: '달성 파크푸르지오',
    price: '4억 1,000만원 ~',
    type: '아파트',
    contact: '010-0000-0000',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    address: '대구광역시 달성군 화원읍 일원',
    description: '대구 1호선 연장 수혜 단지, 쾌적한 자연환경과 우수한 학군 제공.',
  },
]

export const getRegionCountMap = (): Record<string, number> => {
  const map: Record<string, number> = {}
  sampleProperties.forEach((p) => {
    const nameKey = p.regionName.trim()
    const codeKey = p.regionCode.trim()
    if (nameKey) map[nameKey] = (map[nameKey] || 0) + 1
    if (codeKey) map[codeKey] = (map[codeKey] || 0) + 1
  })
  return map
}

export const addProperty = (newProp: Omit<Property, 'id'>) => {
  const id = `P${String(sampleProperties.length + 1).padStart(3, '0')}`
  sampleProperties.push({ id, ...newProp })
}

export const deleteProperty = (id: string) => {
  sampleProperties = sampleProperties.filter((p) => p.id !== id)
}