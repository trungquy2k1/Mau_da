import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from './types';
import { db } from '../../firebase.js';

export const fetchData = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_DATA_REQUEST });

        try {
            const querySnapshot = await getDocs(collection(db, 'User'));
            const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            dispatch({ type: FETCH_DATA_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: FETCH_DATA_FAILURE, payload: error.message });
        }
    };
};
