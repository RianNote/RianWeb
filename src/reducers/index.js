import { combineReducers } from 'redux'

// Import Reducers
import * as ModeReducer from './ModeReducer';
import * as UserReducer from './UserReducer';
import * as ProjectReducer from './ProjectReducer';
import * as CalendarReducer from './CalendarReducer';
import * as PlanReducer from './PlanReducer';
import * as NoteEditorReducer from './NoteEditorReducer';
import * as WhiteBoardReducer from './WhiteBoardReducer';
import { firebaseStateReducer } from 'react-redux-firebase';
import * as NoteTimelineReducer from './NoteTimelineReducer';
import * as FirebaseChatReducer from './FirebaseChatReducer';

export default combineReducers(
	Object.assign(
		{}, 
		ModeReducer,
		UserReducer,
		ProjectReducer,
		CalendarReducer,
		PlanReducer,
		NoteEditorReducer,
		WhiteBoardReducer,
  	{firebase: firebaseStateReducer},
  	NoteTimelineReducer,
  	FirebaseChatReducer,
	))

