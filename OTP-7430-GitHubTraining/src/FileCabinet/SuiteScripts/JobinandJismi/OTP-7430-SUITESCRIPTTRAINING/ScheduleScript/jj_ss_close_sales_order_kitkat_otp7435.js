/**
 * @NApiVersion 2.1
 * @NScriptType ScheduledScript
 */
define(['N/record', 'N/search'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search) => {

        /**
         * Defines the Scheduled script trigger point.
         * @param {Object} scriptContext
         * @param {string} scriptContext.type - Script execution context. Use values from the scriptContext.InvocationType enum.
         * @since 2015.2
         */
        const execute = (scriptContext) => {

            let salSrch = search.create({
                type: search.Type.SALES_ORDER,
                filters:[['trandate','onorbefore','fourdaysago'],
                    'AND',
                    ['item.name','is','KITKAT'],
                    // 'AND'
                    // ['status','is','']]
                    ],
                columns:['internalid']
            });

            salSrch.run().each(function(result){

                let recId = result.getValue('internalid');
                log.debug('Internal Id:',recId);

                let recLoad = record.load({
                    type: record.Type.SALES_ORDER,
                    id: recId
                });

                let itemLen = recLoad.getLineCount({
                    sublistId: 'item'
                });

                for(let i = 0; i< itemLen; i++){

                recLoad.setSublistValue({

                    sublistId: 'item',
                    fieldId: 'isclosed',
                    line: i,
                    value: true // Closed status
                });

                let recSave = recLoad.save({
                    enableSourcing: true,
                    ignoreMandatotryFields: true
                });

                log.debug('rec:', recSave);
            }  


                return true;
            });

        }

        return {execute}

    });
