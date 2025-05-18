import { useState, JSX } from "react";
import "./App.css";

import { Button } from "./components/index";
import { Home } from "./pages/Home";
import MillieReviews from "./projects/review/MillieReviews";
import MillieCareers from "./projects/signup/MillieCareers";

interface Display {
  key: string;
  label: string;
  component: JSX.Element;
  type: string;
}

const views: Display[] = [
  { key: "HOME", label: "Home", component: <Home />, type: "page" },
];

const components: Display[] = [
  { key: "BUTTON", label: "Button", component: <Button />, type: "component" },
];

const projects: Display[] = [
  {
    key: "MILLIEREVIEWS",
    label: "Millie's Reviews",
    component: <MillieReviews />,
    type: "project",
  },
  {
    key: "MILLECAREERS",
    label: "Millie Career Page",
    component: <MillieCareers />,
    type: "project",
  },
];

const allDisplays = [...views, ...components, ...projects].reduce(
  (acc, { key, component }) => {
    acc[key] = component;
    return acc;
  },
  {} as Record<string, JSX.Element>
);

function App() {
  let [display, setDisplay] = useState<string>("MILLECAREERS");

  return (
    <>
      <header className="header"> Millie's Lab </header>
      <nav className="side-bar">
        <ul>
          <h4>Views</h4>
          {views.map(({ key, label }) => (
            <li key={key} className="item">
              <div onClick={() => setDisplay(key)}>{label}</div>
            </li>
          ))}

          <h4>Components</h4>

          {components.map(({ key, label }) => (
            <li key={key} className="item">
              <div onClick={() => setDisplay(key)}>{label}</div>
            </li>
          ))}

          <h4>Mini Projects</h4>

          {projects.map(({ key, label }) => (
            <li key={key} className="item">
              <div onClick={() => setDisplay(key)}>{label}</div>
            </li>
          ))}
        </ul>
      </nav>
      <div className="display">{allDisplays[display]}</div>
      <footer className="footer"> Millie 2025 </footer>
    </>
  );
}

export default App;
