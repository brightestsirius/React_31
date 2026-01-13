import service from "../../services/todos.service";

const todosItemLoader = async ({ params }) => {
  // params = {id}
  return service.get(params.id);
};

export default todosItemLoader;
