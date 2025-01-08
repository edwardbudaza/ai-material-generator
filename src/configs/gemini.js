import { config } from 'dotenv';

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';

// Load .env file
config({ path: '.env' });

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash-exp',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
};

const generationConfigContent = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: 'text/html', // Changed to handle HTML content
};

export const courseOutlineAIModel = model.startChat({
  generationConfig,
  history: [
    {
      role: 'user',
      parts: [
        {
          text: ' Generate study material for:\n    - Topic: Python DSA\n    - Course Type: Interview Prep\n    - Difficulty Level: Hard\n\n    Output:\n    - A brief course summary covering objectives and relevance.\n    - Chapters with short summaries and topics for each chapter.\n\n    Output Format:\n{\n    "courseTitle": "string,\n    "courseSummary": "string",\n    "chapters": [\n    {\n      "chapterId": "integer", \n      "name": "string",\n      "summary": "string",\n      "emoji": "emoji",\n      "topics": ["string", "string"]\n    }\n  ]\n}\n\nGuidelines:\n- Each chapter must have a unique "chapterId".\n- Use a JSON array for the "topics" field for better readability and querying.\n- Be concise and factual.\n- Strictly follow the provided JSON format.\n- NB: Include Emoji icon for each chapter',
        },
      ],
    },
    {
      role: 'model',
      parts: [
        { text: '```json\n' },
        {
          text: '{\n"courseTitle": "Python DSA Interview Prep - Hard",\n"courseSummary": "This course provides advanced data structures and algorithms training for Python developers, focusing on problem-solving techniques required for challenging technical interviews. It covers complex topics, optimization strategies, and advanced algorithm design patterns.",\n"chapters": [\n    {\n      "chapterId": 1,\n      "name": "Advanced Graph Algorithms 🗺️",\n      "summary": "Explore advanced graph algorithms, focusing on complex problems and efficient implementations.",\n      "emoji": "🗺️",\n      "topics": ["Minimum Spanning Trees (Kruskal\'s, Prim\'s)", "Shortest Paths (Dijkstra\'s, Bellman-Ford, Floyd-Warshall)", "Network Flow", "Strongly Connected Components", "Topological Sorting"]\n    },\n    {\n      "chapterId": 2,\n      "name": "Dynamic Programming ⚙️",\n      "summary": "Master dynamic programming techniques to solve optimization problems efficiently.",\n       "emoji": "⚙️",\n      "topics": ["Memoization", "Tabulation", "Top-Down vs Bottom-Up Approaches", "Knapsack Problem", "Longest Common Subsequence", "Edit Distance", "Optimal Game Strategy"]\n    },\n    {\n      "chapterId": 3,\n      "name": "Advanced Tree Structures 🌲",\n      "summary": "Dive deep into advanced tree data structures and their applications.",\n      "emoji": "🌲",\n      "topics": ["Segment Trees", "Binary Indexed Trees (Fenwick Trees)", "Tries", "Suffix Trees", "AVL Trees", "Red-Black Trees"]\n    },\n     {\n      "chapterId": 4,\n      "name": "String Algorithms 🔤",\n      "summary": "In this chapter, we explore complex string algorithms and their implementations",\n       "emoji": "🔤",\n      "topics": ["Rabin-Karp Algorithm", "Knuth-Morris-Pratt (KMP) Algorithm", "Suffix Arrays", "Manacher\'s Algorithm", "String Matching with Finite Automata"]\n    },\n    {\n      "chapterId": 5,\n       "name": "Computational Geometry 📐",\n      "summary":"Understand the fundamentals of computational geometry for solving complex spatial problems",\n      "emoji": "📐",\n      "topics": ["Convex Hull (Graham Scan, Jarvis March)", "Line Segment Intersection", "Polygon Area Calculation", "Closest Pair Problem", "Rotating Calipers"]\n    },\n    {\n      "chapterId": 6,\n      "name": "Optimization Techniques 🚀",\n      "summary": "Explore techniques for optimizing algorithms and solving complex problems efficiently.",\n      "emoji": "🚀",\n      "topics": ["Greedy Algorithms", "Backtracking", "Branch and Bound", "Divide and Conquer", "Approximation Algorithms"]\n    }\n  ]\n}',
        },
        { text: '\n```' },
      ],
    },
  ],
});

