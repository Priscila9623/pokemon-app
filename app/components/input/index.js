import React from 'react';
import { TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { string, func } from 'prop-types';
import { colors } from '@config/style';
import styles from './style';

const Input = ({ icon, value, action, placeholder }) => {
	return (
		<View style={styles.container}>
			{icon && <Icon name={icon} size={22} color={colors.DarkGray} />}
			<TextInput
				onChangeText={(typed) => action(typed)}
				value={value}
				placeholder={placeholder}
				style={styles.input}
			/>
		</View>
	);
};

Input.defaultProps = {
	// icon: ''
};

Input.propTypes = {
	icon: string,
	value: string.isRequired,
	action: func.isRequired,
	placeholder: string.isRequired,
};

export default Input;
