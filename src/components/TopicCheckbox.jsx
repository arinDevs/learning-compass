import { Check } from 'lucide-react';

const TopicCheckbox = ({ topic, onToggle }) => {
  return (
    <div
      onClick={onToggle}
      className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-200 cursor-pointer group ${
        topic.completed
          ? 'bg-success/5 border-success/20'
          : 'bg-card border-border hover:border-primary/50 hover:bg-muted/50'
      }`}
    >
      <div
        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
          topic.completed
            ? 'bg-success border-success'
            : 'border-border group-hover:border-primary'
        }`}
      >
        {topic.completed && <Check size={16} className="text-success-foreground" />}
      </div>
      <span
        className={`text-sm font-medium transition-all ${
          topic.completed
            ? 'text-muted-foreground line-through'
            : 'text-foreground'
        }`}
      >
        {topic.name}
      </span>
    </div>
  );
};

export default TopicCheckbox;
