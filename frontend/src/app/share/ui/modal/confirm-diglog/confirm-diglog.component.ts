import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-diglog',
  templateUrl: './confirm-diglog.component.html',
  styleUrls: ['./confirm-diglog.component.scss']
})
export class ConfirmDiglogComponent implements OnInit {
  @Input()
  title = 'Delete';
  @Input()
  message = '';

  constructor(public modal: NgbActiveModal) {}
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  cancel() {
    this.modal.close(false);
  }

  approve() {
    this.modal.close(true);
  }

}
