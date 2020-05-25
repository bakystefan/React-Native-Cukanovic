import { USERS_DATA_FETCHED, DATA_LOADING, FETCH_MORE, USER_FETCHED, USER_LOADING, EMPTY_USER } from "../actions/fetch";

interface Action {
  type: string;
  payload: any;
}

type usersData = {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string
}

type adData = {
  company: string,
  url: string,
  text: string
}

type selectedUserType = {
  data: usersData,
  ad: adData
}

interface State {
  totalPages: number;
  data: usersData[];
  loading: boolean;
  userSelected: selectedUserType | null;
}

const intialState = {
  totalPages: 0,
  data: [],
  userSelected: null,
  userLoading: false,
  loading: false
};

export default (state: State = intialState, action: Action) => {
  switch (action.type) {
    case USERS_DATA_FETCHED:
      return {
        ...state,
        totalPages: action.payload.total_pages,
        data: action.payload.data
      };
    case FETCH_MORE:
      return {
        ...state,
        data: [...state.data, ...action.payload.data]
      };
    case DATA_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case USER_FETCHED:
      return {
        ...state,
        userSelected: action.payload.data
      };
    case USER_LOADING:
      return {
        ...state,
        userLoading: action.payload
      }
    case EMPTY_USER:
      return {
        ...state,
        userSelected: null,
      }
    default:
      return state;
  }
};
