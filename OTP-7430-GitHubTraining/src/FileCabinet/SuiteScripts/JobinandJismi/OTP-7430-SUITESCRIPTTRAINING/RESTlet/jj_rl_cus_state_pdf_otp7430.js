/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
/***************************************************************************************
 * *****************
 * OTP Task
 * 
 * OTP-7430:Create_customer_statement_pdf
 * 
 * 
 * *************************************************************************************
 * ******************
 * 
 * Author: Jobin and Jismi IT Services LLP
 * 
 * Date Created: 22-August-2024
 * 
 * Description: Create the customer statement and store the file in newly created folder
 * 
 * REVISION HISTORY
 * 
 * @version 1.0 OTP-7430:22-August-2024: Created the initial build by JJ0327
 * 
 * 
 * ***************************************************************************************
 *******************/
define(['N/email', 'N/file', 'N/record', 'N/render', 'N/search','N/runtime','N/task'],
    /**
 * @param{email} email
 * @param{file} file
 * @param{record} record
 * @param{render} render
 * @param{search} search
 * @param{runtime} runtime
 * @param{task} task
 */
    (email, file, record, render, search,runtime,task) => {
        /**
         * Defines the function that is executed when a GET request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const get = (requestParams) => {

        }

        /**
         * Defines the function that is executed when a PUT request is sent to a RESTlet.
         * @param {string | Object} requestBody - The HTTP request body; request body are passed as a string when request
         *     Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case
         *     the body must be a valid JSON)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const put = (requestBody) => {

        }

        /**
         * Defines the function that is executed when a POST request is sent to a RESTlet.
         * @param {string | Object} requestBody - The HTTP request body; request body is passed as a string when request
         *     Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case
         *     the body must be a valid JSON)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const post = (requestBody) => {
            try{

                let folName = requestBody.folderName;
                let mailId = requestBody.emailAddress;
                let strDate = requestBody.startDate;

                let folSrch = search.create({
                    type: search.Type.FOLDER,
                    columns:['name']
                });
                let fol =[];
                let newFolId ='';

                folSrch.run().each(function(result){
                    fol.push(result.getValue('name'));
                    return true;
                });

                if(!fol.includes(folName)){

                    let newFol = record.create({
                        type: record.Type.FOLDER
                    });

                    newFol.setValue('name',folName);
                    newFolId = newFol.save({
                        ignoreMandatoryFields: true,
                        enableSourcing: true
                    });
                    log.debug('Created Folder:',newFolId);

                    // if(newFolId){
                    //     let trig = task.create({
                    //             taskType: task.TaskType.SCHEDULED_SCRIPT,
                    //             deploymentId: 'customdeploy_jj_ss_cust_state_pdf',
                    //             scriptId: 'customscript_jj_ss_cust_state_pdf'
                    //         });
                    //     trig.params = {
                    //         custscript_jj_emailid : mailId,
                    //         custscript_jj_start_date:strDate,
                    //             custscript_jj_folderid: newFolId
                    //      }

                    //     let taskTrigger = trig.submit();
                    //     if(taskTrigger){

                    //         return('The Schedule Script is triggered');
                    //     }
                    // };
                }
                else{
                    return('A folder with this ID already exists. You must enter a unique folder ID for each folder you create.')
                };

                let custSrch = search.create({
                    type: search.Type.CUSTOMER,
                    filters:["status","anyof","13"],
                    columns:['internalid']
                });

                let custId = '';

                custSrch.run().each(function(result){
                    custId = result.getValue('internalid');
                    log.debug('Customer Id:',custId);
                    let customerId = Number(custId);

                    let pdfFile = render.statement({
                        entityId: customerId,
                        printMode: render.PrintMode.PDF,
                        startDate: strDate,
                        openTransactionsOnly: true,
                    });
    
                    let now = new Date();
                    let timestamp = now.getFullYear() + '-' + 
                                    ('0' + (now.getMonth() + 1)).slice(-2) + '-' + 
                                    ('0' + now.getDate()).slice(-2) + ' ' + 
                                    ('0' + now.getHours()).slice(-2) + ':' + 
                                    ('0' + now.getMinutes()).slice(-2) + ':' + 
                                    ('0' + now.getSeconds()).slice(-2);
                    log.debug('TimeStamp:',timestamp);
                
                    pdfFile.name = custId+'_'+timestamp;
                    pdfFile.folder = newFolId;
                    let pdfId = pdfFile.save();
                    log.debug('PDF Id:',pdfId);
                    return true;
                });

                let emailBody = '<p>We hope this email finds you well.</p>' +
                                        '<p>The customer statement Folder is created</p>' +
                                        '<p>Best Regards,</p>';

                email.send({
                    author: -5,
                    body: '<p><strong>Hai</strong></p>'+emailBody+'<p><strong>Larry Nelson</strong></p>',
                    recipients: mailId,
                    subject: 'Customer statement Folder Created',
                });
               
            }
            catch(e){
                log.error('Error Found:',e.message);
            };
        }



        /**
         * Defines the function that is executed when a DELETE request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters are passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const doDelete = (requestParams) => {

        }

        return {get, put, post, delete: doDelete}

    });
