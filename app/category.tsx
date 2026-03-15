import CategoryScreen from '@/src/screens/CategoryScreen'
import { Stack } from 'expo-router'

export default function CategoryScreenRoute() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <CategoryScreen />
    </>
  )
}
