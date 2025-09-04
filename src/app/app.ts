import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Authservice } from './services/authservice';
import { DarkModeService } from './dark-mode.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  //protected readonly title = signal('job-board-frontendApp');
   constructor(private darkModeService: DarkModeService ,private authService: Authservice, private router: Router){}

ngOnInit(): void {
  // if (this.darkModeService.getDarkMode()) {
  //   this.darkModeService.enableDarkMode()
    
  // }else this.darkModeService.disableDarkMode()
  }
}
