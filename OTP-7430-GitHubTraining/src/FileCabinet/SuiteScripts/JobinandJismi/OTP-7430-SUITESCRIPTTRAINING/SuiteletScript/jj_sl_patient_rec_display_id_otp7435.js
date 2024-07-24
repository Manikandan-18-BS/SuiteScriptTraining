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
                        title: 'Patient Form'
                    });

                    form.addField({
                        id:'custpage_name',
                        type: serverWidget.FieldType.TEXT,
                        label:'Name'
                    }).isMandatory = true;

                    form.addField({
                        id: 'custpage_age',
                        type: serverWidget.FieldType.INTEGER,
                        label: 'Age'
                    }).isMandatory = true;

                    let sx = form.addField({
                        id:'cuatpage_sex',
                        type: serverWidget.FieldType.SELECT,
                        label: 'Sex'
                    });

                    sx.isMandatory = true;

                    sx.addSelectOption({
                        value: '1',
                        text: 'Male'
                    });

                    sx.addSelectOption({
                        value:'2',
                        text:'Female'
                    });

                    sx.addSelectOption({
                        value:'3',
                        text:'Others'
                    });

                    form.addField({
                        id:'custpage_address',
                        type: serverWidget.FieldType.LONGTEXT,
                        label:'Address'
                    }).isMandatory = true;

                    form.addSubmitButton({
                        label:'Submit'
                    });

                    scriptContext.response.writePage(form);
                }
                else{

                    let name = scriptContext.request.parameters.custpage_name;
                    let age = scriptContext.request.parameters.custpage_age;
                    let sex = scriptContext.request.parameters.cuatpage_sex;
                    let address = scriptContext.request.parameters.custpage_address;

                    let rec = record.create({
                        type: 'customrecord_jj_patient_deatails',
                        isDynamic: true
                    });

                    rec.setValue('custrecord_jj_name_parec',name);
                    rec.setValue('custrecord_jj_age',age);
                    rec.setValue('custrecord_jj_sex',sex);
                    rec.setValue('custrecord_jj_address',address);

                    log.debug('Working');

                    let recId = rec.save({
                        enableSourcing: true,
                        ignoreMandatotry: true
                    });

                    scriptContext.response.write('Paitent Record Created Successfully  Created Record Id: '+recId);
                };

            }
            catch(e){
                log.error('Error Found:',e.message);
            };

        };

        return {onRequest}

    });
