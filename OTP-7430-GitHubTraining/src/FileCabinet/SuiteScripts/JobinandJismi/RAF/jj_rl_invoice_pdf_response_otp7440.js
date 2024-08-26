/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
/***************************************************************************************
 * *****************
 * OTP Task
 * 
 * OTP-7430:Generate_Invoice_PDF
 * 
 * 
 * *************************************************************************************
 * ******************
 * 
 * Author: Jobin and Jismi IT Services LLP
 * 
 * Date Created: 26-August-2024
 * 
 * Description: Create a Restlet endpoint for receiving the invoice print via API response. Create a POST API endpoint for generating invoice PDF. Execution model: Create a POST Restlet API endpoint with the following request body:
    {
    "recordName": {unique value},
    "DocumentNo": { id }
    }
    When performing the API request from a third-party application/postman. The Restlet code identify the invoice number is present in the Netsuite account or not. If yes return the PDF print in the response lke following format.
    {
    "recordName":"invoice", "documentNo: "",
    "url":""
    }
    The url value in the response must be displayed on a page with invoice print, when opening the url in the web browser, the invoice print must appear on the screen without logging into the Netsuite account. If the invoice document number is not present in the Netsuite, send the same response with the url field empty.
 * 
 * REVISION HISTORY
 * 
 * @version 1.0 OTP-7440:26-August-2024: Created the initial build by JJ0327
 * 
 * 
 * ***************************************************************************************
 *******************/
define(['N/https', 'N/record', 'N/render', 'N/search', 'N/url','N/file'],
    /**
 * @param{render} render
 * @param{search} search
 * @param{file} file
 */
    (render, search,file) => {
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
                let recName = requestBody.recordName;
                let doc = requestBody.DocumentNo;

                let invSrch = search.create({
                    type: search.Type.INVOICE,
                    filters:[['tranid','is',doc], 
                            'AND', 
                            ['mainline','is','T']],
                    columns:['internalid']
                });

                let invId = '';
                
                invSrch.run().each(function(result){
                    invId = result.getValue('internalid');
                    return true;
                });

                if(invId){

                    let invNum = Number(invId);

                    let pdfFile = render.transaction({
                        entityId: invNum,
                        printMode: render.PrintMode.PDF
                    });

                    pdfFile.folder = -15;
                    pdfFile.isOnline = true;
                    let pdfFileID = pdfFile.save();

                    log.debug('PDF',pdfFile);
                    log.debug('PDF Stored:',pdfFileID);

                    let pdfUrl = file.load({
                        id: pdfFileID
                    });

                    return{
                        "recordName":recName, 
                        "documentNo": doc,
                        "url":pdfUrl.url
                    }; 
                }
                else{
                    return{
                        "recordName":recName, 
                        "documentNo": doc,
                        "url":null
                    };
                }
            }
            catch(e){
                log.error('Error found:',e.message);
            }

        }

        return {post}

    });
