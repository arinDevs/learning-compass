import { Trophy, Target, TrendingUp } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import SubjectCard from '../components/SubjectCard';
import ProgressBar from '../components/ProgressBar';
import { calculateOverallProgress } from '../utils/storage';

const Dashboard = () => {
  const { subjects } = useProgress();
  const overallProgress = calculateOverallProgress(subjects);

  const totalTopics = subjects.reduce((sum, s) => sum + s.topics.length, 0);
  const completedTopics = subjects.reduce(
    (sum, s) => sum + s.topics.filter(t => t.completed).length,
    0
  );

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-slide-in">
          <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Track your learning journey across all subjects</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-primary to-accent rounded-xl p-6 text-white shadow-lg animate-scale-in">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-white/20 rounded-lg">
                <Trophy size={24} />
              </div>
              <div>
                <p className="text-sm opacity-90">Overall Progress</p>
                <p className="text-3xl font-bold">{overallProgress}%</p>
              </div>
            </div>
            <ProgressBar progress={overallProgress} className="mt-4" />
          </div>

          <div className="bg-card rounded-xl p-6 border border-border shadow-md animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <Target size={24} className="text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Topics Completed</p>
                <p className="text-3xl font-bold text-foreground">
                  {completedTopics} <span className="text-lg text-muted-foreground">/ {totalTopics}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border shadow-md animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <TrendingUp size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Subjects</p>
                <p className="text-3xl font-bold text-foreground">{subjects.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Subjects Grid */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">All Subjects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <div key={subject.id} style={{ animationDelay: `${index * 0.05}s` }}>
                <SubjectCard subject={subject} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
