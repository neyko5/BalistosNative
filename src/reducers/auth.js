import * as actionTypes from '../constants/actionTypes';
import { AsyncStorage } from 'react-native';

function auth(state = {}, action) {
  switch (action.type) {
    case actionTypes.AUTH_SET_FROM_STORAGE:
      return {
        ...state,
        token: action.token,
        username: action.username,
        userId: action.userId,
        loggedIn: true,
      };
    case actionTypes.LOG_OUT:
      return {};
    case actionTypes.SET_LOGIN_ERROR:
      return {
        loginError: action.message,
        registerError: undefined,
      };
    case actionTypes.SET_REGISTER_ERROR:
      return {
        registerError: action.message,
        loginError: undefined,
      };
    case actionTypes.POST_LOGIN:
      AsyncStorage.multiSet([['token', action.token],['username', action.username], ['userId', action.userId.toString()]]);
      return {
        ...state,
        username: action.username,
        token: action.token,
        userId: action.userId,
        loggedIn: true,
        registerError: undefined,
        loginError: undefined,
      };
    default:
      return state;
  }
}

export default auth;
