/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
/***************************************************************************************
 * *****************
 * OTP Task
 * 
 * OTP-7514:Search through the database to find the matching blood donors
 * 
 * 
 * *************************************************************************************
 * ******************
 * 
 * Author: Jobin and Jismi IT Services LLP
 * 
 * Date Created: 06-August-2024
 * 
 * Description:Create a new form to search for the eligible blood donors, based on the filters (blood group) and last donation date (should be three months before) with the entered details.The basic blood donor form would have captured the details of the donor in the NetSuite database (using custom records).The new form must capture the details of the required blood group (and the last donation date) to find the best and eligible donors.Every eligible donor must be displayed in the form with their details (such as Name, Phone Number).
 * 
 * REVISION HISTORY
 * 
 * @version 1.0 OTP-1:06-August-2024: Created the initial build by JJ0327
 * 
 * 
 * ***************************************************************************************
 *******************/
define(['N/currentRecord', 'N/url','N/format','N/ui/message'],
/**
 * @param{currentRecord} currentRecord
 * @param{url} url
 * @param{format} format
 * @param{message} message
 */
function(currentRecord, url,format,message) {
    
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    function pageInit(scriptContext) {

        window.onbeforeunload= null;


    }
/**
     * Function to be executed when search Button is Clicked.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * 
     * @since 2015.2
     */
    
    function searchForm(){
        try{
            let record = currentRecord.get();

            let today = new Date();
            let toDate = format.format({
                value: today,
                type: format.Type.DATE
            });

            let threeMonthBefore = new Date();
            threeMonthBefore.setMonth(today.getMonth()- 3);

            let maxDate = format.format({
                value: threeMonthBefore,
                type: format.Type.DATE
            });

            let blood = record.getValue('custpage_bloodgrp');
            let date = record.getValue('custpage_last_donation_filter');

            let getDate =''

            if(date){
                getDate = format.format({
                    value: date,
                    type: format.Type.DATE
                });
            }
        
            let future = getDate > toDate;
           
            let notThreeMonth = getDate > maxDate ;
           
            if(future){

                alert('The date cannot be in the future. Please select a valid date.');

            }
            else if(notThreeMonth){

                alert('Last donation date should be three months before from today. The date should be on or before '+maxDate);
            }
            else{

                document.location = url.resolveScript({
                    deploymentId: 'customdeploy_jj_sl_eligible_donor',
                    scriptId: 'customscript_jj_sl_eligible_donor',
                    params: {
                        bloodGroup : blood || '',
                        lastDonation: date ||''
                    }
                });
            }
        }
        catch(e){
            console.error('Error Found',e.message);
        };
    }

    function resetForm() {
       
        document.location = url.resolveScript({
            deploymentId: 'customdeploy_jj_sl_eligible_donor',
            scriptId: 'customscript_jj_sl_eligible_donor',
            params: {
                 bloodGroup :'',
                lstDonation: ''
            }
        });
    }
    

    return {
        pageInit: pageInit,
        searchForm:searchForm,
        resetForm: resetForm
    };
    
});
