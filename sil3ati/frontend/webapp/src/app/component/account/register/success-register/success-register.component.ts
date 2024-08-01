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

  onFileSelected(event: any) {
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      this.file = file;
      this.imagePreviewUrl = reader.result as string;
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    if (this.active === 'edit' && this.file) {
      const userAccountId = localStorage.getItem('userAccountId');
      if (userAccountId) {
        const formData = new FormData();
        formData.append('profile_Picture', this.file);
        // Send formData to the server
        // Example:
        // this.http.post(`your-api-endpoint/${userAccountId}`, formData).subscribe(response => {
        //   console.log('Profile picture uploaded', response);
        // });
      }
    }
    this.active = this.active === 'edit' ? 'profile' : 'edit';
  }

  editProfile() {
    this.active = 'edit';
  }

  saveChanges() {
    this.active = 'profile';
    this.handleSubmit(new Event('submit')); // Trigger the handleSubmit logic if needed
  }
}
