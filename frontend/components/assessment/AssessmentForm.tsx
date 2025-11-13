
'use client';

import { useState, useEffect } from 'react';
import { AssessmentSection, AssessmentAnswers } from '@/types/assessment';
import { QuestionStep } from './QuestionStep';
import { EmailModal } from './EmailModal';

interface AssessmentFormProps {
  sections: AssessmentSection[];
  onSubmit: (businessName: string, businessEmail: string, answers: AssessmentAnswers) => void;
  loading: boolean;
}

export const AssessmentForm: React.FC<AssessmentFormProps> = ({ 
  sections, 
  onSubmit, 
  loading 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const allQuestions = sections.flatMap(section => section.questions);
  const totalSteps = allQuestions.length;

  // Auto-save progress
  const autoSaveProgress = (currentAnswers: AssessmentAnswers) => {
    localStorage.setItem('assessment_progress', JSON.stringify({
      answers: currentAnswers,
      currentStep,
      timestamp: Date.now()
    }));
  };

  // Load saved progress on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('assessment_progress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        setAnswers(progress.answers || {});
        setCurrentStep(progress.currentStep || 0);
      } catch (error) {
        console.error('Error loading saved progress:', error);
      }
    }
  }, []);

  // Save progress when answers change
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      setHasUnsavedChanges(true);
      autoSaveProgress(answers);
    }
  }, [answers, currentStep]);

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'You have unsaved assessment progress. Are you sure you want to leave?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Assessment complete - show email modal
      setShowEmailModal(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      window.history.back();
    }
  };

  const handleEmailSubmit = (businessName: string, businessEmail: string) => {
    // Clear saved progress on successful submission
    localStorage.removeItem('assessment_progress');
    setHasUnsavedChanges(false);
    
    // Submit assessment with collected data
    onSubmit(businessName, businessEmail, answers);
    setShowEmailModal(false);
  };

  // Prevent errors when questions are not loaded yet
  if (!sections.length || allQuestions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d74622] mx-auto mb-4"></div>
          <div className="text-white">Loading questions...</div>
        </div>
      </div>
    );
  }

  const progress = ((currentStep + 1) / totalSteps) * 100;

  const currentQuestion = allQuestions[currentStep];
  const currentSection = sections.find(section => 
    section.questions.includes(currentQuestion)
  );

  // Additional safety check
  if (!currentQuestion || !currentSection) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-white mb-2">Question Not Found</h2>
          <p className="text-gray-300 mb-4">There was an issue loading the assessment questions.</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Reload Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-white mb-2">
          <span>Progress</span>
          <span>{currentStep + 1} of {totalSteps}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-[#dd020f] via-[#76127f] to-[#0c22f1] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Current Question */}
      <QuestionStep
        section={currentSection}
        question={currentQuestion}
        answer={answers[currentQuestion.id] || ''}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onBack={handleBack}
        isLast={currentStep === totalSteps - 1}
        loading={loading}
        currentStep={currentStep}
        totalSteps={totalSteps}
      />

      {/* Email Modal */}
      <EmailModal
        isOpen={showEmailModal}
        onSubmit={handleEmailSubmit}
        onCancel={() => setShowEmailModal(false)}
        loading={loading}
      />
    </div>
  );
};


