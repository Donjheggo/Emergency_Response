import { View, Text } from 'react-native'
import { Slot } from 'expo-router'
import React from 'react'

const AuthLayout = () => {
  return (
    <View className='flex-1 justify-center items-center gap-5 p-6'>
      <Text className='text-3xl'>Logo here</Text>
      <Slot/>
    </View>
  )
}

export default AuthLayout