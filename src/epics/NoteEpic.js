import Rx from 'rxjs/Rx';
import firebase from 'firebase';
import React from 'react';
import { changeRenderedNote, changEditorState } from '../actions/NoteEditorActions.js'
import { 
	NOTE_TIMELINE_GET_TEST,
	NOTE_TIMELINE_GET, 
	NOTE_TIMELINE_SUCCESS, 
	NOTE_TIMELINE_CANCLE,
	NOTE_ONENOTE_GET,
	NOTE_ONENOTE_SUCCESS,
	NOTE_ONENOTE_CANCLE,
} from '../constants/index.js'
import axios from 'axios';




export const NoteEpic = (action$, store) => {

	return action$.ofType(NOTE_TIMELINE_GET_TEST)
		.switchMap(action=>{
			store.dispatch(noteOneCancle)
			return Rx.Observable.fromPromise(axios.get(`/api/notes/timeline?q=${store.getState().User._id}`, { params: { sorting: action.sorting } }))
				.map(response => { 	
					// console.log("GET ALLOFTIMELINE!!!", response.data)
					return noteSuccess(response.data, action.sorting) 
				})
				.takeUntil(action$.ofType(NOTE_TIMELINE_CANCLE))
				.catch(err => console.log("NOTE EPIC ERROR!"))
		})

}



export function noteGetMyOwnServer(sorting){
	return {
		type: NOTE_TIMELINE_GET_TEST,
		sorting: sorting
	}
}

export function noteGet(sorting){
	return {
		type: NOTE_TIMELINE_GET,
		howSorting: sorting
	}
}

export function noteSuccess(response, b){
	return {
		type: NOTE_TIMELINE_SUCCESS,
		data: response,
		howSorting: b
	}
}

export function noteCancle(response){
	return {
		type: NOTE_TIMELINE_CANCLE
	}
}




export const NoteOneEpic = (action$, store) => {

	return action$.ofType(NOTE_ONENOTE_GET)
		.mergeMap(action=>{
			return Rx.Observable.fromPromise(firebase.database().ref('notes/' + store.getState().User._id + '/' + 'infor' + '/' + action.inforlocation).once('value'))
				.map(response => { 	
					// console.log("GET ONEOFTIMELINE!!!", response.val()) 
					return noteScrollSuccess(response.val(), action.timelineNum) 
				})
				.takeUntil(action$.ofType(NOTE_ONENOTE_CANCLE))
				.catch(err => console.log("NOTE ONE ERROR!"))
		})
}


export function noteOneGet(inforlocation, timelineNum){
	return {
		type: NOTE_ONENOTE_GET,
		inforlocation: inforlocation,
		timelineNum: timelineNum
	}
}


export function noteScrollSuccess(response, timelineNum){
	return {
		type: NOTE_ONENOTE_SUCCESS,
		data: response,
		timelineNum: timelineNum
	}
}

export function noteOneCancle(response){
	return {
		type: NOTE_ONENOTE_CANCLE
	}
}








