const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "할일 내용은 필수입니다."],
      trim: true,
      minlength: [1, "할일 내용은 1자 이상이어야 합니다."],
      maxlength: [200, "할일 내용은 200자를 넘을 수 없습니다."]
    },
    isCompleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Todo", todoSchema);
