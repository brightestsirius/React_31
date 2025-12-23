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
    id: 2,
    type: `lion`,
    name: `Simba`,
  },
];

rootContainerReact.render(
  <React.Fragment>
    <ul>
      {users.map((item) => (
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
  </React.Fragment>
);
