import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-success-register',
  templateUrl: './success-register.component.html',
  styleUrls: ['./success-register.component.css']
})
export class SuccessRegisterComponent {
  file: File | null = null;
  imagePreviewUrl: string = 'https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true';
  name: string = '';
  status: string = '';
  active: string = 'edit';

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        this.file = file;
        this.imagePreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  handleSubmit(event: Event): void {
    event.preventDefault();
    if (this.active === 'edit' && this.file) {
      const userAccountId = localStorage.getItem('userAccountId');
      if (userAccountId) {
        const formData = new FormData();
        formData.append('profile_Picture', this.file);
        this.http.put(`http://127.0.0.1:3000/user/updateProfilePicture/${userAccountId}`, formData).subscribe({
          next: response => console.log('Profile picture uploaded', response),
          error: error => console.error('Upload error', error)
        });
      }
    }
    this.active = this.active === 'edit' ? 'profile' : 'edit';
  }
  
  editProfile(): void {
    this.active = 'edit';
  }

  saveChanges(): void {
    this.handleSubmit(new Event('submit'));
    this.active = 'profile';
  }
}
