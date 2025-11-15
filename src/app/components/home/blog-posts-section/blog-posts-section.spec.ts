import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostsSection } from './blog-posts-section';

describe('BlogPostsSection', () => {
  let component: BlogPostsSection;
  let fixture: ComponentFixture<BlogPostsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostsSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogPostsSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
