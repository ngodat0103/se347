import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.scss']
})
export class ListRequestComponent implements OnInit {
  @Input() listRequestFriends: any[] = [];
  constructor(private modal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  close(event: any): void{
    this.modal.close();
  }
  acceptRequest(user: any): void {
    
  }
  rejectRequest(user: any): void {
    
  }
}
