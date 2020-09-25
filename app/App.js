import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { LogBox } from 'react-native';
import MainNavigator from '@navigators/stackNavigator';
import SplashScreen from 'react-native-splash-screen';

import { CacheProvider } from '@contexts/CacheContext';

LogBox.ignoreAllLogs();
const App = () => {
  	const [user, setUser] = useState();

	const handleAuthState = (user) => {
		setUser(user);
		SplashScreen.hide();
	};

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(handleAuthState);
		return subscriber;
	}, []);
	
	return (
		<CacheProvider>
			<NavigationContainer>
				<MainNavigator />
			</NavigationContainer>
		</CacheProvider>
	);
};

export default App;

