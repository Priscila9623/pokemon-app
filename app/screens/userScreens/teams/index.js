import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Share } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome';
import Layout from '@components/layout';
import CustomButton from '@components/button';
import CustomModal from '@components/modal';
import EmptyList from '@components/empty';
import { colors } from '@config/style';
import { setTeam } from '@actions/team.action';
import { hasNewTeam } from '@actions/newTeam.action';
import styles from './style';

const Screen = ({ route, navigation }) => {
	const newTeam = useSelector((state) => state.newTeam);
	const dispatch = useDispatch();
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedKey, setSelectedKey] = useState(-1);
	const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false);

	const onShare = async (item) => {
		try {
			await Share.share({
				message:
				`Obtén mi equipo de pokemons para la region ${item.region_name} 
				http://pokepris26.com/${item.region_name}/${item.token}`,
			});
		} catch (error) {

		}
	};

	const transformData = (teams) => {
		const list = [];
		if (teams) {
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
	};

	const setTeamDetails = useCallback(
		(team) => dispatch(
			setTeam(team)),
		[dispatch]
	);

	const setHasNewTeam = useCallback(
		() => dispatch(
			hasNewTeam(false)),
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
					region_user: `${route.params.name}_${auth().currentUser.uid}`,
				}),
				navigation.navigate('TeamDetails', {
					isAdding: true,
				});
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
				);}}
		>
			<Icon name='edit' size={25} color={colors.DarkGray} />
		</TouchableOpacity>
	));

	useEffect(() => {
		if (!isRemoveModalVisible) {setSelectedKey(-1);}
	}, [isRemoveModalVisible]);

	useEffect(() => {
		if (!newTeam) {
			const unsubscribe = navigation.addListener('focus', () => {
				getTeams();
			});
			return unsubscribe;
		}
	}, [navigation]);

	useEffect(() => {
		if (newTeam) {
			getTeams();
			setHasNewTeam();
		}
	}, [newTeam]);

	return (
		<Layout title={`Equipos / ${route.params.name}`} goBack={() =>navigation.goBack()} showLogOut>
			<View style={styles.team}>
				<CustomModal isVisible={isRemoveModalVisible} setIsVisible={setIsRemoveModalVisible}>
					<View style={{alignItems: 'center'}}>
						<Text style={[styles.text, {textAlign: 'center'}]}>¿Deseas eliminar este equipo?</Text>
						<CustomButton
							text='Sí, eliminar'
							action={() => {
								deleteTeam();
							}}
							width='80%'
						/>
					</View>
				</CustomModal>
				<View style={styles.buttons}>
					<TeamAdder onSetDetails={setTeamDetails} />
					<CustomButton
						text='Obtener equipo amigo'
						action={()=>{
							navigation.navigate('TeamToken');
						}}
						icon={{name: 'user', color: colors.White}}
						color={colors.Blue}
						addSpacing={false}
					/>
				</View>
				<View>
					<Text style={styles.myTeamsTitle}>Mis equipos</Text>
				</View>
				{
					isLoading ? (
						<ActivityIndicator style={styles.loader} size='large' color={colors.Salmon} />
					) : (
						<>
							{data.length ? (
								<View style={styles.myTeams}>
									{data.map((el, index) =>
										<View key={index} style={styles.myItemTeams}>
											<View style={{width: '60%'}}>
												<Text style={styles.myTeamsText}>{el.name}</Text>
											</View>
											<TouchableOpacity
												onPress={() => {
													onShare(el);
												}}
											>
												<Icon name='share' size={25} color={colors.DarkGray} />
											</TouchableOpacity>
											<TeamEditor onSetDetails={setTeamDetails} item={el} />
											<TouchableOpacity
												onPress={() => {
													setSelectedKey(el.key),
													setIsRemoveModalVisible(true);
												}}
											>
												<Icon name='trash' size={25} color={colors.DarkGray} />
											</TouchableOpacity>
										</View>

									)}
								</View>
							) : (<EmptyList />)}
						</>
					)}
			</View>

		</Layout>
	);
};

export default Screen;
