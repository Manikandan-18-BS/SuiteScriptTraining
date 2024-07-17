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

            let invSrch = search.create({
                type: search.Type.INVOICE,
                filters:['status','is','CustInvc:A'],
                columns: ['entity','tranid']
            });

            let res = [];

            invSrch.run().each(function(result){

                res.push({
                    customer: result.getText('entity'),
                    documentNumber: result.getValue('tranid')
                });

                return true;
            });

            if(res.length>0){

                let emailBody = 'Open Invoices: \n\n';

                res.forEach(function(invoice){

                    emailBody += 'Customer: '+ invoice.customer + '\n',
                    emailBody += 'Document Number: '+ invoice.documentNumber + '\n'
                });

                log.debug('body', emailBody);

                let admin = runtime.getCurrentUser();
                log.debug('Admin:',admin);

                let adminId = admin.email;
                log.debug('Admin Mail:',adminId);

                email.send({
                    author : adminId,
                    recipients : adminId,
                    subject: 'Daily report : Open Invoices',
                    body: emailBody
                });
            };

            }
            catch(e){
                log.error('Error:',e.message)
            };

        }

        return {execute}

    });
