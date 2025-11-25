import TopicCheckbox from './TopicCheckbox';

const categoryColors = {
  'Very Important': 'text-secondary',
  'Important': 'text-primary',
  'Minimal': 'text-muted-foreground'
};

const CategorySection = ({ category, topics, onToggleTopic }) => {
  if (topics.length === 0) return null;

  return (
    <div className="mb-8">
      <h3 className={`text-sm font-bold uppercase tracking-wide mb-4 ${categoryColors[category]}`}>
        {category}
      </h3>
      <div className="space-y-2">
        {topics.map((topic) => (
          <TopicCheckbox
            key={topic.id}
            topic={topic}
            onToggle={() => onToggleTopic(topic.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
