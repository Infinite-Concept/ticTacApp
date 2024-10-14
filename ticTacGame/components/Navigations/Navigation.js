import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../../screen/SplashScreen';
import OnboardingScreen from '../../screen/OnboardingScreen';
import RegisterScreen from '../../screen/RegisterScreen';
import HistoryScreen from '../../screen/HistoryScreen';
import ScoreboardScreen from '../../screen/ScoreboardScreen';
import GameBoardLoading from '../../screen/GameBoardLoading';
import GameBoard from '../../screen/GameBoard';
import Home from './Home';
import LoginScreen from '../../screen/LoginScreen';
import LoadingScreen from '../../screen/LoadingScreen';
import MultiPlayerLoading from '../../screen/MultiPlayerLoading'
import MultiPlayerScreen from '../../screen/MultiPlayerScreen';
import LoginProvider from '../../context/LoginProvider';

const Stack = createNativeStackNavigator();
const userInfo = {}

const Navigation = () => {
  return (
    <NavigationContainer>
      <LoginProvider>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        
          <Stack.Screen name="splash" component={SplashScreen}  />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="register"  >
            {props => <RegisterScreen {...props} userInfo={userInfo} />}
          </Stack.Screen>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="History" component={HistoryScreen} />
          <Stack.Screen name="Scoreboard" component={ScoreboardScreen} />
          <Stack.Screen name="GameboardLoading" component={GameBoardLoading} />
          <Stack.Screen name="Gameboard" component={GameBoard} />
          <Stack.Screen name="LoginLoading" component={LoadingScreen} />
          <Stack.Screen name="MultiLoading" component={MultiPlayerLoading} />
          <Stack.Screen name="MultiPlayer" component={MultiPlayerScreen} />
        
      </Stack.Navigator>
      </LoginProvider>
    </NavigationContainer>
  )
}

export default Navigation