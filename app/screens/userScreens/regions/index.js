import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import Layout from '@components/layout';
import Card from '@components/card';
import useDataApi from '@hooks/useDataApi';
import { urlRegion } from '@config/paths';
import { colors } from '@config/style';
import styles from './style';

const Screen = ({navigation}) => {
	const [data, setData] = useState([]);
	const [state, fetchData] = useDataApi({
		url: urlRegion(),
		headers: null,
		hasCache: true
	});

	useEffect(() => {
		if (!state.isLoading) {
			if (state.isSuccess && state.data) {
				setData(state.data.results);
			} 
		}
	}, [state.isSuccess, state.isError]);

	useEffect(() => {
		fetchData();
	}, []);
	
	return(
		<Layout title='Regiones'>
			{
				state.isLoading ? (
					<ActivityIndicator style={styles.loader} size='large' color={colors.Salmon} />
				) : (
					<View style={styles.region}>
						{data && (
							<View style={styles.cardContainer}>
								{data.map((el, index) =>
									<Card
										key={index}
										text={el.name}
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