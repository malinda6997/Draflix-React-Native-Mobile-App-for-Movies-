import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs'
import { NavigationHelpers, ParamListBase, TabNavigationState } from '@react-navigation/native'
import * as Haptics from 'expo-haptics'
import { Pressable, StyleSheet } from 'react-native'

interface HapticTabProps {
  onPress?: () => void
  onLongPress?: () => void
  state?: TabNavigationState<ParamListBase>
  descriptor?: any
  navigation?: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>
}

export function HapticTab({ onPress, onLongPress, state, descriptor, navigation }: HapticTabProps) {
  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        onPress?.()
      }}
      onLongPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        onLongPress?.()
      }}
      style={StyleSheet.absoluteFill}
    />
  )
}
