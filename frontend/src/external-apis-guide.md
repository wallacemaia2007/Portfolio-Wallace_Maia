# 🌐 GUIA COMPLETO: APIs EXTERNAS PARA PORTFOLIO

## 📋 ÍNDICE
1. [EmailJS](#1-emailjs-envio-de-emails) - ⭐ **RECOMENDADO**
2. [FormSpree](#2-formspree)
3. [Web3Forms](#3-web3forms)
4. [Netlify Forms](#4-netlify-forms)
5. [SendGrid](#5-sendgrid)
6. [Google Analytics](#6-google-analytics)
7. [Comparação](#comparação-de-apis)

---

## 1. EmailJS (Envio de Emails)

### ⭐ **MAIS RECOMENDADO PARA PORTFOLIOS**

**Por quê?**
- ✅ Gratuito (200 emails/mês)
- ✅ Sem backend necessário
- ✅ Configuração super simples
- ✅ Funciona direto do frontend
- ✅ Templates customizáveis
- ✅ Proteção anti-spam

---

### 📦 INSTALAÇÃO

```bash
npm install @emailjs/browser
```

---

### 🔧 CONFIGURAÇÃO PASSO A PASSO

#### **Passo 1: Criar Conta**
1. Acesse: https://www.emailjs.com/
2. Clique em "Sign Up" (Criar Conta)
3. Use Google ou email
4. Confirme email

#### **Passo 2: Adicionar Email Service**
1. No dashboard, clique em "Add New Service"
2. Escolha seu provedor:
   - **Gmail** (mais fácil)
   - Outlook
   - Yahoo
   - Outro
3. Conecte sua conta
4. **Copie o Service ID** (ex: `service_abc123`)

#### **Passo 3: Criar Email Template**
1. Vá em "Email Templates"
2. Clique em "Create New Template"
3. Configure o template:

**Subject (Assunto):**
```
Novo contato via Portfolio - {{subject}}
```

**Content (Corpo do email):**
```
Nome: {{from_name}}
Email: {{from_email}}
Telefone: {{phone}}

Mensagem:
{{message}}

---
Este email foi enviado através do formulário de contato do seu portfolio.
```

4. **Copie o Template ID** (ex: `template_xyz789`)

#### **Passo 4: Obter Public Key**
1. Vá em "Account" → "General"
2. Encontre "Public Key"
3. **Copie a chave** (ex: `your_public_key_here`)

---

### 💻 IMPLEMENTAÇÃO NO CODE

#### **1. Adicionar import no service**

No arquivo `contact.service.ts`:

```typescript
import emailjs from '@emailjs/browser';
import { from } from 'rxjs';
```

#### **2. Descomentar e configurar o método**

```typescript
private sendToEmailJS(contactData: ContactForm): Observable<ContactResponse> {
  // Suas credenciais do EmailJS
  const serviceId = 'service_abc123';      // ← SEU SERVICE ID
  const templateId = 'template_xyz789';    // ← SEU TEMPLATE ID
  const publicKey = 'your_public_key';     // ← SUA PUBLIC KEY

  const templateParams = {
    from_name: contactData.name,
    from_email: contactData.email,
    phone: contactData.phone || '',
    subject: contactData.subject || 'Contato via Portfolio',
    message: contactData.message,
    to_name: 'Seu Nome Aqui',  // ← SEU NOME
  };

  return from(
    emailjs.send(serviceId, templateId, templateParams, publicKey)
  ).pipe(
    map(() => ({
      success: true,
      message: 'Mensagem enviada com sucesso!'
    })),
    catchError(error => {
      console.error('Erro EmailJS:', error);
      return throwError(() => ({
        success: false,
        message: 'Erro ao enviar mensagem. Tente novamente.'
      }));
    })
  );
}
```

#### **3. Alterar o método sendMessage**

```typescript
sendMessage(contactData: ContactForm): Observable<ContactResponse> {
  // Comentar as outras opções e usar EmailJS
  return this.sendToEmailJS(contactData);
}
```

---

### ✅ TESTAR

1. Inicie o projeto: `ng serve`
2. Preencha o formulário de contato
3. Envie
4. Verifique seu email!

---

### 🎨 PERSONALIZAR TEMPLATE

No EmailJS Dashboard → Templates:

**HTML Email Template:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333;">Novo Contato via Portfolio</h2>
  
  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
    <p><strong>Nome:</strong> {{from_name}}</p>
    <p><strong>Email:</strong> {{from_email}}</p>
    <p><strong>Telefone:</strong> {{phone}}</p>
  </div>
  
  <div style="margin-top: 20px;">
    <h3>Mensagem:</h3>
    <p>{{message}}</p>
  </div>
  
  <hr>
  <p style="color: #999; font-size: 12px;">
    Enviado em: {{sent_at}}
  </p>
</div>
```

---

## 2. FormSpree

### 📦 INSTALAÇÃO

**Não precisa instalar pacote!** Só HTTP.

### 🔧 CONFIGURAÇÃO

1. Acesse: https://formspree.io/
2. Crie conta
3. Crie novo form
4. **Copie o Form ID** (ex: `xpzkgobr`)

### 💻 IMPLEMENTAÇÃO

```typescript
private sendToFormSpree(contactData: ContactForm): Observable<ContactResponse> {
  const formId = 'xpzkgobr'; // ← SEU FORM ID
  const url = `https://formspree.io/f/${formId}`;

  return this.http.post<any>(url, {
    name: contactData.name,
    email: contactData.email,
    message: contactData.message,
  }).pipe(
    map(() => ({
      success: true,
      message: 'Mensagem enviada com sucesso!'
    })),
    catchError(error => throwError(() => ({
      success: false,
      message: 'Erro ao enviar mensagem.'
    })))
  );
}
```

**Plano Gratuito:** 50 envios/mês

---

## 3. Web3Forms

### 📦 INSTALAÇÃO

**Não precisa instalar!** Só HTTP.

### 🔧 CONFIGURAÇÃO

1. Acesse: https://web3forms.com/
2. Digite seu email
3. **Copie o Access Key**

### 💻 IMPLEMENTAÇÃO

```typescript
private sendToWeb3Forms(contactData: ContactForm): Observable<ContactResponse> {
  const accessKey = 'YOUR_ACCESS_KEY'; // ← SUA ACCESS KEY
  const url = 'https://api.web3forms.com/submit';

  return this.http.post<any>(url, {
    access_key: accessKey,
    name: contactData.name,
    email: contactData.email,
    message: contactData.message,
  }).pipe(
    map(response => ({
      success: response.success,
      message: response.message
    })),
    catchError(error => throwError(() => ({
      success: false,
      message: 'Erro ao enviar mensagem.'
    })))
  );
}
```

**Plano Gratuito:** 250 envios/mês

---

## 4. Netlify Forms

### ⚠️ **Só funciona se hospedar no Netlify**

### 🔧 CONFIGURAÇÃO

1. Deploy no Netlify
2. Ative "Form Detection"
3. No HTML, adicione atributo `netlify`:

```html
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact">
  <!-- seus campos -->
</form>
```

**Plano Gratuito:** 100 envios/mês

---

## 5. SendGrid (Mais Profissional)

### 📦 INSTALAÇÃO

**Backend necessário!** Não funciona só no frontend.

### 🔧 CONFIGURAÇÃO

**Requer API Node.js:**

```bash
# No backend
npm install @sendgrid/mail
```

```javascript
// backend/server.js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/api/contact', async (req, res) => {
  const msg = {
    to: 'seu@email.com',
    from: 'noreply@seusite.com',
    subject: 'Novo Contato',
    text: req.body.message,
  };
  
  await sgMail.send(msg);
  res.json({ success: true });
});
```

**Plano Gratuito:** 100 emails/dia

---

## 6. Google Analytics

### 📦 INSTALAÇÃO

**Já está no analytics.service.ts!**

### 🔧 CONFIGURAÇÃO

1. Acesse: https://analytics.google.com
2. Crie propriedade GA4
3. **Copie o Measurement ID** (G-XXXXXXXXXX)

### 💻 IMPLEMENTAÇÃO

**Opção 1: No index.html**

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Opção 2: No analytics.service.ts**

Linha 32, altere:
```typescript
const measurementId = 'G-XXXXXXXXXX'; // ← SEU MEASUREMENT ID
```

---

## 📊 COMPARAÇÃO DE APIS

| API | Instalação | Grátis/Mês | Facilidade | Backend? | Melhor Para |
|-----|-----------|------------|------------|----------|-------------|
| **EmailJS** | `npm i @emailjs/browser` | 200 | ⭐⭐⭐⭐⭐ | ❌ | Portfolios |
| **FormSpree** | Nenhuma | 50 | ⭐⭐⭐⭐ | ❌ | Simples |
| **Web3Forms** | Nenhuma | 250 | ⭐⭐⭐⭐⭐ | ❌ | Iniciantes |
| **Netlify** | Nenhuma | 100 | ⭐⭐⭐ | ❌ | Sites Netlify |
| **SendGrid** | Backend | 100/dia | ⭐⭐ | ✅ | Empresas |
| **Analytics** | Nenhuma | Ilimitado | ⭐⭐⭐⭐ | ❌ | Métricas |

---

## 🎯 RECOMENDAÇÃO FINAL

### Para Portfolios Simples:
**Use EmailJS** ou **Web3Forms**
- Fácil configuração
- Sem backend
- Grátis suficiente
- Templates bonitos

### Para Produção/Empresas:
**Use SendGrid** ou **API própria**
- Mais controle
- Mais envios
- Autenticação
- Logs detalhados

---

## 📝 COMANDOS RESUMIDOS

```bash
# EmailJS (RECOMENDADO)
npm install @emailjs/browser

# JSON Server (Dados do portfolio)
npm install --save-dev json-server concurrently

# Analytics Types (opcional)
npm install --save-dev @types/gtag.js
```

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### EmailJS:
1. [ ] Instalar: `npm install @emailjs/browser`
2. [ ] Criar conta no emailjs.com
3. [ ] Configurar Email Service (Gmail)
4. [ ] Criar Email Template
5. [ ] Copiar Service ID, Template ID e Public Key
6. [ ] Adicionar import no service
7. [ ] Descomentar método `sendToEmailJS()`
8. [ ] Configurar credenciais
9. [ ] Alterar método `sendMessage()` para usar EmailJS
10. [ ] Testar!

### Google Analytics:
1. [ ] Criar conta no analytics.google.com
2. [ ] Criar propriedade GA4
3. [ ] Copiar Measurement ID
4. [ ] Adicionar no index.html OU analytics.service.ts
5. [ ] Testar eventos

---

## 🎉 PRONTO!

Agora você tem:
- ✅ Guia completo de todas as APIs
- ✅ Comandos de instalação
- ✅ Configuração passo a passo
- ✅ Código pronto para copiar
- ✅ Comparação para escolher

**Escolha EmailJS e comece em 5 minutos!** 🚀
