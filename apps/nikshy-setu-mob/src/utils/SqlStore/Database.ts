/**
 * Utility module providing initialized global variables.
 * @module src/util/global
 */
import { SQLiteDatabase } from 'react-native-sqlite-storage';
import SQLiteClient from './SQLiteClient';

const DB_NAME = 'tbApp.db';
const DB_DEBUG = false;
const DB_MIGRATIONS = [
  async (dB: SQLiteDatabase): Promise<void> => {
    console.log('========== Performing DB Migration =========='); // More descriptive
    try {
      await dB.transaction((txn) => {
        txn.executeSql(`
         CREATE TABLE IF NOT EXISTS app_time(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          module TEXT,
          activity_type TEXT,
          sub_module_id NUMBER,
          time NUMBER
          )`);
      });
      console.log('Migration for `app_time` table completed');
    } catch (error) {
      console.error('Unexpected error during migration:', error);
    }
  },
];

/** Application's SQLite client */
export const sqLiteClient = new SQLiteClient(DB_NAME, DB_MIGRATIONS, DB_DEBUG);
/** Application initialization. */
export const initialize = async (): Promise<void> => {
  try {
    await sqLiteClient.connect();
    if (DB_DEBUG) console.log('SQLite client connected successfully');
  } catch (error) {
    console.error('Error initializing SQLite client:', error);
  }
};

/** Get DB Instance with error handling and debugging */
export const dBInstance = (): SQLiteDatabase | null => {
  if (sqLiteClient.dB) {
    if (DB_DEBUG) console.log('Returning existing DB instance');
    return sqLiteClient.dB;
  } else {
    console.error(
      'No DB instance available. Ensure `initialize()` has been called and the connection is established.',
    );
    return null;
  }
};
