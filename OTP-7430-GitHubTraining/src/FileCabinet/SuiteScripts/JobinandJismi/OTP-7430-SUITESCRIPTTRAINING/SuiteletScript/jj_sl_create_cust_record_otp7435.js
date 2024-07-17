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

            // try{

                if(scriptContext.request.method === 'GET'){

                    let form = serverWidget.createForm({
                        title: 'Customer Information Form'
                    });

                    form.addFieldGroup({
                        id: 'custpage_primary_information',
                        label:'Primary Information'
                    });

                    form.addField({
                        id: 'custpage_name',
                        label:'Name',
                        type: serverWidget.FieldType.TEXT,
                        container:'custpage_primary_information'
                    }).isMandatory = true;

                    form.addField({
                        id:'custpage_email',
                        label:'Email',
                        type: serverWidget.FieldType.EMAIL,
                        container:'custpage_primary_information'
                    }).isMandatory = true;

                    form.addField({
                        id: 'custpage_phone',
                        label:'Phone',
                        type: serverWidget.FieldType.PHONE,
                        container:'custpage_primary_information'
                    }).isMandatory = true;

                    form.addField({
                        id:'custpage_subsidiary',
                        label:'Subsidiary',
                        type: serverWidget.FieldType.SELECT,
                        source:'subsidiary',
                        container:'custpage_primary_information'
                    }).isMandatory = true;

                    let salRepValues =form.addField({
                        id:'custpage_salesrep',
                        label:'Sales Rep',
                        type: serverWidget.FieldType.SELECT,
                        container:'custpage_primary_information'
                    }).isMandatory = true;
                    log.debug('working');

                    // salRepValues.addSelectOptions({
                    //     value: '',
                    //     text: ''
                    // });
                    log.debug('working 1');

                    let salSrch = search.create({
                        type: search.Type.EMPLOYEE,
                        filters:['salesrep','is','T'],
                        columns:['entityid','internalid']
                    });

                    salSrch.run().each(function(result){

                        let salesRep = result.getValue('entity');
                        log.debug('Sales Rep:', salesRep);

                        let SalesId = result.getValue('internalid');
                        log.debug('Internal id: ',SalesId);

                        salRepValues.addSelectOption({
                            value: SalesId,
                            text: salesRep
                        });

                        return true;
                    });

                    scriptContext.response.writePage(form);
                }
                else{

                    let name = scriptContext.request.parameters.custpage_name;
                    let email = scriptContext.request.parameters.custpage_email;
                    let phone = scriptContext.request.parameters.custpage_phone;
                    let saleRep = scriptContext.request.parameters.custpage_salesrep;
                    let sub = scriptContext.request.parameters.custpage_subsidiary;

                    let messageValue = 'The details of the Customer Name: '+name+'  Email: '+email+'  Phone: '+phone+'  Sales Rep: '+saleRep+'  Subsidiary: '+sub+'\n';
                    log.debug('Message:',messageValue);

                    let recCrt = record.create({
                        type: record.Type.CUSTOMER,
                        isDynamic: true
                    });

                    recCrt.setValue('companyname',name);
                    recCrt.setValue('email',email);
                    recCrt.setValue('phone',phone);
                    recCrt.setValue('subsidiary',sub);
                    recCrt.setValue('salesrep',saleRep);

                    recCrt.save({
                        enableSourcing: true,
                        ignoreMandatory: true
                    });

                    scriptContext.response.write(messageValue);
                }

            // }
            // catch(e){
            //     log.error('Error:',e.message);
            // };

        }

        return {onRequest}

    });
