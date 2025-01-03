window.addEventListener("load", async () => {
  const parentContainer = document.getElementById("todos-list");

  try {
    const response = await fetch("/api/todos");

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    json.data.forEach((todo) => {
      const todoContainer = document.createElement("div");
      const todoName = document.createTextNode(todo.taskName);

      todoContainer.appendChild(todoName);
      parentContainer.appendChild(todoContainer);
    });
    console.log(json);
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

      const todoContainer = document.createElement("div");
      const todoName = document.createTextNode(createTxt.value);

      todoContainer.appendChild(todoName);
      parentContainer.appendChild(todoContainer);

      createTxt.value = "";
    } catch (error) {
      console.error(error.message);
    }
  });
});
