import React, { Component } from 'react';
import $ from 'jquery'; 
import Button from 'react-bootstrap/Button';
import { MdDelete } from 'react-icons/md';
import {FaRegEye} from 'react-icons/fa'
import {FiEye} from 'react-icons/fi'
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ReactDOM from 'react-dom';
import 'jquery/dist/jquery.min.js';

//Datatable Modules
import "datatables.net/js/jquery.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-buttons/js/dataTables.buttons.js"
import "datatables.net-buttons/js/buttons.colVis.js"
import "datatables.net-buttons/js/buttons.flash.js"
import "datatables.net-buttons/js/buttons.html5.js"
import "datatables.net-buttons/js/buttons.print.js"
import "datatables.net-dt/css/jquery.dataTables.min.css"

const printRecp = (invoiceNo) => {
  // Create a new window or tab for the print view
  const printWindow = window.open(`/svsportaladmintest/MangerUser/Viewprofile?admission_no=${invoiceNo}`, '_blank');
};
class DatatableSprofile extends Component {
  

  componentDidMount() {
    //initialize datatable
    $(document).ready(function () {
        $('#example').DataTable({
            destroy: true,
            processing: true,
            serverSide: false,
            ajax: {
              url: 'https://www.santhoshavidhyalaya.com/SVSTEST/api/read-student',
              type: 'GET',
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
              }
            ],
            searching: true,
            columnDefs: [
                {
                  "data": 'action',
                  "defaultContent": "<button>Edit</button>",
                  "targets": 8
                }],
             
            columns: [
                { data: 'admission_no' },
                { data: 'roll_no' },
                { data: 'student_name' },   
                { data: 'dob' },
                { data: 'emis_no' },
                { data: 'Mobilenumber' },
                { data: 'EmailID' },
                {
                    render: function (data, type, row) {
                        return `${row.c_HouseNumber} ${row.c_StreetName}<br>${row.c_VillageTownName}<br>${row.c_Postoffice} ${row.c_District},${row.c_State}, ${row.c_Pincode}`;
                    }
                },
                { data: 'action', "targets": 8, createdCell: (td, cellData, rowData, row, col) =>
                ReactDOM.render(
                    
                    [
                    <div className='text-center'>
                        {/* <a href={`/svsportaladmintest/MangerUser/Viewprofile?admission_no=${rowData.admission_no}`} target="_blank">
                        <FaRegEye style={{color:'#4E0172', cursor:'pointer'}} size={30}/> </a> */}
                           <FaRegEye
                        onClick={() => printRecp(rowData.admission_no)}
                        size={35}
                        style={{ color: '#4E0172', cursor: 'pointer', paddingRight: '5px' }}/>
                    </div>
                    ], td)},
            ],
          });
    });
 }
  render(){

    
  return (
    <div className="MainDiv">

      
      <div className="container">
          
          <table id="example" class="display">
            <thead>
                <tr>
                    <th>Admission No</th>
                    <th>Reg.No</th>
                    <th>Name</th>
                    <th>DOB</th>
                    <th>Emis no</th>
                    <th>Number</th>  
                    <th>EmailID</th>  
                    <th className='text-center'> Address</th>  
                    <th className='text-center'> Action</th>  
                </tr>
            </thead>
    
        </table>
          
        </div>
      </div>
  );
}
}


export default DatatableSprofile

