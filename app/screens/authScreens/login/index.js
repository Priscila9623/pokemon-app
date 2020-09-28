import React, {useEffect, useState} from 'react';
import { View, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import googleConfig from '@config/googleConfig';
import LoginHeader from '@images/loginHeader.png';
import LoginFooter from '@images/loginFooter.png';
import Pokemon from '@images/pokemon.png';
import styles from './style';

const Screen = () => {
	const [user, setUser ] = useState(null);
	const [loggedIn, setLoggedIn ] = useState(false);
	const [loading, setLoading ] = useState(false);

	const signInWithFirebase = async ()=>{
		setLoading(true);
		try {
			await GoogleSignin.hasPlayServices();
			const userInfo = await GoogleSignin.signIn();
			setUser(userInfo);
			setLoggedIn(true);

			const credential = auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken);
			// login with credential
			const firebaseUserCredential = await auth().signInWithCredential(credential);
		  } catch (error) {
		  }
		  setLoading(false);
	};

	useEffect(()=>{
		googleConfig();
	},[]);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image style={styles.image} source={LoginHeader} resizeMode='stretch' />
			</View>
			<View style={styles.content}>
				<View style={styles.contentLogo}>
					<Image style={styles.image} source={Pokemon} resizeMode='stretch' />
				</View>
				<GoogleSigninButton
					style={{ width: 220, height: 60 }}
					size={GoogleSigninButton.Size.Wide}
					color={GoogleSigninButton.Color.Dark}
					onPress={signInWithFirebase}
					disabled={loading}/>
			</View>
			<View style={styles.footer}>
				<Image style={styles.footerImage} source={LoginFooter} resizeMode='contain' />
			</View>
		</View>
	);
};

export default Screen;
