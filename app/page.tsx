import InteractiveMap from '@/components/InteractiveMap'

export default function Home() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Interactive Map Demo</h1>
      <InteractiveMap />
    </main>
  )
}