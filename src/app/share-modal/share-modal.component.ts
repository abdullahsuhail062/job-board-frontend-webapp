
import { Component, EventEmitter, Input, Output} from '@angular/core';
EventEmitter

@Component({
  selector: 'app-share-modal',
  imports: [],
  templateUrl: './share-modal.component.html',
  styleUrl: './share-modal.component.css'
})
export class ShareModalComponent {

@Input() visible = false;
@Output() closed = new EventEmitter<any>();
  close() {
     this.visible = false;
     this.closed.emit()
  }


  appUrl: string = encodeURIComponent(window.location.href);
  message: string = encodeURIComponent('Check out this awesome app!');

  get twitterUrl() {
    return `https://twitter.com/intent/tweet?text=${this.message}&url=${this.appUrl}`;
  }

  get facebookUrl() {
    return `https://www.facebook.com/sharer/sharer.php?u=${this.appUrl}`;
  }

  get whatsappUrl() {
    return `https://wa.me/?text=${this.message}%20${this.appUrl}`;
  }

  get linkedinUrl() {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${this.appUrl}`;
  }

  
}
