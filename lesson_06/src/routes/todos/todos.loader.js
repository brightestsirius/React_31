import service from "../../services/todos.service";

const todosLoader = async () => {
  try {
    return await service.get();
  } catch (error) {
    throw new Response(error);
  }
};

export default todosLoader;
