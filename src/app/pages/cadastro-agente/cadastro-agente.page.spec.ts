import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroAgentePage } from './cadastro-agente.page';

describe('CadastroAgentePage', () => {
  let component: CadastroAgentePage;
  let fixture: ComponentFixture<CadastroAgentePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroAgentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
