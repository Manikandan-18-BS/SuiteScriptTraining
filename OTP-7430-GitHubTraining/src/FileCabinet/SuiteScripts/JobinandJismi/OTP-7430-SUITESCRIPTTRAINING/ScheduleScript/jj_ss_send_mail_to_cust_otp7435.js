/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/email', 'N/record', 'N/runtime', 'N/search'],
    /**
 * @param{email} email
 * @param{record} record
 * @param{runtime} runtime
 * @param{search} search
 */
    (email, record, runtime, search) => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {

            try{

            let custSrch = search.create({
                type: search.Type.CUSTOMER,
                filters: [['msesubsidiary.name','contains','Australia'],
                    'AND',
                    ['entityid','startswith','Andrew']],
                columns:['entityid','email','internalid']
            });

            custSrch.run().each(function(result){
                let cust = result.getValue('entityid');
                log.debug('Customer Name:', cust);

                let mail = result.getValue('email');
                log.debug('mail:', mail);
                

                email.send({
                    author: -5,
                    recipients: mail,
                    subject:'Daily Notification',
                    body: 'Dear ' + cust + ',\n\nThis is your daily notification.\n\nBest regards,\nYour Company'
                });

                return true;
            });
        }
        catch(e){
            log.error('Error:',e.message);
        };

        };

        return {execute}

    });
