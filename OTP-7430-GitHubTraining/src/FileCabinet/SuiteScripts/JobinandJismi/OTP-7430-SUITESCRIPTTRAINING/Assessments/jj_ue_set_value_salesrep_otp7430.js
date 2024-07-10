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
            if(scriptContext.type === scriptContext.UserEventType.CREATE){
                let newRec = scriptContext.newRecord;
                let cust = newRec.getValue('entity');
            try{ 
                let cusRec = record.load({
                    type: record.Type.CUSTOMER,
                    id: cust,
                });
                let salRep = cusRec.getText('salesrep');

                newRec.setText('custbody_jj_customer_sales_rep',salRep);

                // newRec.save({
                //     enableSourcing: true,
                //     ignoreEnableFields: true
                // });
            }
            catch(e){
                log.error('Error in Set the value of Sales Rep',e.toString());
            };
            };

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
            

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
