/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record'],
    /**
 * @param{record} record
 */
    (record) => {
        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = (scriptContext) => {
            let PurRec = record.create({
                type: record.Type.PURCHASE_ORDER,
                isDynamic: true
            });
            PurRec.setValue('entity',1667);
            PurRec.setValue('subsidiary',11);
            PurRec.setValue('currency',1);
            
            PurRec.selectNewLine({
                sublistId: 'expense'
            });
            PurRec.setCurrentSublistValue({
                sublistId: 'expense',
                fieldId: 'account',
                value: 69
            });
            PurRec.setCurrentSublistValue({
                sublistId: 'expense',
                fieldId: 'amount',
                value: 500
            });
            PurRec.commitLine({
                sublistId: 'expense'
            });
            let purSave = PurRec.save({
                enableSourcing: true,
                ignoreMandatoryField: true
            });
            log.debug('Created Purchase Order ID',purSave);
        }

        /**
         * Defines the function definition that is executed before record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const beforeSubmit = (scriptContext) => {

        }

        /**
         * Defines the function definition that is executed after record is submitted.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @since 2015.2
         */
        const afterSubmit = (scriptContext) => {

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
