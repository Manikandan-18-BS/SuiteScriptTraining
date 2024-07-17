/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/record'],
/**
 * @param{record} record
 */
function(record) {
    

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
        let fieldId = scriptContext.fieldId;

        if(fieldId === 'custbody_jj_checkbox'){

            let checkboxValue = currentRec.getValue('custbody_jj_checkbox');

            if(checkboxValue){

                currentRec.setValue('custbody_jj_textbox','Passed');
            }
            else{

                currentRec.setValue('custbody_jj_textbox','Failed');
            };

            console.log('Value changed')
        };

    }

    return {
        fieldChanged: fieldChanged
    };
    
});
