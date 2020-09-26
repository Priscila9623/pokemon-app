import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';
import MainNavigator from '@navigators/stackNavigator';

import { CacheProvider } from '@contexts/CacheContext';

LogBox.ignoreAllLogs();
const App = () => {
	return (
		<CacheProvider>
			<NavigationContainer>
				<MainNavigator />
			</NavigationContainer>
		</CacheProvider>
	);
};

export default App;

