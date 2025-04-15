import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB 연결 URI (환경 변수에서 가져옴)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/game-portfolio';

// MongoDB 연결 함수
export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB 연결 성공: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB 연결 실패: ${error}`);
    process.exit(1);
  }
};