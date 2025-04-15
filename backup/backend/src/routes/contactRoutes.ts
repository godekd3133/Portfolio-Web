import express from 'express';
import {
  sendContactMessage,
  getAllMessages,
  markMessageAsRead,
  deleteMessage,
} from '../controllers/contactController';

const router = express.Router();

// 기본 경로: /api/contact

// 연락 메시지 전송
router.post('/', sendContactMessage);

// 모든 메시지 조회 (관리자용)
router.get('/', getAllMessages);

// 메시지 읽음 표시 (관리자용)
router.put('/:id', markMessageAsRead);

// 메시지 삭제 (관리자용)
router.delete('/:id', deleteMessage);

export default router;