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
     * Function to be executed when field is changed.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     * @param {string} scriptContext.fieldId - Field name
     * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
     * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
     *
     * @since 2015.2
     */
    function fieldChanged(scriptContext) {

        let currentRec = scriptContext.currentRecord;
        let fieldId =  scriptContext.fieldId;

        if(fieldId === 'custcol_jj_amount_calculation'){

            let checkboxValue = currentRec.getCurrentSublistValue({
                sublistId: 'item',
                fieldId: 'custcol_jj_amount_calculation',
            });

            log.debug('CheckBox Value:',checkboxValue);

            let rate = currentRec.getCurrentSublistValue({
                sublistId:'item',
                fieldId:'rate'
            });
            log.debug('Rate:',rate);

            let quan = currentRec.getCurrentSublistValue({
                sublistId:'item',
                fieldId:'quantity'
            });
            log.debug('Quantity',quan);

            let calAmt = rate*quan;
            log.debug('Amount:',calAmt);

            let calAmount = calAmt/2;
            log.debug('Calculated Amount:',calAmount);

            if(checkboxValue){

                currentRec.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId:'amount',
                    value: calAmount
                });
                
            }
            // else {

            //     currentRec.setCurrentSublistValue({
            //         sublistId: 'item',
            //         fieldId: 'amount',
            //         value: calAmt
            //     });
            // };
        };
    }

    return {
        fieldChanged: fieldChanged
       
    };
    
});
