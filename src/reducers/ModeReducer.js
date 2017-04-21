import { 
	MODE_CHANGE
} from '../constants/index.js'


var ModeState = {
	mode: 3
}


export function Mode(state = ModeState, action) {
	switch (action.type){
		case MODE_CHANGE:
			return Object.assign({}, state, {
				mode: action.mode
			})
		default:
			return state	
	}
}
