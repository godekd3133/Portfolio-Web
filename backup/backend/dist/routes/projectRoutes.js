"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../controllers/projectController");
const router = express_1.default.Router();
// 기본 경로: /api/projects
// 모든 프로젝트 조회
router.get('/', projectController_1.getAllProjects);
// 추천 프로젝트 조회
router.get('/featured', projectController_1.getFeaturedProjects);
// 특정 프로젝트 조회
router.get('/:id', projectController_1.getProjectById);
// 프로젝트 생성 (관리자용)
router.post('/', projectController_1.createProject);
// 프로젝트 수정 (관리자용)
router.put('/:id', projectController_1.updateProject);
// 프로젝트 삭제 (관리자용)
router.delete('/:id', projectController_1.deleteProject);
exports.default = router;
