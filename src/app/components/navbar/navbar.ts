import { AfterViewInit, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements AfterViewInit {

  ngAfterViewInit() {
    const profileBtn = document.querySelector('.profile-btn') as HTMLElement;
    const profileDropdown = document.querySelector('.profile-dropdown') as HTMLElement;

    if(profileBtn && profileDropdown){
      profileBtn.addEventListener('click', () => {
        profileDropdown.classList.toggle('show');
      });

      // Close dropdown if clicked outside
      window.addEventListener('click', (e) => {
        if (!profileBtn.contains(e.target as Node) && !profileDropdown.contains(e.target as Node)) {
          profileDropdown.classList.remove('show');
        }
      });
    }
  }
}
