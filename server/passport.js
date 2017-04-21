import { Strategy as FacebookStrategy } from "passport-facebook";
import User from "./models/User";
import config from "./config";
import moment from 'moment'
import firebase from 'firebase'
import makeNoteInitialState from './utils/makeFirebaseState' 
const facebookAuth = config.facebookAuth;

const firebaseConfig = {
    apiKey: "AIzaSyBX3jBV3-jGNqLwhSznY864MfPlp5H89Tw",
    authDomain: "riandev-d7a54.firebaseapp.com",
    databaseURL: "https://riandev-d7a54.firebaseio.com",
    storageBucket: "riandev-d7a54.appspot.com",
    messagingSenderId: "559609159517"  
}

firebase.initializeApp(firebaseConfig);
export default function(passport) {
	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});
	// attach req.session.passport.user = { // our serialised user object // }.


	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});
		
	// code for login (use('local-login', new LocalStategy))
	// code for signup (use('local-signup', new LocalStategy))

	// =========================================================================
	// FACEBOOK ================================================================
	// =========================================================================
	passport.use(new FacebookStrategy({
		// pull in our app id and secret from our auth.js file
		clientID        : facebookAuth.clientID,
		clientSecret    : facebookAuth.clientSecret,
		callbackURL     : facebookAuth.callbackURL,
		profileFields   : ["email","id", "first_name", "gender", "last_name", "picture"]
	},

		// facebook will send back the token and profile
		(token, refreshToken, profile, done)=> {
		// asynchronous
		process.nextTick(()=>{
		// find the user in the database based on their facebook id
		User.findOne({ "facebook_id" : profile.id }, (err, user)=>{
			if (err) return done(err);
			if (user) {
				// 유저를 찾았다면 라스트 로그인을 갱신시키고 로그인을 한다
				user.last_login = moment().unix();
				user.save((err, updatedUser)=>{
					if (err) throw err;
					return done(null, updatedUser);
				});
			} else {
				// 유저를 못찾았다면 유저를 만든다
				var newUser = new User();
				// set all of the facebook information in our user model
				newUser.facebook_id = profile.id; // set the users facebook id                   
				newUser.token = token; // we will save the token that facebook provides to the user                    
				newUser.name = profile.name.givenName + " " + profile.name.familyName; // look at the passport user profile to see how names are returned
				newUser.email = profile.email || profile.emails[0].value || "null"; // facebook can return multiple emails so we'll take the first
				newUser.picture = profile.photos[0].value;
				// save our user to the database
				newUser.save(function(err) {
					if (err) throw err;
					// if successful, return the new user]
					//find mongooseid to make firebase users profile ID
						
					//make personal notes Database in Firebase

					//After making profile in MongoDB, will make Note Database in firebase
					const userid = newUser._id.toString()
					// const offsetRef = firebase.database().ref(".info/serverTimeOffset");
				
					// offsetRef.on("value", function(snap) {
					// 	var offset = snap.val();
					var timestamp = moment().unix()	  

			
			    	makeNoteInitialState(done, newUser, userid, timestamp, firebase)

			
				});

				//set users info to firebase	

			
			}

		});
	});

}));

}