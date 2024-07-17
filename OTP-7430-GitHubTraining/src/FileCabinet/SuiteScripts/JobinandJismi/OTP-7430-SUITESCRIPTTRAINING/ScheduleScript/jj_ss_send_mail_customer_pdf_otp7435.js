/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/email', 'N/record', 'N/render', 'N/search'],
    /**
 * @param{email} email
 * @param{record} record
 * @param{render} render
 * @param{search} search
 */
    (email, record, render, search) => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {
            try{

            let salSrch = search.create({
                type: search.Type.SALES_ORDER,
                filters: [['trandate','on','today'],
                    'AND',
                    ['mainline','is','T']],
                columns:['entity','internalid']
            });

            salSrch.run().each(function(result){

                let custId = result.getValue('entity');
                log.debug('Customer id:', custId);

                let recId = result.getValue('internalid');
                log.debug('Record id:', recId);

                let recLoad = record.load({
                    type: record.Type.SALES_ORDER,
                    id: recId
                });

                let recPdf = render.transaction({
                    entityId: recId,
                    printMode: render.PrintMode.PDF,
                    inCustLocale: true
                });


                // let  fileObj = file.create({
                //     name: 'SalesOrder_' + recId + '.pdf',
                //     fileType: file.Type.PDF,
                //     contents: recPdf.getContents()
                // });


                email.send({
                    author: -5,
                    recipients: custId,
                    subject:'Sales order Created Today',
                    body:'Please find attached your sales order.',
                    attachments: [recPdf]
                });

                return true;

            });

        }

        catch(e){
            log.error('Error',e.message);
        }

        }

        return {execute}

    });
