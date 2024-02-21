import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.css']
})
export class TargetComponent {

constructor(private authService: AuthService) {}

}
