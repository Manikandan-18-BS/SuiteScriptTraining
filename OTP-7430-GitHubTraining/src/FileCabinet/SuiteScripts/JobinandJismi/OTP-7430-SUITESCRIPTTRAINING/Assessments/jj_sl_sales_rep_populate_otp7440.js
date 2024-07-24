/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/currentRecord', 'N/record', 'N/search', 'N/ui/serverWidget'],
    /**
 * @param{currentRecord} currentRecord
 * @param{record} record
 * @param{search} search
 * @param{serverWidget} serverWidget
 */
    (currentRecord, record, search, serverWidget) => {
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
                        title: 'User Information Form'
                    });

                    let fieldGroup = form.addFieldGroup({
                        id: 'custpage_field_group',
                        label: 'Primary Information'
                    })

                    form.addField({
                        id: 'custpage_first_name',
                        label: 'First Name',
                        type: serverWidget.FieldType.TEXT,
                        container: 'custpage_field_group'
                    }).isMandatory = true;

                    form.addField({
                        id: 'custpage_last_name',
                        label: 'Last Name',
                        type: serverWidget.FieldType.TEXT,
                        container: 'custpage_field_group'
                    }).isMandatory = true;

                    form.addField({
                        id:'custpage_phone',
                        label: 'Phone',
                        type: serverWidget.FieldType.PHONE,
                        container:'custpage_field_group'
                    }).isMandatory= true;

                    form.addField({
                        id:'custpage_email',
                        label:'Email',
                        type: serverWidget.FieldType.EMAIL,
                        container:'custpage_field_group'
                    }).isMandatory = true;

                    form.addField({
                        id:'custpage_dob',
                        label:"Date of Birth",
                        type: serverWidget.FieldType.DATE,
                        container:'custpage_field_group'
                    });

                    form.addField({
                        id:'custpage_account_manager',
                        label:'Account Manager(Sales Rep)',
                        type: serverWidget.FieldType.TEXT,
                        container:'custpage_field_group'
                    });

                    form.addSubmitButton({
                        label: 'Submit'
                    });

                    scriptContext.response.writePage(form)

                }
                else{
                    
                    let firstName =scriptContext.request.parameters.custpage_first_name;
                    let lastName = scriptContext.request.parameters.custpage_last_name;
                    let phone = scriptContext.request.parameters.custpage_phone;
                    let email = scriptContext.request.parameters.custpage_email;
                    let dob = scriptContext.request.parameters.custpage_dob;
                    let accountMan = scriptContext.request.parameters.custpage_account_manager;

                    let messageValue = 'The details of the First Name: '+firstName+'<br>'+'Last Name: '+lastName+'<br>'+'  Email: '+email+'<br>'+'  Phone: '+phone+'<br>'+" Date of Birth: "+dob+'  Account Manager: '+accountMan+'\n';
                    log.debug('Message:',messageValue);

                    let salScrh = search.create({
                        type: search.Type.CUSTOMER,
                        filters:["email","haskeywords",email],
                        columns:['salesrep']
                    });

                    let salRep ='';

                    salScrh.run().each(function(result){

                        salRep = result.getValue('salesrep');
                        log.debug('Sales Rep:',salRep)
                    })

                    let recCrt = record.create({
                        type: 'customrecord_jj_user_information',
                        isDynamic: true
                    });

                    recCrt.setValue('custrecord_jj_first_name',firstName);
                    recCrt.setValue('custrecord_jj_last_name',lastName);
                    recCrt.setValue('custrecord_jj_email',email);
                    recCrt.setValue('custrecord_jj_phone',phone);
                    recCrt.setValue('custrecord_jj_dob',dob);
                    recCrt.setValue('custrecord_jj_account_manager',salRep);

                    recCrt.save({
                        enableSourcing: true,
                        ignoreMandatory: true
                    });

                    scriptContext.response.write('Registration successful!'+" "+messageValue);
                }
            }catch(e){
                log.error("error found ",e.message);
            }
        }

        return {onRequest}

    });
