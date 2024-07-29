import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putUpdateUser } from '../services/UserService';
import { toast } from 'react-toastify';

function ModalEditUser(props) {
    const { show, handleClose, dataUserEdit, handleEditUserFromModal} = props;

    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const handleEditUser = async () => {
        let res = await putUpdateUser(name, job)
        if(res && res.updatedAt){
            handleEditUserFromModal({
                first_name: name,
                id: dataUserEdit.id
            })
        }
        handleClose()
        toast.success('Apdate user succsess')
    }

    useEffect(() => {
        if(show){
            setName(dataUserEdit.first_name)
        }
    }, [show, dataUserEdit])

    return (
        <>
            <Modal 
                backdrop='static'
                keyboard={false}
                show={show} 
                onHide={handleClose}>
                    
                <Modal.Header closeButton>
                    <Modal.Title>Edit a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Job</label>
                            <input
                                type="text"
                                className="form-control"
                                value={job}
                                onChange={(event) => setJob(event.target.value)}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditUser}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditUser;
