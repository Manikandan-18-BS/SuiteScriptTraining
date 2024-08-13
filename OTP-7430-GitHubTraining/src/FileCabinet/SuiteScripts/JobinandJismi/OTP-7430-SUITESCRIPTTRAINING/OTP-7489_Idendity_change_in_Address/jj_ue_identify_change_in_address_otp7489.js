/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
/***************************************************************************************
 * *****************
 * OTP Task
 * 
 * OTP-7489:Identify_change_in_Address
 * 
 * 
 * *************************************************************************************
 * ******************
 * 
 * Author: Jobin and Jismi IT Services LLP
 * 
 * Date Created: 29-July-2024
 * 
 * Description: Whenever there is a change in exiting Address or new Address is added to the Customer Record, the custom field should be checked.This should work in Edit context.
 * 
 * REVISION HISTORY
 * 
 * @version 1.0 OTP-1:30-July-2024: Created the initial build by JJ0327
 * 
 * 
 * ***************************************************************************************
 *******************/
define(['N/record'],
    /**
 * @param{record} record
 */
    ( record) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {
           
        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {
            try{
                if(scriptContext.type === scriptContext.UserEventType.EDIT){

                    let newRec = scriptContext.newRecord;
                    let oldRec = scriptContext.oldRecord;
                    let ent = newRec.id;
                    log.debug('Record Id:',ent);
                    
                    let oldLineCount = oldRec.getLineCount({
                        sublistId: 'addressbook'
                    });
                    log.debug('Old line:',oldLineCount);

                    let newLineCount = newRec.getLineCount({
                        sublistId: 'addressbook'
                    });
                    log.debug('New line:',newLineCount);
                    for(let i = 0; i< oldLineCount;i++){

                        let oldAdd = oldRec.getSublistValue({
                            sublistId: 'addressbook',
                            fieldId: 'addressbookaddress_text',
                            line: i
                        });
                        log.debug('Old Addresss:',oldAdd);
                        let newAdd = newRec.getSublistValue({
                            sublistId: 'addressbook',
                            fieldId: 'addressbookaddress_text',
                            line: i
                        });
                        log.debug('New Addresss:',newAdd);

                        if( oldAdd !== newAdd || oldLineCount !== newLineCount){

                            record.submitFields({
                                type: record.Type.CUSTOMER,
                                id: ent,
                                values: {'custentity_jj_address_changed':true}
                            });
                            
                            break;
                        }
                        else{
                            record.submitFields({
                                type: record.Type.CUSTOMER,
                                id: ent,
                                values: {'custentity_jj_address_changed':false}
                            });
                        };
                    }
                };

            }
            catch(e){
                log.error('Error in checking the Checkbox:',e.message);
            };

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
