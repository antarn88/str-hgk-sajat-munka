import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/model/movie';
import { getOneItem } from 'src/app/store/movie/MovieActions';
import { selectOneItem } from 'src/app/store/movie/MovieReducers';

@Component({
  selector: 'app-movie-editor',
  templateUrl: './movie-editor.component.html',
  styleUrls: ['./movie-editor.component.scss']
})
export class MovieEditorComponent implements OnInit {

  movie$: Observable<Movie> = new Observable();
  movieId: number = 0;

  constructor(
    private ar: ActivatedRoute,
    private store: Store<any>,
  ) { }

  ngOnInit(): void {
    this.movieId = Number(this.ar.snapshot.params.id);
    this.store.dispatch(getOneItem({ id: this.movieId }));
    this.movie$ = this.store.pipe(select(selectOneItem));
  }

  onClickBack(): void {
    history.back();
  }

}
