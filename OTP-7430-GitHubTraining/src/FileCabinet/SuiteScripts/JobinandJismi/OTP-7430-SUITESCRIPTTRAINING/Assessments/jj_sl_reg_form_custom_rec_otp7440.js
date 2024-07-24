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
                        title: 'Registration Form'
                    });

                    let fieldGroup = form.addFieldGroup({
                        id: 'custpage_field_group',
                        label: 'Primary Information'
                    })

                    form.addField({
                        id: 'custpage_name',
                        label: 'Name',
                        type: serverWidget.FieldType.TEXT,
                        container: 'custpage_field_group'
                    }).isMandatory = true;

                    form.addField({
                        id: 'custpage_age',
                        label: 'Age',
                        type: serverWidget.FieldType.INTEGER,
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
                    });

                    form.addField({
                        id:'custpage_father_name',
                        label:"Father's Name",
                        type: serverWidget.FieldType.TEXT,
                        container:'custpage_field_group'
                    });

                    form.addField({
                        id:'custpage_address',
                        label:'Address',
                        type: serverWidget.FieldType.LONGTEXT,
                        container:'custpage_field_group'
                    });

                    form.addSubmitButton({
                        label: 'Submit'
                    });

                    scriptContext.response.writePage(form)

                }
                else{

                    let request =scriptContext.request;
                    let name =request.parameters.custpage_name;
                    let age = request.parameters.custpage_age;
                    let phone = request.parameters.custpage_phone;
                    let email = request.parameters.custpage_email;
                    let fatherName = request.parameters.custpage_father_name;
                    let address = request.parameters.custpage_address;

                    let messageValue = 'The details of the Name: '+name+'<br>'+'Age: '+age+'<br>'+'  Email: '+email+'<br>'+'  Phone: '+phone+'<br>'+" Father's Name: "+fatherName+'  Address: '+address+'\n';
                    log.debug('Message:',messageValue);

                    let recCrt = record.create({
                        type: 'customrecord_jj_registration_details',
                        isDynamic: true
                    });

                    recCrt.setValue('name',name);
                    recCrt.setValue('custrecord_jj_age_reg',age);
                    recCrt.setValue('custrecord_jj_email_reg',email);
                    recCrt.setValue('custrecord_jj_phone_reg',phone);
                    recCrt.setValue('custrecord_jj_fathers_name_reg',fatherName);
                    recCrt.setValue('custrecord_jj_address_reg',address);

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
