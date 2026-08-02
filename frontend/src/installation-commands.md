# 🚀 COMANDOS RÁPIDOS - INSTALAÇÃO DE TODAS AS DEPENDÊNCIAS

## 📦 INSTALAR TUDO DE UMA VEZ

```bash
# Copie e cole tudo de uma vez no terminal:

npm install --save-dev json-server concurrently && \
npm install @emailjs/browser && \
npm install --save-dev @types/gtag.js
```

---

## 📦 OU INSTALAR SEPARADAMENTE

### 1. JSON Server (API de dados)
```bash
npm install --save-dev json-server concurrently
```

### 2. EmailJS (Envio de emails) - RECOMENDADO
```bash
npm install @emailjs/browser
```

### 3. Google Analytics Types (opcional)
```bash
npm install --save-dev @types/gtag.js
```

---

## 🎯 O QUE CADA UM FAZ

### json-server
- Cria API REST fake a partir do db.json
- Usado para: dados de projetos, skills, experiências

### concurrently
- Roda Angular + JSON Server ao mesmo tempo
- Usado para: `npm run dev`

### @emailjs/browser
- Envia emails direto do frontend
- Usado para: formulário de contato

### @types/gtag.js
- Types do TypeScript para Google Analytics
- Usado para: evitar erros de type no analytics

---

## ✅ APÓS INSTALAR

### 1. Verificar package.json
Adicione estes scripts se ainda não tiver:

```json
{
  "scripts": {
    "start": "ng serve",
    "api": "json-server --watch db.json --port 1000",
    "dev": "concurrently \"npm run start\" \"npm run api\""
  }
}
```

### 2. Rodar tudo
```bash
npm run dev
```

**Resultado:**
- Angular rodando em: http://localhost:4200
- API rodando em: http://localhost:3000

---

## 🔧 CONFIGURAR EMAILJS

Depois de instalar, configure:

1. Criar conta em: https://www.emailjs.com
2. Configurar Email Service
3. Criar Template
4. Copiar credenciais (Service ID, Template ID, Public Key)
5. Adicionar no `contact.service.ts`

**Veja o guia completo em: external-apis-guide.md**

---

## 🎉 PRONTO!

Todas as dependências instaladas:
✅ JSON Server
✅ Concurrently
✅ EmailJS
✅ Analytics Types

Agora é só configurar e usar! 🚀
