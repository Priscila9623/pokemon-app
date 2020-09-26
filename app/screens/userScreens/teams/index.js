import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import Layout from '@components/layout';
import CustomButton from '@components/button';
import useDataApi from '@hooks/useDataApi';
import { urlRegion } from '@config/paths';
import { colors } from '@config/style';
import { setTeam } from '@actions/team.action';
import styles from './style';

const Screen = ({ route, navigation }) => {
	const dispatch = useDispatch();
	const teamData = useSelector((state) => state.team);
	const [data, setData] = useState([]);
	const [state, fetchData] = useDataApi({
		url: urlRegion(),
		headers: null,
		hasCache: true
	});

	const setRegion = useCallback(
		() => dispatch(
			setTeam({
				...teamData,
				region_name: route.params.name,
				user_id: auth().currentUser.uid,
				region_user: `${route.params.name}_${auth().currentUser.uid}`
			})),
		[dispatch]
	);
	

	const RegionAdder = React.memo(({ onSetRegion }) => (
		<CustomButton
			text='Crear nuevo equipo'
			action={() => {
				onSetRegion(),
				navigation.navigate('TeamDetails')
			}}
			icon={{name: 'plus', color: colors.White}}
			color={colors.Salmon}
			addSpacing={false}
		/>
	))

	useEffect(() => {
		if (!state.isLoading) {
			if (state.isSuccess && state.data) {
				setData(state.data.results);
			} 
		}
	}, [state.isSuccess, state.isError]);

	useEffect(() => {
		fetchData();
		console.log('auth().currentUser', auth().currentUser.uid);
	}, []);
	
	return(
		<Layout title='Equipos' goBack={() =>navigation.goBack()}>
			{
				state.isLoading ? (
					<ActivityIndicator style={styles.loader} size='large' color={colors.Salmon} />
				) : (
					<View style={styles.team}>
						<View style={styles.buttons}>
							{/* <CustomButton
								text='Crear nuevo equipo'
								action={() => 
									navigation.navigate('TeamDetails', {
										name: route.params.name
									})
								}
								icon={{name: 'plus', color: colors.White}}
								color={colors.Salmon}
								addSpacing={false}
							/> */}
							<RegionAdder onSetRegion={setRegion} />
							<CustomButton
								text='Obtener equipo amigo'
								// action={cancel}
								icon={{name: 'user', color: colors.White}}
								color={colors.Blue}
								addSpacing={false}
							/>
						</View>
						<View>
							<Text style={styles.myTeamsText}>Mis equipos</Text>
						</View>
						{/* {data && (
							<View style={styles.cardContainer}>
								{data.map((el, index) =>
									<Card
										key={index}
										text={el.name}
									/>
								)}
							</View>
						)} */}
					</View>
				)
			}
		</Layout>
	);
};

export default Screen;