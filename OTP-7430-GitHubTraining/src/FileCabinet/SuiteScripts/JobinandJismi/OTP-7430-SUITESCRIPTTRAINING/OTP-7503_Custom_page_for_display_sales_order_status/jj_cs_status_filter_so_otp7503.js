/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
/***************************************************************************************
 * *****************
 * OTP Task
 * 
 * OTP-7503:Custom page for display sales order based on the status
 * 
 * 
 * *************************************************************************************
 * ******************
 * 
 * Author: Jobin and Jismi IT Services LLP
 * 
 * Date Created: 02-August-2024
 * 
 * Description: Create a custom form that will display sales orders which need to be fulfilled or billed.The value should be update dynamically based on the filters.
 * 
 * REVISION HISTORY
 * 
 * @version 1.0 OTP-1:02-August-2024: Created the initial build by JJ0327
 * 
 * 
 * ***************************************************************************************
 *******************/
define(['N/currentRecord', 'N/url','N/record', 'N/search'],
/**
 * @param{currentRecord} currentRecord
 * @param{url} url
 * @param{record} record
 * @param{search} search
 */
function(currentRecord, url,record, search) {
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    function pageInit(scriptContext)
    {
        window.onbeforeunload = null;
 
    }

    /**
     * Function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @since 2015.2
     */
    function fieldChanged(scriptContext) {
        try{
            console.log("Entered client script");

            let fieldId = scriptContext.fieldId;
            console.log(fieldId);


            let currentRecord = scriptContext.currentRecord;
            log.debug(currentRecord);

            let sts ='';
            let cust = '';
            let sub = '';
            let dep = '';


                sts = currentRecord.getValue('custpage_status');
                console.log(sts);

                cust = currentRecord.getValue('custpage_customer');

                sub = currentRecord.getValue('custpage_subsidiary');

                dep = currentRecord.getValue('custpage_department');

            if(fieldId === 'custpage_status' || 'custpage_customer' || 'custpage_subsidiary' || 'custpage_department'){

                document.location = url.resolveScript({
                    scriptId: 'customscript_jj_sl_cus_page_dis_so',
                    deploymentId: 'customdeploy_jj_sl_cus_page_dis_so',
                    params: {

                        statusVal: sts || '',
                        customer: cust || '',
                        subsidiary: sub || '',
                        department: dep || ''
                    }
                });
                
            };
        }
        catch(e){
            log.error('Error Found:',e.message);
        };
    }

    return {
        fieldChanged: fieldChanged,
        pageInit: pageInit
    };
    
});
