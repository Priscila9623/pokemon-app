import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import Layout from '@components/layout';
import useDataApi from '@hooks/useDataApi';
import { urlPokemonByName } from '@config/paths';
import { colors } from '@config/style';
import styles from './style';

const Screen = ({ route, navigation }) => {
	const [data, setData] = useState(null);
	const [stateSpecies, fetchDataSpecies] = useDataApi({
		url: route.params.url,
		headers: null,
		hasCache: true
	});
	const [statePokemon, fetchDataPokemon] = useDataApi({
		url: urlPokemonByName(route.params.name),
		headers: null,
		hasCache: true
	});

	const traduce = (traductions) => {
		const index = traductions.findIndex(el => el.language.name === 'es');
		return traductions[index].flavor_text;
	}

	useEffect(() => {
		if (!statePokemon.isLoading) {
			if (statePokemon.isSuccess && stateSpecies.isSuccess) {
				setData({...stateSpecies.data, ...statePokemon.data})
			}
		}
	}, [
		statePokemon.isSuccess,
		statePokemon.isError,
		stateSpecies.isSuccess,
		stateSpecies.isError
	]);

	useEffect(() => {
		fetchDataSpecies();
		fetchDataPokemon();
	}, []);
	
	return(
		<>
			{
				!data ? (
					<ActivityIndicator style={styles.loader} size='large' color={colors.Salmon} />
				) : (
					<Layout title={data.name} titleBackgroundColor={data.color.name} goBack={() => navigation.goBack()}>
						<View style={styles.infoContainer}>
							<View style={styles.info}>
								<FastImage
									style={styles.image}
									source={{
										uri: data.sprites.front_default,
										priority: FastImage.priority.normal,
									}}
									resizeMode={FastImage.resizeMode.contain}
									fallback
								/>
								<View style={styles.details}>
									<Text  style={[styles.text, {textAlign: 'justify'}]}>{traduce(data.flavor_text_entries)}</Text>
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
										{data.types.map((el) =><>
											<View style={[styles.typeItem, {borderColor: data.color.name}]}>
												<Text style={[styles.text, styles.typeText, {color: data.color.name}]}>
													{el.type.name}
												</Text>
											</View>
											</>
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