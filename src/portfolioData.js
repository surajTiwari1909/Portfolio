export const github = 'https://github.com/surajTiwari1909';
export const email = 'iamsuraj1909@gmail.com';
export const contactEmailHref = `mailto:${email}?subject=${encodeURIComponent('Can we connect for the discussion')}`;
export const projects = [
  { id: 'quiz', name: 'QuizGenie', type: 'AI / EDTECH', filters: ['AI & Agents', 'Backend'], description: 'Turning curiosity into a learning experience. AI-generated quizzes with background processing and independent answer validation.', stack: ['Python', 'Django', 'Groq', 'Celery'], repo: 'quizgenie', status: 'In development' },
  { id: 'social', name: 'Instagram Backend', type: 'BACKEND / SOCIAL', filters: ['Backend'], description: 'The systems behind the feed. A Django social backend exploring media uploads, user interactions, and relational data modeling.', stack: ['Python', 'Django', 'REST APIs'], repo: 'instagram', status: 'Personal project' },
  { id: 'food', name: 'FoodExpress', type: 'FRONTEND / WEB APP', filters: ['Frontend'], description: 'A food ordering interface built around browsing dishes and a responsive, approachable experience.', stack: ['JavaScript', 'React', 'CSS'], repo: 'FoodExpress', status: 'Personal project', live: 'https://food-express.vercel.app' },
];

export const exploration = [
  {
    title: 'Applied AI',
    description: 'I’m exploring how AI can support learning through QuizGenie: generating questions, validating answers, and connecting AI workflows to reliable backend services.',
    label: 'BUILDING & EXPLORING',
  },
  {
    title: 'Data science',
    description: 'I’m interested in using Python to explore data, find patterns, and turn observations into useful product decisions. Data analysis and machine learning are areas I’m keen to deepen.',
    label: 'LEARNING INTEREST',
  },
];
