
import Login from '../pages/Login';
import Project from '../pages/Project';
import Projects from '../pages/Projects';
import Task from '../pages/Task';
import Tasks from '../pages/Tasks';
import PageNotFound from '../pages/NotFound';


export const routes = [
    {
  path: '/',
  element: <Login />,
  errorElement: <PageNotFound />,
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
  path: '/login',
  element: <Login />,
  }
]

