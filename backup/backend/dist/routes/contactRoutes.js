"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactController_1 = require("../controllers/contactController");
const router = express_1.default.Router();
// 기본 경로: /api/contact
// 연락 메시지 전송
router.post('/', contactController_1.sendContactMessage);
// 모든 메시지 조회 (관리자용)
router.get('/', contactController_1.getAllMessages);
// 메시지 읽음 표시 (관리자용)
router.put('/:id', contactController_1.markMessageAsRead);
// 메시지 삭제 (관리자용)
router.delete('/:id', contactController_1.deleteMessage);
exports.default = router;
