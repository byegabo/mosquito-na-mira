import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-cidadao',
  templateUrl: './cadastro-cidadao.page.html',
  styleUrls: ['./cadastro-cidadao.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class CadastroCidadaoPage {

  cidadao = {
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  };

  constructor(private router: Router, private http: HttpClient) { }

  cadastrarCidadao() {
    const { nome, cpf, email, senha, confirmarSenha } = this.cidadao;

    if (!nome || !cpf || !email || !senha || !confirmarSenha) {
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

    this.http.post('http://localhost:3000/auth/cadastro-cidadao', this.cidadao).subscribe({
      next: () => {
        alert('Sua conta foi criada com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (erro) => {
        console.error(erro);
        alert('Erro ao criar conta. O CPF ou e-mail já estão em uso.');
      }
    });
  }
}