/**
 * @NApiVersion 2.1
 * @NScriptType WorkflowActionScript
 */
define(['N/record', 'N/redirect', 'N/search'],
    /**
 * @param{record} record
 * @param{redirect} redirect
 * @param{search} search
 */
    (record, redirect, search) => {
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

            try {
                // Create a new custom record
                let customRecord = record.create({
                    type: 'customrecord_jj_task_record',
                    isDynamic: true
                });
    
                customRecord.setValue({
                    fieldId: 'custrecord_jj_name_task',
                    value: 'New Visitor'
                });
    
                customRecord.setValue({
                    fieldId: 'custrecord_jj_task_field',
                    value: 'Test Value'
                });
    
                let recordId = customRecord.save();
                log.debug('Rec Id:',recordId);

                return recordId;
    
                // Update Task record with the new custom record ID
                // let taskRecord = scriptContext.newRecord;

                // taskRecord.setValue({
                //     fieldId: 'custevent_jj_record_id',
                //     value: recordId
                // });
        
                // // taskRecord.save();
                // log.debug('Rec Id :',recordId);

                // // Redirect to the newly created custom record
                // redirect.toRecord({
                //     type: 'customrecord_jj_task_record',
                //     id: recordId
                // });

            } catch (e) {
                log.error('Error creating custom record', e);
            }

        }

        return {onAction};
    });
