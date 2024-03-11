import React from 'react';
import { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import Paper from '@mui/material/Paper'; 
import {RiBillFill} from 'react-icons/ri'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import Table from 'react-bootstrap/Table';


 
const Createinvoice = () => {
  const [invoice, setInvoice] = useState([]);
  const [newInvoiceClass, setNewInvoiceClass] = useState('');
  const [newInvoiceFeeCa, setNewInvoiceFeeCa] = useState('');
  const [newInvoiceDate, setNewInvoiceDate] = useState('');
  // const [newOriginalAmount, setNewOriginalAmount] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [formattedGlance, setformattedGlance] = useState('');
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };


  const createInvoiceamount = async () => {
    if (newInvoiceClass && newInvoiceFeeCa) {
       console.log(newInvoiceClass);
      console.log(newInvoiceFeeCa);
      try {
        const response = await fetch('https://www.santhoshavidhyalaya.com/SVS/api/genschoolInvoiceView', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            std: newInvoiceClass,
            cat: newInvoiceFeeCa,
           }),
        });
        const data = await response.json();
        console.log(data);
        setTotalAmount(data.data[0].total); // Set the total value from the API response
         setformattedGlance(data.data[0].glance.replace(/<br>/g, '\n'));

        console.log(totalAmount);

        // Handle the response from the new API
      } catch (error) {
        console.log(error);
      }
    }
    // else {
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Please select both Class and Fee Category',
    //     showConfirmButton: false,
    //     timer: 1800,
    //   });
    // }
  }
  /////////  Create Input data ///////////////////
  const createInvoice = async () => {
    Swal.fire({
      icon: 'info',
      title: 'Please wait',
      text: 'Generating invoices for all students...',
      showConfirmButton: false,
      allowOutsideClick: false
    });
    try {
      const response = await fetch('https://www.santhoshavidhyalaya.com/SVS/api/geneachStdInvoiceView', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          std: newInvoiceClass,
          cat:newInvoiceFeeCa,
          due_date:newInvoiceDate,
          created_by: sessionStorage.getItem('user_id')
         }),
      });
      const data = await response.json();
      setInvoice([...invoice, data[0]]);
      console.log(data[0]);
      if (response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Unauthorized',
          text: 'You are not authorized to perform this action.',
          confirmButtonText: 'OK'
        });
        return;
      }
      Swal.fire({
        icon: 'success',
        title: 'Created successfully!',
        showConfirmButton: false,
        timer: 1800
      });
      
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while generating invoices.',
        confirmButtonText: 'OK'
      }); 
    }

    
  };
 

  return (
    <div>
       <div>
       
       <Sidebar/>
    <div style={{width:'82.5%',float:'right'}} >
      <Header/>
      <div className='container'>
          <h2 className='p-4' style={{fontFamily:'auto'}}><RiBillFill className="pe-1 pb-1" size={35} />Create Invoice</h2>
          <div className='py-1'>
          <Paper elevation={2} className="pb-5">
               <div className='p-4'>
                <h4>Create Invoice</h4><hr className='hrAdminDashboard'/>
                </div>
               <div>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Container>
                    <Row>
                      <Col>
                      <FloatingLabel controlId="floatingSelect" label="Select Class">
                        <Form.Select required
                          value={newInvoiceClass} onClick={createInvoiceamount}
                          onChange={(e) => setNewInvoiceClass(e.target.value)} aria-label="Floating label select example">
                            <option value='' disabled>Select Class</option>
                            <option value="lkg">LKG</option>
                            <option value="ukg">UKG</option>
                            <option value="1">I</option>
                            <option value="2">II</option>
                            <option value="3">III</option>
                            <option value="4">IV</option>
                            <option value="5">V</option>
                            <option value="6">VI</option>
                            <option value="7">VII</option>
                            <option value="8">VIII</option>
                            <option value="9">IX</option>
                            <option value="10">X</option>
                            <option value="11">XI</option>
                            <option value="12">XII</option>
                        </Form.Select>
                        </FloatingLabel>
                     </Col>
                     <Col>
                        <Form.Select required
                        value={newInvoiceFeeCa}
                        onChange={(e) => setNewInvoiceFeeCa(e.target.value)} onClick={createInvoiceamount} aria-label="Default select example" style={{width:'100%',height:'55px'}}>
                            <option value='' disabled>Select Fee Category</option>
                            <option value="school fees">School Fees</option>
                            <option value="Hostel Bill">Hostel Bill & Others</option>
                          </Form.Select>
                        </Col>
                    </Row>
                    
                    <Row className='pt-3'>
                      <Col xs={6} >
                        <Form.Label>Due Date</Form.Label>
                      <Form.Group className="mb-3">
                          <Form.Control value={newInvoiceDate} required 
                        onChange={(e) => setNewInvoiceDate(e.target.value)} type='date'style={{height:'56px'}} />
                        
                        </Form.Group>
                      </Col>
                      <Col>
                      {/* <Form.Group>
                        <div className="input-group">
                          <span className="input-group-text" style={{ backgroundColor: '#E9EDEE' }}>
                          <span style={{ color: 'red', fontSize: '1.5rem', fontWeight: 500 }}>₹</span>
                          </span>
                          <Form.Control
                            type="number"
                            placeholder="Enter amount"
                            value={totalAmount}
                            disabled
                            style={{ backgroundColor: '#E9EDEE', height: '58px' }}
                          />
                        </div>
                   </Form.Group> */}


                      </Col>
                    </Row>
                      {/* <Col>
                        <Row className='pb-3'>
                        <Form.Group>
                          <Form.Label>Total Amount Splitup:</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={formattedGlance}
                            readOnly />
                          </Form.Group>
                        </Row>
                        </Col> */}
                    {/* <Row className='pt-3'>
                      <Col>
                      <Form.Group>
                            <Form.Control  type="number" placeholder="Enter amount" value={originalAmount} onChange={handleOriginalAmountChange} style={{backgroundColor:'#E9EDEE',height:'58px'}} />
                          </Form.Group>
                      </Col>
                      <Col>
                      <FloatingLabel controlId="floatingPassword" label="Discount % (in percentage)">
                        <Form.Control value={discountPercentage} onChange={handleDiscountPercentageChange}  type="number" placeholder="Discount % (in percentage)" autoComplete='off'/>
                      </FloatingLabel>
                      </Col>
                      <Col xs={2} className='pt-2 text-center'>
                        <Button  className='py-2' style={{backgroundColor:'green'}}>% Apply Discount</Button>
                      </Col> 
                      <Col className='pt-2 '>
                          <Table striped bordered size="sm" style={{width:'10q0%'}}>
                          <tbody>
                            <tr>
                              <td  style={{textAlign:'center',paddingTop:'10px',backgroundColor:'#0C83DC',color:'aliceblue',width:'45%'}}>Discount Amount</td>
                              <td><h5 className='text-center pt-2'>₹  {discountedAmount}</h5></td>
                            </tr>
                          </tbody>
                      </Table>
                      </Col>
                    </Row> */}

                    <Button type="submit" onClick={createInvoice} className='bg-success'>Submit</Button>
                    </Container>
                </Form>
               </div>
          </Paper>

      
          </div>
        </div>
    
    </div>
    </div>
    </div>
  )
}



