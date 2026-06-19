import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostosSaudePage } from './postos-saude.page';

describe('PostosSaudePage', () => {
  let component: PostosSaudePage;
  let fixture: ComponentFixture<PostosSaudePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PostosSaudePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
