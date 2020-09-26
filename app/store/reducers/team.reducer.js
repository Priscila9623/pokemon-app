import { SET_TEAM } from '@actions/team.action';

const initialState = {
	token: '',
	name: '',
	user_id: '',
	region_name: '',
	region_user: '',
	pokemons: [],
};

export default (state = initialState, action) => {
	switch (action.type){
		case SET_TEAM:
			return {...state, ...action.payload};
		default: return state;
	}
};
