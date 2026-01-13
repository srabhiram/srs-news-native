import { View, Text } from 'react-native'
import React from 'react'
import { usePathname } from 'expo-router'
import { useLocalSearchParams, useSearchParams } from 'expo-router/build/hooks'

const ParamIndex = () => {
    const path = useLocalSearchParams()
  return (
    <View>
      <Text>{path.param}</Text>
    </View>
  )
}

export default ParamIndex