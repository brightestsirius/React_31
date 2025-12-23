const rootContainer = document.querySelector(`#root`);
const rootContainerReact = ReactDOM.createRoot(rootContainer);

const users = [
  {
    id: 1,
    name: `User_1`,
    age: 10,
  },
  {
    id: 2,
    name: `User_2`,
    age: 20,
  },
  {
    id: 3,
    name: `User_3`,
    age: 30,
  },
];

const animals = [
  {
    id: 1,
    type: `cat`,
    name: `Tom`,
  },
  {
    id: 2,
    type: `dog`,
    name: `Jack`,
  },
  {
    id: 3,
    type: `lion`,
    name: `Simba`,
  },
];

const List = ({ list, color }) => {
  const styles = { backgroundColor: color };

  return Array.isArray(list) ? (
    <ul style={styles}>
      {list.map((item) => (
        <li key={item.id}>
          <ul>
            {Object.keys(item)
              .filter((item) => item !== `id`)
              .map((key) => (
                <li key={key}>
                  {key}: {item[key]}
                </li>
              ))}
          </ul>
        </li>
      ))}
    </ul>
  ) : null;
};

const App = () => {
  <React.Fragment>
    <List list={users} color={"crimson"} />
    <List list={animals} />
    <List />
  </React.Fragment>;
};

rootContainerReact.render(<App />);
