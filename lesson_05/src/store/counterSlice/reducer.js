const initialState = {
  counter: 0,
  color: `red`,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case COUNTER_DECREMENT:
      return { ...state, counter: state.counter - 1 };
    case COUNTER_INCREMENT:
      return { ...state, counter: state.counter + 1 };
    case COUNTER_ADD_VALUE:
      return { ...state, counter: payload };
    default:
      return state;
  }
};

const COUNTER_DECREMENT = `COUNTER_DECREMENT`;
const COUNTER_INCREMENT = `COUNTER_INCREMENT`;
const COUNTER_ADD_VALUE = `COUNTER_ADD_VALUE`;

export {
  reducer,
  initialState,
  COUNTER_DECREMENT,
  COUNTER_INCREMENT,
  COUNTER_ADD_VALUE,
};
