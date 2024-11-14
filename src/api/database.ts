import { EsperoDB } from 'esperodb';

const dataStructure :any = [
  {
    tableName: 'video',
    primaryKey: '_id',
    indexes: [
      { name: 'category', unique: false }
    ]
  }
];

const dbVersion = 7;

// Initialize the database instance
export const db = new EsperoDB('ouitube', dataStructure, dbVersion);

console.log('Database initialized with structure:', dataStructure);
