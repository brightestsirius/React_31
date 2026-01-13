import service from "../../services/todos.service";

const todosLoader = async () => {
  try {
    return await service.get();
  } catch (err) {
    throw new Error(err);
  }
};

export default todosLoader;
