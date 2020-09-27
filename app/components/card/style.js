import { StyleSheet } from 'react-native';
import { colors, fonts } from '@config/style';

const styles = StyleSheet.create({
	card: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '46%',
		height: 85,
		borderRadius: 12,
		marginTop: 7,
		padding: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	cardText: {
		fontSize: 15,
		textTransform: 'capitalize',
		color: colors.White,
		fontFamily: fonts.MontserratBold,
	},
});

export default styles;