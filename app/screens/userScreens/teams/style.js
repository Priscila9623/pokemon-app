import { StyleSheet } from 'react-native';
import { colors, fonts } from '@config/style';

const styles = StyleSheet.create({
	team: {
		alignItems: 'center',
		marginHorizontal: 10,
		height: '100%',
	},
	loader: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	buttons: {
		height: 150,
		justifyContent: 'space-evenly',
		width: '100%'
	},
	myTeams: {
		width: '100%',
	},
	myTeamsTitle: {
		fontSize: 16,
		fontFamily: fonts.MontserratBold,
	},
	myItemTeams: {
		marginVertical: 10,
		borderRadius: 12,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		backgroundColor: colors.White,
		flexDirection: 'row',
		justifyContent: 'space-around',
		height: 60,
		alignItems: 'center'
	},
	myTeamsText: {
		fontFamily: fonts.MontserratRegular,
	},
	text:{
		fontFamily: fonts.MontserratRegular,
	},
});

export default styles;