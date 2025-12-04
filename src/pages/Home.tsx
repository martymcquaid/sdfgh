import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Shop = {
  id: string
  name: string
  rating: number
  distanceKm: number
  address: string
  image: string
  petPolicy: string
  tags: string[]
}

const SHOPS: Shop[] = [
  {
    id: 'a1',
    name: 'The Purr & Pour',
    rating: 4.8,
    distanceKm: 0.9,
    address: '45 Willow Ave',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befb58d3?q=80&w=1200&auto=format&fit=crop',
    petPolicy: 'Dogs and cats welcome indoors',
    tags: ['cozy', 'outdoor seating']
  },
  {
    id: 'a2',
    name: 'Bark & Brew',
    rating: 4.6,
    distanceKm: 1.4,
    address: '12 Maple St',
    image: 'https://images.unsplash.com/photo-1526312426768-1a66a3f2e8d9?q=80&w=1200&auto=format&fit=crop',
    petPolicy: 'Leashed pets allowed on patio',
    tags: ['dog-friendly', 'latte art']
  },
  {
    id: 'a3',
    name: 'Pawsitive Cafe',
    rating: 4.7,
    distanceKm: 2.1,
    address: '3 Ocean Dr',
    image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=1200&auto=format&fit=crop',
    petPolicy: 'Pets welcome throughout',
    tags: ['wifi', 'bakery']
  },
  {
    id: 'a4',
    name: 'Whiskers & Whisk',
    rating: 4.5,
    distanceKm: 0.6,
    address: '88 Cedar Ln',
    image: 'https://images.unsplash.com/photo-1519682576866-ae5a0cbeb5f8?q=80&w=1200&auto=format&fit=crop',
    petPolicy: 'Pet-friendly indoors',
    tags: ['quiet', 'snacks']
  },
  {
    id: 'a5',
    name: 'Cup & Collar',
    rating: 4.4,
    distanceKm: 3.2,
    address: '22 Parkside',
    image: 'https://images.unsplash.com/photo-1495474528270-9df3f48b1186?q=80&w=1200&auto=format&fit=crop',
    petPolicy: 'Outdoor seating only with pets',
    tags: ['drip', 'bakery']
  },
  {
    id: 'a6',
    name: 'Furry Beans',
    rating: 4.9,
    distanceKm: 2.5,
    address: '9 Harbor St',
    image: 'https://images.unsplash.com/photo-1498654604358-1d2b4c9a9c3c?q=80&w=1200&auto=format&fit=crop',
    petPolicy: 'All pets welcome with leash',
    tags: ['rooftop', 'lattes']
  }
]

const ClockWidget: React.FC = () => {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="bg-white/10 rounded-xl p-4 text-center w-full">
      <div className="text-xs text-slate-300 mb-1">Local Time</div>
      <div className="text-lg font-semibold">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
    </div>
  )
}

const WeatherWidget: React.FC = () => {
  const [temp, setTemp] = useState<number>(72)
  const [condition, setCondition] = useState<string>('Sunny')
  useEffect(() => {
    const t = Math.floor(Math.random() * 4)
    setTemp(68 + t * 2)
    const conds = ['Sunny', 'Cloudy', 'Partly Cloudy', 'Clear']
    setCondition(conds[t])
  }, [])
  const emoji = condition === 'Sunny' ? '☀️' : condition.includes('Cloud') ? '☁️' : '🌤️'
  return (
    <div className="bg-white/10 rounded-xl p-4 text-center w-full">
      <div className="text-xs text-slate-300 mb-1">{emoji} Weather</div>
      <div className="text-2xl font-bold">{temp}°F</div>
      <div className="text-xs text-slate-400">{condition}</div>
    </div>
  )
}

const TipsWidget: React.FC = () => {
  const tips = [
    'Always bring a leash for your pup.',
    'Water bowls available at most pet-friendly cafes.',
    'Ask before ordering for any pet accommodations.',
    'Respect quiet hours and other patrons.'
  ]
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const i = setInterval(() => setIdx(i => (i + 1) % tips.length), 5000)
    return () => clearInterval(i)
  }, [])
  return (
    <div className="bg-white/10 rounded-xl p-4">
      <div className="text-sm font-semibold mb-1">Pet Care Tip</div>
      <div className="text-sm text-slate-200">{tips[idx]}</div>
    </div>
  )
}

