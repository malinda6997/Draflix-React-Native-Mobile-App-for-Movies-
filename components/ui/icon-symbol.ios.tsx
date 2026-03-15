import { SymbolWeight } from 'expo-symbols'
import React from 'react'
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native'

import { IconSymbolName } from './icon-symbol'

interface Props {
  name: IconSymbolName
  size?: number
  color: string | OpaqueColorValue
  style?: StyleProp<ViewStyle>
  weight?: SymbolWeight
}

// Simple fallback component for iOS using SF Symbols
export function SFSymbol({ name, size = 24, color, style, weight }: Props) {
  // Placeholder - would be replaced with actual SF Symbol implementation
  return null
}
