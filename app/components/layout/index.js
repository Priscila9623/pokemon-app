import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import { string, node, oneOfType, func, bool } from "prop-types";
import { colors } from '@config/style';
import styles from './style';

const Layout = ({title, children, goBack, titleBackgroundColor, showLogOut}) => {
	return(
		<View style={styles.container}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View style={[styles.titleContainer, {backgroundColor: titleBackgroundColor}]}>
					{showLogOut && (
						<View style={{alignItems: 'flex-end', marginRight: 10}}>
							<Icon
								onPress={() => auth().signOut()}
								name='power-off'
								size={30}
								color={titleBackgroundColor ? colors.White : colors.Black}
							/>
						</View>
					)}
					{goBack && (
						<Icon
							onPress={goBack}
							name='arrow-left'
							size={22}
							color={titleBackgroundColor ? colors.White : colors.Black}
						/>
					)}
					<Text 
						style={[
							styles.text,
							styles.title,
							{color: titleBackgroundColor ? colors.White : colors.Black}]}
					>
						{title}
					</Text>
				</View>
				<View style={styles.content}>
					{children}
				</View>
			</ScrollView>
		</View>
	);
};

Layout.defaultProps = {
	showLogOut: false
};

Layout.propTypes = {
	title: string.isRequired,
	children: oneOfType([node, func]).isRequired,
	goBack: func,
	titleBackgroundColor: string,
	showLogOut: bool,
};


export default Layout;