import { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from '@react-navigation/drawer';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerLeft: () => <DrawerToggleButton tintColor="#333" />,
        headerStyle: { backgroundColor: '#F0F7F9' },
        headerTintColor: '#333',
      }}
    />
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
