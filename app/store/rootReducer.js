import { combineReducers } from 'redux';
import team from './reducers/team.reducer';
import newTeam from './reducers/newTeam.reducer';

export default combineReducers({
	team,
	newTeam,
});