export default Createinvoice



// import React from 'react';
// import { useState, useEffect } from 'react';
// import Sidebar from '../Sidebar';
// import Header from '../Header';
// import Footer from '../Footer';
// import Paper from '@mui/material/Paper'; 
// import {RiBillFill} from 'react-icons/ri'
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import { Container } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
// import Swal from 'sweetalert2';
// import Table from 'react-bootstrap/Table';


// // const Createinvoice = (event) => {
// //   event.preventDefault();
// const Createinvoice = () => {

//   const [invoice, setInvoice] = useState([]);
//   const [newInvoiceClass, setNewInvoiceClass] = useState('');
//   const [newInvoiceFeeCa, setNewInvoiceFeeCa] = useState('');
//   const [newInvoiceDate, setNewInvoiceDate] = useState('');
//   // const [newOriginalAmount, setNewOriginalAmount] = useState('');
//   const [totalAmount, setTotalAmount] = useState('');
//   const [formattedGlance, setformattedGlance] = useState('');
//   const [show, setShow] = useState(false);
//   const [validated, setValidated] = useState(false);

//   const handleSubmit = (event) => {
//       event.preventDefault();

//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.preventDefault();
//       event.stopPropagation();
//     }

//     setValidated(true);
//   };


//   const createInvoiceamount = async () => {
//     if (newInvoiceClass && newInvoiceFeeCa) {
//        console.log(newInvoiceClass);
//       console.log(newInvoiceFeeCa);
//       try {
//         const response = await fetch('https://www.santhoshavidhyalaya.com/SVS/api/genschoolInvoiceView', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             std: newInvoiceClass,
//             cat: newInvoiceFeeCa,
//            }),
//         });
//         const data = await response.json();
//         console.log(data);
//         setTotalAmount(data.data[0].total); // Set the total value from the API response
//          setformattedGlance(data.data[0].glance.replace(/<br>/g, '\n'));

