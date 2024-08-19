/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
/***************************************************************************************
 * *****************
 * OTP Task
 * 
 * OTP-7513:Custom form to store blood donor details and track them in database
 * 
 * 
 * *************************************************************************************
 * ******************
 * 
 * Author: Jobin and Jismi IT Services LLP
 * 
 * Date Created: 05-August-2024
 * 
 * Description: The company would like to host a custom form that records the blood requirement from various users. We don't insist the form to be very attractive, a traditional NetSuite UI form would do the job for us. But it is important that the solution offered should be functionally well capable of handling various use cases.The basic features of the blood requirement registration form are described below.The form must contain a data entry form for the company employees to track down the blood donor details. They should be able to store Name (First Name, Last Name), Gender, Phone Number, Blood Group, Last Donation Date.
 * 
 * REVISION HISTORY
 * 
 * @version 1.0 OTP-1:05-August-2024: Created the initial build by JJ0327
 * 
 * 
 * ***************************************************************************************
 *******************/
define(['N/record','N/ui/serverWidget', 'N/search'],
    /**
 * @param{record} record
 * @param{search} search
 * @param{serverWidget} serverWidget
 */
    (record,serverWidget,search) => {
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
                        title: 'Blood Donor Form'
                    });

                    form.addFieldGroup({
                        id: 'custpage_primary',
                        label: 'Primary Information'
                    });

                    form.addField({
                        id:'custpage_first_name',
                        label:'First Name',
                        type: serverWidget.FieldType.TEXT,
                        container:'custpage_primary'
                    }).isMandatory = true;

                    form.addField({
                        id: 'custpage_last_name',
                        label:'Last Name',
                        type: serverWidget.FieldType.TEXT,
                        container:'custpage_primary'
                    }).isMandatory = true;

                    let gen =form.addField({
                        id:'custpage_gender',
                        label:'Gender',
                        type: serverWidget.FieldType.SELECT,
                        container:'custpage_primary',
                        source:'customlist_jj_gender'
                    });

                    gen.isMandatory = true;

                    form.addField({
                        id:'custpage_phone',
                        label:'Phone Number',
                        type:serverWidget.FieldType.PHONE,
                        container:'custpage_primary'
                    }).isMandatory = true;

                    form.addField({
                        id: 'custpage_blood_group',
                        type:serverWidget.FieldType.SELECT,
                        label:'Blood Group',
                        container:'custpage_primary',
                        source:'customlist_jj_blood_group'
                    }).isMandatory = true;

                    form.addField({
                        id:'custpage_last_donation',
                        type:serverWidget.FieldType.DATE,
                        label:'Last Donation Date',
                        container:'custpage_primary'
                    }).isMandatory = true;

                    form.addSubmitButton({
                        label: 'Submit'
                    });

                    scriptContext.response.writePage(form);
                }
                else{
                    let firstName = scriptContext.request.parameters.custpage_first_name;
                    let lastName = scriptContext.request.parameters.custpage_last_name;
                    let gender = scriptContext.request.parameters.custpage_gender;
                    let phone = scriptContext.request.parameters.custpage_phone;
                    let bloodGrp = scriptContext.request.parameters.custpage_blood_group;
                    let lastDonation = scriptContext.request.parameters.custpage_last_donation;
                    let date =new Date(lastDonation);
                    log.debug('Formated date:',lastDonation);
                    log.debug('Date:',date);
                    log.debug('Phone:',phone);

                    let currentDate = new Date();
                    log.debug('Current Date:',currentDate);

                    let name = firstName+' '+lastName;
                    log.debug(name);

                    let recSrch = search.create({
                        type: 'customrecord_jj_blood_donor_details',
                        filters:['name','is',name],
                        columns:['internalid']
                    });

                    let dup = recSrch.run().getRange({
                        start : 0,
                        end: 1
                    });

                    let duplicate = dup.length > 0;
                    log.debug(duplicate);

                    if (phone && !/^\d+$/.test(phone)) {
                        
                        scriptContext.response.write('Please enter only numbers for the phone number.');

                    }
                    else{

                        if(date > currentDate){

                            scriptContext.response.write('The date cannot be in the future. Please select a valid date.');

                        }
                        else{

                            if(!duplicate){

                                let crtRec = record.create({
                                    type: 'customrecord_jj_blood_donor_details',
                                    isDynamic:true
                                });

                                crtRec.setValue('name',name);
                                crtRec.setValue('custrecord_jj_first_name_rec',firstName);
                                crtRec.setValue('custrecord_jj_last_name_rec',lastName);
                                crtRec.setValue('custrecord_jj_gender',gender);
                                crtRec.setValue('custrecord_jj_phone_number',phone);
                                crtRec.setValue('custrecord_jj_blood_group',bloodGrp);
                                crtRec.setValue('custrecord_jj_last_donation_date',date);

                                let recId = crtRec.save();

                                let gen = search.lookupFields({
                                    type: 'customrecord_jj_blood_donor_details',
                                    id: recId,
                                    columns: ['custrecord_jj_gender','custrecord_jj_blood_group']
                                });

                                let genderName = gen.custrecord_jj_gender[0].text;
                                let bloodName = gen.custrecord_jj_blood_group[0].text;

                                let details = 'Blood Donor Details <br>'+'First Name: '+firstName+'<br>'+'Last Name: '+lastName+'<br>'+'Gender: '+genderName+'<br>';
                                details +='Phone Number: '+phone+'<br>'+'Blood Group: '+bloodName+'<br>'+'Last Donation Date: '+lastDonation+'<br>'+'Record Id: '+recId;

                                scriptContext.response.write(details);
                            }
                            else{
                                scriptContext.response.write("A record with this ID already exists. You must enter a unique customer ID for each record you create.")
                            }
                        }
                    }
                }
            }
            catch(e){
                log.error('Error Found:',e.message);
            };
        }
        return {onRequest}
    });
