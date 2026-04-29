import { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItemList, DrawerToggleButton } from '@react-navigation/drawer';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider, useAuth } from '@services/authService';
import LoginScreen from './login';

SplashScreen.preventAutoHideAsync();

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { logout } = useAuth();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
      <View style={styles.drawerItems}>
        <DrawerItemList {...props} />
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

function AppContent() {
  const { isAuthenticated, isLoading } = useAuth();
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

  if (!appIsReady || !animationFinished || isLoading) {
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
      drawerContent={(props: DrawerContentComponentProps) => <CustomDrawerContent {...props} />}
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

      <Drawer.Screen
        name="appointmentBooking"
        options={{ drawerLabel: 'Appointment Booking', title: 'Appointment Booking' }}
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
  drawerContainer: {
    flex: 1,
  },
  drawerItems: {
    flex: 1,
  },
  logoutButton: {
    margin: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#fee2e2',
    alignItems: 'center',
  },
  logoutText: {
    color: '#dc2626',
    fontSize: 15,
    fontWeight: '600',
  },
});
