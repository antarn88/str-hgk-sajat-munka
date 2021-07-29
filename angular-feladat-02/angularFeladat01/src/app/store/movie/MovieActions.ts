import { createAction, props } from '@ngrx/store';
import { Movie } from 'src/app/model/movie';

export const GET_ITEMS = '[Movie] get items';
export const GET_ONE_ITEM = '[Movie] get item';
export const LOAD_ITEMS = '[Movie] load items';
export const LOAD_SELECTED_ITEM = '[Movie] load selected';
export const ERROR_ITEM = '[Movie] error item';


export const getItems = createAction(GET_ITEMS);
export const loadItems = createAction(LOAD_ITEMS, props<{ items: Movie[] }>());
export const getOneItem = createAction(GET_ONE_ITEM, props<{ id: number }>());
export const loadSelectedItem = createAction(LOAD_SELECTED_ITEM, props<{ selected: Movie }>());
export const errorItem = createAction(ERROR_ITEM, props<{ message: string }>());