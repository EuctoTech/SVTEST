import React,{useState,useEffect} from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { Modal, Button, Form } from 'react-bootstrap';
import $ from 'jquery';
import { MdDelete } from 'react-icons/md';
import { LiaWpforms } from 'react-icons/lia';
import Paper from '@mui/material/Paper';
import ReactDOM from 'react-dom';
import 'jquery/dist/jquery.min.js';
import "datatables.net/js/jquery.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-buttons/js/dataTables.buttons.js"
import "datatables.net-buttons/js/buttons.colVis.js"
import "datatables.net-buttons/js/buttons.flash.js"
import "datatables.net-buttons/js/buttons.html5.js"
import "datatables.net-buttons/js/buttons.print.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"


const NodueTable = () => {

  const printDue = (id) =>{
    const printWindow = window.open(`/svsportaladmin/Admindashboard/NoDueForm/NodueForm?admission_no=${id}`, '_blank');
  }
    
  useEffect(() => {
    var openModal = openModal;
    var content = this;

    $(document).ready(function () {
      $('#Nodue').DataTable({
        destroy: true,
        processing: true,
        serverSide: false,
        ajax: {
          url: 'https://santhoshavidhyalaya.com/SVSTEST/api/student/nodues',
          type: 'POST',
          dataSrc: 'nodue_certificates', 
        },
        dom: 'lfBrtip',
        buttons: [
          {
            extend: 'copy',
            className: 'btn btn-success',
          },
          {
            extend: 'csv',
            className: 'btn btn-danger',
          },
          {
            extend: 'print',
            className: 'btn btn-warning',
          },
        ],
        columnDefs: [
          {
            data: 'action',
            defaultContent: '<button>Edit</button>',
            targets: 7,
          },
        ],
        columns: [
          { data: 'student_info.admission_no' },
          { data: 'student_info.roll_no' },
          { data: 'student_info.name' },
          { data: 'student_info.gender' },
          { data: 'student_info.standard' },
          { data: 'student_info.sec' },
          { data: 'student_info.fee_by' },
          {
            data: 'action',
            targets: 7,
            createdCell: (td, cellData, rowData, row, col) =>
              ReactDOM.render(
                ///svsportaladmin/MangerUser/Viewprofile?admission_no=${invoiceNo}
                [
                  <Button  onClick={() => printDue(rowData.admission_no)}
                  variant="outline-success" style={{width:'101px'}} size={25}>View Form</Button>,
                ],
                td
              ),
          },
        ],

      });
    });
  }, []);

  return (
    <div>
    <Sidebar/>
      <div style={{width:'82.5%',float:'right'}} >
        <Header/>
          <div className='p-4'>
            <Paper elevation={24} >
                <div className='pt-4 px-3'>
                   <h3><LiaWpforms  size={34} className='pe-2 pb-1'/>No Due Form</h3>  
                   <hr className='settingHr'/>
                </div>
             <div className="MainDiv container py-5">
                <div className="container">
                    <table id="Nodue" className="display">
                    <thead>
                        <tr>
                        <th>Admission No</th>
                        <th>Roll No</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Standard</th>
                        <th>Section</th>
                        <th>Fee pay by</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    </table>
                </div>
             </div>
           </Paper>                    
          </div>
      </div>
 </div>
  )
}

export default NodueTable
