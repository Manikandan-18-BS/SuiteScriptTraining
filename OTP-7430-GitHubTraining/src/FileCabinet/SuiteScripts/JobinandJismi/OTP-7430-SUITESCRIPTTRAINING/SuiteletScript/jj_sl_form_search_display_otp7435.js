/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/record', 'N/search', 'N/ui/serverWidget'],
    /**
 * @param{record} record
 * @param{search} search
 * @param{serverWidget} serverWidget
 */
    (record, search, serverWidget) => {
        /**
         * Defines the Suitelet script trigger point.
         * @param {Object} scriptContext
         * @param {ServerRequest} scriptContext.request - Incoming request
         * @param {ServerResponse} scriptContext.response - Suitelet response
         * @since 2015.2
         */
        const onRequest = (scriptContext) => {

            try{

                if(scriptContext.request.method === 'GET'){

                    
                    let form = serverWidget.createForm({
                        title: 'Sales Order Details'
                    });

                    form.addField({
                        id: 'custpage_name',
                        label: "name",
                        type: serverWidget.FieldType.TEXT
                    });
                    log.debug('Working');

                    let subList = form.addSublist({
                        id: 'custpage_salesordersublist',
                        type: serverWidget.SublistType.LIST,
                        label: 'Sales Order'
                        
                    });
                    log.debug('Working1');

                    subList.addField({
                        id: 'custpage_documentnumber',
                        label: 'Document Number',
                        type: serverWidget.FieldType.TEXT
                    });

                    subList.addField({
                        id:'custpage_name',
                        label:'Customer Name',
                        type:serverWidget.FieldType.TEXT
                    });
                    log.debug('Working2');

                    subList.addField({
                        id:'custpage_subsidiary',
                        label: 'Subsidiary',
                        type: serverWidget.FieldType.TEXT
                    });

                    subList.addField({
                        id: 'custpage_orderdate',
                        label:'Order Date',
                        type: serverWidget.FieldType.DATE
                    });

                    let salSrch =  search.create({
                        type: search.Type.SALES_ORDER,
                        filters:['mainline','is','T'],
                        columns:['tranid','entity','subsidiary','trandate']
                    });
                    log.debug('Working3');

                    let resultSrch = salSrch.run();
                    let srch = resultSrch.getRange({
                        start: 0,
                        end: 50
                    });

                    for(let i = 0 ; i< srch.length ; i++){

                        let scrhResult = srch[i];

                        subList.setSublistValue({
                            id: 'custpage_documentnumber',
                            line: i,
                            value: scrhResult.getValue('tranid')
                        });

                        subList.setSublistValue({
                            id: 'custpage_name',
                            line: i,
                            value: scrhResult.getText('entity')
                        });

                        subList.setSublistValue({
                            id: 'custpage_subsidiary',
                            line: i,
                            value: scrhResult.getText('Subsidiary')
                        });

                        subList.setSublistValue({
                            id:'custpage_orderdate',
                            line: i,
                            value: scrhResult.getValue('trandate')
                        });
                    }

                    scriptContext.response.writePage(form);
                }
            }
            catch(e){
                log.error('Error found',e.message);
            };

        }

        return {onRequest}

    });
