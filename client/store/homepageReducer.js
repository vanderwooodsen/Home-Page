import axios from 'axios';

const initialState = {
  data: null,
  selectedAnswer: null
}

const SET_DATA = "SET_DATA";
const SET_SELECTED_ANSWER = "SET_SELECTED_ANSWER";


export const setData = (data) =>{
  return {
    type: SET_DATA,
    data,
  }
}

export const setSelectedAnswer = (answer) =>{
  return {
    type: SET_SELECTED_ANSWER,
    answer,
  }
}

export const loadData = () =>{
  return async(dispatch)=>{
    let response = await axios.get('/api')
    dispatch(setData(response.data))
  }
}

export function homepageReducer (state = initialState, action) {
  switch(action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.data
      }
    break
    case SET_SELECTED_ANSWER:
      return {
        ...state,
        selectedAnswer: action.answer
      }
    break
  }

  return state;
}
