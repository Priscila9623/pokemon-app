import RegionScreen from '@screens/userScreens/regions';
import PokemonScreen from '@screens/userScreens/pokemon';
import PokemonDetailsScreen from '@screens/userScreens/pokemonDetails';
import TeamScreen from '@screens/userScreens/teams';
import TeamDetailsScreen from '@screens/userScreens/teamDetails';
import TeamTokenScreen from '@screens/userScreens/teamToken';

const userScreens = {
	Region: RegionScreen,
	Pokemon: PokemonScreen,
	PokemonDetails: PokemonDetailsScreen,
	Team: TeamScreen,
	TeamDetails: TeamDetailsScreen,
	TeamToken: TeamTokenScreen,
};

export default userScreens;
