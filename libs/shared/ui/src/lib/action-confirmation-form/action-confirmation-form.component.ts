import {
  Component,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-action-confirmation-form',
  templateUrl: './action-confirmation-form.component.html',
  styleUrl: './action-confirmation-form.component.scss',
})
export class ActionConfirmationFormComponent {
  @Input() btnState$!: Observable<ClrLoadingState>;
  @Output() proceed = new EventEmitter();
  @Output() closeModal = new EventEmitter();
  public opened = true;
}