export const generateNotesAIModel = model.startChat({
  generationConfigContent,
  history: [
    {
      role: 'user',
      parts: [
        {
          text: 'Generate exam material detailed content for each chapter, make sure to include all topc points in the contenet,\nmake sure to give content in HTML format (Do not Add HTML, Head, Body, title tag). The chapters:\n{\n      "chapterId": "ch1_introduction",\n      "name": "Introduction to Excel Libraries and Setup",\n      "summary": "This chapter covers choosing the right library (e.g., EPPlus, ClosedXML, NPOI) and setting up your development environment to work with Excel files in C#.",\n      "topics": [\n        "Choosing an Excel library (EPPlus, ClosedXML, NPOI)",\n        "Installing necessary NuGet packages",\n        "Project setup and basic C# syntax review"\n      ]\n    }',
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: '```html\n    <div class="chapter">\n        <h2>Chapter 1: Introduction to Excel Libraries and Setup</h2>\n        <p><strong>Summary:</strong> This chapter covers choosing the right library (e.g., EPPlus, ClosedXML, NPOI) and setting up your development environment to work with Excel files in C#.</p>\n\n        <div class="topic">\n            <h3>Choosing an Excel Library (EPPlus, ClosedXML, NPOI)</h3>\n            <p><strong>Key Concepts:</strong></p>\n            <ul>\n                <li><strong>EPPlus:</strong>\n                    <ul>\n                        <li>A popular, open-source library for .NET.</li>\n                        <li>Excellent performance and feature set, especially for modern Excel files (.xlsx).</li>\n                        <li>Generally considered easy to use and well-documented.</li>\n                        <li>Supports features like formulas, formatting, charts, and more.</li>\n                        <li>Good for complex excel operations and file manipulation.</li>\n                    </ul>\n                </li>\n                <li><strong>ClosedXML:</strong>\n                    <ul>\n                        <li>Another robust, open-source library focusing on ease of use.</li>\n                        <li>Provides a more high-level API, which can be simpler for common tasks.</li>\n                        <li>Good balance of features and ease of learning.</li>\n                         <li>May not have the same level of performance for very large files as EPPlus.</li>\n                         <li>Good for moderate operations and common file handling.</li>\n                    </ul>\n                </li>\n               <li><strong>NPOI:</strong>\n                    <ul>\n                         <li>An open-source library that can work with both older (.xls) and modern (.xlsx) file formats.</li>\n                         <li>Port of the Java POI project to .NET.</li>\n                         <li>Considered by some to be more complex to use.</li>\n                         <li>Good for applications where supporting legacy .xls format is crucial.</li>\n                         <li>Can be a good alternative if other libraries are not working well.</li>\n                     </ul>\n                </li>\n                <li><strong>Factors for Choosing:</strong>\n                    <ul>\n                        <li><strong>File format:</strong> Does your project need to support .xls or just .xlsx?</li>\n                        <li><strong>Performance:</strong> How large are the Excel files you\'ll be working with?</li>\n                        <li><strong>Complexity:</strong> How advanced are the features you need (formulas, charts, complex formatting)?</li>\n                        <li><strong>Ease of Use:</strong> How quickly do you need to learn and use the library?</li>\n                        <li><strong>License:</strong> Check licensing requirements if you are using any proprietary software.</li>\n                        <li><strong>Community Support:</strong> Check active development and community support of your chosen library.</li>\n                    </ul>\n                </li>\n            </ul>\n            <p><strong>Exam Questions Could Cover:</strong>\n                <ul>\n                    <li>Comparing and contrasting EPPlus, ClosedXML, and NPOI based on features, performance and ease of use.</li>\n                    <li>Identifying the best library for a specific scenario (e.g., handling large .xlsx files, supporting older .xls files).</li>\n                    <li>Understanding the advantages and disadvantages of each library.</li>\n                </ul>\n            </p>\n        </div>\n\n        <div class="topic">\n            <h3>Installing Necessary NuGet Packages</h3>\n             <p><strong>Key Concepts:</strong></p>\n             <ul>\n                 <li><strong>NuGet Package Manager:</strong> A tool in Visual Studio (or other .NET IDEs) to manage external libraries and dependencies.</li>\n                 <li><strong>Finding Packages:</strong> Searching for the correct package (e.g., "EPPlus", "ClosedXML", "NPOI") in the NuGet Package Manager.</li>\n                 <li><strong>Installation Process:</strong>\n                     <ul>\n                         <li>Right-click on your project in Solution Explorer.</li>\n                         <li>Select "Manage NuGet Packages."</li>\n                         <li>Search for the chosen library.</li>\n                         <li>Click "Install."</li>\n                         <li>Ensure correct version is installed and compatible with your project target framework.</li>\n                     </ul>\n                 </li>\n                 <li><strong>Dependencies:</strong> NuGet handles dependencies for you, ensuring you have all required packages.</li>\n             </ul>\n             <p><strong>Exam Questions Could Cover:</strong>\n                 <ul>\n                     <li>Describing the process of installing a NuGet package in Visual Studio.</li>\n                     <li>Knowing how to search for specific Excel libraries in the NuGet package manager.</li>\n                     <li>Understanding the role of NuGet in managing project dependencies.</li>\n                     <li>Identifying NuGet package manager errors.</li>\n                 </ul>\n             </p>\n        </div>\n\n        <div class="topic">\n            <h3>Project Setup and Basic C# Syntax Review</h3>\n            <p><strong>Key Concepts:</strong></p>\n            <ul>\n                <li><strong>Creating a New C# Project:</strong> Using Visual Studio or other IDE to create a Console Application or a Class Library project.</li>\n                <li><strong>Basic C# Syntax:</strong>\n                    <ul>\n                        <li><strong>Namespaces:</strong> Understanding `using` statements and how to access classes from other libraries (e.g., `using OfficeOpenXml;` for EPPlus).</li>\n                        <li><strong>Classes and Objects:</strong> Creating instances of classes from the chosen Excel library (e.g., `ExcelPackage` in EPPlus).</li>\n                        <li><strong>Variables and Data Types:</strong> Declaring variables to store data (e.g., file paths, worksheet names).</li>\n                         <li><strong>Error Handling</strong> Basic try and catch exception management to handle file operations errors.</li>\n                    </ul>\n                </li>\n                <li><strong>Adding Required Namespaces:</strong> Adding the appropriate `using` statements in your C# code to access the chosen library\'s classes.</li>\n            </ul>\n            <p><strong>Exam Questions Could Cover:</strong>\n                <ul>\n                    <li>Understanding how to create a basic C# project in Visual Studio or other IDE.</li>\n                    <li>Writing code snippets that use `using` statements for Excel libraries.</li>\n                    <li>Demonstrating a basic understanding of C# syntax relevant to Excel manipulation (class initialization, variable declarations).</li>\n                    <li>Explaining the importance of using correct namespaces for library functionality.</li>\n                </ul>\n            </p>\n        </div>\n    </div>\n```\n',
        },
      ],
    },
  ],
});

