import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome';
import Layout from '@components/layout';
import CustomButton from '@components/button';
import CustomModal from '@components/modal';
import EmptyList from '@components/empty';
import { colors } from '@config/style';
import { setTeam } from '@actions/team.action';
import styles from './style';

const Screen = ({ route, navigation }) => {
	const dispatch = useDispatch();
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedKey, setSelectedKey] = useState(-1);
;	const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false);

	const transformData = (teams) => {
		const list = [];
		if(teams) {
			for (const key in teams) {
				teams[key].key = key;
				list.push(teams[key]);
			}
		}
		setData(list);
	};

	const deleteTeam = () => {
		setIsRemoveModalVisible(false);
		database().ref('teams').child(selectedKey).remove();
		getTeams();
	};

	const getTeams = async () => {
		setIsLoading(true);
		const snap = await database().ref()
			.child('teams')
			.orderByChild('region_user')
			.equalTo(`${route.params.name}_${auth().currentUser.uid}`)
			.once('value');
		transformData(snap.val());
		setIsLoading(false);
	}

	const setTeamDetails = useCallback(
		(team) => dispatch(
			setTeam(team)),
		[dispatch]
	);

	const TeamAdder = React.memo(({ onSetDetails }) => (
		<CustomButton
			text='Crear nuevo equipo'
			action={() => {
				onSetDetails({
					name: '',
					pokemons: [],
					token: '',
					region_name: route.params.name,
					user_id: auth().currentUser.uid,
					region_user: `${route.params.name}_${auth().currentUser.uid}`
				}),
				navigation.navigate('TeamDetails', {
					isAdding: true,
				})
			}}
			icon={{name: 'plus', color: colors.White}}
			color={colors.Salmon}
			addSpacing={false}
		/>
	));

	const TeamEditor = React.memo(({ onSetDetails, item }) => (
		<TouchableOpacity
			onPress={()=> {
				onSetDetails(item),
				navigation.navigate('TeamDetails', {
					isAdding: false,
				}
			)}}
		>
			<Icon name='edit' size={25} color={colors.DarkGray} />
		</TouchableOpacity>
	))

	useEffect(() => {
		if (!isRemoveModalVisible) setSelectedKey(-1);
	}, [isRemoveModalVisible])

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getTeams();
		});
		return unsubscribe;
	}, [navigation]);
	
	return(
		<Layout title={`Equipos / ${route.params.name}`} goBack={() =>navigation.goBack()}>
			{
				isLoading ? (
					<ActivityIndicator style={styles.loader} size='large' color={colors.Salmon} />
				) : (
					<View style={styles.team}>
						<CustomModal isVisible={isRemoveModalVisible} setIsVisible={setIsRemoveModalVisible}>
							<View style={{alignItems: 'center'}}>
								<Text style={styles.text}>¿Deseas eliminar este equipo?</Text>
								<CustomButton
									text='Sí, eliminar'
									action={() => {
										deleteTeam()
									}}
									width='80%'
								/>
							</View>
						</CustomModal>
						<View style={styles.buttons}>
							<TeamAdder onSetDetails={setTeamDetails} />
							<CustomButton
								text='Obtener equipo amigo'
								// action={cancel}
								icon={{name: 'user', color: colors.White}}
								color={colors.Blue}
								addSpacing={false}
							/>
						</View>
						<View>
							<Text style={styles.myTeamsTitle}>Mis equipos</Text>
						</View>
						{data.length ? (
							<View style={styles.myTeams}>
								{data.map((el, index) =>
									<View key={index} style={styles.myItemTeams}>
										<View style={{width: '65%'}}>
											<Text style={styles.myTeamsText}>{el.name}</Text>
										</View>
										<TeamEditor onSetDetails={setTeamDetails} item={el} />
										<TouchableOpacity
											onPress={() => {
												setSelectedKey(el.key),
												setIsRemoveModalVisible(true)
											}}
										>
											<Icon name='trash' size={25} color={colors.DarkGray} />
										</TouchableOpacity>
									</View>
									
								)}
							</View>
						) : (<EmptyList />)}
					</View>
				)
			}
		</Layout>
	);
};

export default Screen;