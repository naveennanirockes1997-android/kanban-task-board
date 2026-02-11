export const initialTasks = [
  {
    id: "task-1",
    title: "Project Setup",
    description: "Initialize Vite, Tailwind, and Framer Motion.",
    status: "done",
    priority: "high",
    subtasks: [
      { id: 1, title: "Install Vite", completed: true },
      { id: 2, title: "Configure Tailwind", completed: true },
      { id: 3, title: "Add Lucide Icons", completed: true }
    ],
    createdAt: "2026-02-10",
  },
  {
    id: "task-2",
    title: "Design & Features",
    description: "Create glassmorphic task cards and board layout with subtasks.",
    status: "in-progress",
    priority: "medium",
    subtasks: [
      { id: 4, title: "Glassmorphic Cards", completed: true },
      { id: 5, title: "Subtask Support", completed: true },
      { id: 6, title: "Search & Stats", completed: false }
    ],
    createdAt: "2026-02-10",
  },
  {
    id: "task-3",
    title: "Drag & Drop",
    description: "Implement Framer Motion drag and drop functionality.",
    status: "todo",
    priority: "high",
    subtasks: [
      { id: 7, title: "Setup drag constraints", completed: false },
      { id: 8, title: "Handle drop events", completed: false }
    ],
    createdAt: "2026-02-10",
  },
  {
    id: "task-4",
    title: "Persistence",
    description: "Sync with LocalStorage for data persistence.",
    status: "todo",
    priority: "low",
    subtasks: [],
    createdAt: "2026-02-10",
  }
];

