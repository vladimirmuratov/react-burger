import {Action, ActionCreator, applyMiddleware, combineReducers, compose, createStore, Dispatch} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {ingredientReducer} from "./ingredients/reducer";
import {orderReducer} from "./order/reducer";
import {userReducer} from "./user/reducer";
import {TUserActions} from "./user/types";
import {TIngredientsActions} from "./ingredients/types";
import {TOrderActions} from "./order/types";
import {socketMiddleware} from "./middleware/socketMiddleware";
import {TFeedActions} from "./feed/types";
import {feedReducer} from "./feed/reducer";
import {modalReducer} from "./modal/reducer";
import {TModalActions} from "./modal/types";

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions =
    | TOrderActions
    | TIngredientsActions
    | TUserActions
    | TFeedActions
    | TModalActions;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;

export type AppDispatch = Dispatch<TApplicationActions>;

const rootReducer = combineReducers({
    burger: ingredientReducer,
    order: orderReducer,
    user: userReducer,
    feed: feedReducer,
    modal: modalReducer,
});

/*const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;*/

// @ts-ignore
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk), applyMiddleware(socketMiddleware()));

export const store = createStore(rootReducer, enhancer);
