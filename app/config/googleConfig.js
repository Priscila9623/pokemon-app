import { GoogleSignin } from 'react-native-google-signin';
import Config from "react-native-config";

const configSignin = ()=>{
	GoogleSignin.configure({
		scopes: ['https://www.googleapis.com/auth/drive.readonly'], webClientId: Config.WEB_CLIENT_ID,
		offlineAccess: true,
		hostedDomain: '',
		loginHint: '',
		forceConsentPrompt: true,
		accountName: '',
	});
};

export default configSignin;