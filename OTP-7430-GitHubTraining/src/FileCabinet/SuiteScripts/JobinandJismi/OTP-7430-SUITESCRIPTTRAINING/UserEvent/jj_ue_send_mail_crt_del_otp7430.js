/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/email', 'N/record', 'N/runtime'],
    /**
 * @param{email} email
 * @param{record} record
 * @param{runtime} runtime
 */
    (email, record, runtime) => {
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
            let eventType = scriptContext.type;
            let newRec = scriptContext.newRecord;
            let recId = newRec.id;
            let recName = newRec.getValue('entityid');
            let entType = newRec.type;
            let user = runtime.getCurrentUser();
            let userEmail = user.email;
            let sender = 17;

            let bodyMsg = 'Entity type: '+" "+entType + " "+
                          'Internal ID: ' +recId + " ";
            log.debug('Body: ',bodyMsg);
        try{
            if(eventType === scriptContext.UserEventType.CREATE){
                email.send({
                    author: sender,
                    recipients: userEmail,
                    subject: 'The Record is Created',
                    body: bodyMsg  + 
                    'Name: '+recName,
                })
            }
            else if(eventType === scriptContext.UserEventType.DELETE){
                email.send({
                    author: sender,
                    recipients: userEmail,
                    subject: 'The record is Deleted',
                    body: bodyMsg
                });
            }
        }

        catch(e){
            log.error('Error in Sending email',e.toString());
        }
        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
