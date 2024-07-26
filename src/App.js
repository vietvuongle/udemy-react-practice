import "./App.scss";
import Header from "./component/Header";
import TableUsers from "./component/TableUser";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <div className="app-container">
      <Header />

      <Container>
        <TableUsers />
      </Container>
    </div>
  );
}

export default App;
