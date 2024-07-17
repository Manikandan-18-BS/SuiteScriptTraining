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

    try{

        let currentRec = scriptContext.currentRecord;
        let fieldId = scriptContext.fieldId;
        log.debug(fieldId);


        if(fieldId === 'location'){

            let bodyLoc = currentRec.getValue('location');
            console.log(bodyLoc);

            let lineCount = currentRec.getLineCount({
                sublistId: 'item'
            });

            for(let i = 0 ; i< lineCount; i++){

                currentRec.selectLine({
                    sublistId: 'item',
                    line: i
                });

                let lineLoc = currentRec.setCurrentSublistValue({
                    sublistId: 'item',
                    fieldId:'location',
                    value: bodyLoc
                });

                log.debug('Line Loc:',lineLoc);

                currentRec.commitLine({
                    sublistId: 'item'
                });

            }
        }
    }

    catch(e){
        log.error(e.message);
    };

    }

    /**
     * Validation function to be executed when record is saved.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @returns {boolean} Return true if record is valid
     *
     * @since 2015.2
     */
    function saveRecord(scriptContext) {

        let currentRec = scriptContext.currentRecord;
        let fieldId = scriptContext.fieldId;

        let bodyLoc = currentRec.getValue('location');

        let lineCount = currentRec.getLineCount({
            sublistId: 'item'
        });

        for(let i=0 ;i< lineCount; i++){

            currentRec.selectLine({
                sublistId: 'item',
                line: i
            });

            let lineLoc = currentRec.getCurrentSublistValue({
                sublistId:'item',
                fieldId:'location',
            });

            if(bodyLoc !== lineLoc){

                alert('Mismatch between body-level and line-level locations. Please correct it before saving.');

                return false;
            
            };

            return true;
        };

        

    }

    return {
        fieldChanged: fieldChanged,
        saveRecord: saveRecord
    };
    
});
