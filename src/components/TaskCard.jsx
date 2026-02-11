import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Calendar, GripVertical, CheckSquare } from 'lucide-react';
import { format } from 'date-fns';

const priorityColors = {
  low: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  medium: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  high: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
};

const TaskCard = ({ task, onEdit, onDelete, onDragEnd }) => {
  const completedSubtasks = task.subtasks?.filter(s => s.completed).length || 0;
  const totalSubtasks = task.subtasks?.length || 0;
  const progress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  return (
    <motion.div
      layout
      layoutId={task.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
      className="group bg-slate-800/40 backdrop-blur-sm border border-white/5 rounded-2xl p-5 mb-4 cursor-grab active:cursor-grabbing hover:border-blue-500/30 transition-colors"
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.5}
      onDragStart={() => {
        window.draggedTaskId = task.id;
      }}
      onDragEnd={() => {
        onDragEnd(task.id);
        // Reset after a short delay
        setTimeout(() => {
          window.draggedTaskId = null;
        }, 100);
      }}
      whileDrag={{ 
        scale: 1.05, 
        rotate: 3, 
        zIndex: 50,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
      }}
    >
      <div className="flex justify-between items-start mb-3">
        <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(task)}
            className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <Edit2 size={14} />
          </button>
          <button 
            onClick={() => onDelete(task.id)}
            className="p-1.5 hover:bg-rose-500/10 rounded-lg text-slate-400 hover:text-rose-500 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <h3 className="text-white font-semibold text-base mb-2 group-hover:text-blue-400 transition-colors">
        {task.title}
      </h3>
      {task.description && (
        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {task.description}
        </p>
      )}

      {totalSubtasks > 0 && (
        <div className="mb-4 space-y-2">
          <div className="flex justify-between items-center text-[10px] text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <CheckSquare size={10} />
              {completedSubtasks}/{totalSubtasks} Subtasks
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1 w-full bg-slate-700/50 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className={`h-full ${progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-white/5 pt-4 mt-2">
        <div className="flex items-center gap-1.5">
          <Calendar size={12} />
          {format(new Date(task.createdAt), 'MMM dd, yyyy')}
        </div>
        <GripVertical size={14} className="text-slate-600 group-hover:text-slate-400" />
      </div>
    </motion.div>
  );
};

export default TaskCard;

