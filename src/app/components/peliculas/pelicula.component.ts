import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './pelicula.component.html',
})
export class PeliculaComponent implements OnInit {

  public form: FormGroup;
  id: string;
  loading: boolean = false;
  submitted: boolean = false;
  isAddMode: boolean;

  constructor(
    private formBuilder: FormBuilder,
  ) {

  }

  ngOnInit(){

  }

}
