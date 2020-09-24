import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import CustomButton from '@components/button';
import { colors } from '@config/style';
import LoginHeader from '@images/loginHeader.png';
import LoginFooter from '@images/loginFooter.png';
import Pokemon from '@images/pokemon.png';
import styles from './style';

const Screen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image style={styles.image} source={LoginHeader} resizeMode='stretch' />
			</View>
			<View style={styles.content}>
				<View style={styles.contentLogo}>
					<Image style={styles.image} source={Pokemon} resizeMode='stretch' />
				</View>
				<CustomButton
					text='Iniciar con Google'
					action={() => navigation.navigate('Home')}
					icon={{name: 'google', color: colors.White}}
					width='80%'
				/>
			</View>
			<View style={styles.footer}>
				<Image style={styles.footerImage} source={LoginFooter} resizeMode='contain' />
			</View>
		</View>
	)
};

export default Screen;