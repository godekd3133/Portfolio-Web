import mongoose, { Document, Schema } from 'mongoose';

// 프로젝트 인터페이스 정의
export interface IProject extends Document {
  title: string;
  description: string;
  imageUrl: string;
  gameUrl?: string;
  sourceCodeUrl?: string;
  tags: string[];
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// 프로젝트 스키마 정의
const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, '프로젝트 제목은 필수입니다.'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, '프로젝트 설명은 필수입니다.'],
    },
    imageUrl: {
      type: String,
      required: [true, '프로젝트 이미지는 필수입니다.'],
    },
    gameUrl: {
      type: String,
    },
    sourceCodeUrl: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// 모델 생성 및 내보내기
const Project = mongoose.model<IProject>('Project', projectSchema);

export default Project;