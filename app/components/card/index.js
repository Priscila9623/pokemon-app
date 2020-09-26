import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { string, func } from "prop-types";
import setRandomColor from '@helpers/style/setRandomColor';
import styles from './style';

const Card = ({ text, action, color }) => {
	return(
		<TouchableOpacity onPress={action} style={[styles.card, {backgroundColor: color ? color : setRandomColor()}]}>
			<Text style={[styles.cardText]}>{text}</Text>
		</TouchableOpacity>
	);
};

Card.defaultProps = {
	action: () => { }
};

Card.propTypes = {
	text: string.isRequired,
	action: func,
	color: string,
};

export default Card;