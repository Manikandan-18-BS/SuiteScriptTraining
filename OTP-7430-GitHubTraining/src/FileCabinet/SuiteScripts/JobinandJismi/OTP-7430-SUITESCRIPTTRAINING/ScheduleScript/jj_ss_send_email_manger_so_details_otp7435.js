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

            let empSrch = search.create({
                type: search.Type.EMPLOYEE,
                filters: ['salesrep','is','T'],
                columns:['internalid','entityid','supervisor']
            });

            try{

                let manId=[];
                let empId=[];

            empSrch.run().each(function(result){

                empId = result.getValue('internalid');
                log.debug('Employee id:',empId);

                manId = result.getValue('supervisor');
                log.debug('Supervisor:', manId);

                // let manMail = search.lookupFields({
                //     type: search.Type.EMPLOYEE,
                //     id: manId,
                //     columns: ['email']
                // });

                // let manEmail = manMail.email[0].text;
                // log.debug('Man Mail:',manEmail);

                let salesSrch = search.create({
                    type: search.Type.SALES_ORDER,
                    filters:[['salesrep','is',empId],
                            'AND',
                            ['mainline','is','T'],
                            'AND',
                             ['trandate','within','lastmonth']],
                    columns: ['entity','trandate','amount','subsidiary']
                });

                let bodyDet = [];

                salesSrch.run().each(function(result){
                    bodyDet.push({
                    nam : result.getText('entity'),
                    // log.debug('name: ',nam);

                    dat : result.getValue('trandate'),
                    // log.debug('Date:', dat);

                    amt : result.getValue('amount'),
                    // log.debug('Amount:',amt);

                    sub : result.getText('subsidiary'),
                    // log.debug('Subsidiary:',sub);

                    });
                    return true;
                });

                
                    if(bodyDet.length>0){

                        let bodyValue ='Sales Order Details for the previous month:\n';

                        bodyDet.forEach(function(order){

                            bodyValue += 'Name: '+' '+order.nam+'\n';
                            bodyValue += 'Transaction Date: '+' '+ order.dat+ '\n',
                            bodyValue += 'Amount: '+ order.amt+ '\n'

                        });
                  
                    log.debug('Body:',bodyValue);
   
                    email.send({
                        author: empId,
                        recipients: manId,
                        subject: 'Sales Order Details for the previous month',
                        body: bodyValue
                    });

            };

                return true;

            });

  
        }
        catch(e){
            log.error('Error',e.message);
        };

        }

        return {execute}

    });
