import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { transitionSpecConfig, transitionConfig } from '@helpers/screens/stackNavigatorConfig';
import userScreens from './userScreens';
import authScreens from './authScreens';

const Stack = createStackNavigator();

const StackNavigator = () => {

	const isLoggedIn = true;

	return (
		<Stack.Navigator
			initialRouteName={isLoggedIn ? 'Home' : 'Login'}
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
				...(isLoggedIn ? userScreens : authScreens),
			}).map(([name, component]) => (
				<Stack.Screen key={name} name={name} component={component} />
			))}
		</Stack.Navigator>
	);
};

export default StackNavigator;
