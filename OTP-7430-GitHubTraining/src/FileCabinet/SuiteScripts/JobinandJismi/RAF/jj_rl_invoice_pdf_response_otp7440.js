/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(['N/https', 'N/record', 'N/render', 'N/search', 'N/url','N/file'],
    /**
 * @param{https} https
 * @param{record} record
 * @param{render} render
 * @param{search} search
 * @param{url} url
 * @param{file} file
 */
    (https, record, render, search, url,file) => {
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
