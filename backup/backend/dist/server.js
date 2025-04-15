"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// 환경 변수 설정
dotenv_1.default.config();
// 라우터 임포트
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const contactRoutes_1 = __importDefault(require("./routes/contactRoutes"));
// Express 앱 생성
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || '5000', 10);
// 미들웨어 설정
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// 정적 파일 제공 (프론트엔드)
app.use(express_1.default.static(path_1.default.join(__dirname, '../../')));
// API 라우트
app.use('/api/projects', projectRoutes_1.default);
app.use('/api/contact', contactRoutes_1.default);
// 기본 라우트
app.get('/api', (req, res) => {
    res.json({ message: '게임 개발자 포트폴리오 API가 정상 작동 중입니다.' });
});
// 모든 요청을 프론트엔드 앱으로 전달 (SPA 지원)
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../index.html'));
});
// 서버 시작
const startServer = async () => {
    try {
        // MongoDB 연결 (활성화하려면 주석 해제)
        // await connectDB();
        app.listen(PORT, () => {
            console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
        });
    }
    catch (error) {
        console.error('서버 시작 실패:', error);
        process.exit(1);
    }
};
startServer();
