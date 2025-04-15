import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';

// 환경 변수 설정
dotenv.config();

// 라우터 임포트
import projectRouter from './routes/projectRoutes';
import contactRouter from './routes/contactRoutes';
import { connectDB } from './config/db';

// Express 앱 생성
const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '5000', 10);

// 미들웨어 설정
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 정적 파일 제공 (프론트엔드)
app.use(express.static(path.join(__dirname, '../../')));

// API 라우트
app.use('/api/projects', projectRouter);
app.use('/api/contact', contactRouter);

// 기본 라우트
app.get('/api', (req: Request, res: Response) => {
  res.json({ message: '게임 개발자 포트폴리오 API가 정상 작동 중입니다.' });
});

// 모든 요청을 프론트엔드 앱으로 전달 (SPA 지원)
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../index.html'));
});

// 서버 시작
const startServer = async (): Promise<void> => {
  try {
    // MongoDB 연결 (활성화하려면 주석 해제)
    // await connectDB();
    
    app.listen(PORT, () => {
      console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
    });
  } catch (error) {
    console.error('서버 시작 실패:', error);
    process.exit(1);
  }
};

startServer();