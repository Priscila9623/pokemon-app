import { fonts } from '@config/style';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginHorizontal: 10,
		height: '100%',
	},
	button: {
		alignItems: 'center',
		width: '100%',
		marginVertical: 20,
	},
	text: {
		fontFamily: fonts.MontserratRegular,
	}
});

export default styles;