// app/(main)/courses/[courseId]/_services/quiz-service.js
import axios from 'axios';

export const quizService = {
  async getQuizQuestions(courseId) {
    try {
      const response = await axios.post('/api/study-type', {
        courseId,
        studyType: 'quiz',
      });
      return response.data[1]?.content[0]?.questions || [];
    } catch (error) {
      console.error('Error fetching quiz:', error);
      throw error;
    }
  },
};
