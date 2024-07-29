import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';
import _ from 'lodash'

const TableUsers = (props) => {
    const [listUsers, setListUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({})


    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEdit(false)
    };

    const handleEditUserFromModal = (user) => {
        let clonelistUsers = _.cloneDeep(listUsers)
        let index = listUsers.findIndex(item => item.id === user.id)
        clonelistUsers[index].first_name = user.first_name
        setListUsers(clonelistUsers)
    }

    const getUsers = async (page) => {
        let res = await fetchAllUser(page);

        if (res && res.data) {
            setListUsers(res.data);
            setTotalPages(res.total_pages);
        }
    };

    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers]);
    };

    useEffect(() => {
        getUsers(1);
    }, []);

    const handlePageClick = (event) => {
        getUsers(+event.selected + 1);
    };

    const handleEditUser = (user) => {
        setDataUserEdit(user)
        setIsShowModalEdit(true)
    }

    return (
        <>
            <div className="my-3 add-new">
                <span>
                    <b>List users</b>
                </span>
                <button className="btn btn-success" onClick={() => setIsShowModalAddNew(true)}>
                    {' '}
                    Add new user
                </button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers &&
                        listUsers.length > 0 &&
                        listUsers.map((item, index) => {
                            return (
                                <tr key={`users-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>
                                        <button 
                                            className='btn btn-warning mx-3'
                                            onClick={() => handleEditUser(item)}
                                        >Edit</button>
                                        <button className='btn btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
            />

            <ModalAddNew 
                show={isShowModalAddNew} 
                handleClose={handleClose} 
                handleUpdateTable={handleUpdateTable} 
            />

            <ModalEditUser 
                show={isShowModalEdit}
                handleClose={handleClose} 
                dataUserEdit={dataUserEdit}
                handleEditUserFromModal={handleEditUserFromModal}
            />
        </>
    );
};

export default TableUsers;
