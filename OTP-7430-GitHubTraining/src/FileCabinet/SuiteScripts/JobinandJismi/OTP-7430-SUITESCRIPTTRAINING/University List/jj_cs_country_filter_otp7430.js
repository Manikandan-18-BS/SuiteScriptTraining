/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
/***************************************************************************************
 * *****************
 * OTP Task
 * 
 * OTP-7430:List_the_university
 * 
 * 
 * *************************************************************************************
 * ******************
 * 
 * Author: Jobin and Jismi IT Services LLP
 * 
 * Date Created: 23-August-2024
 * 
 * Description: List the university based on the given country
 * 
 * REVISION HISTORY
 * 
 * @version 1.0 OTP-7430:23-August-2024: Created the initial build by JJ0327
 * 
 * 
 * ***************************************************************************************
 *******************/
define(['N/currentRecord','N/url'],
/**
 * @param{currentRecord} currentRecord
 * @param{url} url
 */
function(currentRecord,url) {
    
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

        window.onbeforeunload = null

    }

    /**
     * Function to be executed when submit button is clicked.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     *
     * @since 2015.2
     */
    function submitForm(){
        try{

            let rec = currentRecord.get();

            let con = rec.getValue('custpage_country');

            if(con){
                document.location = url.resolveScript({
                    deploymentId: 'customdeploy_jj_sl_list_university',
                    scriptId: 'customscript_jj_sl_list_university',
                    params: {
                        country:con
                    }
                })
            }
            else{
                
                alert('Please Select the country');
            }
        }
        catch(e){
            console.error('Error:',e.message);
        };
    }

    return {
        pageInit: pageInit,
        submitForm:submitForm
    };
    
});
