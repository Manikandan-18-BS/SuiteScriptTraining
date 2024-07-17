/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord', 'N/email', 'N/record'],
/**
 * @param{currentRecord} currentRecord
 * @param{email} email
 * @param{record} record
 */
function(currentRecord, email, record) {

    let oldQuantity =[];
    
    /**
     * Function to be executed after page is initialized.
     *
     * @param {Object} scriptContext
     * @param {Record} scriptContext.currentRecord - Current form record
     * @param {string} scriptContext.mode - The mode in which the record is being accessed (create, copy, or edit)
     *
     * @since 2015.2
     */
    function pageInit(scriptContext) {

        if(scriptContext.mode === 'edit'){
            let currentRec = scriptContext.currentRecord;
        
        let lineCount = currentRec.getLineCount({
            sublistId:'item'
        });
        log.debug('Line Count:',lineCount);

        for(let i = 0 ; i < lineCount ; i++){
            let quan = currentRec.getSublistValue({
                sublistId: 'item',
                fieldId: 'quantity',
                line: i
            });

            oldQuantity[i]=quan;
        };

    }

    }

    /**
    //  * Function to be executed when field is changed.
    //  *
    //  * @param {Object} scriptContext
    //  * @param {Record} scriptContext.currentRecord - Current form record
    //  * @param {string} scriptContext.sublistId - Sublist name
    //  * @param {string} scriptContext.fieldId - Field name
    //  * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
    //  * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
    //  *
    //  * @since 2015.2
    //  */
    // function fieldChanged(scriptContext) {
    //     let currentRec = scriptContext.currentRecord;
    //     let fieldId = scriptContext.fieldId;
    //     let lineNum = scriptContext.lineNum;

    //     if(fieldId === 'quantity'){

    //         let ven = currentRec.getValue('entity');
    //         log.debug('Vendor Id:',ven);

    //         let doc = currentRec.getValue('tranid');
    //         log.debug('Document Num:',doc);

    //         let item = currentRec.getCurrentSublistText({
    //             sublistId:'item',
    //             fieldId:'item'
    //         });
    //         log.debug('Item:',item);


    //         let newQuan = currentRec.getCurrentSublistValue({
    //             sublistId: 'item',
    //             fieldId:'quantity'
    //         });
    //         log.debug('New Qunatity:',newQuan);

    //         let oldQuan = oldQuantity[lineNum];
    //         log.debug('Old Qunatity:',oldQuan);

    //         let bodyValue = 'Item Name:'+item+' '+'Old Quantity: '+oldQuan+' '+'New Quantity: '+newQuan+'\n';
    //         email.send({
    //             author: -5,
    //             recipients: ven,
    //             subject:'The quantity updated in the PO: '+doc+'\n',
    //             body: bodyValue 
    //         });
    //     }

    // }

    // /**
    //  * Function to be executed when field is slaved.
    //  *
    //  * @param {Object} scriptContext
    //  * @param {Record} scriptContext.currentRecord - Current form record
    //  * @param {string} scriptContext.sublistId - Sublist name
    //  * @param {string} scriptContext.fieldId - Field name
    //  *
    //  * @since 2015.2
    //  */
    // function postSourcing(scriptContext) {

    // }

    // /**
    //  * Function to be executed after sublist is inserted, removed, or edited.
    //  *
    //  * @param {Object} scriptContext
    //  * @param {Record} scriptContext.currentRecord - Current form record
    //  * @param {string} scriptContext.sublistId - Sublist name
    //  *
    //  * @since 2015.2
    //  */
    // function sublistChanged(scriptContext) {

    // }

    // /**
    //  * Function to be executed after line is selected.
    //  *
    //  * @param {Object} scriptContext
    //  * @param {Record} scriptContext.currentRecord - Current form record
    //  * @param {string} scriptContext.sublistId - Sublist name
    //  *
    //  * @since 2015.2
    //  */
    // function lineInit(scriptContext) {

    // }

    // /**
    //  * Validation function to be executed when field is changed.
    //  *
    //  * @param {Object} scriptContext
    //  * @param {Record} scriptContext.currentRecord - Current form record
    //  * @param {string} scriptContext.sublistId - Sublist name
    //  * @param {string} scriptContext.fieldId - Field name
    //  * @param {number} scriptContext.lineNum - Line number. Will be undefined if not a sublist or matrix field
    //  * @param {number} scriptContext.columnNum - Line number. Will be undefined if not a matrix field
    //  *
    //  * @returns {boolean} Return true if field is valid
    //  *
    //  * @since 2015.2
    //  */
    // function validateField(scriptContext) {

    // }

    // /**
    //  * Validation function to be executed when sublist line is committed.
    //  *
    //  * @param {Object} scriptContext
    //  * @param {Record} scriptContext.currentRecord - Current form record
    //  * @param {string} scriptContext.sublistId - Sublist name
    //  *
    //  * @returns {boolean} Return true if sublist line is valid
    //  *
    //  * @since 2015.2
    //  */
    // function validateLine(scriptContext) {

    // }

    // /**
    //  * Validation function to be executed when sublist line is inserted.
    //  *
    //  * @param {Object} scriptContext
    //  * @param {Record} scriptContext.currentRecord - Current form record
    //  * @param {string} scriptContext.sublistId - Sublist name
    //  *
    //  * @returns {boolean} Return true if sublist line is valid
    //  *
    //  * @since 2015.2
    //  */
    // function validateInsert(scriptContext) {

    // }

    // /**
    //  * Validation function to be executed when record is deleted.
    //  *
    //  * @param {Object} scriptContext
    //  * @param {Record} scriptContext.currentRecord - Current form record
    //  * @param {string} scriptContext.sublistId - Sublist name
    //  *
    //  * @returns {boolean} Return true if sublist line is valid
    //  *
    //  * @since 2015.2
    //  */
    // function validateDelete(scriptContext) {

    // }

    // /**
    //  * Validation function to be executed when record is saved.
    //  *
    //  * @param {Object} scriptContext
    //  * @param {Record} scriptContext.currentRecord - Current form record
    //  * @returns {boolean} Return true if record is valid
    //  *
    //  * @since 2015.2
    //  */
    function saveRecord(scriptContext) {
        let currentRec = scriptContext.currentRecord;

            let ven = currentRec.getValue('entity');
            log.debug('Vendor Id:',ven);

            let doc = currentRec.getValue('tranid');
            log.debug('Document Num:',doc);

            let lineCount = currentRec.getLineCount({
                sublistId:'item'
            });

            let bodyValue ='';

            for(let i = 0 ; i < lineCount; i++){

            let item = currentRec.getSublistText({
                sublistId:'item',
                fieldId:'item',
                line:i
            });
            log.debug('Item:',item);

            let newQuan = currentRec.getSublistValue({
                sublistId: 'item',
                fieldId:'quantity',
                line:i
            });
            log.debug('New Qunatity:',newQuan);

            let oldQuan = oldQuantity[i];
            log.debug('Old Qunatity:',oldQuan);


            if(oldQuan !== newQuan){

               bodyValue += 'Item Name:'+item+' '+'Old Quantity: '+oldQuan+' '+'New Quantity: '+newQuan+'\n';
            }

        }

            if(bodyValue){

            email.send({
                author: -5,
                recipients:ven,
                subject:'The quantity updated in the PO: '+doc+'\n',
                body: bodyValue 
            });
        }
    

    return true;

    }

    return {
        pageInit: pageInit,
        // fieldChanged: fieldChanged,
        // postSourcing: postSourcing,
        // sublistChanged: sublistChanged,
        // lineInit: lineInit,
        // validateField: validateField,
        // validateLine: validateLine,
        // validateInsert: validateInsert,
        // validateDelete: validateDelete,
        saveRecord: saveRecord
    };
    
});
