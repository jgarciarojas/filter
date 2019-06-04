import { Component, OnInit } from '@angular/core';
import { PostService } from '../../api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  post: any;
  constructor(private personService: PostService) { }

  ngOnInit() {
    this.personService.getPost().subscribe(data => {
      this.post = data['body'];
    });
  }

  get xyz(): string { return JSON.stringify(this.post); }

}
