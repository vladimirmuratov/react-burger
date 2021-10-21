import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {ingredientReducer} from "./ingredients/reducer";
import {orderReducer} from "./order/reducer";
import {userReducer} from "./user/reducer";

const rootReducer = combineReducers({
    burger: ingredientReducer,
    order: orderReducer,
    user: userReducer
});

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);
