import { Animated } from 'react-native';

const forFade = ({ current }) => {
	return {
		cardStyle: {
			opacity: current.progress,
  
		},
	}
};

const forSlideHorizontal = ({ current, next, inverted, layouts: { screen } }) => {
	const progress = Animated.add(
		current.progress.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 1],
		extrapolate: 'clamp',
		}),
		next
		? next.progress.interpolate({
			inputRange: [0, 1],
			outputRange: [0, 1],
			extrapolate: 'clamp',
			})
		: 0
	);
	
	return {
		cardStyle: {
			transform: [{
				translateX: Animated.multiply(
					progress.interpolate({
					inputRange: [0, 1, 2],
					outputRange: [
						screen.width,
						0,
						screen.width * -0.3,
					],
					extrapolate: 'clamp',
					}),
					inverted
				),
			}],
		},
	};
};

export {
	forFade,
	forSlideHorizontal,
};
