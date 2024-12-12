const { readFileSync } = require("fs");
const { createServer } = require("http");
const { parse } = require("url");
const { renderToString } = require("react-dom/server");
const React = require("react");

const htmlTemplate = readFileSync(`${__dirname}/index.html`, "utf8");
const clientJs = readFileSync(`${__dirname}/client.js`, "utf8");

const server = createServer((req, res) => {
  const pathname = parse(req.url, true).pathname;
  if (pathname === "/") {
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    const renderedHtml = renderToString(<Home />);
    const html = htmlTemplate.replace("%%content%%", renderedHtml);
    res.end(html);
    return;
  } else if (pathname === "/client.js") {
    res.writeHead(200, {
      "Content-Type": "application/javascript",
    });
    res.end(clientJs);
    return;
  } else {
    res.end("The path cannot be found");
  }
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});

const pizzas = [
  {
    name: "Focaccia",
    price: 6,
  },
  {
    name: "Pizza Margherita",
    price: 10,
  },
  {
    name: "Pizza Spinaci",
    price: 12,
  },
  {
    name: "Pizza Funghi",
    price: 12,
  },
  {
    name: "Pizza Prosciutto",
    price: 15,
  },
];

function Home() {
  return (
    <div>
      <h1>🍕 Fast React Pizza Co.</h1>
      <p>This page has been rendered with React on the server 🤯</p>

      <h2>Menu</h2>
      <ul>
        {pizzas.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.name} />
        ))}
      </ul>
    </div>
  );
}

function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
      <span>{count}</span>
    </div>
  );
}

function MenuItem({ pizza }) {
  return (
    <li>
      <h4>
        {pizza.name} (${pizza.price})
      </h4>
      <Counter />
    </li>
  );
}
