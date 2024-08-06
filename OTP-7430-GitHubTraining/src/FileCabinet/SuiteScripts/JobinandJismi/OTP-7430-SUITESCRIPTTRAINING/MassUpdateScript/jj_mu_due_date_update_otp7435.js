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

                let today = new Date();
                let newDate = new Date();
                newDate.setDate(today.getDate()+14);

                record.submitFields({
                    type: params.type,
                    id: params.id,
                    values:{'duedate': newDate}
                });
            }
            catch{
                log.error('Error in Updation:',e.message);
            };
        };

        return {each}

    });