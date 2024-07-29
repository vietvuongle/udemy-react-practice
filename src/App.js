import './App.scss';
import Header from './component/Header';
import TableUsers from './component/TableUser';
import Container from 'react-bootstrap/Container';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <>
            <div className="app-container">
                <Header />

                <Container>
                    <TableUsers />
                </Container>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}

export default App;
