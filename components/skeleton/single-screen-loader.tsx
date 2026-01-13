import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const SingleScreenLoader = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
           <View className="w-full max-h-96 px-2 pt-1 border-gray-50 border-2">
             <View className="bg-gray-200 w-full h-80 animate-pulse"></View>
           </View>
           <View className="px-4 py-5">
             <Text className="bg-gray-200 h-6 w-60"></Text>
             <View className="flex-row gap-2 mt-4">
               <Text className="bg-gray-200  h-6 w-14"></Text>
               <Text className="bg-gray-200 h-6 w-14"></Text>
               <Text className="bg-gray-200 h-6 w-14"></Text>
             </View>
             <View className="mt-2 mx-1 flex gap-1">
               <Text className="bg-gray-200 h-6 w-full"></Text>
               <Text className="bg-gray-200 h-6 w-full"></Text>
               <Text className="bg-gray-200 h-6 w-full"></Text>
               <Text className="bg-gray-200 h-6 w-full"></Text>
               <Text className="bg-gray-200 h-6 w-full"></Text>
               <Text className="bg-gray-200 h-6 w-full"></Text>
               <Text className="bg-gray-200 h-6 w-full"></Text>
               <Text className="bg-gray-200 h-6 w-full"></Text>
               <Text className="bg-gray-200 h-6 w-full"></Text>
               <Text className="bg-gray-200 h-6 w-full"></Text>
               <Text className="bg-gray-200 h-6 w-full"></Text>
               <Text className="bg-gray-200 h-6 w-full"></Text>
               <Text className="bg-gray-200 h-6 w-full"></Text>
               <Text className="bg-gray-200 h-6 w-full"></Text>
               <Text className="bg-gray-200 h-6 w-full"></Text>
               <Text className="bg-gray-200 h-6 w-full"></Text>
               <Text className="bg-gray-200 h-6 w-full"></Text>
               <Text className="bg-gray-200 h-6 w-full"></Text>
               <Text className="bg-gray-200 h-6 w-full"></Text>
               <Text className="bg-gray-200 h-6 w-full"></Text>
               <Text className="bg-gray-200 h-6 w-full"></Text>
               <Text className="bg-gray-200 h-6 w-full"></Text>
               <Text className="bg-gray-200 h-6 w-full"></Text>
               <Text className="bg-gray-200 h-6 w-full"></Text>
             </View>
           </View>
         </SafeAreaView>
  )
}

export default SingleScreenLoader