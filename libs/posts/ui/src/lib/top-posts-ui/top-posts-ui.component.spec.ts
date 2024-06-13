import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopPostsUiComponent } from './top-posts-ui.component';

describe('TopPostsUiComponent', () => {
  let component: TopPostsUiComponent;
  let fixture: ComponentFixture<TopPostsUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopPostsUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopPostsUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
