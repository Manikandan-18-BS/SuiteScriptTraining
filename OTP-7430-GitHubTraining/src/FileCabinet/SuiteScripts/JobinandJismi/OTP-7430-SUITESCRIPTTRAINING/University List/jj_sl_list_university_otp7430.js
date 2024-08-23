/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 */
/***************************************************************************************
 * *****************
 * OTP Task
 * 
 * OTP-7430:List_the_university
 * 
 * 
 * *************************************************************************************
 * ******************
 * 
 * Author: Jobin and Jismi IT Services LLP
 * 
 * Date Created: 23-August-2024
 * 
 * Description: List the university based on the given country
 * 
 * REVISION HISTORY
 * 
 * @version 1.0 OTP-7430:23-August-2024: Created the initial build by JJ0327
 * 
 * 
 * ***************************************************************************************
 *******************/
define(['N/http', 'N/ui/serverWidget'],
    /**
 * @param{http} http
 * @param{serverWidget} serverWidget
 */
    (http, serverWidget) => {
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
                        title: 'University List'
                    });

                    let con =form.addField({
                        id: 'custpage_country',
                        label: 'Country',
                        type: serverWidget.FieldType.SELECT
                    });
                    con.isMandatory = true;

                    form.clientScriptFileId = 2900;

                    con.addSelectOption({
                        value: '',
                        text: ''
                    });

                    con.addSelectOption({
                        value:'india',
                        text:'India'
                    });

                    con.addSelectOption({
                        value:'japan',
                        text:'Japan'
                    });

                    con.addSelectOption({
                        value:'china',
                        text:'China'
                    });

                    let subList = form.addSublist({
                        id: 'custpage_sublist',
                        label: 'Details',
                        type: serverWidget.SublistType.LIST
                    });

                    subList.addField({
                        id:'custpage_contry',
                        label:'Country',
                        type: serverWidget.FieldType.TEXT
                    });

                    subList.addField({
                        id:'custpage_university',
                        label:'Name',
                        type: serverWidget.FieldType.TEXT
                    });

                    subList.addField({
                        id:'custpage_state',
                        label:'State/Province',
                        type: serverWidget.FieldType.TEXT
                    });

                    subList.addField({
                        id:'custpage_webpage',
                        label:'Web Page',
                        type: serverWidget.FieldType.URL
                    }).linkText = 'Visit the Page';

                    let getCountry = scriptContext.request.parameters.country || '';

                    con.defaultValue = getCountry;
                    
                    if(getCountry){

                        let url = 'http://universities.hipolabs.com/search?country='+getCountry;

                        let apiResponse = http.get({
                            url: url,
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            }
                        });

                        let universities = JSON.parse(apiResponse.body);

                        for(let i = 0 ; i< universities.length ; i++){

                            let uni = universities[i];

                            subList.setSublistValue({
                                id: 'custpage_contry',
                                line: i,
                                value: uni['country']|| null
                            });

                            subList.setSublistValue({
                                id: 'custpage_university',
                                line: i,
                                value: uni['name'] || null
                            });

                            subList.setSublistValue({
                                id: 'custpage_state',
                                line: i,
                                value: uni['state-province']|| null
                            });

                            subList.setSublistValue({
                                id: 'custpage_webpage',
                                line: i,
                                value: uni['web_pages'][0] || null
                            });
                        };
                    };

                    form.addButton({
                        id: 'custpage_submit',
                        label: 'Submit',
                        functionName: 'submitForm'
                    });

                    scriptContext.response.writePage(form);
                }
            }
            catch(e){
                log.error('Error Found:',e.message);
            }

        }

        return {onRequest}

    });
