import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	region: {
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 10,
		height: '100%',
	},
	loader: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	cardContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		flexWrap: 'wrap',
		width: '100%',
		height: '100%',
	},
});

export default styles;