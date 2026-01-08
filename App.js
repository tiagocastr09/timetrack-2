import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoadingScreen from './src/screens/LoadingScreen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import CalendarioScreen from './src/screens/CalendarioScreen';
import EstudosScreen from './src/screens/EstudosScreen';
import CronometroScreen from './src/screens/CronometroScreen';
import MetasScreen from './src/screens/MetasScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula um carregamento de 3 segundos antes de ir para o Login
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoading ? (
          <Stack.Screen name="Loading" component={LoadingScreen} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Calendario" component={CalendarioScreen} />
            <Stack.Screen name="Estudos" component={EstudosScreen} />
            <Stack.Screen name="Cronometro" component={CronometroScreen} />
            <Stack.Screen name="Metas" component={MetasScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}