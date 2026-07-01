import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-agente',
  templateUrl: './cadastro-agente.page.html',
  styleUrls: ['./cadastro-agente.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class CadastroAgentePage {

  agente = {
    nome: '',
    matricula: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  };

  constructor(private router: Router, private http: HttpClient) { }

  cadastrarAgente() {

  const { nome, matricula, email, senha, confirmarSenha } = this.agente;

    if (!nome || !matricula || !email || !senha || !confirmarSenha) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (senha.includes(' ')) {
      alert('A senha não pode conter espaços! Digite todos os caracteres juntos.');
      return;
    }

    if (senha.length < 6) {
      alert('A senha deve conter no mínimo 6 caracteres.');
      return;
    }

    if (senha !== confirmarSenha) {
      alert('As senhas informadas não coincidem.');
      return;
    }

    this.http.post('http://localhost:3000/auth/cadastro-agente', this.agente).subscribe({
      next: () => {
        alert('Cadastro de Agente realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (erro) => {
        console.error(erro);
        alert('Erro ao cadastrar. Verifique se a matrícula ou e-mail já existem.');
      }
    });
  }
}