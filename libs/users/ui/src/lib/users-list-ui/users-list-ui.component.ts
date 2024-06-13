import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { UsersEntity } from '@mimic/users/data-access';


@Component({
  selector: 'lib-users-list-ui',
  templateUrl: './users-list-ui.component.html',
  styleUrl: './users-list-ui.component.scss',
})
export class UsersListUiComponent {
  @Input() usersList!: UsersEntity[] | null;
  @Input() loading!: boolean | null;
  @Input() placeholderMessage!: string;
  @Output() updatedState = new EventEmitter<ClrDatagridStateInterface>();
}
