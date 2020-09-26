import React from 'react';
import { string, bool, func, shape, oneOfType, number } from "prop-types";
import { Pressable, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '@config/style';
import styles from './style';

const Button = ({ text, isDisabled, action, color, icon, typeOfShape, addSpacing, width}) => {
	const handleTypeOfShape = () => {
		switch (typeOfShape) {
			case 'icon':
				return styles.btnIcon;
			case 'squared':
				return styles.btnSquared;
			default:
				return styles.btnRoundedContour;
		}
	};

	return (
		<Pressable
			onPress={() => {
				isDisabled ? () => { } : action();
			}}
			style={({ pressed }) => ([{
				backgroundColor: pressed
					? 'rgb(210, 230, 255)'
					: color
				},
				isDisabled && styles.btnDisabled,
				styles.btn,
				handleTypeOfShape(),
				addSpacing && {
					marginHorizontal: 4,
					marginVertical: 20,
				},
				{width}
			])}
		>
			{icon && <Icon name={icon.name} size={22} color={isDisabled ? colors.MediumGray : icon.color} />}
			{text && (
				<Text style={[styles.text, isDisabled ? styles.textDisabled : styles.textActive]}>
					{text}
				</Text>
			)}
		</Pressable>
	);
};

Button.defaultProps = {
	isDisabled: false,
	color: colors.Salmon,
	typeOfShape: 'rounded-contour',
	addSpacing: true,
	width: '100%',
	action: () => { }
};

Button.propTypes = {
	text: string,
	isDisabled: bool,
	action: func.isRequired,
	color: string,
	icon: shape({
		name: string.isRequired,
		color: string.isRequired,
	}),
	typeOfShape: string,
	addSpacing: bool,
	width: oneOfType([number, string]),
};

export default Button;