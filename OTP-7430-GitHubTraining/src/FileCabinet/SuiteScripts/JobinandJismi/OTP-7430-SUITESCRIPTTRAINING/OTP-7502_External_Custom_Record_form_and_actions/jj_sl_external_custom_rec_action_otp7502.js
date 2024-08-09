/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
/***************************************************************************************
 * *****************
 * OTP Task
 * 
 * OTP-7502:External_Custom_Record_form_and_actions
 * 
 * 
 * *************************************************************************************
 * ******************
 * 
 * Author: Jobin and Jismi IT Services
 * 
 * Date Created: 01-August-2024
 * 
 * Description: Entries to the custom record can be made externally (without NetSuite access). If there is a customer with the given email Id, link that customer to the custom record. Whenever there is an entry in a custom record, send a notification to a static NetSuite Admin. If there is a Sales Rep for the customer, send a notification email to the Sales Rep as well.
 * 
 * REVISION HISTORY
 * 
 * @version 1.0 OTP-1:01-August-2024: Created the initial build by JJ0327
 * 
 * 
 * ***************************************************************************************
 *******************/
define(['N/email', 'N/record', 'N/search', 'N/ui/serverWidget'],
    /**
 * @param{email} email
 * @param{record} record
 * @param{search} search
 * @param{serverWidget} serverWidget
 */
    (email, record, search, serverWidget) => {
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
                        title: 'Customer Form'
                    });

                    let fieldGroup = form.addFieldGroup({
                        id: 'custpage_field_group',
                        label: 'Primary Information'
                    });

                    form.addField({
                        id: 'custpage_customer_name',
                        label: 'Customer Name',
                        container: 'custpage_field_group',
                        type: serverWidget.FieldType.TEXT
                    }).isMandatory = true;

                    form.addField({
                        id:'custpage_email',
                        label:'Customer Email',
                        container: 'custpage_field_group',
                        type: serverWidget.FieldType.EMAIL
                    }).isMandatory = true;

                    form.addField({
                        id:'custpage_subject',
                        label:'Subject',
                        container: 'custpage_field_group',
                        type: serverWidget.FieldType.LONGTEXT
                    });

                    form.addField({
                        id:'custpage_message',
                        label:'Message',
                        container: 'custpage_field_group',
                        type: serverWidget.FieldType.LONGTEXT
                    });

                    form.addSubmitButton({
                        label: 'Submit'
                    });

                    scriptContext.response.writePage(form);
                }
                else{
                    let name = scriptContext.request.parameters.custpage_customer_name;
                    let custEmail = scriptContext.request.parameters.custpage_email;
                    let sub = scriptContext.request.parameters.custpage_subject;
                    let msg = scriptContext.request.parameters.custpage_message;

                    let link ='';
                    let salRep = '';
                    let custId = '';

                    let srch = search.create({
                        type: search.Type.CUSTOMER,
                        filters:['email','is',custEmail],
                        columns:['internalid','salesrep']
                    });

                    srch.run().each(function(result){
                        custId = result.getValue('internalid');
                        log.debug('Customer ID',custId);
                        
                        salRep = result.getValue('salesrep');
                        log.debug('SalesRep Id:',salRep);

                        return true;
                    });

                    let activeRep = '';

                    if(salRep){
                        let activeSrch = search.lookupFields({
                            type: search.Type.EMPLOYEE,
                            id: salRep,
                            columns: ['isinactive']
                        });

                        activeRep = activeSrch.isinactive;
                        log.debug("Active:",activeRep);
                    }

                    if(custId){
                        link = 'https://td2924623.app.netsuite.com/app/common/entity/custjob.nl?id='+custId+'&whence=';
                    };
                    log.debug('Link:', link);

                    let recId = '';

                    let recSrch = search.create({
                        type:'customrecord_jj_customer_details',
                        filters:[["name","is",name], 
                        "OR", 
                        ["custrecord_jj_customer_email","is",custEmail]],
                        columns:['internalid']
                    });

                    let srchDup = recSrch.run().getRange({
                        start: 0,
                        end:1
                    });

                    let duplicate = srchDup.length > 0;
                    log.debug(duplicate);

                    if(!duplicate){

                        let recCrt = record.create({
                            type: 'customrecord_jj_customer_details',
                            isDynamic: true
                        });
                        log.debug('Working');

                        recCrt.setValue('name',name);
                        recCrt.setValue('custrecord_jj_customer_email',custEmail);
                        recCrt.setValue('custrecord_jj_customer',link);
                        recCrt.setValue('custrecord_jj_subject',sub);
                        recCrt.setValue('custrecord_jj_message',msg);
                        log.debug('Working1');

                        recId = recCrt.save();
                        log.debug('Rec:',recId);

                        if(recId){

                            if(salRep && !activeRep){
                                    email.send({
                                        author: -5,
                                        body: 'Customer Details Record has created: '+recId,
                                        recipients: -5,
                                        subject: "Record Created"
                                    });

                                    email.send({
                                        author: -5,
                                        body: 'Customer Details Record has created: '+recId,
                                        recipients: salRep,
                                        subject: "Record Created"
                                    });
                                    log.debug('Sales  Rep:',salRep);
                            }
                            else{

                                email.send({
                                    author: -5,
                                    body: 'Customer Details Record has created: '+recId,
                                    recipients:-5,
                                    subject: "Record Created"
                                });
                                log.debug('No sales Rep')
                            };
                        };
                        scriptContext.response.write("Record Created")
                    }
                    else{
                        scriptContext.response.write("A record with this ID already exists. You must enter a unique customer ID for each record you create.")
                    };
                }

            }
            catch(e){
                log.error('Error Found:',e.message);
            };

        }

        return {onRequest}

    });
