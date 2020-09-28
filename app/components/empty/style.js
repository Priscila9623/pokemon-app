import { StyleSheet } from 'react-native';
import { colors, fonts } from '@config/style';

const styles = StyleSheet.create({
	text:{
		fontFamily: fonts.MontserratRegular,
	},
	emptyList: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: 150,
	},
	emptyText: {
		fontSize: 16,
		color: colors.MediumGray,
	},
});

export default styles;
