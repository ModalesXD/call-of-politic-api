import { InternalServerErrorException } from '@nestjs/common';
const fs = require('fs');
const path = require('path');

export class BackupManager {
  private readonly backupDir: string;

  constructor(backupDir?: string) {
    this.backupDir = backupDir || path.join(process.cwd(), 'backups');
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }
  }

  /**
   * Realiza un respaldo de todos los datos.
   * @param data Datos a respaldar.
   */
  async backupAll(data: any) {
    try {
      const backupId = new Date().toISOString().replace(/[:.]/g, '-');
      const backupPath = path.join(this.backupDir, `${backupId}.json`);
      fs.writeFileSync(backupPath, JSON.stringify(data));
      return backupId;
    } catch (error) {
      throw new InternalServerErrorException(`Error al realizar el respaldo: ${error.message}`);
    }
  }

  /**
   * Realiza un respaldo específico.
   * @param model Modelo a respaldar.
   * @param data Datos a respaldar.
   */
  async backup(model: string, data: any) {
    try {
      const backupId = new Date().toISOString().replace(/[:.]/g, '-');
      const backupPath = path.join(this.backupDir, `${model}-${backupId}.json`);
      fs.writeFileSync(backupPath, JSON.stringify(data));
      return backupId;
    } catch (error) {
      throw new InternalServerErrorException(`Error al realizar el respaldo de ${model}: ${error.message}`);
    }
  }

  /**
   * Restaura un respaldo específico.
   * @param backupId ID del respaldo a restaurar.
   */
  async restoreBackup(backupId: string) {
    try {
      const backupPath = path.join(this.backupDir, `${backupId}.json`);
      if (!fs.existsSync(backupPath)) {
        throw new Error(`No se encontró el respaldo ${backupId}`);
      }
      const data = fs.readFileSync(backupPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      throw new InternalServerErrorException(`Error al restaurar el respaldo ${backupId}: ${error.message}`);
    }
  }
}
