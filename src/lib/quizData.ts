export interface QuizQuestion {
  id: number;
  question: string;
  answer: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
}

export const africanCountriesQuiz: QuizQuestion[] = [
  // Easy questions
  {
    id: 1,
    question: "What is the largest country in Africa by land area?",
    answer: "Algeria",
    category: "Geography",
    difficulty: "easy",
    explanation: "Algeria covers approximately 2.38 million square kilometers."
  },
  {
    id: 2,
    question: "Which African country is known as the 'Rainbow Nation'?",
    answer: "South Africa",
    category: "Culture",
    difficulty: "easy",
    explanation: "South Africa is called the Rainbow Nation due to its diverse population and cultures."
  },
  {
    id: 3,
    question: "What is the capital city of Egypt?",
    answer: "Cairo",
    category: "Geography",
    difficulty: "easy",
    explanation: "Cairo is the largest city in Africa and the capital of Egypt."
  },
  {
    id: 4,
    question: "Which African country has the most pyramids?",
    answer: "Sudan",
    category: "History",
    difficulty: "easy",
    explanation: "Sudan has more pyramids than Egypt, with over 200 pyramids in the ancient city of Meroë."
  },
  {
    id: 5,
    question: "What is the official language of Nigeria?",
    answer: "English",
    category: "Language",
    difficulty: "easy",
    explanation: "English is the official language, though Nigeria has over 500 indigenous languages."
  },

  // Medium questions
  {
    id: 6,
    question: "Which African country is home to the ancient city of Timbuktu?",
    answer: "Mali",
    category: "History",
    difficulty: "medium",
    explanation: "Timbuktu was a major center of Islamic learning and trade in medieval times."
  },
  {
    id: 7,
    question: "What is the smallest country in Africa?",
    answer: "Seychelles",
    category: "Geography",
    difficulty: "medium",
    explanation: "Seychelles is an archipelago nation with a total area of 459 square kilometers."
  },
  {
    id: 8,
    question: "Which African country was never colonized by European powers?",
    answer: "Ethiopia",
    category: "History",
    difficulty: "medium",
    explanation: "Ethiopia successfully resisted colonization, except for a brief Italian occupation (1936-1941)."
  },
  {
    id: 9,
    question: "What is the highest mountain in Africa?",
    answer: "Mount Kilimanjaro",
    category: "Geography",
    difficulty: "medium",
    explanation: "Mount Kilimanjaro in Tanzania stands at 5,895 meters (19,341 feet) above sea level."
  },
  {
    id: 10,
    question: "Which African country has the largest population?",
    answer: "Nigeria",
    category: "Demographics",
    difficulty: "medium",
    explanation: "Nigeria has over 200 million people, making it the most populous country in Africa."
  },
  {
    id: 11,
    question: "What is the longest river in Africa?",
    answer: "Nile River",
    category: "Geography",
    difficulty: "medium",
    explanation: "The Nile River is approximately 6,650 kilometers long and flows through 11 countries."
  },
  {
    id: 12,
    question: "Which African country is known for its coffee production?",
    answer: "Ethiopia",
    category: "Economy",
    difficulty: "medium",
    explanation: "Ethiopia is considered the birthplace of coffee and is a major coffee producer."
  },

  // Hard questions
  {
    id: 13,
    question: "Which African country has the most official languages?",
    answer: "South Africa",
    category: "Language",
    difficulty: "hard",
    explanation: "South Africa has 11 official languages, including English, Afrikaans, and 9 indigenous languages."
  },
  {
    id: 14,
    question: "What is the oldest university in the world located in Africa?",
    answer: "University of Al Quaraouiyine",
    category: "Education",
    difficulty: "hard",
    explanation: "Founded in 859 AD in Fez, Morocco, it's recognized by UNESCO and Guinness World Records."
  },
  {
    id: 15,
    question: "Which African country has the most UNESCO World Heritage Sites?",
    answer: "Morocco",
    category: "Culture",
    difficulty: "hard",
    explanation: "Morocco has 9 UNESCO World Heritage Sites, including the medinas of Fez and Marrakech."
  },
  {
    id: 16,
    question: "What is the only African country with Spanish as an official language?",
    answer: "Equatorial Guinea",
    category: "Language",
    difficulty: "hard",
    explanation: "Equatorial Guinea is the only African country where Spanish is an official language."
  },
  {
    id: 17,
    question: "Which African country has the highest GDP per capita?",
    answer: "Seychelles",
    category: "Economy",
    difficulty: "hard",
    explanation: "Seychelles has one of the highest GDP per capita in Africa due to its tourism and fishing industries."
  },
  {
    id: 18,
    question: "What is the largest lake in Africa?",
    answer: "Lake Victoria",
    category: "Geography",
    difficulty: "hard",
    explanation: "Lake Victoria is the largest lake in Africa and the second-largest freshwater lake in the world."
  },
  {
    id: 19,
    question: "Which African country has the most time zones?",
    answer: "France (overseas territories)",
    category: "Geography",
    difficulty: "hard",
    explanation: "France's overseas territories in Africa span 12 time zones, more than any other country."
  },
  {
    id: 20,
    question: "What is the only African country that borders both the Atlantic and Indian Oceans?",
    answer: "South Africa",
    category: "Geography",
    difficulty: "hard",
    explanation: "South Africa's coastline extends from the Atlantic Ocean in the west to the Indian Ocean in the east."
  }
];

export const quizCategories = [
  "All",
  "Geography",
  "History",
  "Culture",
  "Language",
  "Economy",
  "Demographics",
  "Education"
];

export const difficultyLevels = [
  { value: "all", label: "All Levels" },
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" }
];
