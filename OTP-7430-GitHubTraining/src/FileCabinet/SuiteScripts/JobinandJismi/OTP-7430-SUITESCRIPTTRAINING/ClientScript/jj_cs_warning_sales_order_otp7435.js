/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord', 'N/record', 'N/ui/dialog'],
/**
 * @param{currentRecord} currentRecord
 * @param{record} record
 * @param{dialog} dialog
 */
function(currentRecord, record, dialog) {
    
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

        let total = currentRec.getValue('total');

        if(total <=10000){
            let message ={
                title: 'Low Sales Order Amount',
                message: 'The total amount of dales order is less than 10,000. Do you want to proceed?',
                buttons:[
                    { label: 'Yes', value: true},
                    {label: 'No', value: false}
                ]
            };

            log.debug(message.message);

            return dialog.create({
                buttons: message.buttons,
                title: message.title,
                message: message.message
            }).then(function(result){

                return result.value;
            }).catch(function(reason){

                console.log('Dialog canceled: ' + reason);
                return false;
            });
        }

        return true;
    }

    return {
        saveRecord: saveRecord
    };
    
});
