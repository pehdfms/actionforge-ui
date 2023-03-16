import "./App.css";
import { Content } from "./components/Content";
import { Footer } from "./components/Footer";
import { Graph } from "./components/Graph";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="page">
      <Header />
      <Content>
        <Graph />
      </Content>
      <Footer />
    </div>
  );
}

export default App;
