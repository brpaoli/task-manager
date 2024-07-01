import App from '../App';
import Login from '../pages/Login';
import Project from '../pages/Project';
import Projects from '../pages/Projects';
import Task from '../pages/Task';
import Tasks from '../pages/Tasks';
import Trash from '../pages/Trash';
import PageNotFound from '../pages/NotFound';
import Dashboard from '../pages/Dashboard';

export const routes = [
    {
  path: '/',
  element: <App />,
  errorElement: <PageNotFound />,
  },
  {
  path: '/dashboard',
  element: <Dashboard />,
  },
  {
  path: '/projects',
  element: <Projects />,
  },
  {
  path: '/projects/:projectId',
  element: <Project />,
  },
  {
    path: '/tasks',   
    element: <Tasks />,
  },
  {
  path: '/tasks/:taskId',
  element: <Task />,
  },
  {
  path: '/trash',
  element: <Trash />,
  },
  {
  path: '/login',
  element: <Login />,
  }
]

