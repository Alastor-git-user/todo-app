const deleteTodoApi = async (todoId, deleteBtn) => {
  try {
    const response = await fetch(`/api/todos/${todoId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    if (json.status === "202") {
      deleteBtn.parentNode.remove();
    }
  } catch (error) {
    console.error(error.message);
  }
};

const completeTodoApi = async (todo, completeBtn) => {
  try {
    const response = await fetch(`/api/todos/${todo.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ complete: `${!todo.completedAt}` }),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    if (json.status === "203") {
      completeBtn.innerHTML = json.data.completedAt ? "uncheck" : "check";
    }
  } catch (error) {
    console.error(error.message);
  }
};

const createTodoHtml = (todo, parent) => {
  const todoContainer = document.createElement("div");
  const todoName = document.createTextNode(todo.taskName);
  const deleteBtn = document.createElement("button");
  const deleteTxt = document.createTextNode("X");
  const completeBtn = document.createElement("button");
  const completeTxt = document.createTextNode(
    todo.completedAt ? "uncheck" : "check",
  );

  deleteBtn.appendChild(deleteTxt);
  deleteBtn.addEventListener("click", async () => {
    await deleteTodoApi(todo.id, deleteBtn);
  });
  completeBtn.appendChild(completeTxt);
  completeBtn.addEventListener("click", async () => {
    await completeTodoApi(todo, completeBtn);
  });
  todoContainer.dataset.todoId = todo.id;
  todoContainer.appendChild(completeBtn);
  todoContainer.appendChild(todoName);
  todoContainer.appendChild(deleteBtn);
  parent.appendChild(todoContainer);
};

window.addEventListener("load", async () => {
  const parentContainer = document.getElementById("todos-list");

  try {
    const response = await fetch("/api/todos");

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    json.data.forEach((todo) => {
      createTodoHtml(todo, parentContainer);
    });
  } catch (error) {
    console.error(error.message);
  }

  // add event click for create-btn
  document.getElementById("create-btn").addEventListener("click", async () => {
    const createTxt = document.getElementById("create-txt");

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskName: createTxt.value }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();

      createTodoHtml(json.data, parentContainer);

      createTxt.value = "";
    } catch (error) {
      console.error(error.message);
    }
  });
});
