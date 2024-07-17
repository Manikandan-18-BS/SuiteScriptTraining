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
     * Function to be executed after sublist is inserted, removed, or edited.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.sublistId - Sublist name
     *
     * @since 2015.2
     */
    function sublistChanged(scriptContext) {
        let currentRec = scriptContext.currentRecord;
        let sublistId =  scriptContext.sublistId;

        if(sublistId === 'item'){

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

            if('custcol_jj_amount_calculation' === true){

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
        sublistChanged: sublistChanged,
    };
    
});
