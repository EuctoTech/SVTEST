import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import Button from 'react-bootstrap/Button';
import { MdDelete } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';

function DataTableSponsor() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/readmapstudents')
      .then(response => response.json())
      .then(responseData => {
        // Update the data state with API response
        setData(responseData.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  function handleClickDelete(slno) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.isConfirmed) {
        // Send DELETE request to API
        fetch(`https://www.santhoshavidhyalaya.com/SVSTEST/api/removemapstudents?slno=${slno}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(responseData => {
            // Handle success response
            Swal.fire('Deleted!', 'User has been deleted', 'success');
            // Update the data state by removing the deleted row
            setData(prevData => prevData.filter(row => row.slno !== slno));
          })
          .catch(error => {
            console.error('Error deleting user:', error);
            // Handle error response
            Swal.fire('Error!', 'Failed to delete user', 'error');
          });
      }
    });
  }

  return (
    <div className="MainDiv">
      <div className="container">
      <table id="sponsor-table" className="table table-bordered">
          <thead>
            <tr>
              <th>Sponsor Name</th>
              <th>Student-Grade</th>
              <th>Student-Section</th>
              <th>Student Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.Sponsername}</td>
                <td>{row.grade}</td>
                <td>{row.sec}</td>
                <td>{row.Studentname}</td>
                <td>
                  {/* <FaRegEdit
                    style={{ cursor: 'pointer' }}
                    className="text-success pb-1 pe-1"
                    size={28}
                    title="Edit user"
                  /> */}
                  <MdDelete
                    onClick={() => handleClickDelete(row.slno)}
                    style={{ cursor: 'pointer' }}
                    className="text-danger pb-1 ps-2"
                    size={35}
                    title="Delete user"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTableSponsor;



// import React,{useState} from 'react';
// import $ from 'jquery'; 
// import Button from 'react-bootstrap/Button';
// import {MdDelete} from 'react-icons/md'
// import {FaRegEdit} from 'react-icons/fa'
// import Swal from 'sweetalert2'

// class DataTableSponsor extends React.Component {


//   componentDidMount() {
//     //initialize datatable
//     $(document).ready(function () {
//         $('#sponsor-table').DataTable();
//     });
//  }
//   render(){
//     function handleClickDelete() {
//         Swal.fire({
//           title: 'Are you sure?',
//           text: "You won't be able to revert this!",
//           icon: 'warning',
//           showCancelButton: true,
//           confirmButtonColor: '#3085d6',
//           cancelButtonColor: '#d33',
//           confirmButtonText: 'Yes, delete it!'
//         }).then((result) => {
//           if (result.isConfirmed) {
//             Swal.fire(
//               'Deleted!',
//               'User has been deleted',
//               'success'
//             )
//           }
//         })
//       }
    
//   return (
//     <div className="MainDiv">

      
//       <div className="container">
          
//           <table id="sponsor-table" class="display">
//             <thead>
//                 <tr>
//                     <th>Sponsor Name</th>
//                     <th>Student-Grade</th>
//                     <th>Student-Class</th>
//                     <th>Stduent Name</th>  
//                     <th>Action</th>  
//                 </tr>
//             </thead>
//             <tbody>
//                 <tr>
//                     <td>Mark Jhon S</td>
//                     <td>V</td>
//                     <td>B</td>
//                     <td>Shivadheen</td>
//                     <td>
//                         <FaRegEdit style={{cursor:'pointer'}} className='text-success pb-1 pe-1' size={28} title='Edit user'/>
//                         <MdDelete onClick={handleClickDelete} style={{cursor:'pointer'}}  className='text-danger pb-1 ps-2 ' size={35} title='Delete user'/>
//                     </td>
//                 </tr>
                
//                 {/* <tr>
//                     <td>Garrett Winters</td>
//                     <td>Accountant</td>
//                     <td>Tokyo</td>
//                     <td>
//                         <FaRegEdit style={{cursor:'pointer'}} className='text-success pb-1 pe-1' size={28} title='Edit user'/>
//                         <MdDelete style={{cursor:'pointer'}}  className='text-danger pb-1 ps-2 ' size={35} title='Delete user'/>
//                     </td>
//                 </tr> */}
     
           
//             </tbody>
//         </table>
          
//         </div>
//       </div>
//   );
// }
// }

// export default DataTableSponsor
