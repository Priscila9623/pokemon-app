import { StyleSheet } from 'react-native';
import { fonts } from '@config/style';

const styles = StyleSheet.create({
	text:{
		fontFamily: fonts.MontserratRegular,
	},
	typeItem: {
		borderRadius: 20,
		borderWidth: 1,
		paddingHorizontal: 20,
		margin: 5,
	},
	typeText: {
		fontSize: 12,
		textTransform: 'capitalize',
	},
});

export default styles;