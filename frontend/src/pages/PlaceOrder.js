import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import Form from '../components/Form/Form'
import Table from '../components/Table/Table';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import BackspaceIcon from "@mui/icons-material/Backspace";
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import { Link } from 'react-router-dom';
import { Button, Input} from '@mui/material';
import ConfirmationNumberRoundedIcon from '@mui/icons-material/ConfirmationNumberRounded';
import axios from '../axios/index';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';


const PlaceOrder = () => {

  const [allCustomerIds, setAllCustomerIds] = useState([]);
  const [allItemCodes, setAllItemCodes] = useState([]);
  const [orderID, setOrderID] = useState("");
  const [orderDate, setorderDate] = useState("");
  const [cusName, setCusName] = useState("");
  const [cusAddress, setCusAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [itemCode, setitemCode] = useState("");
  const [description, setDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [orderQty, setOrderQty] = useState(0);

  const [total, setTotal] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [subTotal, setSubTotal] = useState(0)

  const [cartItemList, setcartItemList] = useState([]);


  const generateTotal = () => {
    const tot = unitPrice*orderQty;
    setTotal(tot);
    //alert(tot);
    generateSubTotal(tot, 0);
  }

  const clearAllFields = () => {
    setOrderID("");
    setorderDate(Date.now);
    setCusName("");
    setCusAddress("");
    setContactNumber("");
    setEmail("");
    setDescription("");
    setUnitPrice("");
    setQty("");
    setOrderQty("")
  }

  const generateSubTotal = (x, disc) => {
    //alert(x);
    const discountPrice = x*disc/100;
    // alert(disc)
    // setDiscount(disc)
    const subTot = x - discountPrice;
    setSubTotal(subTot);
  }

  useEffect(() => {
    getAllCustomerIds();
    getAllItemCodes();
  }, []);


  const getAllItemCodes = () => {
    axios.get("item")
    .then((res) => {
      let allItemCodes = [];
      for(let i=0; i<res.data.length; i++){
        allItemCodes.push(
          res.data[i].itemCode,
        );
      }

      setAllItemCodes(allItemCodes);
    })
    .catch((error) => {
      console.log(error);
    })
  }


  const getAllCustomerIds = () => {
    axios.get("customer")
    .then((res) => {
      let allCustomerIds = [];
      for(let i=0; i<res.data.length; i++){
        allCustomerIds.push(
          res.data[i].cId,
        );
      }

      setAllCustomerIds(allCustomerIds);
    })
    .catch((error) => {
      console.log(error);
    })
   }

   const handleChangeCustomerID = (event) => {
    const selectedValue = event.target.value;
      if(selectedValue !== ""){
        
        axios.get('customer/getCustomerById/'+selectedValue)
        .then((res) => {
          
          setCustomerDetails(res.data);
        })
        .catch((error) => {
          console.log(error);
          // clearAllFields();
        })
      } else {
        alert("Please enter a customer ID");
      }
   }

   const setCustomerDetails = (CustomerData) => {

    setCusName(CustomerData.name)
    setCusAddress(CustomerData.address)
    setContactNumber(CustomerData.contact)
    setEmail(CustomerData.email)

   }


   const handleChangeItemCode = (event) => {
    const selectedValue = event.target.value;
      if(selectedValue !== ""){
        setitemCode(selectedValue)
        axios.get('item/getItemByCode/'+selectedValue)
        .then((res) => {
          
          setItemDetails(res.data);
        })
        .catch((error) => {
          console.log(error);
          // clearAllFields();
        })
      } else {
        alert("Please enter a Item Code");
      }
   }


   const setItemDetails = (itemData) => {
    setDescription(itemData.description)
    setUnitPrice(itemData.unitPrice)
    setQty(itemData.qty)
   }
   

  const handleTableRowClick = (tableRow) => {
    console.log(tableRow);
  }

  const setCartDetails = () => {
   
    // const cart = {
    //   itemCode : itemCode,
    //   description : description,
    //   unitPrice : unitPrice,
    //   qty : orderQty,
    //   total : subTotal,
    //   Option : <button><DeleteIcon /></button>
    // }

    const tot = total+(unitPrice*orderQty);
    setTotal(tot);

    const subTot = tot - discount;
    setSubTotal(subTot);

    cartItemList.push([
      itemCode,
      description,
      unitPrice,
      orderQty,
      (unitPrice*orderQty),
      <div className='flex space-x-2'><button className='bg-red-600 rounded-md shadow-md shadow-black'><DeleteIcon className='text-white m-1'/></button><button className='bg-cyan-900 rounded-md shadow-md shadow-black'><ModeEditIcon className='text-white m-1'/></button></div>
    ]);

    // cartItemList.push([itemCode,
    //   description,
    //   unitPrice,
    //   orderQty,
    //   subTotal,
    //   <button><DeleteIcon /></button>]);
  }

  // Save Order
  const handleSaveOrder = () => {
    let newOrder = {
      orderId: orderID,
      date: orderDate,
      total: total,
      discount: discount,
      subTotal: subTotal,
    };

    axios.post('order/placeOrder' , newOrder, {
        headers: {
        'Content-Type': 'application/json'
        }
    })
    .then((res) => {
      clearAllFields();
      alert(res.data);
    })
    .catch((error) => {
      console.log(error);
      clearAllFields();
    })
   };


  //  const saveOrderDetails = () => {
  //   let newOrder = {
  //     orderId: orderID,
  //     date: orderDate,
  //     total: total,
  //     discount: discount,
  //     subTotal: subTotal,
  //   };

  //   axios.post('order/placeOrder' , newOrder, {
  //       headers: {
  //       'Content-Type': 'application/json'
  //       }
  //   })
  //   .then((res) => {
  //     clearAllFields();
  //     alert(res.data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     clearAllFields();
  //   })
  //  };

  

const tableHeight = "300px";

  return (
    
    <>
      <Header />
      

      <section>
        
        <div>

        <div className='mb-3' style={{display: 'inline-block', marginTop: '15px'}}>
          <h2 className='ml-6 text-3xl text-green-600 font-extrabold font-sans inline-block shadow-black shadow-lg'>Place an Order</h2>
        </div>


{/* ------------------------------------------------------------------------------------- */}
        <div className='columns-2 flex space-x-4 h-72 max-w-7xl left-0 right-0 m-auto'>

          <div className='columns-2xl bg-red-100 h-72 shadow-lg shadow-slate-700 rounded-lg'>
            <h3 className='ml-3 text-xl text-red-600 font-sans font-bold'>Invoce Details</h3>

            <div className='mt-3'>

            <Form
          textFieldsArray={[
            {
              label: "Order ID",
              textFieldType: "text",
              name: "name",
              placeHolderText: "OrderID",
              value: orderID,
              onChange: (event) => {
                setOrderID(event.target.value);
              },
            },

            {
              label: "",
              textFieldType: "Date",
              name: "date",
              placeHolderText: "Date",
              value: orderDate,
              onChange: (event) => {
                setorderDate(event.target.value);
              },
            },

            {
              InputLabel: "Customer ID",
              textFieldType: "select",
              name: "customerId",
              placeHolderText: "Customer ID",
              menuItems: allCustomerIds,
              label: "Customer ID",
              onChange: handleChangeCustomerID,
              
            },
            {
              label: "Name",
              textFieldType: "text",
              name: "name",
              placeHolderText: "name",
              value: cusName
            },
            
            
            {
              label: "Address",
              textFieldType: "text",
              name: "address",
              placeHolderText: "Address",
              value: cusAddress
            },
            {
              label: "Contact Number",
              textFieldType: "text",
              name: "contactNumber",
              placeHolderText: "Contact Number",
              value: contactNumber
            },
            {
              label: "Email",
              textFieldType: "text",
              name: "email",
              placeHolderText: "Email",
              value: email
            },

          ]}

          buttonsArray={[    
            {
              color: "success",
              icon: <PersonAddAlt1RoundedIcon />,
              text: "Add New Customer",
              // onClick: handleSaveCustomer,
            },

            {
              color: "error",
              icon: <BackspaceIcon />,
              text: "Clear",
              // onClick: handleDeleteCustomer,
            },

          ]}
          />

            </div>
            
          </div>

      <div className='columns-3xl bg-gray-200 shadow-lg shadow-slate-700 rounded-lg'>
        <h3 className='ml-3 text-xl text-violet-800 font-sans font-bold'>Select Item</h3>

        <div className='mt-3'>

        <Form
      textFieldsArray={[
        {
          label: "Item Code",
          textFieldType: "select",
          name: "itemCode",
          placeHolderText: "Item Code",
          menuItems: allItemCodes,
          label: "Item Code",
          value: itemCode,
          onChange: handleChangeItemCode,
       },
        {
          label: "Description",
          textFieldType: "text",
          name: "description",
          placeHolderText: "description",
          value: description,
          // onChange: (event: ChangeEvent<HTMLInputElement>) => {
          //   setUsername(event.target.value);
          // },
       },
  
  
        {
          label: "Unit Price",
          textFieldType: "text",
          name: "unitPrice",
          placeHolderText: "unitPrice",
          value: unitPrice,
         // onChange: (event: ChangeEvent<HTMLInputElement>) => {
         //   setAddress(event.target.value);
          // },
        },
        {
          label: "QTY On Hand",
          textFieldType: "text",
          name: "qtyOnHand",
          placeHolderText: "QTY On Hand",
          readOnly : true,
          value: qty,
          // onChange: (event: ChangeEvent<HTMLInputElement>) => {
          //   setContactNumber(event.target.value);
          // },
        },
        {
          label: "Qty For Order",
          textFieldType: "Number",
          name: "qtyForOrder",
          placeHolderText: "Qty For Order",
          // value: email,
          onChange: (event) => {
            setOrderQty(event.target.value);
         },
        },
      ]}

      buttonsArray={[
        {
          color: "success",
          icon: <AddShoppingCartRoundedIcon />,
          text: "Add to Cart",
          onClick: setCartDetails,
        },

        {
          color: "error",
          icon: <BackspaceIcon />,
          text: "Clear",
          // onClick: handleDeleteCustomer,
        },

      ]}
      />

        </div>
  
</div>


        </div>

        

        <div className='relative top-28 left-0 right-0 m-auto w-11/12 h-1/3 block'>
      <Table
          tblName="Cart"
          tblHeight="auto"
          tblHeaders={[
            "Item Code",
            "Description",
            "Unit Price",
            "Qty",
            "Total",
            "Options"
          ]}
          tblData={cartItemList.map((cartArray) => cartArray)}
         // handleTblRowClick={handleTableRowClick}
        />

      
      </div>   
      
    </div>
    <div className='absolute w-48 h-24 mt-32 mb-12 right-14 pb-16 text-xl'>

          <button className='absolute top-2/4 bottom-0 left-9 right-0 m-auto text-lg bg-green-600 text-white font-sans font-bold rounded-lg shadow-black shadow-xl'
          onClick={(event) => {
            handleSaveOrder();
         }}
          >
            PLACE ORDER
          </button>

    </div>
    </section>

     

    </>

  )
}

export default PlaceOrder
