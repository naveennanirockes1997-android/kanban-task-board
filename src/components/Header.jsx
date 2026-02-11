import React from 'react';
import { Plus, Search, Trash2, CheckCircle2, ListTodo } from 'lucide-react';

const Header = ({ onAddTask, searchQuery, onSearchQueryChange, stats, onClearAll }) => {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between px-8 py-6 bg-slate-900/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-10 w-full gap-4">
      <div className="flex items-center gap-6 w-full md:w-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Kanban Board
          </h1>
        </div>

        <div className="hidden lg:flex items-center gap-4 border-l border-white/10 pl-6 h-8">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <ListTodo size={16} className="text-blue-400" />
            <span>{stats.total} Total</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>{stats.done} Done</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center gap-4 w-full md:w-auto max-w-2xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder="Search tasks..."
            className="w-full bg-slate-800/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onClearAll}
            className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"
            title="Clear All Tasks"
          >
            <Trash2 size={20} />
          </button>
          
          <button
            onClick={onAddTask}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/20 active:scale-95 whitespace-nowrap"
          >
            <Plus size={20} />
            <span className="font-semibold text-sm">Add Task</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

