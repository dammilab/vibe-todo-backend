const express = require("express");
const Todo = require("../models/Todo");

const router = express.Router();

// 할일 생성 라우터: 새로운 할일을 저장합니다.
router.post("/todos", async (req, res) => {
  try {
    const { content } = req.body;
    const todo = await Todo.create({ content });

    res.status(201).json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// 할일 목록 조회 라우터: 전체 할일을 최신순으로 조회합니다.
router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 할일 단건 조회 라우터: ID로 특정 할일 1개를 조회합니다.
router.get("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: "할일을 찾을 수 없습니다."
      });
    }

    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// 할일 수정 라우터: 내용 또는 완료 상태를 수정합니다.
router.patch("/todos/:id", async (req, res) => {
  try {
    const { content, isCompleted } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { content, isCompleted },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        error: "할일을 찾을 수 없습니다."
      });
    }

    res.status(200).json({
      success: true,
      data: updatedTodo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// 할일 삭제 라우터: ID로 특정 할일을 삭제합니다.
router.delete("/todos/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({
        success: false,
        error: "할일을 찾을 수 없습니다."
      });
    }

    res.status(200).json({
      success: true,
      data: deletedTodo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
