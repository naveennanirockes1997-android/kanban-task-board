const STORAGE_KEY = "kanban_tasks";

export const getStoredTasks = () => {
  const tasks = localStorage.getItem(STORAGE_KEY);
  return tasks ? JSON.parse(tasks) : null;
};

export const saveTasks = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};
