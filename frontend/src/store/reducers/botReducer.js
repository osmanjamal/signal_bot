import {
    BOT_FETCH_START,
    BOT_FETCH_SUCCESS,
    BOT_FETCH_FAIL,
    BOT_DETAILS_FETCH_START,
    BOT_DETAILS_FETCH_SUCCESS,
    BOT_DETAILS_FETCH_FAIL,
    BOT_CREATE_START,
    BOT_CREATE_SUCCESS,
    BOT_CREATE_FAIL,
    BOT_UPDATE_START,
    BOT_UPDATE_SUCCESS,
    BOT_UPDATE_FAIL,
    BOT_DELETE_START,
    BOT_DELETE_SUCCESS,
    BOT_DELETE_FAIL,
    BOT_REGEN_SECRET_START,
    BOT_REGEN_SECRET_SUCCESS,
    BOT_REGEN_SECRET_FAIL,
    BOT_CLEAR_ERROR
  } from '../actions/botActions';
  
  const initialState = {
    bots: [],
    bot: null,
    loading: false,
    error: null
  };
  
  const botReducer = (state = initialState, action) => {
    switch (action.type) {
      case BOT_FETCH_START:
        return {
          ...state,
          loading: true,
          error: null
        };
        
      case BOT_FETCH_SUCCESS:
        return {
          ...state,
          bots: action.payload,
          loading: false,
          error: null
        };
        
      case BOT_FETCH_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
        
      case BOT_DETAILS_FETCH_START:
        return {
          ...state,
          bot: null,
          loading: true,
          error: null
        };
        
      case BOT_DETAILS_FETCH_SUCCESS:
        return {
          ...state,
          bot: action.payload,
          loading: false,
          error: null
        };
        
      case BOT_DETAILS_FETCH_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
        
      case BOT_CREATE_START:
        return {
          ...state,
          loading: true,
          error: null
        };
        
      case BOT_CREATE_SUCCESS:
        return {
          ...state,
          bots: [...state.bots, action.payload],
          loading: false,
          error: null
        };
        
      case BOT_CREATE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
        
      case BOT_UPDATE_START:
        return {
          ...state,
          loading: true,
          error: null
        };
        
      case BOT_UPDATE_SUCCESS:
        return {
          ...state,
          bot: action.payload,
          bots: state.bots.map(bot => 
            bot.id === action.payload.id ? action.payload : bot
          ),
          loading: false,
          error: null
        };
        
      case BOT_UPDATE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
        
      case BOT_DELETE_START:
        return {
          ...state,
          loading: true,
          error: null
        };
        
      case BOT_DELETE_SUCCESS:
        return {
          ...state,
          bots: state.bots.filter(bot => bot.id !== action.payload),
          loading: false,
          error: null
        };
        
      case BOT_DELETE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
        
      case BOT_REGEN_SECRET_START:
        return {
          ...state,
          loading: true,
          error: null
        };
        
      case BOT_REGEN_SECRET_SUCCESS:
        return {
          ...state,
          bot: state.bot && state.bot.id === action.payload.id 
            ? { ...state.bot, secret: action.payload.secret }
            : state.bot,
          loading: false,
          error: null
        };
        
      case BOT_REGEN_SECRET_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
        
      case BOT_CLEAR_ERROR:
        return {
          ...state,
          error: null
        };
        
      default:
        return state;
    }
  };
  
  export default botReducer;