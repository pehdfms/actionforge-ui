import "./App.css";
import { Content } from "./components/Content";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="page">
      <Header />
      <Content>
        <a>TODO</a>
      </Content>
      <Footer />
    </div>
  );
}

export default App;
