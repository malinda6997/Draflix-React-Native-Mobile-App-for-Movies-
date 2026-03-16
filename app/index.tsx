import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import SplashScreen from '@/src/screens/SplashScreen'

export default function Index() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(tabs)')
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return <SplashScreen />
}
