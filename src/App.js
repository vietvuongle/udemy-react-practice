import { useState } from 'react';
import './App.scss';
import Header from './component/Header';
import ModalAddNew from './component/ModalAddNew';
import TableUsers from './component/TableUser';
import Container from 'react-bootstrap/Container';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';

function App() {
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const handleClose = () => {
        setIsShowModalAddNew(false);
    };

    return (
        <>
            <div className="app-container">
                <Header />

                <Container>
                    <div className="my-3 add-new">
                        <span>
                            <b>List users</b>
                        </span>
                        <button className="btn btn-success" onClick={() => setIsShowModalAddNew(true)}>
                            {' '}
                            Add new user
                        </button>
                    </div>
                    <TableUsers />
                </Container>
                <ModalAddNew show={isShowModalAddNew} handleClose={handleClose} />
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
