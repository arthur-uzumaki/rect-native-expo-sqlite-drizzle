import '@/styles/global.css'

import { StatusBar } from 'expo-status-bar';
import Home from '@/app/home';
import { View } from 'react-native';

export default function App() {
  return (
    <View className='flex-1 bg-zinc-950'>
      <StatusBar style="light" />
      <Home />
    </View>
  );
}


