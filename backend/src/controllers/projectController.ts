import { Request, Response } from 'express';
import Project, { IProject } from '../models/projectModel';

// 모든 프로젝트 조회
export const getAllProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects: IProject[] = await Project.find().sort({ order: 1, createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: '서버 오류로 프로젝트를 불러올 수 없습니다.',
    });
  }
};

// 특정 프로젝트 조회
export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const project: IProject | null = await Project.findById(req.params.id);
    
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
  } catch (error) {
    res.status(500).json({
      success: false,
      error: '서버 오류로 프로젝트를 불러올 수 없습니다.',
    });
  }
};

// 추천 프로젝트 조회
export const getFeaturedProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects: IProject[] = await Project.find({ featured: true }).sort({ order: 1 });
    
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: '서버 오류로 추천 프로젝트를 불러올 수 없습니다.',
    });
  }
};

// 프로젝트 생성 (관리자용)
export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project: IProject = await Project.create(req.body);
    
    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val: any) => val.message);
      
      res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      res.status(500).json({
        success: false,
        error: '서버 오류로 프로젝트를 생성할 수 없습니다.',
      });
    }
  }
};

// 프로젝트 수정 (관리자용)
export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project: IProject | null = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
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
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val: any) => val.message);
      
      res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      res.status(500).json({
        success: false,
        error: '서버 오류로 프로젝트를 수정할 수 없습니다.',
      });
    }
  }
};

// 프로젝트 삭제 (관리자용)
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
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
  } catch (error) {
    res.status(500).json({
      success: false,
      error: '서버 오류로 프로젝트를 삭제할 수 없습니다.',
    });
  }
};