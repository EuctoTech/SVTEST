import React, { useRef, useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import Header from "../Header";
import ReactDOM from "react-dom";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { TbMailFilled } from "react-icons/tb";
import { MdPayments } from "react-icons/md";
import Paper from "@mui/material/Paper";
import DiscountTable from "./DiscountTable";
import { Row, Col } from "react-bootstrap";
import { TbTableImport } from "react-icons/tb";
import { BsReceiptCutoff } from 'react-icons/bs'
import { BsReceipt } from 'react-icons/bs';
import numberToWords from "number-to-words";

import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import axios from "axios";
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
import $ from 'jquery'; 
import Select from 'react-select';


const InvoiceTable = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [show, setShow] = useState(false);
  const [tableData, setTableData] = useState([]);

  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);

  const [totalActualAmount, setTotalActualAmount] = useState(0);
  const [totalDiscountAmount, setTotalDiscountAmount] = useState(0);
  const [totalPendingAmount, setTotalPendingAmount] = useState(0);
  const [totalPaidAmount, setTotalPaidAmount] = useState(0);
  const [m_name, name] = useState(null);
  const [m_actual_amount, actual_amount] = useState(null);
  const [m_discount_percent, discount_percent] = useState(null);
  const [m_fees_glance, fees_glance] = useState(null);
  const [m_previous_pending_amount, previous_pending_amount] = useState(null);
  const [m_excessAmount, excessAmount] = useState(null);
  const [m_slno, Setslno] = useState(null);
  const [m_amount, amount] = useState(null);
  const [m_paid_amount, paid_amount] = useState(null);
  const [m_payment_status, payment_status] = useState(null);
  const [m_total_invoice_amount, total_invoice_amount] = useState(null);
  const [m_invoice_pending_amount, invoice_pending_amount] = useState(null);
  const [m_SetInvoice_no, SetInvoice_no] = useState(null);
  const [m_Cashamount, setCashamount] = useState(null);
  const [mode, setmode] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [enteredAmount, setEnteredAmount] = useState(""); 
  const [m_roll_no, roll_no] = useState(null);
  const [maxAmount, setMaxAmount] = useState(0);
  const [payingAmount, setPayingAmount] = useState(0);
  const [sections, setSections] = useState([])
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const [sponsorOptions, setSponsorOptions] = useState([]);
  const [parentOptions, setparentOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionstudent, setSelectedOptionstudent] = useState(null);

  // Step 2: Update the selectedCheckboxes state when a checkbox is clicked
  // const handleCheckboxChange = (slno) => {
  //   setSelectedCheckboxes((prevCheckboxes) => ({
  //     ...prevCheckboxes,
  //     [slno]: !prevCheckboxes[slno], // Toggle the checkbox state
  //   }));
  // };

  // Step 3: Display the selected rows' values in the console
  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setSelectedOptionstudent([]);

  };
  const handleSelectChangeStudent = (selectedOptionstudent) => {
    setSelectedOptionstudent(selectedOptionstudent);
    setSelectedOption([]);

  };
  const handleShowSelected = () => {
    const selectedRows = tableData.filter((row) => selectedCheckboxes[row.slno]);
    console.log("Selected Rows:", selectedRows);
  };

  const fetchSections = async () => {
    try {
      const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/pay-master-read');
      const data = await response.json();
      setSections(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);


  useEffect(() => {
    setMaxAmount(invoice_pending_amount === 0 ? total_invoice_amount : 0);
  }, [total_invoice_amount, invoice_pending_amount]);

  const maxAmounts = m_invoice_pending_amount ? parseFloat(m_invoice_pending_amount) : parseFloat(m_total_invoice_amount) ;


  const handleAmountChange = (event) => {
    setCashamount(event.target.value);
    setEnteredAmount(event.target.value); // Update the state using the setter function
    const amount = event.target.value;
    // if (amount >= 0 && amount <= maxAmounts) {
    //   setPayingAmount(amount);
    // }
  
    // // Handle the case where entered amount exceeds the maximum value
    // if (enteredAmount > maxAmount) {
    //   // You can put your custom logic here, for example, set a flag or perform any other action.
    //   // In this example, we'll reset enteredAmount and cashamount to 0.
    //   setEnteredAmount(); // Update the state to reset enteredAmount
    //   setCashamount(); // Update the state to reset cashamount
    // } else {
    //   setCashamount(enteredAmount);
    // }
  };
  
  const fetchSponsorOptions = () => {
    axios
      .get('https://santhoshavidhyalaya.com/SVSTEST/api/sponsor/select')
      .then((response) => {
        setSponsorOptions(response.data.sponsorOptions);
      })
      .catch((error) => {
        console.error('Error fetching sponsor options:', error);
      });
  };

  useEffect(() => {
    fetchSponsorOptions();
  }, []);
  // useEffect(() => {
    
  //   axios
  //     .get('https://santhoshavidhyalaya.com/SVSTEST/api/student/select')
  //     .then((response) => {
  //       setparentOptions(response.data.sponsorOptiont);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching sponsor options:', error);
  //     });
  // }, []);
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (slno) => {
    console.log(slno);
 setSelectedOptionstudent([]);
    setSelectedOption([]);
    fetch("https://www.santhoshavidhyalaya.com/SVSTEST/api/listgenrateById", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: slno,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        name(data.data.name);
        actual_amount(data.data.actual_amount);
        discount_percent(data.data.discount_percent);
        fees_glance(data.data.fees_glance);
        previous_pending_amount(data.data.previous_pending_amount);
        excessAmount(data.data.excessAmount);
        total_invoice_amount(data.data.total_invoice_amount);
        amount(data.data.amount);
        paid_amount(data.data.paid_amount);
        payment_status(data.data.payment_status);
        invoice_pending_amount(data.data.invoice_pending_amount);
        roll_no(data.data.roll_no);
        Setslno(data.data.slno);
        SetInvoice_no(data.data.invoice_no);
        setCashamount(data.data.total_invoice_amount);
        setShow(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: '60px',
    }),
  };
  const handleCash = async () => { 
    alert(enteredAmount.toLocaleString("en-IN")); 
    // const amountInWords = (amount) => {
    //   // Your logic to convert amount to words here
  
    //   // For demonstration, let's say the conversion logic is handled elsewhere
    //   // Replace this line with your actual logic to convert amount to words
    //   // const amountWords = convertToWords(amount);
    //   const amountWords = numberToWords.toWords(parseInt(enteredAmount));
    //   // Format the amount with commas (Indian standard)
    // const formattedAmountloc = amount.toLocaleString("en-IN");
    //   const formattedWords = amountWords
    //   .replace(/thousand/g, 'thousand')
    //   .replace(/million/g, 'lakh')
    //   .replace(/billion/g, 'crore');
  
    // // return formattedWords;
    //   return `${formattedWords} (${formattedAmountloc} INR)`;
    // };
    const convertToIndianFormat = (amount) => {
      const rupee = 'Rupee';
      const thousand = 'Thousand';
      const lakh = 'Lakh';
      const crore = 'Crore';
    
      const getWords = (num) => numberToWords.toWords(num).replace(/\s+/g, ' ');
    
      if (amount < 1000) {
        return `${getWords(amount)} ${rupee}`;
      } else if (amount < 100000) {
        const thousands = Math.floor(amount / 1000);
        const remainder = amount % 1000;
        return `${getWords(thousands)} ${thousand} ${getWords(remainder)} ${rupee}`;
      } else if (amount < 10000000) {
        const lakhs = Math.floor(amount / 100000);
        const remainder = amount % 100000;
        return `${getWords(lakhs)} ${lakh} ${getWords(remainder)} ${rupee}`;
      } else {
        const crores = Math.floor(amount / 10000000);
        const remainder = amount % 10000000;
        return `${getWords(crores)} ${crore} ${getWords(remainder)} ${rupee}`;
      }
    };
    // Display SweetAlert to confirm the entered amount
    const confirmAmount = await Swal.fire({
      title: "Confirm Entered Amount",
      html: `Entered Amount:<div style="color: red; font-weight: bold;font-size: 25px;"><u style="color: grey";> ${convertToIndianFormat(enteredAmount || 0)} </u>| INR ${enteredAmount || 0}</div>`,
      icon: "info",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    });
    if (confirmAmount.isConfirmed) {
       setEnteredAmount("");
      const gg = JSON.stringify({
        id: m_slno,
        total_invoice_amount: m_total_invoice_amount,
        invoice_pending_amount: m_invoice_pending_amount,
        Invoice_no: m_SetInvoice_no,
        additionalDetails: additionalDetails,
        amount: enteredAmount,
        mode: mode,
        sponsor: selectedOption,
        parent: selectedOptionstudent,
      }); console.log(gg); 
      try {
        const response = await fetch("https://www.santhoshavidhyalaya.com/SVSTEST/api/paycashgenrate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: m_slno,
            total_invoice_amount: m_total_invoice_amount,
            invoice_pending_amount: m_invoice_pending_amount,
            Invoice_no: m_SetInvoice_no,
            additionalDetails: additionalDetails,
            amount: enteredAmount,
            mode: mode,
            sponsor: selectedOption.value,
            parent: selectedOptionstudent.value,
          }),
          
        });
    
        const data = await response.json();
        setShow(false);
  
        // Check if the request was successful and data contains 'excess_amount' and 'pending_amount'
      
        if (response.ok) {
          fetchSponsorOptions();
          if (data && data.excess_amount !== undefined && data.pending_amount !== undefined) {
            Swal.fire({
              icon: "success",
              title: "Update successfully!",
              html: `<p>Excess Amount: ${data.excess_amount}</p><p>Pending Amount: ${data.pending_amount}</p><p>Pay status: ${data.status}</p>`,
              // showConfirmButton: false,
              // timer: 10000,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "Update successfully!",
              // showConfirmButton: false,
              // timer: 10000,
            });
          } 
        } else {
          fetchSponsorOptions();
          Swal.fire({
          icon: "error",
          title: "Error updating data",
          text: data.message || "An unexpected error occurred",
        });}
      } catch (error) {
         
        // Handle errors
        console.error("Error updating data:", error);
        Swal.fire({
          icon: "error",
          title: "Error updating data",
          text: error.message || "An unexpected error occurred",
        });
      }
    
      // Reload the DataTable
      $('#DiscountTable').DataTable().ajax.reload();  }
  else if (confirmAmount.isDenied || confirmAmount.isDismissed)  {
      alert('Amount is Denied');

    }
    
  };
  
  const printInvoice = (invoiceNo) => {
    // Create a new window or tab for the print view
    const printWindow = window.open(`/svsportaladmintest/GeneralInvoice/StudentInvoice/${invoiceNo}`, '_blank');
  };
  const printRecp = (invoiceNo) => {
    // Create a new window or tab for the print view
    const printWindow = window.open(`/svsportaladmintest${invoiceNo}`, '_blank');
  };
  const handleFilter = async () => {
    const fromDate = fromDateRef.current.value;
    const toDate = toDateRef.current.value;
    setFromDate(fromDate);
    setToDate(toDate);
    console.log(fromDate, toDate);
     try {
      const response = await axios.post(
        "https://www.santhoshavidhyalaya.com/SVSTEST/api/listgenratefilter",
        {
          from: fromDate,
          to: toDate,
        }
      );

      // $("#DiscountTable").DataTable().clear().draw();

      const totalAmount = response.data.totals.total_amount;
      const total_discount_percent = response.data.totals.total_discount_percent;
      // const total_invoice_pending_amount = response.data.totals.invoice_pending_amount;
      const total_paid_amount = response.data.totals.total_paid_amount;

      setTotalActualAmount(totalAmount);
      setTotalDiscountAmount(total_discount_percent);
      //  setTotalPendingAmount(total_invoice_pending_amount);
       const totalInvoicePendingAmount = totalAmount - total_paid_amount;
       setTotalPendingAmount(totalInvoicePendingAmount);
   
      setTotalPaidAmount(total_paid_amount);

      // $("#DiscountTable").DataTable().rows.add(response.data.data).draw();
    } catch (error) {
      console.error(error);
    }
      // try {
    //   const response = await axios.post(
    //     "https://www.santhoshavidhyalaya.com/SVSTEST/api/listgenratefilter",
    //     {
    //       from: fromDate,
    //       to: toDate,
    //     }
    //   );

    //   $("#DiscountTable").DataTable().clear().draw();

    //   const total_actual_amount = response.data.totals.total_actual_amount;
    //   const total_discount_percent = response.data.totals.total_discount_percent;
    //   const total_invoice_pending_amount = response.data.totals.invoice_pending_amount;
    //   const total_paid_amount = response.data.totals.total_paid_amount;

    //   setTotalActualAmount(total_actual_amount);
    //   setTotalDiscountAmount(total_discount_percent);
    //   setTotalPendingAmount(total_invoice_pending_amount);
    //   setTotalPaidAmount(total_paid_amount);

    //   $("#DiscountTable").DataTable().rows.add(response.data.data).draw();
    // } catch (error) {
    //   console.error(error);
    // }
  };
 // Function to handle checkbox change


  const sendtoapi = async () => {
    
    if (selectedCheckboxes.length === 0) {
      // If the selectedCheckboxes array is empty, show an error alert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No checkboxes are selected.',
      });
     }
  
    const payload = {
      slno: selectedCheckboxes,
    };
  
    // Convert the payload object to JSON
    const payloadJSON = JSON.stringify(payload);
  
    try {
      const loadingSwal = Swal.fire({
        title: 'Sending SMS and Mail......',
        allowOutsideClick: false,
        showConfirmButton: false,
        html: '<div class="spinner-border text-primary" role="status"><span class="sr-only"></span></div>',

        onBeforeOpen: () => {
            Swal.showLoading();
        },
    });
      const response = await fetch('https://www.santhoshavidhyalaya.com/SVSTEST/api/Invoicesendsmsandmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: payloadJSON,
      });
  
      if (response.ok) {
        Swal.close();
        setSelectedCheckboxes([]);

        // Uncheck all checkboxes
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });

        // Handle the success case here
        const responseData = await response.json();
        console.log('API response:', responseData);
        Swal.fire({
          icon: 'success',
          title: 'Email and SMS successfully sent !',
          showConfirmButton: false,
          timer: 1800
        })
      } else {
        Swal.close();

        // Handle the error case here
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to send data to the API.',
        });
      }
    } catch (error) {
      Swal.close();

      // Handle any network or other errors here
      console.error('Error sending data to API:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while sending data to the API.',
      });
    }
};


  const handleFilterClick = () => {
    if (fromDate && toDate) {
      // Call the API with the selected date range
      fetchInvoices();
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await axios.post(
        "https://www.santhoshavidhyalaya.com/SVSTEST/api/listgenratefilter",
        {
          from: fromDate,
          to: toDate,
        }
      );
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  useEffect(() => {
    $(document).ready(function () {
      var excludedColumns = [0, 18, 19, 20, 21, 22, 23];

      $("#DiscountTable").DataTable({
        dom: 'Bfrtip',
        buttons: ['copy', 'csv', 'print'],
        destroy: true,
        processing: true,
        serverSide: true,
        searching: true,

        ajax: {
          url: "https://www.santhoshavidhyalaya.com/SVSTEST/api/listgenrate",
          type: "POST",
          data: function (d) {
            // Include fromDate and toDate in the payload
            d.fromDate = fromDate;
            d.toDate = toDate;
  
            // Add other parameters if needed
            return d;
            //   const total_actual_amount = response.data.totals.total_actual_amount;
    //   const total_discount_percent = response.data.totals.total_discount_percent;
    //   const total_invoice_pending_amount = response.data.totals.invoice_pending_amount;
    //   const total_paid_amount = response.data.totals.total_paid_amount;

    //   setTotalActualAmount(total_actual_amount);
    //   setTotalDiscountAmount(total_discount_percent);
    //   setTotalPendingAmount(total_invoice_pending_amount);
    //   setTotalPaidAmount(total_paid_amount);
          },
        },
       
      
        dom: "lfBrtip",
        
        
        buttons: [
          {
            extend: 'copy',
            className: 'btn btn-success',
          },
          {
            extend: 'csv',
            className: 'btn btn-info',
            exportOptions: {
              columns: function (idx, data, node) {
                // Exclude columns 7, 8, and 9
                return [7, 8, 9].indexOf(idx) === -1;
              }
            }
          },
          {
            extend: 'print',
            className: 'btn btn-warning',
            exportOptions: {
              columns: function (idx, data, node) {
                // Exclude columns 0, 7, 8, 9, 14-23
                return [0,1, 7, 8, 9, 14, 15, 16, 17, 18, 19, 20, 21, 22].indexOf(idx) === -1;
              }
            },
            customize: function (win) {
              // Add custom header
              $(win.document.body).find('h1').text('Santhosha Vidhyalaya, ');
              $(win.document.body).find('h1').after('<div style="font-size: 25px; font-weight: bold; text-align: center;">Student Bill Ledger</div>');
 
              $(win.document.body).find('h1').after('<div style="font-size: 25px; font-weight: bold; font-align: center;">Dohnavur – 627102 Tirunelveli Dist. Tamilnadu</div>');
            }
          }
          // Add more buttons if needed
        ],
       
        columnDefs: [
          {
            data: "action",
            defaultContent: "<button>Edit</button>",
            //   targets: [21,22,23],
            targets: [7,8,9],
            
          },
        ],
        columns: [
         {
    data: "checkbox",
    targets: 0,
    createdCell: (td, cellData, rowData, row, col) => {
      //  const isPaid = rowData.payment_status === 'Paid';
        // const isPaid = rowData.payment_status === 'Paid' || rowData.payment_status === 'Partial Paid';
      const isPaid = rowData.payment_status === 'Paid' ;

        ReactDOM.render(
            <input
                className="form-check-input"
                type="checkbox"
                data-slno={rowData.slno} // Add a data attribute to store slno
                onChange={() => handleCheckboxClick(rowData.slno)}
                disabled={isPaid} // Disable the checkbox if payment_status is "Paid"
            />,
            td
        );
    }
},

          { data: "slno" }, 
          { data: "invoice_no" },
          { data: "roll_no" },
          { data: "name" },
        
          {
            data: null,
            render: function (data, type, row) {
              // Combine the desired fields into a single cell
              return `${data.standard} | ${data.sec}
              
              `;
            }
          },
          // { data: "sec" },
          { data: "amount" },
          { data: "action",
            targets: 21,
            createdCell: (td, cellData, rowData, row, col) =>
              ReactDOM.render(
                [
                  <div style={{textAlign: "center"}}>
                      <Button onClick={() => handleShow(rowData.slno)} variant="outline-warning" >Pay_Amount</Button>{' '}
                  </div>,
                ],
                td
              ),
          },
          {
            data: "action",
            targets: 20,
            createdCell: (td, cellData, rowData, row, col) => {
              // Check if rowData.url is not empty
              if (rowData.invoice_no) {
                ReactDOM.render(
                  <div style={{textAlign: "center"}}> 
                  <Button variant="outline-danger"
                    onClick={() => printInvoice(rowData.invoice_no)}>View_Invoice</Button>
                    </div> , 
                  td
                );
              } else {
                ReactDOM.render(null, td); // If rowData.url is empty, render null (which means the icon will not be displayed)
              }
            },
          },
          // {
          //   data: "action",
          //   targets: 20,
          //   createdCell: (td, cellData, rowData, row, col) => {
          //     // Check if rowData.url is not empty
          //     if (rowData.url) {
          //       ReactDOM.render(
          //         <Button variant="outline-primary"
          //           onClick={() => printRecp(rowData.url)}>View_Recepit</Button>,
          //         td
          //       );
          //     } else {
          //       ReactDOM.render(null, td); // If rowData.url is empty, render null (which means the icon will not be displayed)
          //     }
          //   },
          // },
          {
  data: "actions",
  targets: 20,
  createdCell: (td, cellData, rowData, row, col) => {
    // Check if rowData.urls is not empty
    if (rowData.urls && rowData.urls.length > 0) {
      const buttons = rowData.urls.map((url, index) => (
        // <Button
        //   key={index}
        //   variant="outline-primary"
        //   onClick={() => printRecp(url)}
        // >
        //   View Receipt {index + 1}
        // </Button>
        <div key={index} className="d-inline-flex align-items-center">
                  <span>{index + 1}.</span>
        <BsReceipt
          className="text-primary cursor-pointer mr-1"
          onClick={() => printRecp(url)}
        />
      </div>
      ));

      ReactDOM.render(buttons, td);
    } else {
      ReactDOM.render(null, td); // If rowData.urls is empty, render null (which means the buttons will not be displayed)
    }
  },
}
,
{ data: "payment_status" },
{
  // data: (row) => row.amount - row.invoice_pending_amount
  data: (row) => row.invoice_pending_amount !== null && row.invoice_pending_amount !== 0 ? row.amount - row.invoice_pending_amount : null,
},
  
{
  data: "invoice_pending_amount",
  
},
          
          { data: "acad_year" },
          { data: "due_date" },
          { data: "hostelOrDay" },
          { data: "sponser_id" },
          { data: "email" },
          { data: "actual_amount" },
          { data: "discount_percent" },
          { data: "date" },
          { data: "created_by" },
          { data: "additionalDetails" },
          // { data: "mode"},
          { data: "student_excess"},
          
          
          
           
        ],
        order: [[0, "desc"]],



        rowCallback: function (row, data) {
          $(row).on("click", function () {
           // handleShow(data.slno);
          });
          row.style.cursor = "pointer";
          row.addEventListener("mouseover", () => {
            if (!row.classList.contains("paid-row")) {
              row.style.backgroundColor = "#757575";
              row.style.color = "white";
            }
          });

          row.addEventListener("mouseout", () => {
            if (!row.classList.contains("paid-row")) {
              row.style.backgroundColor = "";
              row.style.color = "black";
            }
          });
        },
        createdRow: function (row, data, dataIndex) {
          const paymentStatus = data.payment_status;
          if (paymentStatus === "Paid") {
            row.style.backgroundColor = "lightgreen";
            row.classList.add("paid-row");
          } else if (paymentStatus === "Partial Paid") {
            row.style.backgroundColor = "#FFC0CB";
            row.classList.add("paid-row");
          }
        },
      });
    });
  },  [fromDate, toDate]);
  
  const handleCheckboxClick = (slno) => {
    console.log("Checkbox clicked for slno:", slno);
    setSelectedCheckboxes((prevState) => {
      const index = prevState.indexOf(slno);
      if (index !== -1) {
        // If it's already in the array, remove it
        return [...prevState.slice(0, index), ...prevState.slice(index + 1)];
      } else {
        // If it's not in the array, add it
        return [...prevState, slno];
      }
    });
    console.log("selectedCheckboxes:", selectedCheckboxes);

    
  };
  
  useEffect(() => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      const slno = parseInt(checkbox.getAttribute('data-slno'), 10);
      checkbox.checked = selectedCheckboxes.includes(slno);
    });
    console.log(selectedCheckboxes);
  }, [selectedCheckboxes]);
  return (
    <div>
      <Sidebar />
      <div style={{ width: "82.5%", float: "right" }}>
        <Header />

        <div className="container">
          <h2 className="p-4" style={{ fontFamily: "auto" }}>
            <TbTableImport className="pe-1 pb-1" size={35} />
            Invoice list
          </h2>
          <div className="py-1">
            {/* Card for invoice */}
            <div className="container">
              <Row>
                <Col className="text-center">
                  <div
                    style={{
                      borderRadius: "10px",
                      border: "2px solid #73AD21",
                      padding: "16x",
                      width: "220px",
                      height: "170px",
                    }}>
                    <h3 style={{ fontFamily: "initial", paddingTop: "25px" }}>
                      Total
                    </h3>
                    <h4 style={{ fontFamily: "initial" }}>Total Amount</h4>
                    <h5>₹ : {totalActualAmount}</h5>
                  </div>
                </Col>

                <Col className="text-center">
                  <div
                    style={{
                      borderRadius: "10px",
                      border: "2px solid #F5C148",
                      padding: "0px",
                      width: "220px",
                      height: "170px",
                    }}
                  >
                    <h3 style={{ fontFamily: "initial", paddingTop: "25px" }}>
                      Total
                    </h3>
                    <h4 style={{ fontFamily: "initial" }}>Discount Amount</h4>
                    <h5>₹ : {totalDiscountAmount}</h5>
                  </div>
                </Col>

                <Col className="text-center">
                  <div
                    style={{
                      borderRadius: "10px",
                      border: "2px solid #F62D1F",
                      padding: "0px",
                      width: "220px",
                      height: "170px",
                    }}>
                    <h3 style={{ fontFamily: "initial", paddingTop: "25px" }}>
                      Total
                    </h3>
                    <h4 style={{ fontFamily: "initial" }}>Paid Amount</h4>
                    <h5>₹ : {totalPaidAmount}</h5>
                  </div>
                </Col>

                <Col className="text-center">
                  <div
                    style={{
                      borderRadius: "10px",
                      border: "2px solid #42AAE6",
                      padding: "0px",
                      width: "220px",
                      height: "170px",
                    }}
                  >
                    <h3 style={{ fontFamily: "initial", paddingTop: "25px" }}>
                      Total
                    </h3>
                    <h4 style={{ fontFamily: "initial" }}>Pending Amount</h4>
                    <h5>₹ : {totalPendingAmount}</h5>
                  </div>
                </Col>
              </Row>
            </div>

            {/*--------------- Filter Date-Time--------------------------------------- */}
            <div className="pt-4">
              <div
                className="pt-5 d-flex"
                style={{
                  margin: "auto",
                  width: "100%",
                  border: "5px solid #dfdfdf",
                  padding: "52px",
                  backgroundColor: "#e6e6e6",
                }} >
                <div style={{ marginLeft: "260px", display: "flex" }}>
                  <h5 className="pe-2 pt-3">From Date:</h5>
                  <input type="date" ref={fromDateRef} />
                  <h5 className="ps-2 pe-2 pt-3">To Date:</h5>
                  <input type="date" ref={toDateRef} />
                  <div className="ps-4">
                    <button
                      className="button-18"
                      type="submit"
                      onClick={handleFilter}>
                      <h6 className="mb-0" onClick={handleFilter}>
                        Filter
                      </h6>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/*--------------- Filter Date-Time--------------------------------------- */}


            <Paper elevation={2} className="pb-5">
             <div className='container pt-5'>

              <div className="py-4 d-flex">
                <Button style={{backgroundColor:'#D81F1A',color:'#ffff'}}  onClick={sendtoapi}><TbMailFilled size={26} className="me-2"/>Send Reminder SMS &  Email</Button>
              </div>

               <div className="MainDiv">
      {/* Model popup for payablefee */}
      <Modal className="pt-5" show={show} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: '#3488FF', color: '#fff' }} closeButton>
          <Modal.Title>Enter Payable Amount</Modal.Title>
        </Modal.Header>
                    <Modal.Body>
                    {m_payment_status === 'Paid' ? (
    <h2 style={{ color: 'green', textAlign: 'center' }}>{m_payment_status}</h2>
          ) : (
    <h2 style={{ textAlign: 'center' }}>{m_payment_status}</h2>
      )}
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>Name</td>
                <td>
             <h6>{m_name} || {m_roll_no}</h6>
                </td>
              </tr>
              {/* <tr>
                <td>Actual Amount</td>
                <td>
                  <h6>₹{m_actual_amount}</h6>{' '}
                </td>
              </tr> */}
              {/* <tr>
                <td>Discount Amount</td>
                <td>
                  <h6>₹ {m_discount_percent}</h6>
                </td>
              </tr> */}
              <tr>
                <td>Fee glance</td>
                <td>
                <h6 dangerouslySetInnerHTML={{ __html: m_fees_glance }}></h6>
                </td>
                          </tr>
                          <tr>
                <td>Status</td>
                <td>
                  <h6>{m_payment_status}</h6>
                </td>
                          </tr>
                          <tr>
                <td>Paid Amount</td>
                <td>
                  <h6>₹ {m_paid_amount}</h6>
                </td>
                          </tr> 
                          <tr>
                <td>Previous Pending Amount</td>
                <td>
                  <h6>₹ {m_previous_pending_amount}</h6>
                </td>
                          </tr>              
                          <tr style={{backgroundColor: 'lightgreen', fontColor: 'black'}}>
                <td>Total Invoice Amount<br></br>[added Previous Pending Amount]</td>
                <td>
                  <h3 className='text-black fw-bolder'>₹ {m_total_invoice_amount}</h3>
                </td>
                          </tr>
                          <tr style={{backgroundColor: '#FFC0CB', color: 'white'}}>
                          <td> Invoice Amount</td>
                          {/* <td>Current Invoice Pending Amount</td> */}
                <td>
                  <h4>₹ {m_invoice_pending_amount}</h4>
                </td>
                  </tr>
              {/* //  {m_payment_status !== 'Paid' && m_payment_status !== 'Partial Paid' && ( */}
               {m_payment_status !== 'Paid' && (
                <>
              <tr>
                <td>Excess Amount</td>
                <td>
                  <h6>₹ {m_excessAmount}</h6>
                </td>
                              </tr>
   <tr>
  <td colspan="2">
    <Select
      styles={customStyles}
      value={selectedOption}
      onChange={handleSelectChange}
      options={[
        { value: null, label: 'Select a Sponsor Option' },
        ...sponsorOptions
          .filter(option => option.excess_amount !== 0 && option.excess_amount !== null)
          .map((option) => ({
            value: option.id,
            label: option.name,
          })),
      ]}
      isClearable={true}
    />
  </td>
</tr>
{/* <tr>
  <td colspan="2">
    <Select
      styles={customStyles}
      value={selectedOptionstudent}
      onChange={handleSelectChangeStudent}
       options={[
        { value: null, label: 'Select a Parent Option' },
        ...parentOptions
          .filter(option => option.excess_amount !== 0 && option.excess_amount !== null)
          .map((option) => ({
            value: option.id,
            label: option.name,
          })),
      ]}
      isClearable={true}
    />
  </td>
</tr> */}

     <tr>
      <td>Paying Amount</td>
      <td>
        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Amount</InputLabel>
          <FilledInput
            id="filled-adornment-amount"
            startAdornment={<InputAdornment position="start">₹</InputAdornment>}
            inputProps={{ max: maxAmount }}
            onChange={handleAmountChange}
            // value={m_Cashamount}
            // value={enteredAmount} // Use enteredAmount from state
             />
        </FormControl>
      </td>
    </tr>
    <tr>
      <td>Select Mode of Payment</td>
      <Form.Select onChange={(e) => setmode(e.target.value)}>
      {sections.map((res) => (
        <option key={res.id}>{res.paymenttype}</option>
      ))}
     </Form.Select>
    
    </tr>
    <tr>
      <td>Remarks</td>
      <td>
        <Col>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Enter additional details"
            onChange={(e) => setAdditionalDetails(e.target.value)}
          />
        </Col>
      </td>
    </tr>
  </>
)}

            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#E2E3E3' }}>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
                      {/* {m_payment_status !== 'Paid' && m_payment_status !== 'Partial Paid' && ( */}
                      {m_payment_status !== 'Paid' && (
            <Button variant="success" onClick={handleCash}>
              Enter
            </Button>
          )}

        </Modal.Footer>
      </Modal>



      <div className="container">
        <div className="table-responsive">
          <table responsive id="DiscountTable" className="display">
            <thead>
              <tr>
              <th>Select</th> 
               <th>Slno</th>
                <th>Invoice no</th>
                <th>Roll No</th>
                <th>Student Name</th>
                <th>Std|Sec</th>
                {/* <th>Group</th> */}
                            {/* <th>Sec</th> */}
                            <th>Invoice Amount</th>

                <th style={{width: '100px'}}>Payable Fee</th>
                            <th>View Invoice</th>
                            <th>Receipt</th>
                            <th>Payment Status</th>
                            <th>Paid <br></br>Amount</th>
                            <th>Pending <br></br>Amount</th>
                             <th>year</th>
                <th>Due Date</th>
                <th>Hostel/Day</th>
                <th>Sponsor Name</th>
                <th>Email</th>
                <th>Actual Amount</th>
                <th>Discount Amount</th>
                <th>Date</th>
                <th>Created By</th>
                <th>Remark</th>
                <th>Student<br></br> Excess Amount</th>  
               </tr>
            </thead>
          </table>
        </div>
      </div>

 
    </div>
             </div>
          </Paper>
          
          
          </div>
        </div>
      </div>
    </div>
  )
};

export default InvoiceTable