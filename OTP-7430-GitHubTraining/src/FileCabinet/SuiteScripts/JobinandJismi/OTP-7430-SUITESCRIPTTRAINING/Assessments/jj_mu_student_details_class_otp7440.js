/**
 /**
 * @NApiVersion 2.1
 * @NScriptType MassUpdateScript
 */
define(['N/record', 'N/search'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search) => {
        /**
         * Defines the Mass Update trigger point.
         * @param {Object} params
         * @param {string} params.type - Record type of the record being processed
         * @param {number} params.id - ID of the record being processed
         * @since 2016.1
         */
        const each = (params) => {
            try{

                let rec = record.load({
                    type: params.type,
                    id: params.id
                });

                let classValue = rec.getValue('custrecord_jj_class');
                log.debug('Class ID:', classValue);
                let claValue = Number(classValue)+1;
                log.debug('Class ID 2:', claValue);

                rec.setValue('custrecord_jj_class',claValue);
                rec.save();
            }
            catch(e){
                log.error('Error:',e.message);
            };
        };

        return {each}

    });
