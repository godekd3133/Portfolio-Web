"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.markMessageAsRead = exports.getAllMessages = exports.sendContactMessage = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const messageModel_1 = __importDefault(require("../models/messageModel"));
// 이메일 전송 설정
const transporter = nodemailer_1.default.createTransport({
    // 실제 구현 시 환경 변수를 통해 설정
    // smtp 정보를 필요로 함
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
// 연락 메시지 전송
const sendContactMessage = async (req, res) => {
    const { name, email, subject, message } = req.body;
    // 필수 필드 확인
    if (!name || !email || !subject || !message) {
        res.status(400).json({
            success: false,
            error: '모든 필드를 입력해주세요.',
        });
        return;
    }
    try {
        // 메시지 데이터베이스에 저장
        const newMessage = await messageModel_1.default.create({
            name,
            email,
            subject,
            message,
        });
        // 이메일 설정
        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER, // 포트폴리오 소유자 이메일
            subject: `포트폴리오 문의: ${subject}`,
            html: `
        <h3>포트폴리오 웹사이트 문의</h3>
        <p><strong>이름:</strong> ${name}</p>
        <p><strong>이메일:</strong> ${email}</p>
        <p><strong>제목:</strong> ${subject}</p>
        <p><strong>메시지:</strong></p>
        <p>${message}</p>
      `,
        };
        // 이메일 전송 (실제 구현 시 활성화)
        // await transporter.sendMail(mailOptions);
        res.status(200).json({
            success: true,
            data: newMessage,
            message: '메시지가 성공적으로 전송되었습니다.',
        });
    }
    catch (error) {
        console.error('메시지 전송 오류:', error);
        res.status(500).json({
            success: false,
            error: '서버 오류로 메시지를 전송할 수 없습니다.',
        });
    }
};
exports.sendContactMessage = sendContactMessage;
// 모든 메시지 조회 (관리자용)
const getAllMessages = async (req, res) => {
    try {
        const messages = await messageModel_1.default.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: messages.length,
            data: messages,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: '서버 오류로 메시지를 불러올 수 없습니다.',
        });
    }
};
exports.getAllMessages = getAllMessages;
// 메시지 읽음 표시 (관리자용)
const markMessageAsRead = async (req, res) => {
    try {
        const message = await messageModel_1.default.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
        if (!message) {
            res.status(404).json({
                success: false,
                error: '해당 ID의 메시지를 찾을 수 없습니다.',
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: message,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: '서버 오류로 메시지를 업데이트할 수 없습니다.',
        });
    }
};
exports.markMessageAsRead = markMessageAsRead;
// 메시지 삭제 (관리자용)
const deleteMessage = async (req, res) => {
    try {
        const message = await messageModel_1.default.findByIdAndDelete(req.params.id);
        if (!message) {
            res.status(404).json({
                success: false,
                error: '해당 ID의 메시지를 찾을 수 없습니다.',
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: {},
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: '서버 오류로 메시지를 삭제할 수 없습니다.',
        });
    }
};
exports.deleteMessage = deleteMessage;
