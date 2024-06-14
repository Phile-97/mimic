import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { PostsEntity } from '@mimic/posts/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-post-form',
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss',
})
export class PostFormComponent implements OnInit{
  @Input() post: PostsEntity | undefined;
  @Input() btnState$!: Observable<ClrLoadingState>;
  @Input() title!: string;
  @Output() formValue = new EventEmitter();

  constructor(private fb: FormBuilder) {}
  
  ngOnInit(): void {
    if(this.post != undefined){
      this.postForm.get('id')?.patchValue(this.post.id.toString());
      this.postForm.get('title')?.patchValue(this.post.title);
      this.postForm.get('content')?.patchValue(this.post.content);
      this.postForm.get('published')?.patchValue(this.post.published);
    }
  }

  postForm = this.fb.group({
    id: [''],
    title: ['', Validators.required],
    content: ['', Validators.required],
    published: [true, Validators.required],
  });

  submit(){
    this.formValue.emit(this.postForm.value);
  }
}
