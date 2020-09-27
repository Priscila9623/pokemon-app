import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import database from '@react-native-firebase/database';
import FastImage from 'react-native-fast-image';
import 'react-native-get-random-values';
import { nanoid } from 'nanoid';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomButton from '@components/button';
import CustomModal from '@components/modal';
import Badge from '@components/badge';
import EmptyList from '@components/empty';
import { setTeam } from '@actions/team.action';
import Pokeball from '@images/pokeball.png';
import { colors } from '@config/style';
import styles from './style';

const Screen = ({ route, navigation }) => {
	const dispatch = useDispatch();
	const teamData = useSelector((state) => state.team);
	const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false);
	const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
	const [data, setData] = useState([]);
	const [typedText, setTypedText] = useState(teamData.name);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [isLoading, setIsLoading] = useState(false);

	const generateToken = async () => {
		const code = nanoid();
		const isUsed = await database().ref()
			.child('teams')
			.orderByChild('token')
			.equalTo(String(code))
			.once('value')
			.then((s) => s.val())
			.catch((err) => console.log('err', err));

		if (isUsed) {
			return generateToken();
		}
		return code;
	};

	const updateTeam = () => {
		setIsLoading(true);
		const teamDataCopy = teamData;
		const key = teamDataCopy.key;
		delete teamDataCopy.key;
		database().ref('teams').child(key).update({
			...teamData,
			name: typedText,
		});
		setIsSuccessModalVisible(true);
		setIsLoading(false);
	};

	const addTeam = async () => {
		setIsLoading(true);
		const token = await generateToken();
		database().ref('teams').push({
			...teamData,
			token,
			name: typedText,
		});
		setIsSuccessModalVisible(true);
		setIsLoading(false);
	}

	const handleOpenItem = (index) => {
		const modData = data;
		modData[index].isOpen = !modData[index].isOpen;
		setData([...modData])
	}

	const transformData = () => {
		const { pokemons } = teamData;
		const list = [];
		for (const item of pokemons) {
			list.push({...item, isOpen: false});
		}
		setData(list);
	};

	const remove = () => {
		const { pokemons } = teamData;
		const pokemonsCopy = pokemons;
		pokemonsCopy.splice(selectedIndex, 1);
		return {
			pokemons: pokemonsCopy,
		}
	};

	const setPokemons = useCallback(
		() => dispatch(
			setTeam(remove())),
		[dispatch, selectedIndex]
	);

	const PokemonRemover = React.memo(({ onRemovePokemon }) => (
		<CustomButton
			text='Sí, eliminar'
			action={() => {
				onRemovePokemon(),
				setIsRemoveModalVisible(false)
			}}
			width='80%'
		/>
	))

	const Footer = () => (
		<View style={styles.box}>
			<CustomButton
				text='Guardar equipo'
				action={() => {
					route.params.isAdding ? addTeam() : updateTeam()
				}}
				icon={{name: 'save', color: colors.White}}
				addSpacing={false}
				width='80%'
				isDisabled={data.length < 3 || !typedText}
				isLoading={isLoading}
			/>
		</View>
	);

	const Content = (item, index) => {
		return(
			<View key={item.number}>
				<View style={styles.list}>
					<View style={{flex: 1}}>
					{
						item.img ? (
							<FastImage
								style={styles.icon}
								source={{
									uri: item.img,
									priority: FastImage.priority.normal,
								}}
								resizeMode={FastImage.resizeMode.contain}
								fallback
							/>
						) : (
							<View style={styles.defaultLogo}>
								<Image
									style={[styles.image]}
									source={Pokeball}
									resizeMode='contain'
								/>
							</View>
						)
					}
					</View>
					<View style={{flex: 3}}>
						<Text style={[styles.name]}>{item.name}</Text>
						<Text style={[styles.number]}>{`#${item.number}`}</Text>
					</View>
					<View style={styles.actions}>
						<TouchableOpacity
							onPress={()=>navigation.navigate('Pokemon', {
								isAdding: false,
								selectedIndex: index,
							})}
						>
							<Icon name='edit' size={25} color={colors.DarkGray} />
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								setSelectedIndex(index),
								setIsRemoveModalVisible(true)
							}}
						>
							<Icon name='trash' size={25} color={colors.DarkGray} />
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity onPress={()=>handleOpenItem(index)} style={styles.moreBtn}>
					<Text style={[styles.more]}>{item.isOpen ? 'Ver menos' : 'Ver más'}</Text>
				</TouchableOpacity>
				{
					item.isOpen && (
						<View style={{flex: 1, width: '100%'}}>
							<View style={styles.description}>
								<Text style={[styles.text, {textAlign: 'justify'}]}>{item.description}</Text>
							</View>
							<View style={styles.types}>
								{item.types.map((el, i) =>
									<Badge key={i} text={el.type.name} color={item.color} />
								)}
							</View>
						</View>
					)
				}
			</View>
		)
	};

	useEffect(() => {
		if (!isRemoveModalVisible) setSelectedIndex(-1);
	}, [isRemoveModalVisible])

	useEffect(() => {
		transformData();
	}, [teamData]);

	return(
		<View style={{flex: 1, marginHorizontal: 5}}>
			<CustomModal isVisible={isRemoveModalVisible} setIsVisible={setIsRemoveModalVisible}>
				<View style={{alignItems: 'center'}}>
					<Text style={styles.text}>¿Deseas eliminar este pokemon?</Text>
					<PokemonRemover onRemovePokemon={setPokemons} />
				</View>
			</CustomModal>
			<CustomModal isVisible={isSuccessModalVisible} setIsVisible={setIsSuccessModalVisible}>
				<View style={{alignItems: 'center'}}>
					<Icon name='check-circle' size={30} color={colors.Salmon} />
					<Text style={styles.text}>¡Equipo guardado exitosamente!</Text>
					<CustomButton
						text='De acuerdo'
						action={() => {
							setIsSuccessModalVisible(false),
							navigation.goBack()
						}}
						width='80%'
					/>
				</View>
			</CustomModal>
			<View style={styles.box}>
				<View style={styles.teamName}>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						style={[styles.teamHeaderButtons, styles.arrowBack]}
					>
						<Icon name='arrow-left' size={22} color={colors.DarkGray} />
					</TouchableOpacity>
					<TextInput
						onChangeText={(value) => setTypedText(value)}
						defaultValue={typedText}
						placeholder='Nombre de tu equipo'
						style={styles.input}
					/>
					<TouchableOpacity
						onPress={()=> data.length -6 ? navigation.navigate('Pokemon', {
							isAdding: true,
							selectedIndex: -1,
						} ): { }}
						style={[styles.teamHeaderButtons, styles.plus]}
					>
						<Icon name={data.length - 6 ? 'plus' : 'ban'} size={22} color={colors.DarkGray} />
					</TouchableOpacity>
				</View>
			</View>
			<FlatList
				data={teamData.pokemons}
				ListEmptyComponent={<EmptyList />}
				ListFooterComponent={<Footer />}
				renderItem={({item, index}) => Content(item, index)}
				keyExtractor={(item, index) => index.toString()}
			/>
		</View>
	);
};

export default Screen;