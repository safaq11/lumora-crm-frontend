import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkMode = false;

  constructor() {

    const savedTheme =
      localStorage.getItem('theme');

    if(savedTheme === 'dark'){

      this.enableDarkMode();

    }

  }

  toggleTheme(){

    this.darkMode = !this.darkMode;

    if(this.darkMode){

      this.enableDarkMode();

    }
    else{

      this.disableDarkMode();

    }

  }

  enableDarkMode(){

    document.body.classList.add('dark-theme');

    localStorage.setItem(
      'theme',
      'dark'
    );

    this.darkMode = true;

  }

  disableDarkMode(){

    document.body.classList.remove(
      'dark-theme'
    );

    localStorage.setItem(
      'theme',
      'light'
    );

    this.darkMode = false;

  }

  isDarkMode(){

    return this.darkMode;

  }

}