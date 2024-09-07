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

const ProjectList = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [Id, setId] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setId(id);
  };

  useEffect(() => {
    axios.get('http://localhost:15045/api/Project/getALL')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the project data!', error);
      });
  }, []);

  const handleButtonDeleteClick = () => {
    axios.post('http://localhost:15045/api/Project/Delete', { Id })
      .then((response) => {
        setData(data.filter(project => project.ID !== Id));  // Remove the deleted project from the state
        setShow(false);
        alert('Project has been deleted.');
      })
      .catch((error) => {
        console.error('There was an error deleting the project!', error);
      });
  };

  const columns = [
    {
      name: 'Action',
      cell: (row) => (
        <>
          <Link to='/ProjectCreate'>
            <span onClick={() => localStorage.setItem('pid', row.ID)}>
              <CIcon icon={cilPencil} />
            </span>
          </Link>
          <span style={style.pencil} onClick={() => handleShow(row.ID)}>
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
      selector: row => row.ID,
      sortable: true,
    },
    {
      name: 'Project Name',
      selector: row => row.PName,
      sortable: true,
    },
    {
      name: 'Project Owner',
      selector: row => row.POwner,
      sortable: true,
    },
    {
      name: 'Project Description',
      selector: row => row.Desc,
      sortable: true,
    },
    {
      name: 'Project Type',
      selector: row => row.PType,
      sortable: true,
    },
  ];

  return (
    <div className="App">
      <div className='mb-3'>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this record?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={handleButtonDeleteClick}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        <Link to='/ProjectCreate'>
          <Button variant="primary">Create Project</Button>
        </Link>
      </div>

      <DataTable
        title="Project Information"
        columns={columns}
        data={data}
        pagination
        highlightOnHover
      />
    </div>
  );
};

export default ProjectList;
