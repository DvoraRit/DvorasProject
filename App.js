import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);
  const [animationFinished, setAnimationFinished] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts or API calls here
        await new Promise(resolve => setTimeout(resolve, 2000)); 
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        // Hide the native static splash and show our GIF
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady || !animationFinished) {
    return (
      <View style={styles.container}>
        <Image
          source={require('./assets/gif/SplashScreen.gif')}
          style={styles.gif}
          onLoadEnd={() => {
            // Optional: Timer to move to the main app after the GIF plays
            setTimeout(() => setAnimationFinished(true), 3000);
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F7F9', // Matches the logo background
  },
  gif: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

