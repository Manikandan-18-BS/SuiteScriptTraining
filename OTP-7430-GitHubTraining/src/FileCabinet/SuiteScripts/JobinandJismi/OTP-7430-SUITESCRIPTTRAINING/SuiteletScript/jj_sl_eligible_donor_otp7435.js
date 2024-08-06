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

                    form.addField({
                        id:'custpage_bloodgrp',
                        label:'Blood Group',
                        type: serverWidget.FieldType.TEXT
                    });
                    
                    // form.clientScriptFileId = ;

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

                    let filter =[];

                    let srch = search.create({
                        type: 'customrecord_blood_donor_details',
                        filters: filter,
                        columns:['name','custrecord_jj_gender','custrecord_jj_phone_number','custrecord_blood_group','custrecord_jj_last_donation_date']
                    });

                    let resultSrch = srch.run();
                    let srchBlood = resultSrch.getRange({
                        start: 0,
                        end: 10
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

                    form.addSubmitButton({
                        label: 'Submit'
                    });

                    scriptContext.response.writePage(form);
                }
                else{

                    let bloodGrp = scriptContext.request.parameters.custpage_bloodgrp;
                    log.debug('Blood Group:', bloodGrp);

                    let form2 = serverWidget.createForm({
                        title: 'Eligible Blood Donors'
                    });

                    let subList = form2.addSublist({
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

                    let bloSrch = search.create({
                        type: 'customrecord_blood_donor_details',
                        filters:[['custrecord_blood_group','is',bloodGrp],
                                'AND',
                                ['custrecord_jj_last_donation_date','onorbefore','threemonthsagotodate']],
                        columns:['name','custrecord_jj_gender','custrecord_jj_phone_number']    
                    });
                    
                    let bloodSrch =bloSrch.run();
                    let srchBlood = bloodSrch.getRange({
                        start: 0,
                        end: 10
                    });
                    
                    for(let i = 0;i< srchBlood.length;i++){

                        let result = srchBlood[i];

                        subList.setSublistValue({
                            id: 'custpage_name',
                            line:i,
                            value: result.getValue('name')
                        });

                        subList.setSublistValue({
                            id: 'custpage_gender',
                            line:i,
                            value: result.getValue('custrecord_jj_gender')
                        });

                        subList.setSublistValue({
                            id: 'custpage_phone',
                            line:i,
                            value: result.getValue('custrecord_jj_phone_number')
                        });
                    };

                    scriptContext.response.writePage(form2);
                }

            }
            catch(e){
                log.error('Error Found:',e.message);
            };
        }

        return {onRequest}

    });
