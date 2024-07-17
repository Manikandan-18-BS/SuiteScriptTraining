/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/ui/message'],
/**
 * @param{message} message
 */
function(message) {
    
    
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
        let form = scriptContext.form;

        if(fieldId === 'custentity_apply_coupon'){

            let applyCoupon = currentRec.getValue('custentity_apply_coupon');
            console.log('Apply:',applyCoupon);

            if(applyCoupon === true){
                currentRec.getField('custentity_jj_coupon_code').isDisplay= true;
                // setFieldDisplayType(currentRec, form, 'custentity_jj_coupon_code', 'normal');
            } else
            
            {

                currentRec.setValue('custentity_jj_coupon_code','');
                currentRec.getField('custentity_jj_coupon_code').isDisplay= false;
                // setFieldDisplayType(currentRec, form, 'custentity_jj_coupon_code', 'disabled');
            };

        };

    };


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
        let applyCoupon = currentRec.getValue('custentity_apply_coupon');
        console.log("applyCoupon");

        let couponCode = currentRec.getValue('custentity_jj_coupon_code');
        console.log("couponCode");

        if(applyCoupon && (!couponCode || couponCode.length !== 5)){

            message.create({
                type: message.Type.ERROR,
                title: 'Error',
                message: "Coupon Code must be exactly 5 characters long when Apply Coupon is checked."
            }).show({ duration: 5000 });

            return false;
        };

        return true;

    };

    return {
        
        fieldChanged: fieldChanged,
        saveRecord: saveRecord
    };
    
});
