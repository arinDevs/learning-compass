import { createContext, useContext, useState, useEffect } from 'react';
import { defaultSubjects } from '../data/defaultTopics';
import { loadFromStorage, saveToStorage } from '../utils/storage';

const ProgressContext = createContext();

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
};

export const ProgressProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);

  // Load data on mount
  useEffect(() => {
    const savedData = loadFromStorage();
    if (savedData && savedData.length > 0) {
      setSubjects(savedData);
    } else {
      setSubjects(defaultSubjects);
      saveToStorage(defaultSubjects);
    }
  }, []);

  // Save to localStorage whenever subjects change
  useEffect(() => {
    if (subjects.length > 0) {
      saveToStorage(subjects);
    }
  }, [subjects]);

  const toggleTopic = (subjectId, topicId) => {
    setSubjects(prevSubjects =>
      prevSubjects.map(subject =>
        subject.id === subjectId
          ? {
              ...subject,
              topics: subject.topics.map(topic =>
                topic.id === topicId
                  ? { ...topic, completed: !topic.completed }
                  : topic
              )
            }
          : subject
      )
    );
  };

  const addSubject = (name) => {
    const newSubject = {
      id: `custom-${Date.now()}`,
      name,
      topics: []
    };
    setSubjects(prev => [...prev, newSubject]);
  };

  const addTopic = (subjectId, name, category) => {
    setSubjects(prevSubjects =>
      prevSubjects.map(subject =>
        subject.id === subjectId
          ? {
              ...subject,
              topics: [
                ...subject.topics,
                {
                  id: `${subjectId}-topic-${Date.now()}`,
                  name,
                  category,
                  completed: false
                }
              ]
            }
          : subject
      )
    );
  };

  return (
    <ProgressContext.Provider
      value={{
        subjects,
        toggleTopic,
        addSubject,
        addTopic
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
