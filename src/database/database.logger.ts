import { Logger, QueryRunner } from "typeorm";
import * as fs from "fs";
import * as path from "path";

export class CustomFileLogger implements Logger {
  private logFilePath: string;

  constructor(logPath: string) {
    // Construct the full log file path based on the input logPath and ensure the directory exists
    this.logFilePath = path.join(logPath, "typeorm.log");

    // Ensure the directory exists
    const dir = path.dirname(this.logFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this.writeLog(`[QUERY]: ${query}`);
  }

  logQueryError(
    error: string,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner
  ) {
    this.writeLog(`[QUERY ERROR]: ${error}`);
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner
  ) {
    this.writeLog(`[SLOW QUERY]: ${query} (${time}ms)`);
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    this.writeLog(`[SCHEMA BUILD]: ${message}`);
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    this.writeLog(`[MIGRATION]: ${message}`);
  }

  log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner) {
    this.writeLog(`[${level.toUpperCase()}]: ${message}`);
  }

  private writeLog(message: string) {
    fs.appendFileSync(
      this.logFilePath,
      `${new Date().toISOString()} - ${message}\n`
    );
  }
}
