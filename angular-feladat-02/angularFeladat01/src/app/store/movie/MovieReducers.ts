import { createReducer, on } from '@ngrx/store';
import { Movie } from 'src/app/model/movie';
import { loadItems, errorItem, loadSelectedItem } from './MovieActions';

export interface State {
  movies: { items: Movie[], selected?: Movie, error: string };
}

export const initialState: State = {
  movies: { items: [], selected: new Movie(), error: '' }
};

export const MovieReducer = createReducer(
  initialState,
  on(loadItems, (state, action) => ({ ...state, items: action.items })),
  on(loadSelectedItem, (state, action) => ({ ...state, selected: action.selected })),
  on(errorItem, (state, action) => ({ ...state, error: action.message })),
);

export const selectItems = (state: State) => state.movies.items;
export const selectOneItem = (state: State) => Object.assign({}, state.movies.selected);
export const selectError = (state: State) => state.movies.error;