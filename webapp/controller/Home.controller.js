sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageBox) {
        "use strict";

        return Controller.extend("com.sap.project1.controller.Home", {

            onInit: function(){
                // sending the request to read the data from odata service entityset.
                  this.getOwnerComponent().getModel().read("/Orders",{

                   success:function(orderData) {
                    //CREATE LOCAL VARIABLE TO STORE THE DATA FROM ODATA SERVICE
                    var lv_d1=orderData.results;
                    // create json model.
                    var oJsonModel=new sap.ui.model.json.JSONModel();
                    // assign the data from the local variable to the json model.
                    oJsonModel.setData(lv_d1);
                    this.getView().setModel(oJsonModel,"oJsonForView");

                   }.bind(this),
                   error:function(oError) {

                   }

                  })
            },
            valueHelpCustId:function(){
           //create fragment status
           if(!this.custID){
            this.custID=sap.ui.xmlfragment("com.sap.project1.fragments.Customer",this)
            this.getView().addDependent(this.custID)
           }
           //open the fragment
           this.custID.open();
            },
            formatShippedDate: function (sDate) {
                if (!sDate) {
                    return "N/A"; // Handle cases where the date is null or undefined
                }
            
                // Convert the input date to a JavaScript Date object
                var oDate = new Date(sDate);
            
                // Extract day, month, and year
                var day = String(oDate.getDate()).padStart(2, '0'); // Add leading zero if necessary
                var month = oDate.toLocaleString("en-US", { month: "short" }); // Get month abbreviation
                var year = String(oDate.getFullYear()); // Extract last two digits of the year
            
                // Return the formatted date
                return `${day}/${month}/${year}`;
            },
            onClickSave:function(){
                var comref=this.getView().byId("cName").getValue();
                var conref=this.getView().byId("cTitle").getValue();
                if(comref!==""&&conref!==""&&comref.trim()!==""&&conref.trim()!==""){
                 //alert("yes customer have entered some data")
                MessageBox.success("data entered successfully")
                }
                else{
                  //  alert("mandatory field can not be blank")
                    MessageBox.warning("mandatory fields are necessary")

                }
            }
        });
    });


