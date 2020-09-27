import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '@config/style';
import styles from './style';

const EmptyList = () => (
	<View style={styles.emptyList}>
		<Icon name='ellipsis-h' size={30} color={colors.MediumGray} />
		<Text style={[styles.text, styles.emptyText]}>Lista vacía</Text>
	</View>
);

export default EmptyList;
