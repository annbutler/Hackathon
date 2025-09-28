'use client';

import { useState, useMemo } from 'react';
import FlipCard from './FlipCard';
import { africanCountriesQuiz, quizCategories, difficultyLevels } from '@/lib/quizData';
import { Button } from '@/Components/ui/button';

export default function QuizPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Filter questions based on selected category and difficulty
  const filteredQuestions = useMemo(() => {
    return africanCountriesQuiz.filter(question => {
      const categoryMatch = selectedCategory === 'All' || question.category === selectedCategory;
      const difficultyMatch = selectedDifficulty === 'all' || question.difficulty === selectedDifficulty;
      return categoryMatch && difficultyMatch;
    });
  }, [selectedCategory, selectedDifficulty]);

  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const totalQuestions = filteredQuestions.length;

  const nextQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev + 1) % totalQuestions);
  };

  const previousQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev - 1 + totalQuestions) % totalQuestions);
  };

  const randomQuestion = () => {
    setCurrentQuestionIndex(Math.floor(Math.random() * totalQuestions));
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
  };

  if (totalQuestions === 0) {
    return (
      <div className="min-h-screen bg-[#0D1117] py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="mb-8 text-4xl font-bold text-white">African Countries Quiz</h1>
            <div className="rounded-lg bg-[#161B22] p-8 text-white">
              <h2 className="mb-4 text-2xl font-semibold">No questions found</h2>
              <p className="text-gray-400">
                Try adjusting your filters to see more questions.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D1117] py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">African Countries Quiz</h1>
          <p className="text-lg text-gray-400">
            Test your knowledge about African countries and facts with interactive flip cards
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-white">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentQuestionIndex(0);
              }}
              className="rounded-lg bg-[#161B22] px-3 py-2 text-white border border-gray-600 focus:border-[#2B6CB0] focus:outline-none"
            >
              {quizCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-white">Difficulty:</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => {
                setSelectedDifficulty(e.target.value);
                setCurrentQuestionIndex(0);
              }}
              className="rounded-lg bg-[#161B22] px-3 py-2 text-white border border-gray-600 focus:border-[#2B6CB0] focus:outline-none"
            >
              {difficultyLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <Button
            onClick={resetQuiz}
            className="bg-[#2B6CB0] hover:bg-[#1e4a72] text-white"
          >
            Reset Quiz
          </Button>
        </div>

        {/* Question Counter */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-lg bg-[#161B22] px-4 py-2">
            <span className="text-white">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
            <div className="h-4 w-px bg-gray-600"></div>
            <span className="text-sm text-gray-400">
              {currentQuestion?.category} • {currentQuestion?.difficulty.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Flip Card */}
        <div className="mb-8 flex justify-center">
          {currentQuestion && (
            <FlipCard
              question={currentQuestion.question}
              answer={currentQuestion.answer}
              category={currentQuestion.category}
              difficulty={currentQuestion.difficulty}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={previousQuestion}
            disabled={totalQuestions <= 1}
            className="bg-gray-600 hover:bg-gray-700 text-white disabled:opacity-50"
          >
            Previous
          </Button>
          
          <Button
            onClick={randomQuestion}
            className="bg-[#38A169] hover:bg-[#2d7a52] text-white"
          >
            Random Question
          </Button>
          
          <Button
            onClick={nextQuestion}
            disabled={totalQuestions <= 1}
            className="bg-gray-600 hover:bg-gray-700 text-white disabled:opacity-50"
          >
            Next
          </Button>
        </div>

        {/* Explanation */}
        {currentQuestion?.explanation && (
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="rounded-lg bg-[#161B22] p-6">
              <h3 className="mb-2 text-lg font-semibold text-white">Did you know?</h3>
              <p className="text-gray-300">{currentQuestion.explanation}</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Hover over the cards to reveal answers. Use the navigation buttons to explore different questions.
          </p>
        </div>
      </div>
    </div>
  );
}
