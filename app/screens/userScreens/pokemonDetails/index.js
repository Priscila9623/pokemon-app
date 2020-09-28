import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/FontAwesome';
import Layout from '@components/layout';
import CustomModal from '@components/modal';
import CustomButton from '@components/button';
import Badge from '@components/badge';
import useDataApi from '@hooks/useDataApi';
import { setTeam } from '@actions/team.action';
import { urlPokemonByName } from '@config/paths';
import Pokeball from '@images/pokeball.png';
import { colors } from '@config/style';
import styles from './style';

const Screen = ({ route, navigation }) => {
	const dispatch = useDispatch();
	const teamData = useSelector((state) => state.team);
	const [data, setData] = useState(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [typedText, setTypedText] = useState('');
	const [stateSpecies, fetchDataSpecies] = useDataApi({
		url: route.params.url,
		headers: null,
		hasCache: true,
	});
	const [statePokemon, fetchDataPokemon] = useDataApi({
		url: urlPokemonByName(route.params.name),
		headers: null,
		hasCache: true,
	});

	const traduce = (traductions) => {
		const index = traductions.findIndex(el => el.language.name === 'es');
		return traductions[index].flavor_text;
	};

	const handleColor = (color) => {
		if (['yellow', 'Yellow'].includes(color)) {
			return colors.Yellow;
		} else if (['white', 'White'].includes(color)){
			return colors.DarkGray;
		}
		return color;
	};

	const getCurrentPokemon = () => {
		const currentPokemon = {
			name: typedText,
			number: data.order,
			types: data.types,
			description: traduce(data.flavor_text_entries),
			img: data.sprites.front_default,
			color: handleColor(data.color.name),
		};
		return currentPokemon;
	};

	const add = () => {
		const { pokemons } = teamData;
		const pokemonsCopy = pokemons;
		const currentPokemon = getCurrentPokemon();
		pokemonsCopy.push(currentPokemon);
		return {
			pokemons: pokemonsCopy,
		};
	};

	const edit = () => {
		const { pokemons } = teamData;
		const pokemonsCopy = pokemons;
		const currentPokemon = getCurrentPokemon();
		pokemonsCopy.splice(route.params.selectedIndex, 1, currentPokemon);
		return {
			pokemon: pokemonsCopy,
		};
	};

	const handleAction = () => {
		route.params.isAdding ? add() : edit();
	};

	const setPokemons = useCallback(
		() => dispatch(
			setTeam(handleAction())),
		[dispatch, data, typedText]
	);


	const PokemonAdder = React.memo(({ onSetPokemon }) => (
		<CustomButton
			text='¡Listo!'
			action={() => {
				onSetPokemon(),
				setIsModalVisible(false),
				navigation.navigate('TeamDetails');
			}}
			width='80%'
			isDisabled={typedText.length === 0}
		/>
	));

	useEffect(() => {
		if (!statePokemon.isLoading) {
			if (statePokemon.isSuccess && stateSpecies.isSuccess) {
				setData({...stateSpecies.data, ...statePokemon.data});
			}
		}
	}, [
		statePokemon.isSuccess,
		statePokemon.isError,
		stateSpecies.isSuccess,
		stateSpecies.isError,
	]);

	useEffect(() => {
		fetchDataSpecies();
		fetchDataPokemon();
	}, []);

	return (
		<>
			{
				!data ? (
					<ActivityIndicator style={styles.loader} size='large' color={colors.Salmon} />
				) : (
					<Layout title={data.name} titleBackgroundColor={handleColor(data.color.name)} goBack={() => navigation.goBack()}>
						<CustomModal isVisible={isModalVisible} setIsVisible={setIsModalVisible}>
							<View style={{alignItems: 'center'}}>
								<TextInput
									onChangeText={(value) => setTypedText(value)}
									value={typedText}
									placeholder='Nombre de tu pokemon'
									style={styles.input}
								/>
								<PokemonAdder onSetPokemon={setPokemons} />
							</View>
						</CustomModal>
						<View style={styles.infoContainer}>
							<TouchableOpacity
								style={styles.plus}
								onPress={() => setIsModalVisible(true)}
							>
								<Icon name='plus' size={35} color={handleColor(data.color.name)} />
							</TouchableOpacity>
							<View style={styles.info}>
								{
									data.sprites.front_default ? (
										<FastImage
											style={styles.image}
											source={{
												uri: data.sprites.front_default,
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
								<View style={styles.details}>
									<Text style={[styles.text]}>{traduce(data.flavor_text_entries)}</Text>
									<View style={[styles.card]}>
										<View style={styles.columnDetails}>
											<Text style={[styles.label]}>Peso:</Text>
											<Text style={[styles.text]}>{data.weight}</Text>
										</View>
										<View style={styles.columnDetails}>
											<Text style={[styles.label]}>Altura:</Text>
											<Text style={[styles.text]}>{data.height}</Text>
										</View>
										<View style={styles.columnDetails}>
											<Text style={[styles.label]}>Orden:</Text>
											<Text style={[styles.text]}>{data.order}</Text>
										</View>
									</View>

									<View style={styles.basicDetails}>
										<Text style={[styles.label]}>Tipos:</Text>
									</View>
									<View style={styles.types}>
										{data.types.map((el, index) =>
											<Badge key={index} color={handleColor(data.color.name)} text={el.type.name} />
										)}
									</View>
								</View>
							</View>
						</View>
					</Layout>
				)
			}
		</>
	);
};

export default Screen;
