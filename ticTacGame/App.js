
import { useFonts } from 'expo-font';
import Navigation from './components/Navigations/Navigation';
import LoginProvider from './context/LoginProvider';

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    'Roboto-Bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
  });

  return (
    <LoginProvider>
      <Navigation />
    </LoginProvider>
    
  );
}


