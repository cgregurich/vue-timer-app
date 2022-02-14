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

export async function fetchSessionsSortByTaskName() {
  let sessions = await fetchSessions();
  console.log(sessions);
  sessions.sort((a, b) => a.name < b.name);
  return sessions.sort((a,b) => a.taskName < b.taskName ? -1 : 1);
}

export async function getSessionTotals() {
  // returns object of format: {task1: <totalTime>, task2: <totalTime>}
  const sessions = await fetchSessions();
  const totals = {};
  for (let session of sessions) {
    if (totals[session.taskName]) totals[session.taskName] += session.timeElapsed; 
    else totals[session.taskName] = session.timeElapsed;
  }
  console.log(totals);
  return totals;
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