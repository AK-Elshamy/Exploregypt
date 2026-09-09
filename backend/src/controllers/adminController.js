const City = require("../models/City");
const Place = require("../models/Place");
const Question = require("../models/Question");
const User = require("../models/User");

const getDashboardStats = async (req, res) => {
  try {
    const [citiesCount, placesCount, questionsCount, usersCount, pendingQuestions] =
      await Promise.all([
        City.countDocuments(),
        Place.countDocuments(),
        Question.countDocuments(),
        User.countDocuments(),
        Question.countDocuments({ status: "pending" }),
      ]);

    res.status(200).json({
      cities: citiesCount,
      places: placesCount,
      questions: questionsCount,
      users: usersCount,
      pendingQuestions,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load dashboard stats", error: error.message });
  }
};

const createCity = async (req, res) => {
  try {
    const city = await City.create(req.body);
    res.status(201).json(city);
  } catch (error) {
    res.status(400).json({ message: "Failed to create city", error: error.message });
  }
};

const updateCity = async (req, res) => {
  try {
    const city = await City.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!city) return res.status(404).json({ message: "City not found" });
    res.status(200).json(city);
  } catch (error) {
    res.status(400).json({ message: "Failed to update city", error: error.message });
  }
};

const deleteCity = async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);
    if (!city) return res.status(404).json({ message: "City not found" });
    res.status(200).json({ message: "City deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete city", error: error.message });
  }
};

const createPlace = async (req, res) => {
  try {
    const place = await Place.create(req.body);
    res.status(201).json(place);
  } catch (error) {
    res.status(400).json({ message: "Failed to create place", error: error.message });
  }
};

const updatePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!place) return res.status(404).json({ message: "Place not found" });
    res.status(200).json(place);
  } catch (error) {
    res.status(400).json({ message: "Failed to update place", error: error.message });
  }
};

const deletePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);
    if (!place) return res.status(404).json({ message: "Place not found" });
    res.status(200).json({ message: "Place deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete place", error: error.message });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const questions = await Question.find(filter)
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch questions", error: error.message });
  }
};

const answerQuestion = async (req, res) => {
  try {
    const { answer } = req.body;
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { answer, status: "answered" },
      { new: true }
    );
    if (!question) return res.status(404).json({ message: "Question not found" });
    res.status(200).json(question);
  } catch (error) {
    res.status(400).json({ message: "Failed to answer question", error: error.message });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete question", error: error.message });
  }
};

module.exports = {
  getDashboardStats,
  createCity,
  updateCity,
  deleteCity,
  createPlace,
  updatePlace,
  deletePlace,
  getAllQuestions,
  answerQuestion,
  deleteQuestion,
};
