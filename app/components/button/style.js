import { StyleSheet } from 'react-native';
import { fonts, colors } from '@config/style';

const styles = StyleSheet.create({
	btn: {
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		height: 45,
	},
	btnSquared: {
		borderRadius: 4,
		paddingHorizontal: 5,
		paddingVertical: 7,
	},
	btnIcon: {
		borderRadius: 20,
		width: 40,
		height: 40,
	},
	btnRoundedContour: {
		borderRadius: 20,
		paddingHorizontal: 5,
		paddingVertical: 7,
	},
	text:{
		fontFamily: fonts.MontserratMedium,
		fontSize: 14,
		textAlign: 'center',
		marginLeft: 10,
	},
	btnDisabled: {
		backgroundColor: colors.LightGray,
	},
	textActive: {
		color: colors.White,
	},
	textDisabled: {
		color: colors.MediumGray,
	}
});

export default styles;