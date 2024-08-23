/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/currentRecord', 'N/email', 'N/file', 'N/record', 'N/render', 'N/runtime', 'N/search'],
    /**
 * @param{currentRecord} currentRecord
 * @param{email} email
 * @param{file} file
 * @param{record} record
 * @param{render} render
 * @param{runtime} runtime
 * @param{search} search
 */
    (currentRecord, email, file, record, render, runtime, search) => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {
            try{

                let mailId = runtime.getCurrentScript().getParameter('custscript_jj_emailid');
                let strDate = runtime.getCurrentScript().getParameter('custscript_jj_start_date');
                let newFolId = runtime.getCurrentScript().getParameter('custscript_jj_folderid');

                let custSrch = search.create({
                    type: search.Type.CUSTOMER,
                    filters:["status","anyof","13"],
                    columns:['internalid']
                });

                let custId = '';

                let now = new Date();
            
                custSrch.run().each(function(result){
                    custId = result.getValue('internalid');
                    // log.debug('Customer Id:',custId);
                    let customerId = Number(custId);

                    let pdfFile = render.statement({
                        entityId: customerId,
                        printMode: render.PrintMode.PDF,
                        startDate: strDate,
                        openTransactionsOnly: true
                    });

                    let timestamp = now.getFullYear() + '-' + 
                                    ('0' + (now.getMonth() + 1)).slice(-2) + '-' + 
                                    ('0' + now.getDate()).slice(-2) + ' ' + 
                                    ('0' + now.getHours()).slice(-2) + ':' + 
                                    ('0' + now.getMinutes()).slice(-2) + ':' + 
                                    ('0' + now.getSeconds()).slice(-2);
                    // log.debug('TimeStamp:',timestamp);
                
                    pdfFile.name = custId+'_'+timestamp;
                    pdfFile.folder = newFolId;
                    let pdfId = pdfFile.save();
                    // log.debug('PDF Id:',pdfId);
                    return true;
                });

                let emailBody = '<p>We hope this email finds you well.</p>' +
                                        '<p>The customer statement Folder is created</p>' +
                                        '<p>Best Regards,</p>';

                email.send({
                    author: -5,
                    body: '<p><strong>Hai</strong></p>'+emailBody+'<p><strong>Larry Nelson</strong></p>',
                    recipients: mailId,
                    subject: 'Customer statement Folder Created',
                });
                
            }
            catch(e){
                log.error('Error found:',e.message);
            }

        }

        return {execute}

    });