//         console.log(totalAmount);

//         // Handle the response from the new API
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     // else {
//     //   Swal.fire({
//     //     icon: 'error',
//     //     title: 'Please select both Class and Fee Category',
//     //     showConfirmButton: false,
//     //     timer: 1800,
//     //   });
//     // }
//   }
//   /////////  Create Input data ///////////////////
//   const createInvoice = async () => {
//     try {
//       const response = await fetch('https://www.santhoshavidhyalaya.com/SVS/api/geneachStdInvoiceView', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ 
//           std: newInvoiceClass,
//           cat:newInvoiceFeeCa,
//           due_date:newInvoiceDate,
//           created_by: sessionStorage.getItem('user_id')
//          }),
//       });
//       const data = await response.json();
//       setInvoice([...invoice, data[0]]);
//       console.log(data[0]);
//       // Swal.fire({
//       //   icon: 'success',
//       //   title: 'Created successfully !',
//       //   showConfirmButton: false,
//       //   timer: 1800
//       // })
//       setNewInvoiceClass('');
//       setNewInvoiceFeeCa('');
//       setNewInvoiceDate('');
//     } catch (error) {
//       console.log(error);
//     }

    
//   };
 

//   return (
//     <div>
//        <div>
       
//        <Sidebar/>
//     <div style={{width:'82.5%',float:'right'}} >
//       <Header/>
//       <div className='container'>
//           <h2 className='p-4' style={{fontFamily:'auto'}}><RiBillFill className="pe-1 pb-1" size={35} />Create Invoice</h2>
//           <div className='py-1'>
//           <Paper elevation={2} className="pb-5">
//                <div className='p-4'>
//                 <h4>Create Invoice</h4><hr className='hrAdminDashboard'/>
//                 </div>
//                <div>

