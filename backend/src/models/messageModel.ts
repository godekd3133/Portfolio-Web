import mongoose, { Document, Schema } from 'mongoose';

// 메시지 인터페이스 정의
export interface IMessage extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 메시지 스키마 정의
const messageSchema = new Schema<IMessage>(
  {
    name: {
      type: String,
      required: [true, '이름은 필수입니다.'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, '이메일은 필수입니다.'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, '유효한 이메일 형식이 아닙니다.'],
    },
    subject: {
      type: String,
      required: [true, '제목은 필수입니다.'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, '메시지 내용은 필수입니다.'],
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// 모델 생성 및 내보내기
const Message = mongoose.model<IMessage>('Message', messageSchema);

export default Message;