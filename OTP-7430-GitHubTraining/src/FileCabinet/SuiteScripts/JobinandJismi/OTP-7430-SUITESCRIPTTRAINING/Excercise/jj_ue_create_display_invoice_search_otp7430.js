/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/search'],
    /**
 * @param{search} search
 */
    (search) => {
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
            let serInv = search.create({
                type: search.Type.INVOICE,
                title: 'Open Invoices',
                id: 'customsearch_jj_open_invoices',
                filters: [
                    ['status','is','CustInvc:A'],
                         'AND',
                         ['mainline','is','T']],
                columns: ['tranid','trandate','entity','email','total']
            });
            let resInv = serInv.run().getRange({
                start: 0,
                end: 5
            });
            resInv.forEach(function(result){
                let docNum = result.getValue('tranid');
                log.debug("Document Number:",docNum);

                let trdate = result.getValue('trandate');
                log.debug("Date:",trdate);

                let cusName = result.getText('entity');
                log.debug("Customer Name:",cusName);

                let mail = result.getValue('email');
                log.debug("Email:",mail);
                
                let tot = result.getValue('total');
                log.debug("Total Amount:",tot);

                return true;
            });

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

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
