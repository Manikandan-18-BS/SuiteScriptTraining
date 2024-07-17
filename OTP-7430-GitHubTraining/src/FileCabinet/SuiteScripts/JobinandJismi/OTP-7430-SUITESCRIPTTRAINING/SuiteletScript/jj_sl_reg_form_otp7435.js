/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
define(['N/record', 'N/ui/serverWidget'],
    /**
 * @param{record} record
 * @param{serverWidget} serverWidget
 */
    (record, serverWidget) => {
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
                    
                    log.debug('Form Data',{
                        Name: name,
                        Age:age,
                        Phone: phone,
                        Email:email,
                        FatherName:fatherName,
                        Address:address
                    });

                    scriptContext.response.write('Registration successful!')
                }
            }catch(e){
                log.error("error found ",e.message);
            }

        }

        return {onRequest}

    });