//                 <Form noValidate validated={validated} onSubmit={handleSubmit}>
//                     <Container>
//                     <Row>
//                       <Col>
//                       <FloatingLabel controlId="floatingSelect" label="Select Class">
//                         <Form.Select required
//                           value={newInvoiceClass} onClick={createInvoiceamount}
//                           onChange={(e) => setNewInvoiceClass(e.target.value)} aria-label="Floating label select example">
//                             <option value='' disabled>Select Class</option>
//                             <option value="lkg">LKG</option>
//                             <option value="ukg">UKG</option>
//                             <option value="1">I</option>
//                             <option value="2">II</option>
//                             <option value="3">III</option>
//                             <option value="4">IV</option>
//                             <option value="5">V</option>
//                             <option value="6">VI</option>
//                             <option value="7">VII</option>
//                             <option value="8">VIII</option>
//                             <option value="9">IX</option>
//                             <option value="10">X</option>
//                             <option value="11">XI</option>
//                             <option value="12">XII</option>
//                         </Form.Select>
//                         </FloatingLabel>
//                      </Col>
//                      <Col>
//                         <Form.Select required
//                         value={newInvoiceFeeCa}
//                         onChange={(e) => setNewInvoiceFeeCa(e.target.value)} onClick={createInvoiceamount} aria-label="Default select example" style={{width:'100%',height:'55px'}}>
//                             <option value='' disabled>Select Fee Category</option>
//                             <option value="school fees">School Fees</option>
//                             <option value="Hostel Bill">Hostel Bill</option>
//                           </Form.Select>
//                         </Col>
//                     </Row>
                    
//                     <Row className='pt-3'>
//                       <Col xs={6} >
//                       <Form.Group className="mb-3">
//                           <Form.Control value={newInvoiceDate} required 
//                         onChange={(e) => setNewInvoiceDate(e.target.value)} type='date'style={{height:'56px'}} />
                        
//                         </Form.Group>
//                       </Col>
//                       <Col>
//                       <Form.Group>
//                         <div className="input-group">
//                           <span className="input-group-text" style={{ backgroundColor: '#E9EDEE' }}>
//                           <span style={{ color: 'red', fontSize: '1.5rem', fontWeight: 500 }}>₹</span>
//                           </span>
//                           <Form.Control
//                             type="number"
//                             placeholder="Enter amount"
//                             value={totalAmount}
//                             disabled
//                             style={{ backgroundColor: '#E9EDEE', height: '58px' }}
//                           />
//                         </div>
//                    </Form.Group>


//                       </Col>
//                     </Row>
//                       <Col>
//                         <Row className='pb-3'>
//                         <Form.Group>
//                           <Form.Label>Total Amount Splitup:</Form.Label>
//                           <Form.Control
//                             as="textarea"
//                             rows={5}
//                             value={formattedGlance}
//                             readOnly />
//                           </Form.Group>
//                         </Row>
//                         </Col>
//                     {/* <Row className='pt-3'>
//                       <Col>
//                       <Form.Group>
//                             <Form.Control  type="number" placeholder="Enter amount" value={originalAmount} onChange={handleOriginalAmountChange} style={{backgroundColor:'#E9EDEE',height:'58px'}} />
//                           </Form.Group>
//                       </Col>
//                       <Col>
//                       <FloatingLabel controlId="floatingPassword" label="Discount % (in percentage)">
//                         <Form.Control value={discountPercentage} onChange={handleDiscountPercentageChange}  type="number" placeholder="Discount % (in percentage)" autoComplete='off'/>
//                       </FloatingLabel>
//                       </Col>
//                       <Col xs={2} className='pt-2 text-center'>
//                         <Button  className='py-2' style={{backgroundColor:'green'}}>% Apply Discount</Button>
//                       </Col> 
//                       <Col className='pt-2 '>
//                           <Table striped bordered size="sm" style={{width:'10q0%'}}>
//                           <tbody>
//                             <tr>
//                               <td  style={{textAlign:'center',paddingTop:'10px',backgroundColor:'#0C83DC',color:'aliceblue',width:'45%'}}>Discount Amount</td>
//                               <td><h5 className='text-center pt-2'>₹  {discountedAmount}</h5></td>
//                             </tr>
//                           </tbody>
//                       </Table>
//                       </Col>
//                     </Row> */}

//                     <Button type="submit" onClick={createInvoice} className='bg-success'>Submit</Button>
//                     </Container>
//                 </Form>
//                </div>
//           </Paper>

      
//           </div>
//         </div>
    
//     </div>
//     </div>
//     </div>
//   )
// }



// export default Createinvoice