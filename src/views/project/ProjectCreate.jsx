import { React, useState } from 'react'
import { Form, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';


const style={
    "userCreateCard":{
      "marginBottom": "20px",
      "marginTop":"20px",
      },
   
      "gotoButton":{
          "marginLeft": "30px",
      }
  }

const ProjectCreate = () => {
    const[Id, setId] = useState(-99);
    const [pname, setPName] = useState('');
    const [powner, setPOwner] = useState('');
    const [desc, setDesc] = useState("");
    const [ptype, setPType] = useState('');
    const [status, setStatus] = useState(false);
    const buttonName= Id===-99? "Create": "Update"
    const [show, setShow] = useState(false);
    const [bodyText, setBodyText] = useState('');

  
    const handleClose = () => {
      setShow(false);
    }

    const saveProjectInformation = () => {

        if(pname !=="" && powner !=="" && desc !=="" && ptype !== ""){
            axios.post('http://localhost:15045/api/Project/Insert', {
               Id,
               pname,
               powner,
               desc,
               ptype,
               status
           }).then((response)=>{
               console.log(response);
               setBodyText('Record has been '+ buttonName +'d.');
               setShow(true);
               setId(-99)
               setPName('');
               setPOwner('');
               setDesc("");
               setPType("");
               setStatus(false);
           });   
        }
        else{
            setBodyText('All fields are mendatory. Could not create the record.');
            setShow(true);
        }
    }


    const id=localStorage.getItem('pid');

    if(id != null){
        axios.post('http://localhost:15045/api/Project/GetbyId', {
            id
          }).then((response) => {
            
            setId(id);
            setPName(response.data[0].PName);
            setPOwner(response.data[0].POwner);
            setDesc(response.data[0].Desc);
            setPType(response.data[0].PType);
            setStatus(response.data[0].Status);
            
            // response.status="200"?userData():0;
          });    
          localStorage.removeItem('pid');
          setId(-99)
          setPName('');
          setPOwner('');
          setDesc("");
          setPType("");
          setStatus(false);
    }


    return(
        <div className="App">
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Project</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>{bodyText}</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>


            <div className="card">
                <div style={style.userCreateCard} className="container">
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                            <Form>
                                <Form.Group className="mb-3" controlId="formProjectName">
                                    <Form.Label>Project Name</Form.Label>
                                    <Form.Control trype="text" placeholder="Project Name" value={pname} onChange={(e) => setPName(e.target.value)}></Form.Control>
                                </Form.Group> 
                                <Form.Group className="mb-3" controlId="formProjectOwner">
                                    <Form.Label>Project Owner Name</Form.Label>
                                    <Form.Control trype="text" placeholder="Project Owner name" value={powner} onChange={(e) => setPOwner(e.target.value)}></Form.Control>
                                </Form.Group> 
                                <Form.Group className="mb-3" controlId="formProjectDesc">
                                    <Form.Label>Project Description</Form.Label>
                                    <Form.Control type="textArea" placeholder="Project Description" value={desc} onChange={(e) => setDesc(e.target.value)}></Form.Control>
                                </Form.Group> 
                                <Form.Group className="mb-3" controlId="formProjectType">
                                    <Form.Label>Project Type</Form.Label>
                                    <Form.Select value={ptype} onChange={(e) => setPType(e.target.value)}>
                                        <option value="">--- Select Type ---</option>
                                        <option value="Easy">Easy</option>
                                        <option value="Moderate">Moderate</option>
                                        <option value="Hard">Hard</option>
                                        <option value="Very Hard">Very Hard</option>
                                    </Form.Select>
                                </Form.Group> 
                                <Form.Group className="mb-3" controlId="formStatus">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Check type="checkbox" checked={status} label={status ? "Active" : "Inactive"} onChange={(e) => setStatus(!status)} />
                                </Form.Group>
                                <Button variant="primary" type="button" onClick={saveProjectInformation}>
                                    {buttonName}
                                </Button>
                                
                                <Link to="/ProjectList">
                                    <Button variant="danger" type="button" style={style.gotoButton}>
                                        Go to List
                                    </Button>
                                </Link>
                            </Form>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectCreate