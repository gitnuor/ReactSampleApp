import { React, useState } from 'react'
import { Form, Button,Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

//import { CToast, CToastBody } from '@coreui/react'

// const TosterMessage = () => {
//     return (
//         <>
//             <CToast autohide={false} visible={true}>
//                 <CToastBody>
//                     Hello, world! This is a toast message.
//                 </CToastBody>
//             </CToast>
//         </>
//     );
// }
const style={
    "userCreateCard":{
      "marginBottom": "20px",
      "marginTop":"20px",
      },
      "gotoButton":{
        "marginLeft": "30px",
    }
   
  }


const UserCreate = () => {
    
    const[Id, setId] = useState(-99);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(false);
    const [gender, setGender] = useState("");
    const buttonName= Id===-99? "Create": "Update"
    const [show, setShow] = useState(false);
    const [bodyText, setBodyText] = useState('');

  
    const handleClose = () => {
      setShow(false);
    }


    const saveUserInformation = () => {
        debugger;
        //console.log(gender);
        //let status = status === true ? 1 : 0;
        // console.log(Id);
        if(name !== "" && email !== "" && gender !== ""){
            const url = Id !== -99 
            ? 'http://localhost:15045/api/User/Update'  // Update URL
            : 'http://localhost:15045/api/User/Insert'; // Insert URL
            axios.post(url, {
                user_id: Id,
               name,
               email,
               status,
               gender
           }).then((response)=>{
               console.log(response);
               setBodyText('Record has been ' + (Id !== -99 ? 'updated' : 'created') + '.');
               //setBodyText('Record has been '+ buttonName +'d.');
               setShow(true);
               setId(-99)
               setName('');
               setEmail('');
               setStatus(false);
               setGender("");
              
               
           });
        }
        else{
            setBodyText('All fields are mendatory. Could not create the record.');
            setShow(true);
        }
        
    }
        const id=localStorage.getItem('id');
        // console.log(id);
        if(id != null){
            debugger;
            axios.post('http://localhost:15045/api/User/GetbyId', {
                user_id: id
              }).then((response) => {
                
                setId(id);
                setName(response.data[0].name);
                setEmail(response.data[0].email);
                setStatus(response.data[0].status);
                setGender(response.data[0].gender);
                
                // response.status="200"?userData():0;
              });    
              localStorage.removeItem('id');
              setId(-99)
              setName('');
              setEmail('');
              setStatus(false);
              setGender("");
        }
        
     
   
    
    return (
        <div className="App">
            <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>User</Modal.Title>
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
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder='Full Name' value={name} onChange={(e) => setName(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGender">
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Select value={gender} onChange={(e) => setGender(e.target.value)}>
                                        <option value="">--- Select Gender ---</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </Form.Select>  
                                    </Form.Group>
                                <Form.Group className="mb-3" controlId="formAggree">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Check type="checkbox" checked={status} label={status ? "Active" : "Inactive"} onChange={(e) => setStatus(!status)} />
                                </Form.Group>
                                <Button variant="primary" type="button" onClick={saveUserInformation}>
                                    {buttonName} User
                                    {/* Save User */}
                                </Button>
                               
                                <Link to='/userList'>
                                <Button variant="danger"  type="button" style={style.gotoButton}>
                                   Go to List
                                </Button>
                                </Link>
                            </Form>
                        </div>
                        <div className="col-md-1"></div>
                    </div>
                </div>
                
                {/* {delStatus ? <TosterMessage /> : ""} */}

            </div>
        </div>
    );

    
}

export default UserCreate
