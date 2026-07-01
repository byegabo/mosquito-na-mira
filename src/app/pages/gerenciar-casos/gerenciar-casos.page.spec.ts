import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GerenciarCasosPage } from './gerenciar-casos.page';

describe('GerenciarCasosPage', () => {
  let component: GerenciarCasosPage;
  let fixture: ComponentFixture<GerenciarCasosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciarCasosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
