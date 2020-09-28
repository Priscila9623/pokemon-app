import { StyleSheet } from 'react-native';
import { colors, fonts } from '@config/style';

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: colors.LightGray,
		paddingHorizontal: 5,
		borderRadius: 12,
	},
	input: {
		margin: 10,
		padding: 0,
		flex: 1,
		fontFamily: fonts.MontserratRegular,
	},
});

export default styles;