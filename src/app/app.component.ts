import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ipcRenderer } from 'electron';
// import { app } from 'electron';

// import * as path from 'path';
// import * as os from 'os';
// import * as osHomedir from 'os-homedir';

// const {app} = require('electron');
// app.getPath('home');

// const path = require('path');
// const os = require('os');

// const form = document.getElementById('image-form');
// const slider = document.getElementById('slider');
// const img = document.getElementById('img');


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'image-shrink';
  sliderForm: FormGroup;
  value: number;
  imagePath: string;

  constructor(fb: FormBuilder) {
    // Logs false for default environment
    console.log(environment.production);


    // this.imagePath = path.join(
    //   os.homedir(),
    //   'imageshrink'
    // );

    this.value = 30;
    this.sliderForm = fb.group({
      slider: [0, Validators.min(10)]
    });
  }

  rad() {
    console.log('what');

  }
}
