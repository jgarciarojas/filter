import { Component, OnInit } from '@angular/core';
import { PostHttpService, IPersonDto } from '../../api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  post: Array<IPersonDto>;
  constructor(private personService: PostHttpService) { }

  ngOnInit() {

  }

}
