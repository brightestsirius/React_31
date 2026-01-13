import service from "../../services/todos.service";

const todoItemLoader = async ({ params }) => {
  try {
    return await service.get(params.id);
  } catch (error) {
    throw new Response(error);
  }
};

export default todoItemLoader;