export const GenerateStudyTypeContentAiModel = model.startChat({
  generationConfig,
  history: [
    {
      role: 'user',
      parts: [
        {
          text: "`Generate up to 15 concise flashcards on the topic: Flutter Fundamentals, User Interface (UI) Development, Basic App Navigation. \nProvide the output in JSON format, where each flashcard contains \na 'front' with the question or term, and a 'back' with the answer or explanation.`",
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: '```json\n[\n    {\n        "front": "What is Flutter?",\n        "back": "Flutter is Google\'s UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase."\n    },\n    {\n        "front": "What is a Widget in Flutter?",\n         "back": "Widgets are the basic building blocks of a Flutter UI. They describe the UI elements and how they should be rendered."\n    },\n    {\n        "front": "What is the difference between StatelessWidget and StatefulWidget?",\n        "back": "StatelessWidgets do not change over time. StatefulWidgets can change their appearance based on user interaction or data changes."\n    },\n    {\n        "front": "What is the purpose of the `build()` method in a Widget?",\n        "back": "The `build()` method is responsible for returning the widget tree that defines the UI for that widget."\n    },\n    {\n        "front": "What is the role of the `MaterialApp` widget?",\n        "back": "`MaterialApp` sets up the basic UI scaffolding for an application following the Material Design guidelines."\n    },\n    {\n         "front": "Name three common layout widgets.",\n         "back": "Examples: `Row`, `Column`, `Container`, `Stack`, `Center`"\n    },\n    {\n        "front": "How do you display text in Flutter?",\n        "back": "Use the `Text` widget to display text on the screen."\n    },\n     {\n        "front": "How do you add padding around a widget?",\n        "back": "Wrap the widget in a `Padding` widget and specify the padding values."\n    },\n    {\n        "front": "What is the purpose of the `Navigator` widget?",\n        "back": "The `Navigator` is responsible for managing navigation between different screens (routes) in an application."\n    },\n    {\n        "front": "What is a route in Flutter?",\n       "back": "A route is a screen or page in the application, representing a path in the application navigation."\n    },\n    {\n        "front": "How do you navigate to a new screen in Flutter?",\n        "back": "Use `Navigator.push(context, MaterialPageRoute(builder: (context) => NewScreen()));`"\n    },\n     {\n        "front": "How to go back to the previous screen?",\n        "back": "Use `Navigator.pop(context);`"\n    },\n    {\n        "front": "What is `context` in Flutter?",\n        "back": "Context is a handle to the location of a widget in the widget tree, used to find and interact with other widgets."\n     },\n     {\n      "front": "What is the purpose of a `Scaffold` widget?",\n      "back": "Scaffold provides a basic app structure including AppBar, Body, Drawer, FloatingActionButton, etc."\n    },\n    {\n      "front": "What is the hot reload feature in Flutter?",\n      "back": "Hot reload allows you to see the changes in your code reflected in the app almost instantly, without restarting the application."\n    }\n\n]\n```\n',
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: '[\n    {\n        "front": "What is Flutter?",\n        "back": "Flutter is Google\'s UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase."\n    },\n    {\n        "front": "What is a Widget in Flutter?",\n         "back": "Widgets are the basic building blocks of a Flutter UI. They describe the UI elements and how they should be rendered."\n    },\n    {\n        "front": "What is the difference between StatelessWidget and StatefulWidget?",\n        "back": "StatelessWidgets do not change over time. StatefulWidgets can change their appearance based on user interaction or data changes."\n    },\n    {\n        "front": "What is the purpose of the `build()` method in a Widget?",\n        "back": "The `build()` method is responsible for returning the widget tree that defines the UI for that widget."\n    },\n    {\n        "front": "What is the role of the `MaterialApp` widget?",\n        "back": "`MaterialApp` sets up the basic UI scaffolding for an application following the Material Design guidelines."\n    },\n    {\n         "front": "Name three common layout widgets.",\n         "back": "Examples: `Row`, `Column`, `Container`, `Stack`, `Center`"\n    },\n    {\n        "front": "How do you display text in Flutter?",\n        "back": "Use the `Text` widget to display text on the screen."\n    },\n     {\n        "front": "How do you add padding around a widget?",\n        "back": "Wrap the widget in a `Padding` widget and specify the padding values."\n    },\n    {\n        "front": "What is the purpose of the `Navigator` widget?",\n        "back": "The `Navigator` is responsible for managing navigation between different screens (routes) in an application."\n    },\n    {\n        "front": "What is a route in Flutter?",\n       "back": "A route is a screen or page in the application, representing a path in the application navigation."\n    },\n    {\n        "front": "How do you navigate to a new screen in Flutter?",\n        "back": "Use `Navigator.push(context, MaterialPageRoute(builder: (context) => NewScreen()));`"\n    },\n     {\n        "front": "How to go back to the previous screen?",\n        "back": "Use `Navigator.pop(context);`"\n    },\n    {\n        "front": "What is `context` in Flutter?",\n        "back": "Context is a handle to the location of a widget in the widget tree, used to find and interact with other widgets."\n     },\n     {\n      "front": "What is the purpose of a `Scaffold` widget?",\n      "back": "Scaffold provides a basic app structure including AppBar, Body, Drawer, FloatingActionButton, etc."\n    },\n    {\n      "front": "What is the hot reload feature in Flutter?",\n      "back": "Hot reload allows you to see the changes in your code reflected in the app almost instantly, without restarting the application."\n    }\n\n]',
        },
      ],
    },
    {
      role: 'model',
      parts: [
        { text: '```json\n' },
        {
          text: '[\n    {\n        "front": "What is Flutter?",\n        "back": "Flutter is Google\'s UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase."\n    },\n    {\n        "front": "What is a Widget in Flutter?",\n        "back": "Widgets are the basic building blocks of a Flutter UI. They describe the UI elements and how they should be rendered."\n    },\n    {\n        "front": "What is the difference between StatelessWidget and StatefulWidget?",\n        "back": "StatelessWidgets do not change over time. StatefulWidgets can change their appearance based on user interaction or data changes."\n    },\n    {\n        "front": "What is the purpose of the `build()` method in a Widget?",\n        "back": "The `build()` method is responsible for returning the widget tree that defines the UI for that widget."\n    },\n    {\n        "front": "What is the role of the `MaterialApp` widget?",\n        "back": "`MaterialApp` sets up the basic UI scaffolding for an application following the Material Design guidelines."\n    },\n    {\n        "front": "Name three common layout widgets.",\n        "back": "Examples: `Row`, `Column`, `Container`, `Stack`, `Center`"\n    },\n    {\n        "front": "How do you display text in Flutter?",\n        "back": "Use the `Text` widget to display text on the screen."\n    },\n    {\n        "front": "How do you add padding around a widget?",\n        "back": "Wrap the widget in a `Padding` widget and specify the padding values."\n    },\n    {\n        "front": "What is the purpose of the `Navigator` widget?",\n        "back": "The `Navigator` is responsible for managing navigation between different screens (routes) in an application."\n    },\n    {\n        "front": "What is a route in Flutter?",\n        "back": "A route is a screen or page in the application, representing a path in the application navigation."\n    },\n    {\n        "front": "How do you navigate to a new screen in Flutter?",\n        "back": "Use `Navigator.push(context, MaterialPageRoute(builder: (context) => NewScreen()));`"\n    },\n    {\n        "front": "How to go back to the previous screen?",\n        "back": "Use `Navigator.pop(context);`"\n    },\n    {\n        "front": "What is `context` in Flutter?",\n        "back": "Context is a handle to the location of a widget in the widget tree, used to find and interact with other widgets."\n    },\n    {\n        "front": "What is the purpose of a `Scaffold` widget?",\n        "back": "Scaffold provides a basic app structure including AppBar, Body, Drawer, FloatingActionButton, etc."\n    },\n    {\n        "front": "What is the hot reload feature in Flutter?",\n        "back": "Hot reload allows you to see the changes in your code reflected in the app almost instantly, without restarting the application."\n    }\n]',
        },
        { text: '\n```' },
      ],
    },
  ],
});

