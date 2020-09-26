import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as ReduxProvider } from 'react-redux';
import { LogBox } from 'react-native';
import store from './store/index';
import MainNavigator from '@navigators/stackNavigator';

import { CacheProvider } from '@contexts/CacheContext';

LogBox.ignoreAllLogs();
const App = () => {
	return (
		<ReduxProvider store={store} >
			<CacheProvider>
				<NavigationContainer>
					<MainNavigator />
				</NavigationContainer>
			</CacheProvider>
		</ReduxProvider>
	);
};

export default App;

