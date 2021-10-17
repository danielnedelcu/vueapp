import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';
import { getStorage, ref } from "firebase/storage";

const app = initializeApp({

  apiKey: 'AIzaSyDjKmX2wI2i9v_4Rq0RivU0ux8kpLlI-94',

  authDomain: 'newsie-e96b7.web.app',

  databaseURL: 'https://newsie-e96b7.firebaseio.com',

  projectId: 'newsie-e96b7',

  storageBucket: 'newsie-e96b7.appspot.com',

  messagingSenderId: '674987906388'

});

export const auth = getAuth();

/*
 * Google Firebase database reference
 */

export const db = getFirestore();
export const appRoot = app;

const newsHeadlineCollection = collection(db, 'newsitems');
export const newsitemsRef = query(newsHeadlineCollection, orderBy('likes', 'desc'));

const newsFeedCollection = collection(db, 'newsfeed');
export const feedRef = query(newsFeedCollection);

const newsOpinionCollection = collection(db, 'newsopinions');
export const opinionRef = query(newsOpinionCollection);

/*
 * Google Firebase storage reference
 */

export const storage = getStorage();
export const storageRef = ref(storage, 'newsimages');


export const timeStamp = db.Timestamp;
console.log(timeStamp);