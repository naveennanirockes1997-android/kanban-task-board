import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, AlertCircle, Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';

const TaskModal = ({ isOpen, onClose, onSave, taskToEdit, defaultStatus }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [priority, setPriority] = useState('medium');
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setStatus(taskToEdit.status);
      setPriority(taskToEdit.priority);
      setSubtasks(taskToEdit.subtasks || []);
    } else {
      setTitle('');
      setDescription('');
      setStatus(defaultStatus || 'todo');
      setPriority('medium');
      setSubtasks([]);
    }
    setNewSubtask('');
    setErrors({});
  }, [taskToEdit, isOpen, defaultStatus]);

  const handleAddSubtask = () => {
    if (!newSubtask.trim()) return;
    setSubtasks([...subtasks, { id: Date.now(), title: newSubtask.trim(), completed: false }]);
    setNewSubtask('');
  };

  const toggleSubtask = (id) => {
    setSubtasks(subtasks.map(s => s.id === id ? { ...s, completed: !s.completed } : s));
  };

  const removeSubtask = (id) => {
    setSubtasks(subtasks.filter(s => s.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      id: taskToEdit ? taskToEdit.id : `task-${Date.now()}`,
      title,
      description,
      status,
      priority,
      subtasks,
      createdAt: taskToEdit ? taskToEdit.createdAt : new Date().toISOString().split('T')[0],
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden shadow-blue-500/10 max-h-[90vh] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5 shrink-0">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                {taskToEdit ? 'Edit Task' : 'Create New Task'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="What needs to be done?"
                    className={`w-full bg-slate-800/50 border ${errors.title ? 'border-rose-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
                  />
                  {errors.title && (
                    <p className="text-rose-500 text-xs flex items-center gap-1 mt-1 ml-1">
                      <AlertCircle size={12} /> {errors.title}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add more details..."
                    rows={3}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer"
                    >
                      <option value="todo">To Do</option>
                      <option value="in-progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Priority</label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-slate-400 ml-1 flex justify-between items-center">
                    Subtasks
                    <span className="text-xs text-slate-500">{subtasks.length} items</span>
                  </label>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSubtask}
                      onChange={(e) => setNewSubtask(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSubtask())}
                      placeholder="Add a subtask..."
                      className="flex-1 bg-slate-800/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                    <button
                      type="button"
                      onClick={handleAddSubtask}
                      className="p-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white rounded-xl transition-all"
                    >
                      <Plus size={20} />
                    </button>
                  </div>

                  <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar pr-2">
                    {subtasks.map((subtask) => (
                      <div key={subtask.id} className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-xl border border-white/5 group">
                        <button
                          type="button"
                          onClick={() => toggleSubtask(subtask.id)}
                          className={`transition-colors ${subtask.completed ? 'text-emerald-500' : 'text-slate-500'}`}
                        >
                          {subtask.completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                        </button>
                        <span className={`flex-1 text-sm ${subtask.completed ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
                          {subtask.title}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeSubtask(subtask.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-500 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex gap-3 sticky bottom-0 bg-slate-900 pb-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 rounded-xl border border-white/10 text-slate-300 font-semibold hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all"
                  >
                    {taskToEdit ? 'Save Changes' : 'Create Task'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TaskModal;

