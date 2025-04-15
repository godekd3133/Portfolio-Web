"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.createProject = exports.getFeaturedProjects = exports.getProjectById = exports.getAllProjects = void 0;
const projectModel_1 = __importDefault(require("../models/projectModel"));
// 모든 프로젝트 조회
const getAllProjects = async (req, res) => {
    try {
        const projects = await projectModel_1.default.find().sort({ order: 1, createdAt: -1 });
        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: '서버 오류로 프로젝트를 불러올 수 없습니다.',
        });
    }
};
exports.getAllProjects = getAllProjects;
// 특정 프로젝트 조회
const getProjectById = async (req, res) => {
    try {
        const project = await projectModel_1.default.findById(req.params.id);
        if (!project) {
            res.status(404).json({
                success: false,
                error: '해당 ID의 프로젝트를 찾을 수 없습니다.',
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: project,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: '서버 오류로 프로젝트를 불러올 수 없습니다.',
        });
    }
};
exports.getProjectById = getProjectById;
// 추천 프로젝트 조회
const getFeaturedProjects = async (req, res) => {
    try {
        const projects = await projectModel_1.default.find({ featured: true }).sort({ order: 1 });
        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: '서버 오류로 추천 프로젝트를 불러올 수 없습니다.',
        });
    }
};
exports.getFeaturedProjects = getFeaturedProjects;
// 프로젝트 생성 (관리자용)
const createProject = async (req, res) => {
    try {
        const project = await projectModel_1.default.create(req.body);
        res.status(201).json({
            success: true,
            data: project,
        });
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((val) => val.message);
            res.status(400).json({
                success: false,
                error: messages,
            });
        }
        else {
            res.status(500).json({
                success: false,
                error: '서버 오류로 프로젝트를 생성할 수 없습니다.',
            });
        }
    }
};
exports.createProject = createProject;
// 프로젝트 수정 (관리자용)
const updateProject = async (req, res) => {
    try {
        const project = await projectModel_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!project) {
            res.status(404).json({
                success: false,
                error: '해당 ID의 프로젝트를 찾을 수 없습니다.',
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: project,
        });
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((val) => val.message);
            res.status(400).json({
                success: false,
                error: messages,
            });
        }
        else {
            res.status(500).json({
                success: false,
                error: '서버 오류로 프로젝트를 수정할 수 없습니다.',
            });
        }
    }
};
exports.updateProject = updateProject;
// 프로젝트 삭제 (관리자용)
const deleteProject = async (req, res) => {
    try {
        const project = await projectModel_1.default.findByIdAndDelete(req.params.id);
        if (!project) {
            res.status(404).json({
                success: false,
                error: '해당 ID의 프로젝트를 찾을 수 없습니다.',
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
            error: '서버 오류로 프로젝트를 삭제할 수 없습니다.',
        });
    }
};
exports.deleteProject = deleteProject;
