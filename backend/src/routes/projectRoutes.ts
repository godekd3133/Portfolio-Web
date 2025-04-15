import express from 'express';
import {
  getAllProjects,
  getProjectById,
  getFeaturedProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController';

const router = express.Router();

// 기본 경로: /api/projects

// 모든 프로젝트 조회
router.get('/', getAllProjects);

// 추천 프로젝트 조회
router.get('/featured', getFeaturedProjects);

// 특정 프로젝트 조회
router.get('/:id', getProjectById);

// 프로젝트 생성 (관리자용)
router.post('/', createProject);

// 프로젝트 수정 (관리자용)
router.put('/:id', updateProject);

// 프로젝트 삭제 (관리자용)
router.delete('/:id', deleteProject);

export default router;