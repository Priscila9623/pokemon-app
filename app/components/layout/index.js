import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { string, node, oneOfType, func } from "prop-types";
import { colors } from '@config/style';
import styles from './style';

const Layout = ({title, children, goBack, titleBackgroundColor}) => {
	return(
		<View style={styles.container}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View style={[styles.titleContainer, {backgroundColor: titleBackgroundColor}]}>
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
Layout.propTypes = {
	title: string.isRequired,
	children: oneOfType([node, func]).isRequired,
	goBack: func,
	titleBackgroundColor: string,
};

export default Layout;