export const GenerateQuizAIModel = model.startChat({
  generationConfig,
  history: [
    {
      role: 'user',
      parts: [
        {
          text: 'Generate a quiz on the topic: Flutter Fundamentals, UI Development & Basic Navigation. Each question should include:\n- A clear and concise question.\n- 4 multiple-choice options labeled A, B, C, and D.\n- The correct answer clearly specified.\n- Format the output as a JSON array of objects with the following structure:\n{\n"quizTitle":"string",\n"questions": [\n  {\n    "question": "string",\n    "options": ["string", "string", "string", "string"],\n    "correctAnswer": "string"\n  }\n  ]\n }\nLimit the quiz to a maximum of 15 questions.\n',
        },
      ],
    },
    {
      role: 'model',
      parts: [
        { text: '```json\n' },
        {
          text: '[\n  {\n    "quizTitle": "Flutter Fundamentals, UI Development & Basic Navigation Quiz",\n    "questions": [\n      {\n        "question": "What is Flutter?",\n        "options": [\n          "A programming language",\n          "A framework for building native mobile apps",\n          "An operating system",\n          "A database management system"\n        ],\n        "correctAnswer": "A framework for building native mobile apps"\n      },\n      {\n        "question": "Which programming language is used to write Flutter code?",\n        "options": ["Java", "Kotlin", "Dart", "Swift"],\n        "correctAnswer": "Dart"\n      },\n       {\n        "question": "What is the main function in a Flutter app?",\n        "options": [\n          "start()",\n          "main()",\n          "runApp()",\n          "init()"\n          ],\n        "correctAnswer": "main()"\n      },\n      {\n        "question": "What is a Widget in Flutter?",\n        "options": [\n          "A user interface component",\n          "A data storage unit",\n          "A networking protocol",\n          "A database schema"\n        ],\n         "correctAnswer": "A user interface component"\n      },\n      {\n        "question":"Which widget is used to create a scrollable list of items?",\n        "options":["Row", "Column", "ListView", "Container"],\n        "correctAnswer": "ListView"\n      },\n      {\n         "question": "Which widget is used to arrange its children in a horizontal line?",\n        "options": [\n          "Column",\n          "Row",\n          "Stack",\n          "Center"\n          ],\n        "correctAnswer": "Row"\n      },\n      {\n        "question": "What is the purpose of the `setState()` method?",\n        "options": [\n          "To change the application\'s theme",\n          "To rebuild the widget tree",\n          "To navigate to a new screen",\n          "To fetch data from an API"\n        ],\n        "correctAnswer": "To rebuild the widget tree"\n      },\n       {\n        "question": "What is the role of a `StatefulWidget`?",\n        "options": [\n          "To display static content",\n           "To manage mutable state",\n          "To handle user input",\n          "To perform network requests"\n          ],\n        "correctAnswer":"To manage mutable state"\n      },\n      {\n        "question": "What is the purpose of the `BuildContext`?",\n        "options": [\n          "To define the layout of a widget",\n          "To provide access to the location of a widget in the tree",\n           "To store app settings",\n          "To handle user gestures"\n          ],\n        "correctAnswer": "To provide access to the location of a widget in the tree"\n      },\n      {\n        "question": "How do you navigate to a new screen in Flutter?",\n        "options": [\n          "Using the `navigate()` method",\n          "Using the `push()` method",\n          "Using the `goto()` method",\n          "Using the `switch()` method"\n        ],\n         "correctAnswer": "Using the `push()` method"\n      },\n       {\n        "question": "What is the purpose of the `Navigator` widget?",\n        "options": [\n          "To manage routes and navigation",\n          "To create animations",\n          "To draw shapes",\n          "To handle user authentication"\n        ],\n        "correctAnswer": "To manage routes and navigation"\n      },\n       {\n        "question":"Which widget is used to display images?",\n        "options":["Text", "Icon", "Image", "Button"],\n        "correctAnswer": "Image"\n      },\n      {\n        "question": "What is hot reload in Flutter?",\n        "options": [\n          "A feature that reloads the entire app",\n           "A feature that quickly updates the app with code changes",\n          "A way to install the app on a device",\n          "A way to debug the app"\n        ],\n        "correctAnswer": "A feature that quickly updates the app with code changes"\n      },\n       {\n        "question": "Which widget is used for creating buttons?",\n        "options": [\n          "Container",\n          "Text",\n          "Button",\n          "ElevatedButton"\n         ],\n        "correctAnswer": "ElevatedButton"\n      },\n      {\n        "question": "What does the pubspec.yaml file do?",\n         "options":[\n           "Stores data related to the app",\n           "Defines the app\'s user interface",\n           "Manages app dependencies and configurations",\n           "Handles navigation between screens"\n           ],\n        "correctAnswer": "Manages app dependencies and configurations"\n      }\n    ]\n  }\n]',
        },
        { text: '\n```' },
      ],
    },
  ],
});
