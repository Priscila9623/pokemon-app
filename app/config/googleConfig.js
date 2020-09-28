import { GoogleSignin } from 'react-native-google-signin';

const configSignin = ()=>{
	GoogleSignin.configure({
		scopes: ['https://www.googleapis.com/auth/drive.readonly'],
		webClientId: '369007017734-g92dk21hl01gvk7c5e4v13epl4pal46e.apps.googleusercontent.com',
		offlineAccess: true,
		hostedDomain: '',
		loginHint: '',
		forceConsentPrompt: true,
		accountName: '',
	});
};

export default configSignin;
