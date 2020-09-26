import { StyleSheet } from 'react-native';
import { fonts } from '@config/style';

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
	cardContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		flexWrap: 'wrap',
		width: '100%',
	},
	myTeams: {

	},
	myTeamsText: {
		fontSize: 16,
		fontFamily: fonts.MontserratBold,
	},
});

export default styles;