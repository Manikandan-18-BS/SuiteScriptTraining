/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/email', 'N/file', 'N/record', 'N/runtime', 'N/search'],
    /**
 * @param{email} email
 * @param{file} file
 * @param{record} record
 * @param{runtime} runtime
 * @param{search} search
 */
    (email, file, record, runtime, search) => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {

            try{
                
                let currentDate = new Date();

                let custSrch = search.create({
                    type: search.Type.CUSTOMER,
                    filters:['datecreated','within','thismonth'],
                    columns:['entityid','datecreated','salesrep','terms']
                });

                let csvCont = 'Name,Date,Sales rep,Terms\n';

                custSrch.run().each(function(result){

                    let CustNam = result.getValue('entityid');
                    log.debug('Name:',CustNam);

                    let dat = result.getValue('datecreated');
                    log.debug('Date:',dat);

                    let salRep = result.getText('salesrep') || 'N/A';
                    log.debug('Sales rep:',salRep);

                    let term = result.getText('terms') || 'N/A';
                    log.debug('Terms:',term);

                    csvCont += CustNam+','+dat+','+salRep+','+term+'\n';

                    return true;
                });

                let csvFile = file.create({
                    name:'Monthly_Customer_Report_'+(currentDate.getMonth()+1)+'_'+(currentDate.getFullYear())+'.csv',
                    fileType: file.Type.CSV,
                    contents: csvCont
                });

                csvFile.folder = -15;

                let fileId = csvFile.save();
                log.debug('File id:',fileId);

                email.send({
                    author: -5,
                    recipients: -5,
                    subject:'Monthly Customer Report_'+(currentDate.getMonth())+'/'+currentDate.getFullYear(),
                    body:'Please find attached the customer report for the month.',
                    attachments:[file.load({
                        
                        id: fileId
                    })]
                });

            }

            catch(e){
                log.error('Error:',e.message);
            };
        };

        return {execute}

    });
