import { StyleSheet } from 'react-native';
import { colors, fonts } from '@config/style';

const styles = StyleSheet.create({
	loader: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	infoContainer: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		zIndex: 2,
		top: -20,
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
		backgroundColor: colors.White,
	},
	info: {
		alignItems: 'center',
		margin: 10,
	},
	defaultLogo: {
		padding: 20,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: '60%',
		height: '60%',
	},
	details: {
		flex: 1,
		alignItems: 'flex-start',
		flexGrow: 1,
	},
	text:{
		fontFamily: fonts.MontserratRegular,
		fontSize: 13,
	},
	basicDetails: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		padding: 10,
	},
	columnDetails: {
		width: '33%',
		alignItems: 'center',
	},
	card: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		borderRadius: 12,
		marginTop: 7,
		padding: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		backgroundColor: colors.White,
	},
	label: {
		color: colors.DarkGray,
		fontFamily: fonts.MontserratBold,
		marginRight: 10,
	},
	types: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		margin: 10,
	},
	typeItem: {
		borderRadius: 20,
		borderWidth: 1,
		paddingHorizontal: 20,
		margin: 5,
	},
	typeText: {
		fontSize: 12,
		textTransform: 'capitalize',
	},
	plus: {
		alignItems: 'flex-end',
		marginTop: 30,
		marginRight: 30,
	},
	input: {
		padding: 0,
		height: 50,
		fontFamily: fonts.MontserratRegular,
		backgroundColor: colors.LightGray,
		paddingHorizontal: 5,
		borderRadius: 12,
		width: '100%',
	},
});

export default styles;
