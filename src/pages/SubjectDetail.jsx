import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import CategorySection from '../components/CategorySection';
import ProgressBar from '../components/ProgressBar';
import AddTopicModal from '../components/AddTopicModal';
import { calculateProgress } from '../utils/storage';

const SubjectDetail = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const { subjects, toggleTopic, addTopic } = useProgress();
  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);

  const subject = subjects.find(s => s.id === subjectId);

  if (!subject) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Subject not found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-primary hover:underline"
          >
            Go back to dashboard
          </button>
        </div>
      </div>
    );
  }

  const progress = calculateProgress(subject.topics);
  const completedCount = subject.topics.filter(t => t.completed).length;

  const veryImportantTopics = subject.topics.filter(t => t.category === 'Very Important');
  const importantTopics = subject.topics.filter(t => t.category === 'Important');
  const minimalTopics = subject.topics.filter(t => t.category === 'Minimal');

  const handleToggleTopic = (topicId) => {
    toggleTopic(subjectId, topicId);
  };

  const handleAddTopic = (name, category) => {
    addTopic(subjectId, name, category);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8 animate-slide-in">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{subject.name}</h1>
              <p className="text-muted-foreground">
                {completedCount} of {subject.topics.length} topics completed
              </p>
            </div>
            <button
              onClick={() => setIsAddTopicOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              <Plus size={20} />
              Add Topic
            </button>
          </div>

          <ProgressBar progress={progress} />
        </div>

        {/* Topics by Category */}
        <div className="space-y-8">
          <CategorySection
            category="Very Important"
            topics={veryImportantTopics}
            onToggleTopic={handleToggleTopic}
          />
          <CategorySection
            category="Important"
            topics={importantTopics}
            onToggleTopic={handleToggleTopic}
          />
          <CategorySection
            category="Minimal"
            topics={minimalTopics}
            onToggleTopic={handleToggleTopic}
          />
        </div>

        {subject.topics.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No topics yet. Add your first topic!</p>
            <button
              onClick={() => setIsAddTopicOpen(true)}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Add Your First Topic
            </button>
          </div>
        )}
      </div>

      <AddTopicModal
        isOpen={isAddTopicOpen}
        onClose={() => setIsAddTopicOpen(false)}
        onAdd={handleAddTopic}
        subjectName={subject.name}
      />
    </div>
  );
};

export default SubjectDetail;
