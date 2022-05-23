import {
  Navbar,
  Welcome,
  Footer,
  Services,
  Transactions,
  Estadisticas,
  News
} from "./componentes";
//Importamos millify para hacer los números mas pequeños
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
        <Estadisticas simplified={true} />
        <News simplified={true} />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  );
};

export default App;
