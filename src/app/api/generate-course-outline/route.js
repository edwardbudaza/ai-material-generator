import { db } from '@/configs/db';
import { courseOutlineAIModel } from '@/configs/gemini';
import { STUDY_MATERIAL_TABLE } from '@/configs/schema';
import { NextResponse } from 'next/server';
import { inngest } from '../../../inngest/client';

export async function POST(req) {
  try {
    // Parse the incoming request body
    const requestBody = await req.json();
    console.log('Request body received:', requestBody);

    // Destructure and validate the request body fields
    const { courseId, topic, courseType, difficultyLevel, createdBy } =
      requestBody;
    if (!courseId || !topic || !courseType || !difficultyLevel || !createdBy) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: courseId, topic, courseType, difficultyLevel, createdBy.',
        },
        { status: 400 }
      );
    }

    // Define the AI model prompt
    const PROMPT = `
    Generate study material for:
    - Topic: ${topic}
    - Course Type: ${courseType}
    - Difficulty Level: ${difficultyLevel}

    Output:
    - A brief course summary covering objectives and relevance.
    - Chapters with short summaries and topics for each chapter.

    Output Format:
{
    "courseTitle": "string,
    "courseSummary": "string",
    "chapters": [
    {
      "chapterId": "string", 
      "name": "string",
      "summary": "string",
      "topics": ["string", "string"]
    }
  ]
}

Guidelines:
- Each chapter must have a unique "chapterId".
- Use a JSON array for the "topics" field for better readability and querying.
- Be concise and factual.
- Strictly follow the provided JSON format.

    `;

    console.log('Prompt sent to AI model:', PROMPT);

    // Send the prompt to the AI model
    const aiResponse = await courseOutlineAIModel.sendMessage(PROMPT);

    if (!aiResponse || !aiResponse.response) {
      throw new Error('Failed to fetch a valid response from the AI model.');
    }

    // Parse the AI response
    let aiResult;
    try {
      const responseText = await aiResponse.response.text();
      aiResult = JSON.parse(responseText);
    } catch (error) {
      console.error('Error parsing AI model response:', error);
      return NextResponse.json(
        {
          error:
            'The AI response could not be parsed. Ensure it adheres to the expected JSON structure.',
        },
        { status: 500 }
      );
    }

    console.log('Parsed AI model response:', aiResult);

    // Save the course outline in the database
    const dbResult = await db
      .insert(STUDY_MATERIAL_TABLE)
      .values({
        courseId: courseId,
        courseType: courseType,
        topic: topic,
        difficultyLevel: difficultyLevel,
        courseLayout: aiResult,
        createdBy: createdBy,
      })
      .returning({ resp: STUDY_MATERIAL_TABLE }); // Fetch the inserted row(s)

    console.log('Database insertion result:', dbResult);

    // Trigger the Inngetst function to generate chapter notes

    const result = await inngest.send({
      name: 'notes.generate',
      data: {
        course: dbResult[0].resp,
      },
    });
    console.log(result);

    // Return the saved course outline
    return NextResponse.json({ result: dbResult[0] }, { status: 201 });
  } catch (error) {
    console.error('Error in API handler:', error);

    // Handle unexpected errors gracefully
    return NextResponse.json(
      {
        error:
          error.message ||
          'An unexpected error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}
