import { useCallback, useEffect, useState } from "react";

import { httpGetProjects } from "./requests";

function useProjects() {
  const [projects, saveProjects] = useState([]);

  const getProjects = useCallback(async () => {
    const fetchedProjects = await httpGetProjects();
    saveProjects(fetchedProjects);
  }, []);

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  return projects;
}

export default useProjects;