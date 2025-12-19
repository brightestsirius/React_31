const domContainer = document.querySelector("#root");
const root = ReactDOM.createRoot(domContainer);

// const heading_1 = React.createElement('h1', {className: `heading_1`}, `Hello, world!`);
// const heading_2 = React.createElement('h2', {className: `heading_2`}, `Description`);
// const container = React.createElement('div', null, heading_1, heading_2);

const heading_1 = `Hello, world!`;
const animals = [`cat`, `dog`, `lion`];
const users = [
  {
    id: 1,
    name: `User 1`,
    age: 10,
  },
  {
    id: 2,
    name: `User 2`,
    age: 20,
  },
  {
    id: 3,
    name: `User 3`,
    age: 30,
  },
];

const List = ({ list }) => {
  return Array.isArray(list) ? (
    <ul>
      {list.map(({ id, ...rest }) => (
        <li key={id}>
          <ul>
            {Object.entries(rest).map(([key, value]) => (
              <li key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  ) : null;
};

const App = () => {
  return (
    <React.Fragment>
      <h1>{heading_1}</h1>
      <h2>Description</h2>

      <List list={users} />
      <List />
    </React.Fragment>
  );
};

root.render(<App />);
