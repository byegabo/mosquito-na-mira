import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultarDenunciaPage } from './consultar-denuncia.page';

describe('ConsultarDenunciaPage', () => {
  let component: ConsultarDenunciaPage;
  let fixture: ComponentFixture<ConsultarDenunciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarDenunciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
