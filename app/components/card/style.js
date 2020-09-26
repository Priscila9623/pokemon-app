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
		borderWidth: 1,
		borderColor: '#E5E5E5',
		elevation: 3,
	},
	cardText: {
		fontSize: 15,
		textTransform: 'capitalize',
		color: colors.White,
		fontFamily: fonts.MontserratBold,
	},
});

export default styles;