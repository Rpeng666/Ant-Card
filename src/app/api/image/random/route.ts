import { NextResponse } from 'next/server'

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY!  // ✅ 请在 .env.local 中配置
const cache = new Map<string, string>()
const CACHE_TTL = 1000 * 60 * 5 // 5分钟缓存

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') || 'nature'
  const seed = searchParams.get('seed') || Math.random().toString(36).substring(2)
  const cacheKey = `${type}:${seed}`

  // 缓存命中
  if (cache.has(cacheKey)) {
    return NextResponse.json({ url: cache.get(cacheKey), source: 'cache' })
  }

  let imageUrl = ''
  let source = ''

  try {
    switch (type) {
      case 'avatar':
        // 🎭 头像生成（DiceBear）
        imageUrl = `https://api.dicebear.com/9.x/adventurer/png?seed=${seed}`
        source = 'DiceBear'
        break

      case 'animal':
        // 🐶🐱 随机动物
        if (Math.random() > 0.5) {
          const res = await fetch('https://random.dog/woof.json')
          const data = await res.json()
          imageUrl = data.url
          source = 'RandomDog'
        } else {
          const res = await fetch('https://api.thecatapi.com/v1/images/search')
          const data = await res.json()
          imageUrl = data[0]?.url
          source = 'CatAPI'
        }
        break

      case 'placeholder':
        imageUrl = `https://via.placeholder.com/400x300?text=Placeholder`
        source = 'Placeholder.com'
        break

      default:
        // 🌄 调用 Unsplash 官方 API（带 KEY）
        const topicQuery = getUnsplashQuery(type)
        const unsplashRes = await fetch(
          `https://api.unsplash.com/photos/random?query=${topicQuery}&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`,
          {
            headers: { 'Accept-Version': 'v1' },
          }
        )
        if (!unsplashRes.ok) throw new Error(`Unsplash API Error: ${unsplashRes.status}`)
        const data = await unsplashRes.json()
        imageUrl = data.urls?.regular || data.urls?.small
        source = 'Unsplash'
    }

    if (!imageUrl) throw new Error('No image URL found')

    // 缓存结果
    cache.set(cacheKey, imageUrl)
    setTimeout(() => cache.delete(cacheKey), CACHE_TTL)

    return NextResponse.json({ url: imageUrl, source })
  } catch (err) {
    console.error('Random image API error:', err)
    return NextResponse.json(
      {
        url: 'https://picsum.photos/800/600',
        source: 'fallback',
        error: (err as Error).message,
      },
      { status: 200 }
    )
  }
}

/** 根据 type 返回 Unsplash 查询关键词 */
function getUnsplashQuery(type: string): string {
  switch (type) {
    case 'city': return 'city,urban,architecture'
    case 'tech': return 'technology,computer,ai'
    case 'food': return 'food,meal,restaurant'
    case 'art': return 'art,painting,abstract'
    case 'nature': return 'nature,landscape,forest,mountain'
    default: return 'random'
  }
}
