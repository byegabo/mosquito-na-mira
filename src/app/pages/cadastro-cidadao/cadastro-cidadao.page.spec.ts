import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroCidadaoPage } from './cadastro-cidadao.page';

describe('CadastroCidadaoPage', () => {
  let component: CadastroCidadaoPage;
  let fixture: ComponentFixture<CadastroCidadaoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroCidadaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
