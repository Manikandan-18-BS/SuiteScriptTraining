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
            let serCus = search.create({
                type: search.Type.CUSTOMER,
                title: 'Customer Under Parent Subsidiary',
                id: 'customsearch_customer_under_parent_subsidiary',
                columns:['companyname','subsidiary','salesrep','email','datecreated'],
                filters:[ ['subsidiary','is',1],
                        'AND',
                        ['stage','is',"CUSTOMER"],
                        'AND',
                        ['datecreated','within','lastmonth']
            ]
            });
            serCus.run().each(function(result){
                let cusName = result.getValue('companyname');
                log.debug('Customer Name:',cusName);
                let subName = result.getText('subsidiary');
                log.debug('Subsidiary:',subName);
                let repName = result.getText('salesrep');
                log.debug('Sales Rep:',repName);
                let mail = result.getValue('email');
                log.debug('Email:',mail);
                let dateCr = result.getValue('datecreated');
                log.debug('Date Created:',dateCr);

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
