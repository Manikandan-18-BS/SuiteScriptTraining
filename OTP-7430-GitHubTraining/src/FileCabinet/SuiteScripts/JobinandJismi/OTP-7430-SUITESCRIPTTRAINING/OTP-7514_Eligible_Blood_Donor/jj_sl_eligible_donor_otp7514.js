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
                        title: 'Blood Donors'
                    });

                    let blood = form.addField({
                        id:'custpage_bloodgrp',
                        label:'Blood Group',
                        type: serverWidget.FieldType.SELECT
                    });

                    form.clientScriptFileId = 3500;

                    blood.isMandatory = true;

                    blood.addSelectOption({
                        value: '',
                        text: ''
                    });

                    blood.addSelectOption({
                        value: 'A+',
                        text: 'A+'
                    });

                    blood.addSelectOption({
                        value: 'A-',
                        text: 'A-'
                    });

                    blood.addSelectOption({
                        value: 'B+',
                        text: 'B+'
                    });

                    blood.addSelectOption({
                        value: 'B-',
                        text: 'B-'
                    });

                    blood.addSelectOption({
                        value: 'O+',
                        text: 'O+'
                    });

                    blood.addSelectOption({
                        value: 'O-',
                        text: 'O-'
                    });

                    blood.addSelectOption({
                        value: 'AB+',
                        text: 'AB+'
                    });

                    blood.addSelectOption({
                        value: 'AB-',
                        text: 'AB-'
                    });

                    let subList = form.addSublist({
                        id: 'custpage_list',
                        label: 'Blood Donors',
                        type: serverWidget.SublistType.LIST
                    });

                    subList.addField({
                        id:'custpage_name',
                        label:'Name',
                        type: serverWidget.FieldType.TEXT
                    });

                    subList.addField({
                        id:'custpage_gender',
                        label:'Gender',
                        type: serverWidget.FieldType.TEXT
                    });

                    subList.addField({
                        id:'custpage_phone',
                        label:'Phone Number',
                        type: serverWidget.FieldType.PHONE
                    });

                    subList.addField({
                        id:'custpage_blood_group',
                        label:'Blood Group',
                        type: serverWidget.FieldType.TEXT
                    });

                    subList.addField({
                        id:'custpage_last_donation',
                        label:'Last Donation Date',
                        type: serverWidget.FieldType.DATE
                    });

                    let bloodGrp = scriptContext.request.parameters.bloodGroup || '';

                    blood.defaultValue = bloodGrp;

                    let filter =[];

                    if(bloodGrp){

                        filter.push(['custrecord_jj_last_donation_date','onorbefore','threemonthsagotodate']);
                        filter.push('AND',['custrecord_blood_group','is',bloodGrp]);
                    }

                    log.debug(filter);

                    let srch = search.create({
                        type: 'customrecord_blood_donor_details',
                        filters: filter,
                        columns:['name','custrecord_jj_gender','custrecord_jj_phone_number','custrecord_blood_group','custrecord_jj_last_donation_date']
                    });

                    let resultSrch = srch.run();
                    let srchBlood = resultSrch.getRange({
                        start: 0,
                        end: 100
                    });

                    for(let i = 0 ; i< srchBlood.length ; i++){

                        let scrhResult = srchBlood[i];
                        
                        subList.setSublistValue({
                            id: 'custpage_name',
                            line:i,
                            value: scrhResult.getValue('name')
                        });

                        subList.setSublistValue({
                            id: 'custpage_gender',
                            line:i,
                            value: scrhResult.getText('custrecord_jj_gender')
                        });

                        subList.setSublistValue({
                            id: 'custpage_phone',
                            line:i,
                            value: scrhResult.getValue('custrecord_jj_phone_number')
                        });

                        subList.setSublistValue({
                            id: 'custpage_blood_group',
                            line:i,
                            value: scrhResult.getValue('custrecord_blood_group')
                        });

                        subList.setSublistValue({
                            id: 'custpage_last_donation',
                            line:i,
                            value: scrhResult.getValue('custrecord_jj_last_donation_date')
                        });
                    };

                    scriptContext.response.writePage(form);
                }
            }
            catch(e){
                log.error('Error Found:',e.message);
            };

        }

        return {onRequest}

    });
