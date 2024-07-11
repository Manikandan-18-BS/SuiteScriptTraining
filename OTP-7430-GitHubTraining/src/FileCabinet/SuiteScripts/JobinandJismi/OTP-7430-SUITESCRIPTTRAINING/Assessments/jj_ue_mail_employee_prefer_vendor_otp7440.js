/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/email', 'N/record', 'N/runtime', 'N/search'],
    /**
 * @param{email} email
 * @param{record} record
 * @param{runtime} runtime
 * @param{search} search
 */
    (email, record, runtime, search) => {
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
            if(scriptContext.type === scriptContext.UserEventType.CREATE){

                let newRec = scriptContext.newRecord;
                let recId = newRec.id;
                log.debug('New Rec:',newRec);
                let user = runtime.getCurrentUser();
                let userId = user.id;
                log.debug('User Id: ',userId);

                let sender = -5;

                let itemCount = newRec.getLineCount({
                    sublistId: 'item'
                });

                for (let i = 0; i < itemCount; i++) {
                    let itemID = newRec.getSublistValue({
                        sublistId: 'item',
                        fieldId: 'item',
                        line: i
                    });
                    log.debug('Item ID:', itemID);

                // let itemID = newRec.getSublistValue({
                //     sublistId: 'item',
                //     line:0,
                //     fieldId:'item'
                // });

                try{

                let recLook = record.load({
                    type: record.Type.INVENTORY_ITEM,
                    id: itemID,
                }) ;
                

                let prefVen = recLook.getSublistValue({
                    sublistId: 'itemvendor',
                    line:0,
                    fieldId:'preferredvendor'
                });

                // recLook.selectLine({
                //     sublistId: 'item',
                //     line: 0
                // });
            

                // let itemID = recLook.getCurrentSublistValue ({
                //     sublistId: 'item',
                //     fieldId: 'item'
                // });
                log.debug('Item Id: ',itemID);

                

                // let recIt = search.lookupFields({
                //     type: search.Type.ITEM,
                //     id: itemID,
                //     columns:['itemid','itemvendor','preferredvendor']
                // });

                let itemNam = recLook.getValue('itemid');
                log.debug('Item: ', itemNam);

                // let itemVen = recIt.itemvendor;
                // log.debug('Item Ven:',itemVen);

                // let prefVen = ven.preferredvendor;
                log.debug('Pref Ven: ',prefVen);

                if(!prefVen){

                    email.send({
                        author: sender,
                        recipients: userId,
                        subject: 'No Preferred Vendor',
                        body: 'No Preferred Vendor is added for the item '+' '+itemNam+" ."+'Please Update the Preferred Vendor'
                    });
                };
            }

            catch(e){
                log.error('Error in Sending Mail',e.message);
            };
        }



            }

        }

        return {beforeLoad, beforeSubmit, afterSubmit}

    });
