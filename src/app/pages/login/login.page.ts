import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { shieldCheckmarkOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class LoginPage {

  tipoUsuario: 'cidadao' | 'agente' = 'cidadao';

  credenciais = {
    email: '',
    senha: ''
  };

  constructor(private router: Router, private http: HttpClient) {
    addIcons({ shieldCheckmarkOutline });
  }

  realizarLogin() {
    if (!this.credenciais.email || !this.credenciais.senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const dadosLogin = {
      email: this.credenciais.email,
      senha: this.credenciais.senha,
      tipo: this.tipoUsuario
    };

    this.http.post('http://localhost:3000/auth/login', dadosLogin).subscribe({
      next: (resposta: any) => {

        if (this.tipoUsuario === 'agente') {
          localStorage.setItem('agenteLogado', 'sim');
        } else {
          localStorage.removeItem('agenteLogado');
        }
        
        this.router.navigate(['/home']);
      },
      error: (erro) => {
        console.error('Falha no login:', erro);
        alert('Acesso negado. E-mail/CPF ou senha incorretos.');
      }
    });
  }

  esqueceuSenha() {
    alert(`Função de recuperação enviada para o e-mail do ${this.tipoUsuario}.`);
  }

  irParaCadastro() {
    if (this.tipoUsuario === 'agente') {
      this.router.navigate(['/cadastro-agente']);
    } else {
      this.router.navigate(['/cadastro-cidadao']);
    }
  }
}