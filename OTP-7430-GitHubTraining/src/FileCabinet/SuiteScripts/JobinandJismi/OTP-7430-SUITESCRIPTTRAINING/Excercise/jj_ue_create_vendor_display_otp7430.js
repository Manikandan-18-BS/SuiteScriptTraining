/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/search'],
    /**
 * @param{record} record
 * @param{search} search
 */
    (record, search) => {
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
            let venCrt = record.create({
                type: record.Type.VENDOR,
                isDynamic: true
            });
            venCrt.setValue('companyname',"Munch");
            venCrt.setValue('phone',7569843210);
            venCrt.setValue('subsidiary',11);
            let venSave = venCrt.save({
                enableSourcing: true,
                ignoreMandatoryFields: true
            });
            log.debug("Created vendor",venSave);

            let VenSrch = search.create({
                type: search.Type.VENDOR,
                columns: ['companyname','subsidiary']
            });

            VenSrch.run().each(function(result){
                let nam = result.getValue('companyname');
                log.debug("Vendor Name:",nam);
                
                let sub = result.getText('subsidiary');
                log.debug("Subsidiary",sub);

                return true;
            });

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
