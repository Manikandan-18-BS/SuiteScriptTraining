/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
/***************************************************************************************
 * *****************
 * OTP Task
 * 
 * OTP-7514:Search through the database to find the matching blood donors
 * 
 * 
 * *************************************************************************************
 * ******************
 * 
 * Author: Jobin and Jismi IT Services LLP
 * 
 * Date Created: 06-August-2024
 * 
 * Description:Create a new form to search for the eligible blood donors, based on the filters (blood group) and last donation date (should be three months before) with the entered details.The basic blood donor form would have captured the details of the donor in the NetSuite database (using custom records).The new form must capture the details of the required blood group (and the last donation date) to find the best and eligible donors.Every eligible donor must be displayed in the form with their details (such as Name, Phone Number).
 * 
 * REVISION HISTORY
 * 
 * @version 1.0 OTP-1:06-August-2024: Created the initial build by JJ0327
 * 
 * 
 * ***************************************************************************************
 *******************/
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
