import React, { useEffect, useState } from 'react'
import axios from '../axios/index'
import Header from '../components/Layout/Header'
import Form from '../components/Form/Form'
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import DeleteIcon from "@mui/icons-material/Delete";
import BackspaceIcon from "@mui/icons-material/Backspace";
import Table from '../components/Table/Table';
import { Link } from 'react-router-dom';
import BannerBackground from "../assets/home-banner-background.png";

const Customer = () => {
  const [allCustomersList, setAllCustomersList] = useState([[]]);
  const [customerID, setCustomerID] = useState("");
  const [cusName, setCusName] = useState("");
  const [cusAddress, setCusAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleTableRowClick = (tableRow) => {
    setCustomerID(tableRow[0]);
    setCusName(tableRow[1]);
    setCusAddress(tableRow[2]);
    setContactNumber(tableRow[3]);
    setEmail(tableRow[4]);
  }

  useEffect(() => {
    getAllCustomers();
   }, []);

   const getAllCustomers = () => {
    axios.get("customer")
    .then((res) => {
      let allCustomers = [];
      for(let i=0; i<res.data.length; i++){
        allCustomers.push([
          res.data[i].cId,
          res.data[i].name,
          res.data[i].address,
          res.data[i].contact,
          res.data[i].email,
        ]);
      }

      setAllCustomersList(allCustomers);
    })
    .catch((error) => {
      console.log(error);
    })
   }

   const clearAllFields = () => {
    setCustomerID("");
    setCusName("");
    setCusAddress("");
    setContactNumber("");
    setEmail("");
   }

   // Save Customer
   const handleSaveCustomer = () => {
    let newCustomer = {
      cId: customerID,
      name: cusName,
      address: cusAddress,
      contact: contactNumber,
      email: email,
    };

    axios.post('customer/saveCustomer' , newCustomer, {
        headers: {
        'Content-Type': 'application/json'
        }
    })
    .then((res) => {
      getAllCustomers();
      clearAllFields();
      alert(res.data);
    })
    .catch((error) => {
      console.log(error);
      clearAllFields();
    })
   };

    // Update Customer
    const handleUpdateCustomer = () => {
      let customer = {
        cId: customerID,
        name: cusName,
        address: cusAddress,
        contact: contactNumber,
        email: email,
      };

      axios.put('customer/updateCustomer/'+customerID, customer, {
          headers: {
            'Content-Type': 'application/json'
          }

      }).then((res) => {
        getAllCustomers();
        clearAllFields();
        alert(res.data.success);
      })
      .catch((error) => {
        console.log(error);
        clearAllFields();
      })
     };

    // Delete Customer
    const handleDeleteCustomer = () => {
      if(customerID !== ""){
        axios.delete('customer/deleteCustomer/'+customerID)

        .then((res) => {
          getAllCustomers();
          clearAllFields();
          alert(res.data.success);
        })

        .catch((error) => {
          console.log(error);
          clearAllFields();
        })
      } else {
        alert("Please enter a customer ID");
      }
    };

   
  const tableHeight = "300px"; // Adjust the height as needed

  return (
    <div>
      <Header />

      <section>
      <div className="home-bannerImage-container">
            <img src={BannerBackground} alt="" />
        </div>
        <div style={{display: 'inline-block', marginTop: '15px'}}>
          <h2 className='ml-6 text-3xl text-blue-800 font-bold font-sans inline-block shadow-black shadow-lg'>MANAGE CUSTOMERS</h2>
          
        </div>

        <div className='absolute top-36 left-0 right-0 m-auto ms-auto shadow-lg shadow-black h-72 w-4/5 rounded-lg'>
          <h3 className='text-xl text-red-700 font-serif font-bold text-center mt-3'>Save | Update | Delete Customers</h3>

          <div className='absolute top-0 bottom-0 left-0 right-0 m-auto ms-auto w-11/12 h-2/4 inline-block space-x-6'>
         
          <Form
          textFieldsArray={[
            {
              label: "Customer ID",
              textFieldType: "text",
              name: "customerId",
              placeHolderText: "Customer ID",
              value: customerID,
              onChange: (e) => {
                setCustomerID(e.target.value);
              },
            },
            {
              label: "Name",
              textFieldType: "text",
              name: "name",
              placeHolderText: "name",
              value: cusName,
              onChange: (event) => {
                setCusName(event.target.value);
              },
            },
            
            
            {
              label: "Address",
              textFieldType: "text",
              name: "address",
              placeHolderText: "Address",
              value: cusAddress,
              onChange: (event) => {
                setCusAddress(event.target.value);
              },
            },
            {
              label: "Contact Number",
              textFieldType: "text",
              name: "contactNumber",
              placeHolderText: "Contact Number",
              value: contactNumber,
              onChange: (event) => {
                setContactNumber(event.target.value);
              },
            },
            {
              label: "Email",
              textFieldType: "text",
              name: "email",
              placeHolderText: "Email",
              value: email,
              onChange: (event) => {
                setEmail(event.target.value);
              },
            },
          ]}
          buttonsArray={[
            {
              color: "success",
              icon: <AddCircleIcon />,
              text: "Save",
              onClick: handleSaveCustomer,
            },
            {
              color: "primary",
              icon: <AutorenewIcon />,
              text: "Update",
              onClick: handleUpdateCustomer,
            },
            {
              color: "error",
              icon: <DeleteIcon />,
              text: "Delete",
              onClick: handleDeleteCustomer,
            },
            {
              color: "warning",
              icon: <BackspaceIcon />,
              text: "Clear",
              onClick: clearAllFields,
            },
          ]}
        />

          </div>        
          {/* <div className=''></div> */}
        </div>

      </section>

      <div className='absolute top-3/4 left-0 right-0 m-auto w-11/12 h-1/3'>
      <Table
          tblName="All Customers"
          tblHeight="auto"
          tblHeaders={[
            "Customer ID",
            "Customer Name",
            "Address",
            "Contact",
            "E-mail"
          ]}
          tblData={allCustomersList.map((customerArray) => customerArray)}
          handleTblRowClick={handleTableRowClick}
        />
      </div>

      
    </div>
  )
}

export default Customer