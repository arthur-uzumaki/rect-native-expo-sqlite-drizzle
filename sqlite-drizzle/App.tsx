import '@/styles/global.css'

import { StatusBar } from 'expo-status-bar';
import { Text, ActivityIndicator } from 'react-native';
import Home from '@/app/home';

import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from './drizzle/migrations';


const DATABASE_NAME = 'database.db'
const expoDB = openDatabaseSync(DATABASE_NAME)
const db = drizzle(expoDB)

export default function App() {
  const { success, error } = useMigrations(db, migrations)

  if (error) {
    return (
      <Text className='flex-1 items-center justify-center'>
        {error.message}
      </Text>
    )
  }

  if (!success) {
    return <ActivityIndicator className='flex-1 items-center justify-center' />
  }
  return (
    <>

      <SQLiteProvider databaseName={DATABASE_NAME}>
        <StatusBar style="light" backgroundColor='black' translucent />

        <Home />
      </SQLiteProvider>
    </>
  );
}


