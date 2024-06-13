import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersListUiComponent } from './users-list-ui.component';

describe('UsersListUiComponent', () => {
  let component: UsersListUiComponent;
  let fixture: ComponentFixture<UsersListUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersListUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersListUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
