import React from 'react';
import { View, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {  node, oneOfType, func, bool } from 'prop-types';
import { colors } from '@config/style';
import styles from './style';

const CustomModal = ({isVisible, setIsVisible, children }) => {
	return (
		<Modal
			animationType='fade'
			transparent={true}
			visible={isVisible}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<View style={styles.closeButton}>
						<TouchableOpacity
							onPress={() => setIsVisible(!isVisible)}
						>
							<Icon name='close' size={20} color={colors.DarkGray} />
						</TouchableOpacity>
					</View>
					<View style={{marginTop: 30, width: '100%'}}>
						{children}
					</View>
				</View>
			</View>
		</Modal>
	);
};

CustomModal.propTypes = {
	isVisible: bool.isRequired,
	setIsVisible: func.isRequired,
	children: oneOfType([node, func]).isRequired,
};

export default CustomModal;
