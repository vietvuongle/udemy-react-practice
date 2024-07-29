import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../services/UserService';
import { toast } from 'react-toastify';


function ModalConfirm(props) {
    const { show, handleClose, dataUserDelete, handleDeleteUserFromModal} = props;

    const confirmDelete = async () => {
        let res = await deleteUser(dataUserDelete.id)
        if(res && res.statusCode){
            toast.success('Delete successful')
            handleClose()
            handleDeleteUserFromModal(dataUserDelete)
        } else{
            toast.error('Delete unsuccessful')
        }
    }

    return (
        <>
            <Modal 
                backdrop='static'
                keyboard={false}
                show={show} 
                onHide={handleClose}>
                    
                <Modal.Header closeButton>
                    <Modal.Title>Delete a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        Do you want delete user have email is: <b>{dataUserDelete.email}</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button 
                        onClick={() => confirmDelete()}
                        variant="primary">
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalConfirm;
