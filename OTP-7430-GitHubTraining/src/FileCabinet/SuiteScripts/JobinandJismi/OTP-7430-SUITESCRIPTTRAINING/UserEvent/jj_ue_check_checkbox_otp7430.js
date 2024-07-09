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
            if(scriptContext.type === scriptContext.UserEventType.CREATE){
                
            let newRec = scriptContext.newRecord;
            let ent = newRec.getValue('entity');
            try{
                if(newRec.type === record.Type.SALES_ORDER){
                        record.submitFields({
                        type: record.Type.CUSTOMER,
                        id: ent,
                        values: {'custentity_jj_order_placed': true}
                    });
                }

                    else if(newRec.type === record.Type.PURCHASE_ORDER){
                            record.submitFields({
                            type: record.Type.VENDOR,
                            id: ent,
                            values: {'custentity_jj_order_placed': true}
                        });
                    };
            }
            catch(e){
                log.error('Error Updating checkbox filed',e.toString());
            };


        }
    };

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
