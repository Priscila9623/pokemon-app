import { StyleSheet } from 'react-native';
import { colors, fonts } from '@config/style';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		marginHorizontal: 10,
	},
	teamName: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '90%',
		height: 50,
		backgroundColor: colors.LightGray,
		borderRadius: 12,
		marginVertical: 10,
	},
	teamHeaderButtons: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.Salmon,
		width: 50,
		height: '100%',
	},
	arrowBack: {
		borderTopLeftRadius: 12,
		borderBottomLeftRadius: 12,
	},
	plus: {
		borderTopRightRadius: 12,
		borderBottomRightRadius: 12,
	},
	input: {
		margin: 10,
		padding: 0,
		flex: 1,
		fontFamily: fonts.MontserratRegular,
		paddingHorizontal: 5,
	},
	text:{
		fontFamily: fonts.MontserratRegular,
	},
	emptyList: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: 150
	},
	emptyText: {
		fontSize: 16,
		color: colors.MediumGray,
	},
	box: {
		alignItems: 'center',
		width: '100%',
		marginBottom: 20,
	},
	icon: {
		width: 70,
		height: 70,
	},
	image: {
		width: 35,
		height: 35,
	},
	name: {
		fontFamily: fonts.MontserratBold,
		fontSize: 18,
	},
	number: {
		fontFamily: fonts.MontserratBold,
		color: colors.MediumGray,
		fontSize: 14,
	},
	moreBtn: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: 50,
	},
	more: {
		fontFamily: fonts.MontserratBold,
		color: colors.Blue,
	},
	types: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		margin: 10,
	},
	list: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly'
	},
	actions: {
		flex: 2,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center'
	},
	description: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
});

export default styles;