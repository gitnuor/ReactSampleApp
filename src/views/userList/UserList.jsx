import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Modal } from 'react-bootstrap';
import CIcon from '@coreui/icons-react';
import { cilPencil, cilTrash } from '@coreui/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

const style = {
  pencil: {
    cursor: 'pointer',
    marginLeft: '10px',
  },
};

const UserList = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [Id, setId] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setId(id);
  };

  const handleButtonDeleteClick = () => {
    debugger;
    axios.post('http://localhost:15045/api/User/Delete', { user_id: Id })
      .then((response) => {
        setData(data.filter(user => user.user_id !== Id));  // Remove the deleted user from the state
        setShow(false);
      })
      .catch((error) => {
        console.error('There was an error deleting the user!', error);
      });
  };

  useEffect(() => {
    debugger;
    axios.get('http://localhost:15045/api/User/getALL')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the user data!', error);
      });
  }, []);

  const columns = [
    {
      name: 'Action',
      cell: (row) => (
        <>
          <Link to='/UserCreate'>
            <span onClick={() => localStorage.setItem('id', row.user_id)}>
              <CIcon icon={cilPencil} />
            </span>
          </Link>
          <span style={style.pencil} onClick={() => handleShow(row.user_id)}>
            <CIcon icon={cilTrash} />
          </span>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
      name: 'ID',
      selector: row => row.user_id,
      sortable: true,
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Gender',
      selector: row => row.gender,
      sortable: true,
    },
  ];

  return (
    <div className='App'>
      <div className='mb-3'>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>User</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this record?</Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='danger' onClick={handleButtonDeleteClick}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        <Link to='/UserCreate'>
          <Button variant='primary'>Create User</Button>
        </Link>
      </div>

      <DataTable
        title='User Information'
        columns={columns}
        data={data}
        pagination
        highlightOnHover
      />
    </div>
  );
};

export default UserList;
