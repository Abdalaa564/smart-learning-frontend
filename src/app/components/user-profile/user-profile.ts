import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile implements AfterViewInit {

  ngAfterViewInit() {
    const editBtn = document.getElementById('editBtn');
    const modal = document.getElementById('editModal');
    const closeModalBtn = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');

    if (editBtn && modal && closeModalBtn && cancelBtn) {
      editBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
      });

      closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });

      cancelBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });

      window.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
    }
  }
}