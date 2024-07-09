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
            var pfSrch =  search.create({
                type: search.Type.SALES_ORDER,
                filters: [['mainline','is','T'],'AND',['status','is','SalesOrd:B']],
                columns:['tranid','trandate','entity','subsidiary','total']
            });
            pfSrch.run().each(function(result){
                var doc = result.getValue('tranid');
                log.debug("Document Number: "+doc);
                var date = result.getValue('trandate');
                log.debug("Date: "+date);
                var nam = result.getValue('entity');
                log.debug("Customer Name: "+nam);
                var sub = result.getValue('subsidiary');
                log.debug("Subsidiary: "+sub);
                var tot = result.getValue('total');
                log.debug("Amount: "+tot); 

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
