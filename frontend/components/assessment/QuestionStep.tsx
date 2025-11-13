
'use client';

import { AssessmentSection, AssessmentQuestion } from '@/types/assessment';
import { ChevronLeft, ChevronRight, Shield } from 'lucide-react';

interface QuestionStepProps {
  section: AssessmentSection;
  question: AssessmentQuestion;
  answer: string;
  onAnswer: (questionId: string, answer: string) => void;
  onNext: () => void;
  onBack: () => void;
  isLast: boolean;
  loading: boolean;
  currentStep: number;
  totalSteps: number;
}

export const QuestionStep: React.FC<QuestionStepProps> = ({
  section,
  question,
  answer,
  onAnswer,
  onNext,
  onBack,
  isLast,
  loading,
  currentStep,
  totalSteps
}) => {
  const handleOptionSelect = (value: string) => {
    onAnswer(question.id, value);
  };

  const handleNext = () => {
    if (answer) {
      onNext();
    }
  };

  return (
    <div className="card">
      {/* Section Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
          <Shield className="h-4 w-4" />
          <span>{section.title}</span>
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">
            Question {currentStep + 1} of {totalSteps}
          </h2>
          <span className="text-sm text-gray-400 bg-gray-700 px-3 py-1 rounded-full">
            {Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete
          </span>
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-6">
          {question.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {question.options?.map((option) => (
            <button
              key={option.value}
              onClick={() => handleOptionSelect(option.value)}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                answer === option.value
                  ? 'border-[#d74622] bg-[#d74622]/10 text-white'
                  : 'border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                  answer === option.value
                    ? 'border-[#d74622] bg-[#d74622]'
                    : 'border-gray-500'
                }`}>
                  {answer === option.value && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="font-medium">{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t border-gray-700">
        <button
          onClick={onBack}
          className="btn btn-secondary flex items-center"
          disabled={loading}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </button>
        
        <button
          onClick={handleNext}
          disabled={!answer || loading}
          className="btn btn-primary flex items-center"
        >
          {isLast ? 'Complete Assessment' : 'Next Question'}
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-gray-900/80 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d74622] mx-auto mb-2"></div>
            <div className="text-white text-sm">Processing...</div>
          </div>
        </div>
      )}
    </div>
  );
};


