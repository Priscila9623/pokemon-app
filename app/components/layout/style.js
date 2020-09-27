import { StyleSheet } from 'react-native';
import { colors, fonts } from '@config/style';

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		height: '100%',
	},
	titleContainer: {
		paddingHorizontal: 10,
		justifyContent: 'space-evenly',
		height: 200,
	},
	title: {
		fontSize: 20,
		fontFamily: fonts.MontserratBold,
		textTransform: 'capitalize',
	},
});

export default styles;