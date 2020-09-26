import { StyleSheet } from 'react-native';
import { colors, fonts } from '@config/style';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.White,
	},
	content: {
		flex: 1,
		marginHorizontal: 10,
		height: '100%',
	},
	region: {
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 10,
		height: '100%',
	},
	text:{
		fontFamily: fonts.MontserratBold,
	},
	titleContainer: {
		justifyContent: 'center',
		height: 200,
	},
	title: {
		fontSize: 20,
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
	card: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '46%',
		height: 100,
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
	},
});

export default styles;