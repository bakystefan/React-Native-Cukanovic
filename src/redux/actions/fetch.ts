import { Dispatch } from "redux";
import { fetchUsersService, fetchOneUserService } from "../services/user";

export const USERS_DATA_FETCHED = "USERS_DATA_FETCHED";
export const DATA_LOADING = "DATA_LOADING";
export const FETCH_MORE = "FETCH_MORE";
export const FETCH_ONE_USER = "FETCH_ONE_USER";
export const USER_FETCHED = "USER_FETCHED";
export const USER_LOADING = "USER_LOADING";
export const EMPTY_USER = "EMPTY_USER";

export function fetchUsersData(page?: number) {
  return (dispatch: Dispatch) => {
    dispatch(loading(true));
    fetchUsersService(page)
      .then((res: any) => {
        dispatch(usersDataFetched(res));
        dispatch(loading(false));
      })
      .catch(err => {
        dispatch(loading(false));
      });
  };
}

export function fetchOneUser(id?: number) {
  return (dispatch: Dispatch) => {
    dispatch(emptyUser());
    dispatch(loadingUser(true));
    fetchOneUserService(id)
      .then((res: any) => {
        dispatch(oneUserFetched(res));
        dispatch(loadingUser(false));
      })
      .catch(err => {
        dispatch(loading(false));
      });
  };
}

export function fetchMoreUsersData(page?: number) {
  return (dispatch: Dispatch) => {
    dispatch(loading(true));
    fetchUsersService(page)
      .then((res: any) => {
        dispatch(fetchMore(res));
        dispatch(loading(false));
      })
      .catch(err => {
        dispatch(loading(false));
      });
  };
}

const usersDataFetched = (data: any[]) => ({
  type: USERS_DATA_FETCHED,
  payload: data
});

const oneUserFetched = (data: any) => ({
  type: USER_FETCHED,
  payload: data
})

const fetchMore = (data: any[]) => {
  return ({
  type: FETCH_MORE,
  payload: data
})};

export const loading = (loader: boolean) => ({
  type: DATA_LOADING,
  payload: loader
});

export const loadingUser = (loader: boolean) => ({
  type: USER_LOADING,
  payload: loader
});

export const emptyUser = () => ({
  type: EMPTY_USER,
});
