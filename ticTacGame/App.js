import { useFonts } from 'expo-font';
import Navigation from './components/Navigations/Navigation';
import LoginProvider from './context/LoginProvider';
import SplashScreen from './screen/SplashScreen';
import { ActivityIndicator, View } from 'react-native';

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
  });

  if(!fontsLoaded){
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <LoginProvider>
      <Navigation />
    </LoginProvider>
    
  );
}


