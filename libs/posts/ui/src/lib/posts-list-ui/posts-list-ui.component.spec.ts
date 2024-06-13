import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsListUiComponent } from './posts-list-ui.component';

describe('PostsListUiComponent', () => {
  let component: PostsListUiComponent;
  let fixture: ComponentFixture<PostsListUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsListUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsListUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
