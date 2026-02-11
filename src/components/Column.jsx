import React from 'react';
import { motion } from 'framer-motion';
import TaskCard from './TaskCard';
import { Plus } from 'lucide-react';

const Column = ({ title, status, tasks, onEdit, onDelete, onMouseEnter, onMouseLeave, onDragEnd, onAddTask }) => {
  const count = tasks.length;
  
  const statusColors = {
    todo: 'bg-blue-500',
    'in-progress': 'bg-amber-500',
    done: 'bg-emerald-500',
  };

  return (
    <div 
      className="flex-shrink-0 w-80 flex flex-col h-[calc(100vh-140px)] min-h-[500px]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2.5">
          <div className={`w-2 h-2 rounded-full ${statusColors[status] || 'bg-slate-400'}`} />
          <h2 className="text-slate-200 font-bold text-lg capitalize">{title}</h2>
          <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md text-xs font-medium">
            {count}
          </span>
        </div>
        
        <button 
          onClick={() => onAddTask(status)}
          className="p-1.5 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-colors"
          title="Add task here"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="flex-1 bg-slate-900/40 rounded-3xl p-4 border border-white/5 overflow-y-auto custom-scrollbar transition-colors duration-200 hover:border-white/10">
        <div className="flex flex-col gap-2 min-h-full">
          {tasks.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              onEdit={onEdit} 
              onDelete={onDelete} 
              onDragEnd={onDragEnd}
            />
          ))}
          {tasks.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-600 border-2 border-dashed border-white/5 rounded-2xl min-h-[150px]">
              <p className="text-sm italic">No tasks here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Column;

