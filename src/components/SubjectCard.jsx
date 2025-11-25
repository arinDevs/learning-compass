import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle2 } from 'lucide-react';
import ProgressBar from './ProgressBar';
import { calculateProgress } from '../utils/storage';

const SubjectCard = ({ subject }) => {
  const progress = calculateProgress(subject.topics);
  const completedCount = subject.topics.filter(t => t.completed).length;
  const totalCount = subject.topics.length;

  return (
    <Link to={`/subject/${subject.id}`}>
      <div className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer animate-scale-in">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <BookOpen size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{subject.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {completedCount} / {totalCount} topics
              </p>
            </div>
          </div>
          {progress === 100 && (
            <CheckCircle2 size={24} className="text-success" />
          )}
        </div>

        <ProgressBar progress={progress} />
      </div>
    </Link>
  );
};

export default SubjectCard;
