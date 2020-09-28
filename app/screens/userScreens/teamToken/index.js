import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Layout from '@components/layout';
import CustomButton from '@components/button';
import CustomInput from '@components/input';
import CustomModal from '@components/modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import verifyToken from '@helpers/firebase/verifyToken';
import { colors } from '@config/style';
import styles from './style';

const Screen = ({navigation }) => {
	const [typedText, setTypedText] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [msg, setMsg] = useState({
		exists: false,
		msg: '',
	});
	
	const handleToken = async () => {
		setIsLoading(true);
		const response = await verifyToken(typedText);
        console.log("handleToken -> response", response);
		setMsg(response);
		setIsModalVisible(true);
		setIsLoading(false);
	};

	return(
		<Layout title='Equipo amigo' goBack={() => navigation.goBack()}>
			<View style={styles.container}>
				<CustomModal isVisible={isModalVisible} setIsVisible={setIsModalVisible}>
					<View style={{alignItems: 'center'}}>
						<Icon
							name={!msg.exists ? 'exclamation-circle' : 'check-circle'}
							size={30}
							color={!msg.exists ? colors.Red : colors.Green} 
						/>
						<Text style={[styles.text, {textAlign: 'center'}]}>{msg.msg}</Text>
						<CustomButton
							text='De acuerdo'
							action={() => {
								setIsModalVisible(false),
								msg.exists && navigation.goBack()
							}}
							width='80%'
						/>
					</View>
				</CustomModal>
				<CustomInput
					action={setTypedText}
					value={typedText}
					placeholder='Digita el token'
				/>
				<View style={styles.button}>
					<CustomButton
						text='Buscar equipo'
						action={() => {
							handleToken()
						}}
						addSpacing={false}
						width='80%'
						isLoading={isLoading}
					/>
				</View>
			</View>
		</Layout>
	);
};

export default Screen;