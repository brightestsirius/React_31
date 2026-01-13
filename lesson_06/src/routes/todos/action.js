import service from "../../services/todos.service";

const todosAction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const completed = formData.get("completed") === "on";

  return await service.post({ title, completed });
};

export default todosAction;
