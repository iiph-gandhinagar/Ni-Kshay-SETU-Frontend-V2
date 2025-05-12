/**
 * Utility module providing modern interface to SQLite client.
 * @module src/util/SQLiteClient
 */
import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';

type Migration = (db: SQLiteDatabase) => Promise<void>;

SQLite.enablePromise(true);

/** Database downgrade error */
export class DowngradeError extends Error {
  constructor() {
    super('Database version is higher than the current migration version.');
    this.name = 'DowngradeError';
  }
}

/** Interface to SQLiteClient */
export default class SQLiteClient {
  private privateConnected = false;

  private name: string;

  private migrations: Migration[];

  private privateDb: SQLiteDatabase | null = null;

  private debug: boolean;

  constructor(name: string, migrations: Migration[], debug = false) {
    this.name = name;
    this.migrations = migrations;
    this.debug = debug;
    if (this.debug) {
      SQLite.DEBUG(true);
    }
  }

  public get connected(): boolean {
    return this.privateConnected;
  }

  public get dB(): SQLiteDatabase | null {
    return this.privateDb;
  }

  /** Connects to the SQLite database and runs migrations if needed */
  public async connect(): Promise<SQLiteDatabase> {
    if (this.privateConnected) {
      console.warn('SQLiteClient is already connected.');
      return this.privateDb!;
    }
    try {
      this.privateDb = await SQLite.openDatabase({
        name: this.name,
        location: 'default',
      });
      if (this.debug) {
        console.log(`Connected to database: ${this.name}`);
      }

      // Run migrations after connection
      await this.runMigrations();
      this.privateConnected = true;
      return this.privateDb!;
    } catch (error) {
      console.error(
        `SQLiteClient: failed to connect to database: ${this.name}`,
        error,
      );
      throw new Error(`SQLiteClient: connection error - ${error.message}`);
    }
  }

  /** Run database migrations */
  private async runMigrations(): Promise<void> {
    if (!this.privateDb) {
      throw new Error(
        'Database instance not found. Ensure the database is connected.',
      );
    }

    try {
      console.log('Checking database version for migrations...');
      const resultSet = await this.privateDb.executeSql('PRAGMA user_version');
      const currentVersion: number = resultSet[0].rows.item(0).user_version;
      const targetVersion = this.migrations.length;

      console.log(
        `Current DB version: ${currentVersion}, Target version: ${targetVersion}`,
      );

      if (currentVersion > targetVersion) {
        throw new DowngradeError();
      }

      for (let i = currentVersion; i < targetVersion; i++) {
        console.log(`Running migration for version ${i + 1}`);
        const migration = this.migrations[i];
        await migration(this.privateDb);
      }

      if (currentVersion !== targetVersion) {
        console.log(`Updating user_version to ${targetVersion}`);
        await this.privateDb.executeSql(
          `PRAGMA user_version = ${targetVersion}`,
        );
        console.log(`Updated PRAGMA user_version to ${targetVersion}`);
      }

      this.privateConnected = true;
    } catch (error) {
      console.error('Error running migrations:', error);
      throw new Error(
        `SQLiteClient: failed to run migrations for database: ${this.name}`,
      );
    }
  }
}
