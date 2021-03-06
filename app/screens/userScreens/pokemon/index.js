import React, { useState, useEffect } from 'react';
import { View, TextInput, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Layout from '@components/layout';
import Card from '@components/card';
import useDataApi from '@hooks/useDataApi';
import useSearch from '@hooks/useSearch';
import { urlRegionByName } from '@config/paths';
import { colors } from '@config/style';
import styles from './style';

const Screen = ({ route, navigation}) => {
	const [data, setData] = useState([]);
	const [pokedexSize, setPokedexSize] = useState(-1);
	const [pokedexItem, setpokedexItem] = useState(0);
	const [typedText, setTypedText] = useState('');
	const teamData = useSelector((state) => state.team);
	const [state, fetchData] = useDataApi({
		url: urlRegionByName(teamData.region_name),
		headers: null,
		hasCache: true,
	});
	const [statePokedex, fetchDataPokedex] = useDataApi();
	const [filteredData, setSearch, setSourceData] = useSearch();

	const handlePokemons = (pokemons) => {
		if (data.length < 1) {
			setData(pokemons);
		} else {
			const whiteList = data;
			for (const item of pokemons) {
				const found = whiteList.find(el => el.pokemon_species.name === item.pokemon_species.name);
				if (!found) {
					whiteList.push(item);
				}
				setData(whiteList);
			}
		}
		setpokedexItem(pokedexItem + 1);
	};

	const handlePokedexes = (pokedexes) => {
		setPokedexSize(pokedexes.length);
		for (const item of pokedexes) {
			fetchDataPokedex({url: item.url});
		}
	};

	useEffect(() => {
		if (!statePokedex.isLoading) {
			if (statePokedex.isSuccess && statePokedex.data) {
				handlePokemons(statePokedex.data.pokemon_entries);
			}
		}
	}, [statePokedex.isSuccess, statePokedex.isError]);

	useEffect(() => {
		if (!state.isLoading) {
			if (state.isSuccess && state.data) {
				handlePokedexes(state.data.pokedexes);
			}
		}
	}, [state.isSuccess, state.isError]);

	useEffect(() => {
		if (pokedexItem === pokedexSize) {setSourceData(data);}
	}, [pokedexItem]);

	useEffect(() => {
		setpokedexItem(0);
		setPokedexSize(-1);
		fetchData();
	}, []);

	return (
		<Layout title='Pokemons' goBack={() => navigation.goBack()}>
			{pokedexItem < pokedexSize ? (
				<ActivityIndicator style={styles.loader} size='large' color={colors.Salmon} />
			) : (
				<View style={styles.region}>
					{filteredData.length > 0 && (
						<>
							<View style={styles.searcher}>
								<Icon name={'search'} size={22} color={colors.DarkGray} />
								<TextInput
									onChangeText={(value) => {setTypedText(value), setSearch(value);}}
									value={typedText}
									placeholder='Buscar un pokemon'
									style={styles.input}
								/>
							</View>
							<View style={styles.cardContainer}>
								{filteredData.map((el, index) =>
									<Card
										action={() =>
											navigation.navigate('PokemonDetails', {
												url: el.pokemon_species.url,
												name: el.pokemon_species.name,
												isAdding: route.params.isAdding,
												selectedIndex: route.params.selectedIndex,
											})
										}
										key={index}
										text={el.pokemon_species.name}
										index={index}
									/>
								)}
							</View>
						</>
					)}
				</View>
			)}
		</Layout>
	);
};

export default Screen;
