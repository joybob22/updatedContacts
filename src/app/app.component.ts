import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mainActiveBool = false;
  createActiveBool = false;
  activeClick = 0;


  mainActive(): void {
    if(this.activeClick === 0) {
      this.mainActiveBool = !this.mainActiveBool;
      this.activeClick++;
    } else {
      if(!this.mainActiveBool) {
        this.mainActiveBool = !this.mainActiveBool;
        this.createActiveBool = !this.createActiveBool;
      }
    }

  }

  createActive(): void {
    if(this.activeClick === 0) {
      this.createActiveBool = !this.createActiveBool;
      this.activeClick++;
    } else {
      if(!this.createActiveBool) {
        this.mainActiveBool = !this.mainActiveBool;
        this.createActiveBool = !this.createActiveBool;
      }
    }

  }
}
