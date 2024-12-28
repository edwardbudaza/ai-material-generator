// app/(dashboard)/courses/[courseId]/_services/flashcard-service.js

import axios from 'axios';

export const flashcardService = {
  async getFlashcards(courseId) {
    try {
      const response = await axios.post('/api/study-type', {
        courseId,
        studyType: 'flashcard',
      });
      return response.data[0]?.content || [];
    } catch (error) {
      console.error('Error fetching flashcards:', error);
      throw error;
    }
  },
};
