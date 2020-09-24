import React from 'react';
import { View, Text, Button } from 'react-native';
import FastImage from 'react-native-fast-image';
import { fonts } from '@config/style';

const HomeScreen = ({ navigation }) => {
	return(
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text style={{fontFamily: fonts.MontserratBold}}>
				{`Home Screen`}
			</Text>
			<FastImage
				style={{ width: 200, height: 200 }}
				source={{
					uri: 'https://unsplash.it/400/400?image=1',
					headers: { Authorization: 'someAuthToken' },
					priority: FastImage.priority.normal,
				}}
				resizeMode={FastImage.resizeMode.contain}
				fallback
			/>
			<View style={{flexDirection: 'row', width: 200, justifyContent: 'space-around'}}>
				<Button
					title="About"
					onPress={() => navigation.navigate('About')}
				/>
				<Button
					title="Sign out"
					onPress={() => navigation.goBack()}
				/>
			</View>
		</View>
	)
};

export default HomeScreen;