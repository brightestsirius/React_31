const rootContainer = document.querySelector(`#root`);
const rootContainerReact = ReactDOM.createRoot(rootContainer);

const heading_1 = React.createElement(
  `h1`,
  { id: `heading`, className: `heading` },
  `Hello, world`
);

const heading_1_jsx = (
  <h1 id="heading" className="heading">
    Hello, world!!!
  </h1>
);
const heading_2 = (
  <h2 id="heading" className="heading">
    Description
  </h2>
);

const animals = [`cat`, `dog`, `lion`, `lion`];

const users = [
    {
        id: 1,
        name: `User_1`,
        age: 10
    },
    {
        id: 2,
        name: `User_2`,
        age: 20
    },
    {
        id: 3,
        name: `User_3`,
        age: 30
    }
]

rootContainerReact.render(
  <React.Fragment>
    <React.Fragment>
      {heading_1_jsx}
      {heading_2}
    </React.Fragment>
    <hr></hr>
    <React.Fragment>
      {heading_1_jsx}
      {heading_2}
    </React.Fragment>

    <ul>
        {animals.map((item, index) => <li key={index}>{item}</li>)}
    </ul>

    <ul>
        {users.map(item => <li key={item.id}>Name: {item.name}, Age: {item.age}</li>)}
    </ul>

    <ul>
        {
            users.map(item => <li key={item.id}>
                <ul>
                    {Object.entries(item).map(([key, value]) => <li key={key}>{key}: {value}</li>)}
                </ul>
            </li>)
        }
    </ul>

    {10>5 ? <h1>Hello</h1> : <h2>No</h2>}
  </React.Fragment>
);

{/* <ul>
    <li>
        <ul>
            <li>id: 1</li>
            <li>name: User_1</li>
            <li>age: 10</li>
        </ul>
    </li>
    <li>
        <ul>
            <li>id: 1</li>
            <li>name: User_1</li>
            <li>age: 10</li>
        </ul>
    </li>
</ul> */}