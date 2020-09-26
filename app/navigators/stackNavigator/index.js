import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { transitionSpecConfig, transitionConfig } from '@helpers/screens/stackNavigatorConfig';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';
import userScreens from './userScreens';
import authScreens from './authScreens';

const Stack = createStackNavigator();

const StackNavigator = () => {
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState();
	  
	const onAuthStateChanged = (user) => {
		setUser(user);
		if (initializing) setInitializing(false);
	};

	useEffect(() => {
		if (!initializing) SplashScreen.hide();
	}, [initializing])
	
	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber;
	}, []);

	return (
		<>
			{!initializing && (
				<Stack.Navigator
					initialRouteName={user ? 'Register' : 'Login'}
					screenOptions={{
						headerShown: false,
						// cardStyle: { backgroundColor: '#fff' },
						gestureDirection: "horizontal",
						transitionSpec:{
							close: transitionSpecConfig,
							open: transitionSpecConfig,
						},
						cardStyleInterpolator: (props) => transitionConfig(props),
					}}
				>
					{Object.entries({
						...(user ? userScreens : authScreens),
					}).map(([name, component]) => (
						<Stack.Screen key={name} name={name} component={component} />
					))}
				</Stack.Navigator>
			)}
		</>
		
	);
};

export default StackNavigator;
