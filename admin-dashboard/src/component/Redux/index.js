import { combineReducers } from 'redux';
import dataReducer from './dataReducer';

const rootReducer = combineReducers({
    data: dataReducer,
    // Thêm các reducers khác nếu cần
});

export default rootReducer;
