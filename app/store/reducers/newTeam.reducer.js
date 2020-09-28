import { HAS_NEW_TEAM } from '@actions/newTeam.action';

const initialState = false;

export default (state = initialState, action) => {
	switch (action.type){
	case HAS_NEW_TEAM:
		return action.payload;
	default: return state;
	}
};
