import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.scss']
})
export class LoadingButtonComponent implements OnInit {

  @Input() button_text!: string;
  @Input() load_button_text!: string;
  @Input() width!: string;


  @Input() isLoading!: boolean;
  
  constructor() { }

  ngOnInit(): void {
    if (this.width == null) {
      this.width = "auto";
    }
  }

}
