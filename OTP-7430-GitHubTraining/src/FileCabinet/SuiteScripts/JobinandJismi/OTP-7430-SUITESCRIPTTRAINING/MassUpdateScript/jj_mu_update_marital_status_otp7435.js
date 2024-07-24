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
                    type: 'customrecord_jj_monthly_visitor',
                    id: params.id
                });

                let matStatus = rec.getText('custrecord_jj_matital_status');
                log.debug('Status: ',matStatus);

                if(matStatus === 'Unmarried'){

                    rec.setValue('custrecord_jj_matital_status',1);
                };

                rec.save();

            }
            catch(e){
                log.error('Error in Updating: ',e.message);
            };

        }

        return {each}

    });
