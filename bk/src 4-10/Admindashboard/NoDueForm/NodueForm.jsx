import React,{useRef,useEffect, useState} from 'react'
import Header from '../Header';
import Sidebar from '../Sidebar';
import Logo from '../logo.jpeg'
import {Form,Col,Row,Button} from 'react-bootstrap'
import {TfiControlBackward} from 'react-icons/tfi'
import {AiOutlinePrinter} from 'react-icons/ai';
import {useReactToPrint} from 'react-to-print';
import Swal from 'sweetalert2';

const NodueForm = () => {

  const [viewProfiles, setViewProfiles] = useState([]);


  ///For Print
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `No Due From`,
    onBeforePrint: () => {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Printing...',
        showConfirmButton: false,
        timer: 1000,
      });
    },
    onAfterPrint: () => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'File Downloaded Successfully',
        showConfirmButton: false,
        timer: 1700,
      });
    },
  });

  const queryParameters = new URLSearchParams(window.location.search)
  const id = queryParameters.get("id") //GET URL param  Value
  

  const viewProfile = async () => {
    try {
      const response = await fetch(`https://santhoshavidhyalaya.com/SVSTEST/api/student/nodues/selectbyid/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);

      setViewProfiles(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    viewProfile();
  }, []);

  return (
    <div>
     <Sidebar/>
      <div style={{width:'82.5%',float:'right'}} >
        <Header/>
          <div className='p-4'>
            <div className='py-4'>
              <Row>
                <Col className='d-flex'>
                    <Button onClick={handlePrint}  style={{marginLeft:'10px'}} variant="outline-success"><AiOutlinePrinter size={25} className='m-1'/>Print now</Button>
                </Col>
                <Col className='text-end'>
                   <a href='/svsportaladmin/Admindashboard/NoDueForm/NodueTable'><TfiControlBackward size={35} style={{color:'red'}}/></a>
                </Col>
              </Row><hr/>
            </div>
{/*-------- Form ------------ */}
<div ref={componentRef} className='pt-3 container' >
        <div style={{ borderRadius: '10px', border: '1px solid #000', backgroundColor: '#ffff' }}>
           <div className='text-center'>
            <img style={{width: '15%', marginTop:'10px'}} src={Logo} alt='school Logo'/>
            <h2 style={{fontFamily:'sans-serif'}}>Santhosha Vidhyalaya higher secondary school</h2>
            <u><h1 style={{fontFamily:'sans-serif'}}>No Due Certificate 2022-2023</h1></u>
           </div><hr/>

           <div className='text-end'>
             <h5 className='me-5 pt-2' style={{fontFamily:'sans-serif'}}>Date : 22/09/2023</h5>
           </div>
           <div className='px-4 py-4'>
            <Row>
              <Col>
                <h4 style={{fontFamily:'sans-serif'}}>Name of Student: Mohammed Fareestha</h4>
              </Col>
              <Col className='text-end'>
                <h4 style={{fontFamily:'sans-serif'}}>Registration no: 110227</h4>
              </Col>
            </Row>
            <Row className='py-3'>
              <Col>
                <h4 style={{fontFamily:'sans-serif'}} className='me-4'>Class & Grade: IV B</h4>
              </Col>
            </Row>
            <h5 className='text-center mt-4'>We hereby certify that there are NO OUTSTANDING FEE DUES for the student mentioned above</h5>

            <Row style={{marginTop:'200px'}}>
              <Col>
                <hr/>
                <h4 style={{fontFamily:'sans-serif', textAlign:'center'}}>Class Teacher sign</h4>
              </Col>
              <Col>
                 <hr/>
                 <h4 style={{fontFamily:'sans-serif', textAlign:'center'}}>Accountant sign</h4>
              </Col>
              <Col>
                <hr/>
                <h4 style={{fontFamily:'sans-serif', textAlign:'center'}}>No due seal</h4>
              </Col>
            </Row>
           </div>
        </div>
        </div>
      </div>
     </div>
   </div>
  )
}

export default NodueForm
