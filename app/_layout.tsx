import { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from '@react-navigation/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider, useAuth } from '@services/authService';
import LoginScreen from './login';

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [appIsReady, setAppIsReady] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  if (!appIsReady || !animationFinished) {
    return (
      <View style={styles.splash}>
        <Image
          source={require('../assets/gif/SplashScreen.gif')}
          style={styles.gif}
          onLoadEnd={() => {
            setTimeout(() => setAnimationFinished(true), 3000);
          }}
        />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerLeft: () => <DrawerToggleButton tintColor="#333" />,
        headerStyle: { backgroundColor: '#F0F7F9' },
        headerTintColor: '#333',
      }}
    >
      <Drawer.Screen
        name="index"
        options={{ drawerLabel: 'Home', title: 'Home' }}
      />

      {/* ignore this for now, will add more screens later */}
      <Drawer.Screen
        name="SMSForward/index"
        options={{ drawerItemStyle: { display: 'none' }, drawerLabel: 'SMS Forward', title: 'SMS Forward' }}
      />
      <Drawer.Screen
        name="SMSForward/createRule"
        options={{ drawerItemStyle: { display: 'none' }, title: 'Create Rule' }}
      />
    </Drawer>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F7F9',
  },
  gif: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
