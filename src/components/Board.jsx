import React, { useState, useEffect, useMemo } from 'react';
import { initialTasks } from '../data/initialTasks';
import { getStoredTasks, saveTasks } from '../utils/storage';
import Column from './Column';
import Header from './Header';
import TaskModal from './TaskModal';

const Board = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [defaultStatus, setDefaultStatus] = useState('todo');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeColumn, setActiveColumn] = useState(null);

  useEffect(() => {
    const stored = getStoredTasks();
    if (stored) {
      setTasks(stored);
    } else {
      setTasks(initialTasks);
      saveTasks(initialTasks);
    }
  }, []);

  const handleAddTask = (status = 'todo') => {
    setTaskToEdit(null);
    setDefaultStatus(status);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const updatedTasks = tasks.filter((t) => t.id !== taskId);
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all tasks? This cannot be undone.')) {
      setTasks([]);
      saveTasks([]);
    }
  };

  const handleSaveTask = (taskData) => {
    let updatedTasks;
    if (taskToEdit) {
      updatedTasks = tasks.map((t) => (t.id === taskData.id ? taskData : t));
    } else {
      updatedTasks = [...tasks, taskData];
    }
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleDrop = (taskId) => {
    if (!taskId || !activeColumn) return;
    
    const updatedTasks = tasks.map((t) => {
      if (t.id === taskId) {
        return { ...t, status: activeColumn };
      }
      return t;
    });
    
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const query = searchQuery.toLowerCase();
      return (
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    });
  }, [tasks, searchQuery]);

  const stats = useMemo(() => ({
    total: tasks.length,
    done: tasks.filter(t => t.status === 'done').length
  }), [tasks]);

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-slate-200">
      <Header 
        onAddTask={handleAddTask} 
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        stats={stats}
        onClearAll={handleClearAll}
      />
      
      <main className="flex-1 p-8 overflow-x-auto custom-scrollbar bg-slate-950/20">
        <div className="flex gap-8 min-w-max h-full">
          {['todo', 'in-progress', 'done'].map((status) => (
            <Column
              key={status}
              title={status.replace('-', ' ')}
              status={status}
              tasks={filteredTasks.filter((t) => t.status === status)}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onMouseEnter={() => setActiveColumn(status)}
              onMouseLeave={() => setActiveColumn(null)}
              onDragEnd={handleDrop}
              onAddTask={handleAddTask}
            />
          ))}
        </div>
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
        defaultStatus={defaultStatus}
      />
    </div>
  );
};

export default Board;

