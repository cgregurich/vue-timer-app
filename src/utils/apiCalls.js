export async function fetchTasks() {
  const res = await fetch('api/tasks');
  const tasks = await res.json();
  return tasks;
}

export async function fetchTask(id) {
  const tasks = await fetchTasks();
  return await tasks.filter(task => task.id === id)[0];
}

export async function fetchTaskName(id) {
  const task = await fetchTask(id);
  return task[0].name;
}

export async function addTask(newTask) {
  const res = await fetch('api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTask)
  });
  return res;
}

export async function deleteTask(id) {
  const res = await fetch(`api/tasks/${id}`, {
    method: 'DELETE'
  });
  return res;
}

export async function updateTask(task) {
  const res = await fetch(`api/tasks/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  });
  return res;
}

export async function fetchSessions() {
  const res = await fetch('api/sessions');
  const sessions = await res.json();
  return sessions;
}

export async function addSession(session) {
  const res = await fetch('api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(session)
  });
  return res.json();
}

export async function deleteAllSessions() {
  const sessions = await fetchSessions();
  const allIds = sessions.map(s => s.id);
  for (let id of allIds) {
    console.log(`delete id ${id}`);
    await fetch(`api/sessions/${id}`, {
      method: 'DELETE'
    });
  }
  return 'foo';
}