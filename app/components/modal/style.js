import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	centeredView: {
		backgroundColor: 'rgba(0,0,0,0.4)',
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalView: {
		borderRadius: 20,
		width: '80%',
		padding: 25,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		backgroundColor: '#fff',
	},
	closeButton: {
		position: 'absolute',
		top:20,
		right: 20,
		padding: 10,
	},
});

export default styles;
