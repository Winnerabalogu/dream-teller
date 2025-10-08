// src/components/ui/EmptyState.tsx
import { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export default function EmptyState({ icon, title, description, action }: Props) {
  return (
    <div className="card text-center py-12 space-y-4 animate-fade-in">
      <div className="text-purple-400">{icon}</div>
      <h2 className="text-2xl font-light">{title}</h2>
      <p className="text-purple-300 max-w-md mx-auto">{description}</p>
      {action && <div className="pt-4">{action}</div>}
    </div>
  );
}