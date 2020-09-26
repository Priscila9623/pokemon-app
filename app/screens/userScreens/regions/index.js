import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
import Layout from '@components/layout';
import Card from '@components/card';
import useDataApi from '@hooks/useDataApi';
import { urlRegion } from '@config/paths';
import { colors } from '@config/style';
import styles from './style';
// import { setTeam } from '@actions/team.action';

const Screen = ({navigation }) => {
	const [data, setData] = useState([]);
	const [state, fetchData] = useDataApi({
		url: urlRegion(),
		headers: null,
		hasCache: true
	});
	// const teamData = useSelector((state) => state.team);
	// const dispatch = useDispatch();

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
										action={() =>
											// dispatch(setTeam({region_name: el.name}))
											navigation.navigate('Team', {
												name: el.name
											})
										}
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