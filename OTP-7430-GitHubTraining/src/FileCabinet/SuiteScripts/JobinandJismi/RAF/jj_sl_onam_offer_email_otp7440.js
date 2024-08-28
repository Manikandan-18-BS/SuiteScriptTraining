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
                        title: 'Customer List'
                    });

                    form.addField({
                        id: 'custpage_subsidiary',
                        label: 'Subsidiary',
                        type: serverWidget.FieldType.SELECT,
                        source: 'subsidiary'
                    });

                    form.addField({
                        id:'custpage_name',
                        label:'Name',
                        type:serverWidget.FieldType.SELECT,
                        source:'customer'
                    });

                    let subList = form.addSublist({
                        id: 'custpage_sublist',
                        label: 'Details',
                        type: serverWidget.SublistType.LIST
                    });

                    subList.addField({
                        id:'custpage_custname',
                        label:'Name of the Customer',
                        type: serverWidget.FieldType.TEXT
                    });

                    subList.addField({
                        id:'custpage_email',
                        label: 'Email Addrress',
                        type: serverWidget.FieldType.EMAIL
                    });

                    subList.addField({
                        id:'custpage_total',
                        label:'Total Invoiced Amount',
                        type: serverWidget.FieldType.CURRENCY
                    });

                    subList.addField({
                        id:'custpage_checkbox',
                        label:'Checkbox',
                        type: serverWidget.FieldType.CHECKBOX
                    });

                    let filter = [];

                    let getSub = scriptContext.request.parameters.sub;
                    let getName = scriptContext.request.parameters.cusName;

                    if(getSub){}

                    
                }
            }
            catch(e){
                log.error('Error Found:',e.message);
            }

        }

        return {onRequest}

    });
