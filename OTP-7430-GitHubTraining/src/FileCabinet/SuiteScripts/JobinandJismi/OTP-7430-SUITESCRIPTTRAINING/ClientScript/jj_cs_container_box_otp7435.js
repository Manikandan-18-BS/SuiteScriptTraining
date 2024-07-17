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

            let itemId = currentRec.getCurrentSublistValue({
                sublistId:'item',
                fieldId: 'item'
            });

            log.debug(itemId);

            let recLoad = record.load({

                type: record.Type.INVENTORY_ITEM,
                id: itemId
            });

            let length = recLoad.getValue('custitem_jj_length');
            log.debug(length);

            let breadth = recLoad.getValue('custitem_jj_breadth');
            log.debug(breadth);

            let height = recLoad.getValue('custitem_jj_height');
            log.debug(height);

            let containerBox = length*breadth*height;
            log.debug('ContainerBox:',containerBox);

            currentRec.setCurrentSublistValue({
                sublistId:'item',
                fieldId: 'custcol_jj_container_box',
                value: containerBox
            });

            let rate = currentRec.getCurrentSublistValue({
                sublistId: 'item',
                fieldId:'rate'
            });
            log.debug('Rate:',rate);

            let amt = (rate*containerBox).toFixed(0);
            log.debug('Amount:',amt);

            currentRec.setCurrentSublistValue({
                sublistId:'item',
                fieldId:'amount',
                value:amt
            });

            let amount = currentRec.getCurrentSublistValue({
                sublistId:'item',
                fieldId:'amount'
            });
            log.debug('New Amount:',amount);

            // var calculatedAmount = rate * containerBox;
            // // var amount = currentRecord.getCurrentSublistValue({
            // //     sublistId: 'item',
            // //     fieldId: 'amount'
            // });

            if(parseFloat(amount) !== parseFloat(amt)){

                alert('Amount must be equal to Rate * Container Box (Length * Breadth * Height).');

                return false;
            };

        }
        return true;

    }

    

    return {
        
        validateLine: validateLine
    };
    
});
