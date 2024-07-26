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

                let srch = search.create({
                    type: search.Type.SALES_ORDER,
                    filters:[['mainline','is','T'],
                            'AND',
                            ['datecreated','on','today']],
                    columns:['tranid','entity','datecreated','total']
                });

                srch.run().each(function(result){
                    let doc = result.getValue('tranid');
                    log.debug('Document Number:',doc);

                    let cust = result.getText('entity');
                    log.debug('Customer Name:',cust);

                    let dat = result.getValue('datecreated');
                    log.debug('Created Date :',dat);

                    let tot = result.getValue('total');
                    log.debug('Total Amount:', tot);

                    let body ={'<table>':
                            '<tr>'+
                                '<th>'+'Document Number'+'</th>'+
                                '<th>'+'Customer Name'+'</th>'+
                                '<th>'+'Date'+'</th>'+
                                '<th>'+'Total'+'</th>'+
                            '</tr>'+
                            '<tr>'+
                                '<td>'+doc+'</td>'+
                                '<td>'+cust+'</td>'+
                                '<td>'+dat+'</td>'+
                                '<td>'+tot+'</td>'+
                            '</tr>'+
                            // '<tr>'+
                            //     '<td>'++'</td>'
                            //     '<td>'+Francisco Chang+'</td>'
                            //     '<td>'+Mexico+'</td>'
                            // '</tr>'
                        '</table>' 
                    };
                    log.debug('Body Value:',body);

                    return true;
                });
                
            }
            catch(e){
                log.error('Error Found:',e.message);
            };
        };

        return {execute}

    });
