import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { transitionSpecConfig, transitionConfig } from '@helpers/screens/stackNavigatorConfig';
import auth from '@react-native-firebase/auth';
import userScreens from './userScreens';
import authScreens from './authScreens';

const Stack = createStackNavigator();

const StackNavigator = () => {
  	const [user, setUser] = useState();
	useEffect(() => {
		setUser(auth().currentUser);
	}, []);

	return (
		<Stack.Navigator
			initialRouteName={user ? 'Home' : 'Login'}
			screenOptions={{
				headerShown: false,
				cardStyle: { backgroundColor: '#fff' },
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
	);
};

export default StackNavigator;
