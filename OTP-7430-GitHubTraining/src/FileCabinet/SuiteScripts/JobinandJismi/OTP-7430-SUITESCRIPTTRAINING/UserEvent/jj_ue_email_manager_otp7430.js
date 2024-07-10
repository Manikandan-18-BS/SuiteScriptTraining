/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/email', 'N/record', 'N/search','N/runtime'],
    /**
 * @param{email} email
 * @param{record} record
 * @param{search} search
 * @param{runtime} runtime
 */
    (email, record, search,runtime) => {
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
                let crtCust = newRec.getValue('entity');
                log.debug('Customer Id:',crtCust);
                let user = runtime.getCurrentUser();
                let userId = user.id;
                let userMan = search.lookupFields({
                    type: search.Type.EMPLOYEE,
                    id: userId,
                    columns:['supervisor']
                });

                let man = userMan.supervisor[0].value;
                log.debug('Manager',man);

                let manEm = search.lookupFields({
                    type: search.Type.EMPLOYEE,
                    id: man,
                    columns:['email']
                });

                let manEmail = manEm.email;
                log.debug('Man Email',manEmail);
                let sender = -5;

                let custRec = search.lookupFields({
                    type: search.Type.CUSTOMER,
                    id: crtCust,
                    columns:['overduebalance','internalid']
                });

                let overdue = custRec.overduebalance;
                log.debug('overdue: ',overdue);

                if(overdue >0){

                    email.send({
                        author: sender,
                        recipients: manEmail,
                        subject:'alert Message for Creation of Sales Order for Overdue Customer',
                        body: 'The sales order is created for the customer '+crtCust+' who has overdue'
                    });
                }

            // let ovrSrch = search.create({
            //     type: search.Type.CUSTOMER,
            //     filters: ['overduebalance','is greater than','0.00'],
            //     columns: ['internalid','entityid','overduebalance']
            // });

            // ovrSrch.run().each(function(result){
            //     let custId = result.getValue('internalid')
            // });
            }
        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
