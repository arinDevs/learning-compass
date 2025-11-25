import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Plus } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

const Sidebar = ({ onAddSubject }) => {
  const location = useLocation();
  const { subjects } = useProgress();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 h-screen bg-card border-r border-border flex flex-col sticky top-0">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Learning Tracker
        </h1>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <Link
          to="/"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
            isActive('/') 
              ? 'bg-primary text-primary-foreground shadow-md' 
              : 'text-foreground hover:bg-muted'
          }`}
        >
          <Home size={20} />
          <span className="font-medium">Dashboard</span>
        </Link>

        <div className="mt-6">
          <div className="flex items-center justify-between px-4 mb-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Subjects
            </h3>
            <button
              onClick={onAddSubject}
              className="p-1 rounded hover:bg-muted transition-colors"
              title="Add Subject"
            >
              <Plus size={16} className="text-muted-foreground" />
            </button>
          </div>

          <div className="space-y-1">
            {subjects.map((subject) => (
              <Link
                key={subject.id}
                to={`/subject/${subject.id}`}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                  isActive(`/subject/${subject.id}`)
                    ? 'bg-accent/10 text-accent border-l-4 border-accent'
                    : 'text-foreground hover:bg-muted border-l-4 border-transparent'
                }`}
              >
                <BookOpen size={18} />
                <span className="text-sm font-medium truncate">{subject.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="p-4 border-t border-border text-xs text-muted-foreground">
        <p>© 2024 Learning Tracker</p>
      </div>
    </div>
  );
};

export default Sidebar;
