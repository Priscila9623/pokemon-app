import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { string, func, number } from "prop-types";
import { getColor, cardColors } from '@helpers/style/setPatternColor';
import styles from './style';

const Card = ({ text, action, color, index }) => {
	return(
		<TouchableOpacity onPress={action} style={[styles.card, {backgroundColor: color ? color : cardColors[getColor(index)]}]}>
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
	index: number,
};

export default Card;