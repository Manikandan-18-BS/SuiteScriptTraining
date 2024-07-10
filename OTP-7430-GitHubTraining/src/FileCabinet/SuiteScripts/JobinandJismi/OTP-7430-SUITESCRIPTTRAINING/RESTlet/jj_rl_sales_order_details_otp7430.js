/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(['N/record','N/search'],
    
    (record,search) => {
        /**
         * Defines the function that is executed when a GET request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const get = (requestParams) => {
            let salesId = requestParams.id;
            try{

                let recLoad = record.load({
                    type: record.Type.SALES_ORDER,
                    id: salesId
            });

            
                // if(recLoad.id>0){

                    let salesDetails ={
                        id: recLoad.id,
                        tranid: recLoad.getValue('tranid'),
                        entity: recLoad.getText('entity'),
                        trandate: recLoad.getValue('trandate'),
                        createddate: recLoad.getValue('createddate'),
                        status: recLoad.getText('status'),
                        salesrep: recLoad.getText('salesrep')

                    };

                    return salesDetails;
                // }
                // else {
                //     return('Does not Exist');
                // };
            }
            catch(e){
                if(e.name === 'INVALID_TRANS_TYP'){
                    return('Record Does not Exist');
                }
                else {
                    throw e;
                };
                // log.error('Error in getting Details',e.message);
            };

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
