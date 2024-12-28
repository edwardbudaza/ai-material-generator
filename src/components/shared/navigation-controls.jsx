// components/shared/navigation-controls.jsx
'use client';

export function NavigationControls({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onBack,
  showBackButton = false,
}) {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10">
      <Card className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardContent className="p-2 flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            disabled={currentStep === 0}
            onClick={onPrevious}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          {showBackButton && currentStep >= totalSteps - 1 ? (
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Course</span>
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={onNext}
              className="flex items-center space-x-2"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
