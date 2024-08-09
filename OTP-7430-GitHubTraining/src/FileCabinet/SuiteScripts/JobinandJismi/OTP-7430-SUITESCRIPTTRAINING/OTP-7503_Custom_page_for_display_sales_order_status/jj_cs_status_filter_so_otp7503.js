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
    
    // /**
    //  * Function to be executed after page is initialized.
    //  *
    //  * @param {Object} scriptContext
    //  * @param {Record} scriptContext.currentRecord - Current form record
    //  * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
    //  *
    //  * @since 2015.2
    //  */
    // function pageInit(scriptContext) {

    // }

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

            // if(fieldId === 'custpage_status'){

                sts = currentRecord.getValue('custpage_status');
                console.log(sts);
            // };

            // if(fieldId === 'custpage_customer'){

                cust = currentRecord.getValue('custpage_customer');
            // };

            // if(fieldId === 'custpage_subsidiary'){

                sub = currentRecord.getValue('custpage_subsidiary');
            // };

            // if(fieldId === 'custpage_department'){

                dep = currentRecord.getValue('custpage_department');
            // };

            // let paramsValue ={

            //     statusVal: sts || '',
            //     customer: cust || '',
            //     subsidiary: sub || '',
            //     department: dep || ''
            // };

            if(fieldId === 'custpage_status' || 'custpage_customer' || 'custpage_subsidiary' || 'custpage_department'){

                // let suiteletUrl = url.resolveScript({
                //     deploymentId: 'customdeploy_jj_sl_custom_page_displ_so',
                //     scriptId: 'customscript_jj_sl_custom_page_displ_so',
                // })

                // https.get({
                //     parameters:params,
                //     url: suiteletUrl
                // }).then(function(response){
                //     let resBody = JSON.parse(response.body);
                //     console.log(resBody);
                // }).catch(function(error){
                //     console.error(error);
                // });

                document.location = url.resolveScript({
                    scriptId: 'customscript_jj_sl_custom_page_displ_so',
                    deploymentId: 'customdeploy_jj_sl_custom_page_displ_so',
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

    // /**
    //  * Function to be executed when field is slaved.
    //  *
    //  * @param {Object} scriptContext
    //  * @param {Record} scriptContext.currentRecord - Current form record
    //  * @param {string} scriptContext.sublistId - Sublist name
    //  * @param {string} scriptContext.fieldId - Field name
    //  *
    //  * @since 2015.2
    //  */
    // function postSourcing(scriptContext) {

    // }

    // /**
    //  * Function to be executed after sublist is inserted, removed, or edited.
    //  *
    //  * @param {Object} scriptContext
    //  * @param {Record} scriptContext.currentRecord - Current form record
    //  * @param {string} scriptContext.sublistId - Sublist name
    //  *
    //  * @since 2015.2
    //  */
    // function sublistChanged(scriptContext) {

    // }

    // /**
    //  * Function to be executed after line is selected.
    //  *
    //  * @param {Object} scriptContext
    //  * @param {Record} scriptContext.currentRecord - Current form record
    //  * @param {string} scriptContext.sublistId - Sublist name
    //  *
    //  * @since 2015.2
    //  */
    // function lineInit(scriptContext) {

    // }

    // /**
    //  * Validation function to be executed when field is changed.
    //  *
    //  * @param {Object} scriptContext
    //  * @param {Record} scriptContext.currentRecord - Current form record
    //  * @param {string} scriptContext.sublistId - Sublist name
    //  * @param {string} scriptContext.fieldId - Field name
    //  * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
    //  * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
    //  *
    //  * @returns {boolean} Return true if field is valid
    //  *
    //  * @since 2015.2
    //  */
    // function validateField(scriptContext) {

    // }

    // /**
    //  * Validation function to be executed when sublist line is committed.
    //  *
    //  * @param {Object} scriptContext
    //  * @param {Record} scriptContext.currentRecord - Current form record
    //  * @param {string} scriptContext.sublistId - Sublist name
    //  *
    //  * @returns {boolean} Return true if sublist line is valid
    //  *
    //  * @since 2015.2
    //  */
    // function validateLine(scriptContext) {

    // }

    // /**
    //  * Validation function to be executed when sublist line is inserted.
    //  *
    //  * @param {Object} scriptContext
    //  * @param {Record} scriptContext.currentRecord - Current form record
    //  * @param {string} scriptContext.sublistId - Sublist name
    //  *
    //  * @returns {boolean} Return true if sublist line is valid
    //  *
    //  * @since 2015.2
    //  */
    // function validateInsert(scriptContext) {

    // }

    // /**
    //  * Validation function to be executed when record is deleted.
    //  *
    //  * @param {Object} scriptContext
    //  * @param {Record} scriptContext.currentRecord - Current form record
    //  * @param {string} scriptContext.sublistId - Sublist name
    //  *
    //  * @returns {boolean} Return true if sublist line is valid
    //  *
    //  * @since 2015.2
    //  */
    // function validateDelete(scriptContext) {

    // }

    // /**
    //  * Validation function to be executed when record is saved.
    //  *
    //  * @param {Object} scriptContext
    //  * @param {Record} scriptContext.currentRecord - Current form record
    //  * @returns {boolean} Return true if record is valid
    //  *
    //  * @since 2015.2
    //  */
    // function saveRecord(scriptContext) {

    // }

    return {
        // pageInit: pageInit,
        fieldChanged: fieldChanged
        // postSourcing: postSourcing,
        // sublistChanged: sublistChanged,
        // lineInit: lineInit,
        // validateField: validateField,
        // validateLine: validateLine,
        // validateInsert: validateInsert,
        // validateDelete: validateDelete,
        // saveRecord: saveRecord
    };
    
});
