import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native'

export type IconSymbolName =
  | 'house.fill'
  | 'paperplane.fill'
  | 'bookmark.fill'
  | 'person.fill'
  | 'magnifyingglass'

interface Props {
  name: IconSymbolName
  size?: number
  color: string | OpaqueColorValue
  style?: StyleProp<ViewStyle>
}

// Map icon names to expo vector icons
const iconMap: { [key in IconSymbolName]: { library: string; name: string } } = {
  'house.fill': { library: 'MaterialCommunityIcons', name: 'home' },
  'paperplane.fill': { library: 'MaterialCommunityIcons', name: 'compass' },
  'bookmark.fill': { library: 'MaterialCommunityIcons', name: 'bookmark' },
  'person.fill': { library: 'MaterialCommunityIcons', name: 'account' },
  'magnifyingglass': { library: 'MaterialCommunityIcons', name: 'magnify' },
}

export function IconSymbol({ name, size = 24, color, style }: Props) {
  const icon = iconMap[name] || iconMap['house.fill']

  if (icon.library === 'MaterialCommunityIcons') {
    return (
      <MaterialCommunityIcons
        name={icon.name as any}
        size={size}
        color={color}
        style={style}
      />
    )
  }

  if (icon.library === 'Ionicons') {
    return (
      <Ionicons
        name={icon.name as any}
        size={size}
        color={color}
        style={style}
      />
    )
  }

  return (
    <FontAwesome5
      name={icon.name as any}
      size={size}
      color={color}
      style={style}
    />
  )
}
