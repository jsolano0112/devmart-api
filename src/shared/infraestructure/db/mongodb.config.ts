import mongoose from 'mongoose';
const DB_PASSWORD = 'uXJ1DgIM24DxrloM'
const DB_USERNAME = 'devmart-api'
const MONGOATLAS_URL: string = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.bbdjdbp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const DB_NAME: string = '';

export const dbConnection = async () => {
  try {
    await mongoose.connect(`${MONGOATLAS_URL}/${DB_NAME}`);
    console.log('[DB-STATUS] MongoDB is online');
  } catch (error) {
    console.error(error);
    throw new Error('[DB-ERROR] it is not possible to connect');
  }
};
