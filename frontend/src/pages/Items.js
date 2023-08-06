import React, { useEffect, useState } from 'react'
import axios from '../axios/index'
import Header from '../components/Layout/Header'
import { TextField } from '@mui/material'
import Form from '../components/Form/Form'
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import DeleteIcon from "@mui/icons-material/Delete";
import BackspaceIcon from "@mui/icons-material/Backspace";
import Table from '../components/Table/Table';
import { Link } from 'react-router-dom';
import BannerBackground from "../assets/home-banner-background.png";

const Items = () => {
  const [allItemList, setAllItemList] = useState([[]]);
  const [itemCode, setItemCode] = useState("");
  const [description, setDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState(0);
  const [qty, setQty] = useState(0);

  const handleTableRowClick = (tableRow) => {
    setItemCode(tableRow[0]);
    setDescription(tableRow[1]);
    setUnitPrice(tableRow[2]);
    setQty(tableRow[3]);
  }

  useEffect(() => {
    getAllItems();
   }, []);

   const getAllItems = () => {
    axios.get("item")
    .then((res) => {
      let allItems = [];
      for(let i=0; i<res.data.length; i++){
        allItems.push([
          res.data[i].itemCode,
          res.data[i].description,
          res.data[i].unitPrice,
          res.data[i].qty,
        ]);
      }

      setAllItemList(allItems);
    })
    .catch((error) => {
      console.log(error);
    })
   }

   const clearAllFields = () => {
    setItemCode("");
    setDescription("");
    setUnitPrice(0);
    setQty(0);
   }
   
   //save Item
   const handleSaveItem = () => {
    let newItem = {
      itemCode: itemCode,
      description: description,
      unitPrice: unitPrice,
      qty: qty,
    }
    axios.post('item/saveItem' , newItem, {
      headers: {
      'Content-Type': 'application/json'
      }
  })
  .then((res) => {
    getAllItems();
    clearAllFields();
    alert(res.data);
  })
  .catch((error) => {
    console.log(error);
    clearAllFields();
  })
  }

  // Update Item
  const handleUpdateItem = () => {
    let item = {
      itemCode: itemCode,
      description: description,
      unitPrice: unitPrice,
      qty: qty,
    };

    axios.put('item/updateItem/'+itemCode, item, {
        headers: {
          'Content-Type': 'application/json'
        }

    }).then((res) => {
      getAllItems();
      clearAllFields();
      alert(res.data.success);
    })
    .catch((error) => {
      console.log(error);
      clearAllFields();
    })
   };

   const handleDeleteItem = () => {
    if(itemCode !== ""){
      axios.delete('item/deleteitem/'+itemCode)

      .then((res) => {
        getAllItems();
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
   }

   
  const tableHeight = "300px"; // Adjust the height as needed

  return (
    <div>
      <Header />

      <section>
      <div className="home-bannerImage-container">
            <img src={BannerBackground} alt="" />
        </div>
        <div style={{display: 'inline-block', marginTop: '10px'}}>
          <h2 className='ml-6 text-3xl text-red-700 font-bold font-sans inline-block shadow-black shadow-lg'>MANAGE ITEMS</h2>
        </div>

        <div className='absolute top-40 left-0 right-0 m-auto ms-auto shadow-lg shadow-black h-56 w-4/5 rounded-lg'>
          <h3 className='text-xl text-orange-800 font-serif font-bold text-center mt-3' style={{color:"purple"}}>Save | Update | Delete Item</h3>

          <div className='absolute top-0 bottom-0 left-0 right-0 m-auto ms-auto w-11/12 h-2/4 inline-block space-x-6'>
          {/* <TextField id="outlined-text-input" label="Item Id" type="text" />
          <TextField id="outlined-text-input" label="Description" type="text" className='text-white' style={{width:'400px'}}/>
          <TextField id="outlined-text-input" label="Unit Price" placeholder='Rs.0.00' type="" className='text-white'/>
          <TextField id="outlined-text-input" label="Item Name" type="text" className='text-white'/>
          <TextField id="outlined-text-input" label="Item Name" type="text" className='text-white'/> */}

        <Form
          textFieldsArray={[
            {
              label: "Item Code",
              textFieldType: "text",
              name: "itemCode",
              placeHolderText: "Item Code",
              value: itemCode,
              onChange: (event) => {
                setItemCode(event.target.value);
              },
            },
            {
              label: "Description",
              textFieldType: "text",
              name: "description",
              placeHolderText: "Description",
              value: description,
              onChange: (event) => {
                setDescription(event.target.value);
              },
            },
            {
              label: "Unit Price",
              textFieldType: "text",
              name: "unitPrice",
              placeHolderText: "Rs. 0.00",
              value: unitPrice,
              onChange: (event) => {
                setUnitPrice(event.target.value);
              },
            },
            {
              label: "Quantity",
              textFieldType: "Number",
              name: "qty",
              placeHolderText: "Quantity",
              value: qty,
              onChange: (event) => {
                setQty(event.target.value);
              },
            }
          ]}


          buttonsArray={[
            {
              color: "success",
              icon: <AddCircleIcon />,
              text: "Save",
              onClick: handleSaveItem,
            },
            {
              color: "primary",
              icon: <AutorenewIcon />,
              text: "Update",
              onClick: handleUpdateItem,
            },
            {
              color: "error",
              icon: <DeleteIcon />,
              text: "Delete",
              onClick: handleDeleteItem,
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

      <div className='absolute top-2/3 left-0 right-0 m-auto w-11/12 h-1/3'>
      <Table
          tblName="All Item Details"
          tblHeight="auto"
          tblHeaders={[
            "Item Code",
            "Description",
            "Unit Price",
            "Quantity",
          ]}
          tblData={allItemList.map((itemArray) => itemArray)}
          handleTblRowClick={handleTableRowClick}
        />
      </div>

      
    </div>
  )
}

export default Items