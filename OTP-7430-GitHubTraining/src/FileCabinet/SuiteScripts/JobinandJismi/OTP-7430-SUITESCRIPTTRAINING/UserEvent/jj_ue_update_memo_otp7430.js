/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record'],
    /**
 * @param{record} record
 */
    (record) => {
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
            if(scriptContext.type === scriptContext.UserEventType.EDIT ||scriptContext.type === scriptContext.UserEventType.CREATE){
                let newRec = scriptContext.newRecord;
                let sId = newRec.id;
                let memo = newRec.getValue('custbody_jj_memo_update');
            try{  

                if(memo === true){
                    record.submitFields({
                        type: record.Type.SALES_ORDER,
                        id: sId,
                        values:{ 'memo':'MEMO UPDATED'}

                    });
                };
            }
            catch(e){
                log.error("Error in Updating memo",e.toString());
            };
        }

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
