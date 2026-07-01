import { Controller, Post, Body, Get } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Controller('chatbot')
export class AppController {

  @Post('analisar')
  async analisarSintomas(@Body() body: { mensagem: string }) {
    try {
      const apiKey = "KEY_GEMINI";
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const instrucoes = `Você é o assistente virtual do aplicativo "Mosquito na Mira", focado no combade à Dengue.
      Um usuário acabou de relatar o seguinte: "${body.mensagem}".
      Responda de forma curta, empática e direta. Se os sintomas baterem com Dengue, oriente o usuário a procurar um posto de saúde imediatamente. Se não tiver certeza, sugira que ele monitore os sintomas e procure ajuda médica se piorarem. Proíba remédios como AAS/Ibuprofeno, você é um assistente de triagem, não de diagnósticos.`;

      const result = await model.generateContent(instrucoes);
      const respostaBot = result.response.text();
      return { resposta: respostaBot };

    } catch (error) {
      console.error('Erro ao analisar sintomas:', error);
      return { resposta: 'Desculpe, ocorreu um erro ao analisar seus sintomas. Por favor, tente novamente mais tarde ou entre em contato com um profissional de saúde.' };
    }
  }
}
