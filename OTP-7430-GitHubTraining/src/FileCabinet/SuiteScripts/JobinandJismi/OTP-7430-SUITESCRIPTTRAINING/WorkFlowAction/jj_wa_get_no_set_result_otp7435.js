/**
 * @NApiVersion 2.1
 * @NScriptType WorkflowActionScript
 */
define(['N/currentRecord', 'N/record', 'N/search'],
    /**
 * @param{currentRecord} currentRecord
 * @param{record} record
 * @param{search} search
 */
    (currentRecord, record, search) => {
        /**
         * Defines the WorkflowAction script trigger point.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.workflowId - Internal ID of workflow which triggered this action
         * @param {string} scriptContext.type - Event type
         * @param {Form} scriptContext.form - Current form that the script uses to interact with the record
         * @since 2016.1
         */
        const onAction = (scriptContext) => {
            try{

                let newRec = scriptContext.newRecord;
                let num = newRec.getValue('custbody_jj_number');
                log.debug('Number:',num);

                let resValue = 'Result:Failed';

                if(num>=100){

                    resValue = 'Result:Passed';
                };

                return resValue;
            }
            catch(e){
                log.error('Error found:',e.message);
            };
        };

        return {onAction};
    });
