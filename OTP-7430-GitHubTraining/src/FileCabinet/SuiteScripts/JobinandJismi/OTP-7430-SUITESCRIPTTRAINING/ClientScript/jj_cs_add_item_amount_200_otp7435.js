/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord', 'N/record'],
/**
 * @param{currentRecord} currentRecord
 * @param{record} record
 */
function(currentRecord, record) {
    

    /**
     * Validation function to be executed when sublist line is committed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @returns {boolean} Return true if sublist line is valid
     *
     * @since 2015.2
     */
    function validateLine(scriptContext) {

        let currentRec = scriptContext.currentRecord;
        let sublistId = scriptContext.sublistId;

        if(sublistId === 'item'){

            let amount = currentRec.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'amount'
            });

            log.debug(amount)

            if(amount <= 200){

                alert('The Item amount must be greater than 200');

                return false;
            };
        };

        return true;

    }

    return {
        validateLine: validateLine
    };
    
});
