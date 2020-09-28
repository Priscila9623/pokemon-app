import React from 'react';
import { Text, View } from 'react-native';
import { string } from 'prop-types';
import styles from './style';

const Badge = ({text, color}) => (
	<View style={[styles.typeItem, {borderColor: color}]}>
		<Text style={[styles.text, styles.typeText, {color: color}]}>
			{text}
		</Text>
	</View>
);

Badge.propTypes = {
	text: string.isRequired,
	color: string.isRequired,
};

export default Badge;
