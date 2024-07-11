/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
define(['N/record'],
    /**
 * @param{record} record
 */
    (record) => {
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

            try{
            let recLoad = record.load({
                type: record.Type.CREDIT_MEMO,
                id: recId
            });

            let recValues = {
                entity: recLoad.getText('entity'),
                subsidiary: recLoad.getText('subsidiary'),
                salesrep: recLoad.getText('salesrep'),
                location: recLoad.getText('location')
            };

            return recValues;
        }
        catch(e){
            if(e.name === 'INVALID_TRANS_TYP'){
                return('Record Does not Exist');
            }
            else {
                throw e;
            };
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
            let recId = requestBody.invoiceId;
            let memo = requestBody.memoV;
            let salrep = requestBody.salesRep;
            let loc = requestBody.locationId;

            let updateValue = {
                memo: memo,
                salesrep: salrep,
                location: loc
            };

            try{

            let recUpdate = record.submitFields({
                type: record.Type.INVOICE,
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

            let custId = requestBody.customerId;
            let item = requestBody.itemId;
            let quan = requestBody.quantity;
            let loc = requestBody.locationId;
            try{
            let cashSale = record.create({
                type: record.Type.CASH_SALE,
                isDynamic: true
            });

            cashSale.setValue('entity',custId);

            cashSale.setValue('location',loc)
            
            cashSale.selectNewLine({
                sublistId: 'item'
            });

            cashSale.setCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'item',
                value: item
            });

            cashSale.setCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'quantity',
                value: quan
            });

            cashSale.commitLine({
                sublistId: 'item'
            });

            let CrtCs = cashSale.save({
                enableSourcing: true,
                ignoreMandatoryField: true
            });

            return{
                Success: true,
                SalesorderId: CrtCs
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
         * Defines the function that is executed when a DELETE request is sent to a RESTlet.
         * @param {Object} requestParams - Parameters from HTTP request URL; parameters are passed as an Object (for all supported
         *     content types)
         * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
         *     Object when request Content-Type is 'application/json' or 'application/xml'
         * @since 2015.2
         */
        const doDelete = (requestParams) => {
            let recId = requestParams.id;
            try{
            let recDel = record.delete({
                type: record.Type.EMPLOYEE,
                id: recId
            });
            return{
                success: true,
                deleteRecord: recDel
            };
        }
        catch(e){
            return{
                success: false,
                message: e.message
            };
        };


        }

        return {get, put, post, delete: doDelete}

    });
