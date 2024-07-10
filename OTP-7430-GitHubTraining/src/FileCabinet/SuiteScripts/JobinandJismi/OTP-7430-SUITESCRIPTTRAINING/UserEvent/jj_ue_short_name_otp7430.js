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
            let srch = search.create({
                type: search.Type.CUSTOMER,
                columns: ['internalid','entityid','datecreated']
            });

            let srchrun = srch.run().getRange({
                start: 0,
                end: 10
            });
            
            srchrun.forEach(function(result){
                let rec = result.getValue('internalid');
                log.debug('Record:',rec);
                let cust = result.getValue('entityid');
                log.debug('Name: ',cust);
                let dat = result.getValue('datecreated');
                log.debug(dat);
                // let mondate = new Date(dat);
                
           // try{
               // if(cust){
                  let sNam= cust.substring(0,2);

                let mon = dat.substring(0,2);
                log.debug(mon);

                // let mon = mondate.getMonth() + 1;
                let shortName = sNam+':'+mon;

                log.debug('Short Name:',shortName);

                let recLoad = record.load({
                    type: record.Type.CUSTOMER,
                    id: rec,
                    isDynamic: true,
                });
                recLoad.setValue('custentity_jj_short_name',shortName);

                let CustID = recLoad.save({
                    enableSourcing: true,
                    ignoreMandatoryField: true
                });
                log.debug("Customer ID",CustID);

                // record.submitFields({
                //     type: record.Type.CUSTOMER,
                //     id : rec,
                //     values:{'custentity_jj_short_name':shortName}
                // });
                return true;
           // }
        // }
        // catch(e){
        //     log.error('Error in Set Value',e.message());
        //     };

           

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
