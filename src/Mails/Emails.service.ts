/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'carlosasalas321@gmail.com',
      pass: 'vfjx jpvf emfx doqs',
    },
  });

  async sendMail(to: string, name: string, code: string) {
    const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: green;">Hola, ${name} 🌱</h2>
      <p>Recibimos una solicitud para recuperar tu contraseña en <strong>EcoTransforma</strong>.</p>
      <p>Este es tu código de recuperación:</p>
      <h1 style="background: #e0ffe0; padding: 10px; display: inline-block;">${code}</h1>
      <p>Si no solicitaste este cambio, puedes ignorar este mensaje.</p>
      <br>
      <p style="font-size: 12px; color: #888;">EcoTransforma - Educación ambiental y reciclaje</p>
    </div>
  `;

    await this.transporter.sendMail({
      from: '"EcoTransforma 🌿" <carlosasalas321@gmail.com>',
      to,
      subject: '🔐 Tu código de recuperación - EcoTransforma',
      html: htmlContent,
    });
  }
}
