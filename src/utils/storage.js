const STORAGE_KEY = 'learning-progress-data';

export const loadFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

export const saveToStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const calculateProgress = (topics) => {
  if (!topics || topics.length === 0) return 0;
  const completed = topics.filter(topic => topic.completed).length;
  return Math.round((completed / topics.length) * 100);
};

export const calculateOverallProgress = (subjects) => {
  if (!subjects || subjects.length === 0) return 0;
  
  const totalTopics = subjects.reduce((sum, subject) => sum + subject.topics.length, 0);
  const completedTopics = subjects.reduce(
    (sum, subject) => sum + subject.topics.filter(topic => topic.completed).length,
    0
  );
  
  return totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
};
