import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, ActivityIndicator, Linking } from 'react-native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Layout from '@components/layout';
import Card from '@components/card';
import CustomModal from '@components/modal';
import CustomButton from '@components/button';
import useDataApi from '@hooks/useDataApi';
import verifyToken from '@helpers/firebase/verifyToken';
import { hasNewTeam } from '@actions/newTeam.action';
import { urlRegion } from '@config/paths';
import { colors } from '@config/style';
import styles from './style';

const Screen = ({navigation }) => {
	const dispatch = useDispatch();
	const [data, setData] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [msg, setMsg] = useState({
		exists: false,
		msg: '',
	});
	const [state, fetchData] = useDataApi({
		url: urlRegion(),
		headers: null,
		hasCache: true,
	});

	const handleToken = async (token) => {
		const response = await verifyToken(token);
		setMsg(response);
		setIsModalVisible(true);
	};

	const getTeam = async (str)=>{
		const arr =  str.split('/');
		await handleToken(arr[arr.length - 1]);
	};

	const urlHandler = async (url)=>{
		const route = url.replace(/.*?:\/\//g, '');
		await getTeam(route);
		const region = route.split('/')[1];
		setHasNewTeam();
		navigation.navigate('Team', {
			name: region,
		});
	};

	const handleOpenUrl = (evt)=>{
		urlHandler(evt.url);
	};

	const setHasNewTeam = useCallback(
		() => dispatch(
			hasNewTeam(true)),
		[dispatch]
	);

	useEffect(() => {
		if (!state.isLoading) {
			if (state.isSuccess && state.data) {
				setData(state.data.results);
			}
		}
	}, [state.isSuccess, state.isError]);

	useEffect(() => {
		fetchData();
		Linking.getInitialURL().then(url => {
			if (url) {urlHandler(url);}
		});
		Linking.addEventListener('url', handleOpenUrl);
		return ()=> Linking.removeEventListener('url', handleOpenUrl);

	}, []);

	return (
		<Layout title='Regiones' showLogOut>
			{
				state.isLoading ? (
					<ActivityIndicator style={styles.loader} size='large' color={colors.Salmon} />
				) : (
					<View style={styles.region}>
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
										setIsModalVisible(false);
									}}
									width='80%'
								/>
							</View>
						</CustomModal>
						{data && (
							<View style={styles.cardContainer}>
								{data.map((el, index) =>
									<Card
										action={() =>
											navigation.navigate('Team', {
												name: el.name,
											})
										}
										key={index}
										text={el.name}
										index={index}
									/>
								)}
							</View>
						)}
					</View>
				)
			}
		</Layout>
	);
};

export default Screen;
