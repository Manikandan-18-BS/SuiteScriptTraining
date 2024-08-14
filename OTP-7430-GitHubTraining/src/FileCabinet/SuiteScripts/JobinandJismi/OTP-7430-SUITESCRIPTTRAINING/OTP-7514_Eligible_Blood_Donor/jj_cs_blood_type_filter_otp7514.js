/**
 * @NApiVersion 2.x
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
define(['N/currentRecord', 'N/url'],
/**
 * @param{currentRecord} currentRecord
 * @param{url} url
 */
function(currentRecord, url) {
    
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

            let fieldId = scriptContext.fieldId;
            console.log(fieldId);

            let currentRecord = scriptContext.currentRecord;

            let blood = '';

            if(fieldId === 'custpage_bloodgrp'){
                
                blood = currentRecord.getValue('custpage_bloodgrp');
                console.log(blood);

                document.location = url.resolveScript({
                    deploymentId: 'customdeploy_jj_sl_eligible_donor_7514',
                    scriptId: 'customscript_jj_sl_eligible_donor_7514',
                    params: {
                        bloodGroup : blood || ''
                    }
                });
            }
        }
        catch(e){
            log.error('Error Found',e.message);
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
