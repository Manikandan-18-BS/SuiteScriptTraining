/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(['N/record', 'N/search'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search) => {
        /**
         * Defines the function that is executed when a GET request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const get = (requestParams) => {

            let recId = requestParams.id;

            let recLoad = record.load({
                type: record.Type.SALES_ORDER,
                id: recId
            });
             let itemLen = recLoad.getLineCount({
                    sublistId: 'item'
            });

            log.debug('itemlen:',itemLen);
            
            try{

                let itemDetails = [];

            for(let i = 0 ; i < itemLen ; i++ ){

                let itemNam = recLoad.getSublistText({
                    sublistId: 'item',
                    fieldId: 'item',
                    line: i
                });
                let itemQuan = recLoad.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'quantity',
                    line: i
                });
                let itemRate = recLoad.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'rate',
                    line: i
                });
                let itemAmt = recLoad.getSublistValue({
                    sublistId: 'item',
                    fieldId: 'amount',
                    line: i
                });

                // let itemDetails = {
                //     itemName: itemNam,
                //     quantity: itemQuan,
                //     rate: itemRate,
                //     amount: itemAmt
                // };
                itemDetails[i]= {
                    itemName: itemNam,
                    quantity: itemQuan,
                    rate: itemRate,
                    amount: itemAmt
                };

                // if(itemLen >= 2){
                //     return('Sales order contains more than 2 items');
                // }
            
            }
            // return arrayVal;
            
            if(0 <= itemLen <2){
                return itemDetails;
                
            }
            else {
                return{
                    itemDetails,
                    message:'Sales order contains more than 2 items'
            };
        }
    }

        catch(e){
            return{
                message: e.message
            };
        }

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
            let recId = requestBody.purchaseId;
            let empId = requestBody.employeeId;
            let memo = requestBody.memoPO;
            let loc = requestBody.locationId;

            let updateValue = {
                memo: memo,
                location: loc,
                employee: empId
            };

            try{

            let recUpdate = record.submitFields({
                type: record.Type.PURCHASE_ORDER,
                id: recId,
                values: updateValue
            });

            return{
                success: true,
                updatedRecord: recUpdate
            };
        }
        catch(e){
            return{
                success: false,
                message: e.message
            };
        };


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