const ShopCard: React.FC<{ shop: Shop }> = ({ shop }) => {
  return (
    <div className="bg-white/10 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
      <img src={shop.image} alt={shop.name} className="w-full h-40 object-cover" />
      <div className="p-3">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-white">{shop.name}</div>
          <div className="text-sm text-yellow-300">{shop.rating.toFixed(1)} ★</div>
        </div>
        <div className="text-xs text-slate-300">{shop.distanceKm} km • {shop.address}</div>
        <div className="text-xs text-slate-200 mt-2">{shop.petPolicy}</div>
      </div>
    </div>
  )
}

export default function Home() {
  const [query, setQuery] = useState<string>("")
  const [onlyPetFriendly, setOnlyPetFriendly] = useState(true)
  const shops = SHOPS.filter(s =>
    !onlyPetFriendly || s.petPolicy.toLowerCase().includes('pets') || s.petPolicy.toLowerCase().includes('dog') || s.petPolicy.toLowerCase().includes('cat')
  )
  const filtered = shops.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) || s.address.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-slate-100">
      <header className="max-w-7xl mx-auto p-6 sticky top-0 bg-black/40 backdrop-blur-md z-10">
        <nav className="flex items-center justify-between">
          <div className="text-xl font-bold">CoffeePaws</div>
          <div className="space-x-4">
            <a href="#shops" className="text-sm hover:underline">Shops</a>
            <a href="#widgets" className="text-sm hover:underline">Widgets</a>
            <a href="#map" className="text-sm hover:underline">Map</a>
          </div>
        </nav>
      </header>

      <section className="relative bg-gradient-to-br from-pink-600 to-rose-600 py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/0" />
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,.5)' }}>
              Pet-friendly Coffee Spots
              <span className="block text-5xl md:text-6xl text-white/90"> for you and your {`"furry friends"`}</span>
            </h1>
            <p className="text-white/80 mb-6 max-w-md">
              Discover modern, pet-friendly cafes with cozy vibes, great drafts, and outdoor spaces. Explore, filter, and plan your next pup-approved coffee stop.
            </p>
            <div className="flex items-center gap-4">
              <button className="bg-white text-slate-900 font-semibold px-6 py-3 rounded-full shadow hover:bg-slate-100">Explore Shops</button>
              <button className="bg-slate-200/20 border border-white px-5 py-2 rounded-full hover:bg-white/10">Get Updates</button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <WeatherWidget />
            <ClockWidget />
            <TipsWidget />
            <div className="bg-white/10 rounded-xl p-4 flex items-center justify-center text-sm text-slate-200">
              <span>Live Availability: Local data</span>
            </div>
          </div>
        </div>
      </section>

      <section id="shops" className="max-w-7xl mx-auto px-6 py-12" aria-label="Shops">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Nearby Pet-friendly Cafés</h2>
          <div className="flex items-center space-x-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or address..."
              className="px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-slate-300 w-60"
            />
            <label className="flex items-center text-sm">
              <input type="checkbox" checked={onlyPetFriendly} onChange={(e) => setOnlyPetFriendly(e.target.checked)} className="mr-2" />
              Pet-friendly only
            </label>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
        {filtered.length === 0 && <p className="text-slate-300 mt-4">No results. Try clearing filters.</p>}
      </section>

      <section id="map" className="max-w-7xl mx-auto px-6 py-12" aria-label="Map">
        <h2 className="text-2xl font-bold mb-4">Map & Nearby</h2>
        <div className="w-full h-96 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center text-slate-300">
          <span>Map placeholder (interactive map would appear here)</span>
        </div>
      </section>

      <footer className="text-center text-slate-400 py-8">&copy; {new Date().getFullYear()} CoffeePaws</footer>
    </div>
  )
}
