import { StyleSheet } from 'react-native';
import { colors, fonts } from '@config/style';

const styles = StyleSheet.create({
	region: {
		alignItems: 'center',
		marginHorizontal: 10,
		height: '100%',
	},
	text:{
		fontFamily: fonts.MontserratBold,
	},
	searcher: {
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
