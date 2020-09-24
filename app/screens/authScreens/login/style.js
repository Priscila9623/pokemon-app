import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		flex: 2,
	},
	image: {
		width: '100%',
		height: '100%',
	},
	content: {
		flex: 6,
		alignItems: 'center',
		width: '100%',
	},
	contentLogo: {
		width: '80%',
		height: 120,
		marginVertical: 50,
	},
	footer: {
		flex:1,
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
	},
	footerImage: {
		width: 150,
		height: 120
	}
});

export default styles;