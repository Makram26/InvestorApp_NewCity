import client from './client'

const sendPaidAmount = (invoiceId, params) => {
    const data = {
        jsonrpc: "2.0",
        params: {
            args:[],
            kwargs:{                
                invoice_ids: params,
                file_id: [invoiceId]
            }
        }    
    }
    
    const response = client.post('/object/maintenance.charges.payment/receive_payment_from_app', data)
    return response;
};

const paidAmountCharge= (invoiceId, paidAmount, invId) =>{

   return fetch (`http://23.101.22.149:8074/object/maintenance.charges.payment/${invoiceId}/receive_payment_from_app`,{
       method:'POST',
       headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        params: {
            args:[],
            kwargs:{                
                "invoice_ids":[
                    {"payment_amount":250,"invoice_id":229639}
                ]
            }
        } 
      })
   }).then(res => res.json())

}

const getInvoices = (invoiceID) => {
    const data = {
        jsonrpc: "2.0",
        params: {
            args:[],
            kwargs:{      
                domain:[["inventory_id","=",invoiceID]]
            }
        }    
    }
    // console.log("InvoicesData:")
    // console.log(data)
    const response = client.post('/object/plot.inventory/get_files_and_invoices',data)
    // console.log("Get Invoices Response:")
    // console.log(response)
    return response
}


const getStreets = (sectorID,offset) => {
    const data = {
        jsonrpc: "2.0",
        params: {
                args:[],
                kwargs:{      
                    domain:[["sector_id","=",sectorID]],
                    other_data:["from_collection","True"],
                    limit:10,
                    offset:offset
                }
            }    
    }
    // console.log("ChargesData:")
    // console.log(data)
    const response = client.post('/object/plot.inventory/get_streets',data)
    console.log("getStreets API Response:", data.params.kwargs)
    return response
}

const getPlotStreets = (sectorID,offset) => {
    const data = {
        jsonrpc: "2.0",
        params: {
            args:[],
            kwargs:{      
                domain:[["sector_id","=",sectorID]],
                other_data:["from_collection","False"],
                limit:10,
                offset:offset
            }
        }    
    }
    // console.log("ChargesData:")
    // console.log(data)
    const response = client.post('/object/plot.inventory/get_streets',data)
    // console.log("getStreets API Response:", response)
    return response
}

const getInventory = (streetID,offset) => {
    const data = {
        jsonrpc: "2.0",
        params: {
            args:[],
            kwargs:{      
                domain:[["street_id","=",streetID]],
                limit:10,
                offset:offset
            }
        }    
    }
    // console.log("ChargesData:")
    // console.log(data)
    const response = client.post('/object/plot.inventory/get_inventory_details',data)
    console.log("getInventory API Response:", response)
    return response
}

const getSearchedInventory = (streetID) => {
    const data ={
        jsonrpc: "2.0",
        params: {
            args:[],
            kwargs:{      
                name: streetID
            }
        }    
    }
    // console.log("ChargesData:")
    // console.log(data)
    const response = client.post('/object/plot.inventory/search_inventory_details',data)
    console.log("SeachInventory API Response:",  data.params.kwargs)
    return response
}

const getSearchedStreets = (streetID, type) => {
    const data = {
        jsonrpc: "2.0",
        params: {
                args:[],
                kwargs:{      
                    name: streetID,
                    other_data:["from_collection", type]
                }
            }    
    }
    // console.log("ChargesData:")
    // console.log(data)
    const response = client.post('/object/plot.inventory/search_streets',data)
    console.log("SeachStreets API Response:",  data.params.kwargs)
    return response
}

const getSearchedSector = (streetID) => {
    const data = {
        jsonrpc: "2.0",
        params: {
                args:[],
                kwargs:{      
                    name: streetID
                }
            }    
    }
    // console.log("ChargesData:")
    // console.log(data)
    const response = client.post('/object/plot.inventory/search_sector',data)
    console.log("SeachSector API Response:",  data.params.kwargs)
    return response
}

const getTodayPayments = (id) => {
    return client.get(
      `/object/maintenance.charges.payment/get_today_maintenance_payments?uid=${id}`
    );
};

const getCollectionStatus = (offset) => {
    return client.get(
      `object/plot.inventory/get_sector_data?limit=50&offset=${offset}`
    );
};


export default {
    getStreets,
    sendPaidAmount,
    paidAmountCharge,
    getInvoices,
    getInventory,
    getTodayPayments,
    getPlotStreets,
    getCollectionStatus,
    getSearchedInventory,
    getSearchedStreets,
    getSearchedSector
};