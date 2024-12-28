// app/(dashboard)/courses/[courseId]/_services/notes-service.js
'use client';

import axios from 'axios';

export const notesService = {
  async getNotes(courseId) {
    try {
      const response = await axios.post('/api/study-type', {
        courseId: courseId,
        studyType: 'notes',
      });
      return response.data || [];
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  },
};
